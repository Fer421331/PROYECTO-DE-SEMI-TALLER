import { Transaction } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";
import Carrito from "../models/modeloCarrito.js";
import CarritoDetalle from "../models/modeloCarritoDetalle.js";
import Venta from "../models/modeloVenta.js";
import VentaDetalle from "../models/modeloVentaDetalle.js";
import InventarioMovimiento from "../models/modeloInventarioMovimiento.js";
import Producto from "../models/modeloProducto.js";
import Usuario from "../models/Usuario.model.js";
import { enviarFacturaPorCorreo } from "./correo.service.js";

const CARRITO_ACTIVO = "ACT"; // estado del carrito abierto (confirma tu valor real)
const VENTA_ESTADO_INICIAL = "PEN"; // 'PEN' | 'PAG' | 'CAN' | 'ENT'
const PRODUCTO_ESTADO_ACTIVO = "ACT"; // valor de producto_activo / producto_estado para vender
const TASA_IMPUESTO = Number(process.env.TASA_IMPUESTO ?? 0.15); // ISV 15 %

export class ErrorNegocio extends Error {
  constructor(
    message: string,
    public status: number = 400,
  ) {
    super(message);
  }
}

interface DatosCheckout {
  usercod: number;
  direccion_id: number;
  metodo_pago_id: number;
  observaciones?: string | null;
}

interface ResultadoCheckout {
  venta: Venta;
  correoEnviado: boolean;
}

// Trabajamos en centavos para evitar errores de punto flotante
const aCentavos = (v: unknown): number => Math.round(Number(v) * 100);
const deCentavos = (c: number): number => c / 100;

export async function procesarCompraDelCarrito(
  datos: DatosCheckout,
): Promise<ResultadoCheckout> {
  const { usercod, direccion_id, metodo_pago_id, observaciones } = datos;

  // ---------- 1) TRANSACCIÓN: venta + inventario + vaciar carrito ----------
  const resultado = await DB_LACTAXUME.transaction(async (t: Transaction) => {
    // Carrito activo del usuario (bloqueado para evitar doble checkout)
    const carrito = await Carrito.findOne({
      where: { usercod, carrito_estado: CARRITO_ACTIVO },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!carrito) {
      throw new ErrorNegocio("El usuario no tiene un carrito activo", 404);
    }

    const items = await CarritoDetalle.findAll({
      where: { carrito_id: carrito.carrito_id },
      order: [["producto_id", "ASC"]],
      transaction: t,
    });
    if (items.length === 0) {
      throw new ErrorNegocio("El carrito está vacío");
    }

    // Bloqueamos los productos (orden fijo para evitar deadlocks)
    const productos = await Producto.findAll({
      where: { producto_id: items.map((i) => i.producto_id) },
      order: [["producto_id", "ASC"]],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    const mapaProductos = new Map(productos.map((p) => [p.producto_id, p]));

    // ----- Cálculo de totales + validaciones -----
    let subtotalC = 0; // bruto (cantidad * precio)
    let descuentoC = 0;

    const lineas = items.map((item) => {
      const producto = mapaProductos.get(item.producto_id);
      if (!producto) {
        throw new ErrorNegocio(`El producto ${item.producto_id} ya no existe`);
      }

      if (
        producto.producto_activo !== PRODUCTO_ESTADO_ACTIVO ||
        producto.producto_estado !== PRODUCTO_ESTADO_ACTIVO
      ) {
        throw new ErrorNegocio(
          `El producto "${producto.producto_nombre}" ya no está disponible`,
        );
      }

      if (!Number.isInteger(item.cantidad) || item.cantidad < 1) {
        throw new ErrorNegocio(
          `Cantidad inválida para "${producto.producto_nombre}"`,
        );
      }

      const stockActual = producto.producto_stock;
      if (stockActual < item.cantidad) {
        throw new ErrorNegocio(
          `Stock insuficiente para "${producto.producto_nombre}" ` +
            `(disponible: ${stockActual}, solicitado: ${item.cantidad})`,
        );
      }

      const precioC = aCentavos(item.precio_unitario);
      const brutoC = precioC * item.cantidad;
      const descC = aCentavos(item.descuento);
      if (descC > brutoC) {
        throw new ErrorNegocio(
          `El descuento de "${producto.producto_nombre}" supera su subtotal`,
        );
      }

      subtotalC += brutoC;
      descuentoC += descC;

      return {
        item,
        producto,
        stockActual,
        precioC,
        descC,
        netoC: brutoC - descC,
      };
    });

    const impuestoC = Math.round((subtotalC - descuentoC) * TASA_IMPUESTO);
    const totalC = subtotalC + impuestoC - descuentoC; // cumple validarTotales

    // ----- Venta -----
    const venta = await Venta.create(
      {
        usercod,
        direccion_id,
        metodo_pago_id,
        venta_fecha: new Date(),
        venta_subtotal: deCentavos(subtotalC).toFixed(2),
        venta_impuesto: deCentavos(impuestoC).toFixed(2),
        venta_descuento: deCentavos(descuentoC).toFixed(2),
        venta_total: deCentavos(totalC).toFixed(2),
        venta_estado: VENTA_ESTADO_INICIAL,
        venta_observaciones: observaciones ?? null,
      },
      { transaction: t },
    );

    // ----- Detalle de venta (snapshot del nombre y precio) -----
    await VentaDetalle.bulkCreate(
      lineas.map((l) => ({
        venta_id: venta.venta_id,
        producto_id: l.item.producto_id,
        producto_nombre: l.producto.producto_nombre,
        precio_unitario: deCentavos(l.precioC).toFixed(2),
        cantidad: l.item.cantidad,
        descuento: deCentavos(l.descC).toFixed(2),
        subtotal: deCentavos(l.netoC).toFixed(2),
      })),
      { transaction: t },
    );

    // ----- Inventario: movimientos + actualizar stock -----
    const ahora = new Date();
    await InventarioMovimiento.bulkCreate(
      lineas.map((l) => ({
        producto_id: l.item.producto_id,
        usercod,
        movimiento_tipo: "SALIDA" as const,
        movimiento_cantidad: l.item.cantidad,
        movimiento_stock_anterior: l.stockActual,
        movimiento_stock_nuevo: l.stockActual - l.item.cantidad,
        movimiento_observacion: `Venta #${venta.venta_id}`,
        movimiento_fecha: ahora,
      })),
      { transaction: t },
    );

    for (const l of lineas) {
      await l.producto.update(
        {
          producto_stock: l.stockActual - l.item.cantidad,
          producto_fecha_actualizacion: ahora,
        },
        { transaction: t },
      );
    }

    // ----- Vaciar carrito -----
    await CarritoDetalle.destroy({
      where: { carrito_id: carrito.carrito_id },
      transaction: t,
    });
    await carrito.update(
      { carrito_fecha_actualizacion: ahora },
      { transaction: t },
    );

    // Datos para el correo (se usan después del commit)
    return {
      venta,
      fecha: ahora,
      productosCorreo: lineas.map((l) => ({
        nombre: l.producto.producto_nombre,
        cantidad: l.item.cantidad,
        precioUnitario: deCentavos(l.precioC),
        descuento: deCentavos(l.descC),
        subtotal: deCentavos(l.netoC),
      })),
      subtotal: deCentavos(subtotalC),
      impuesto: deCentavos(impuestoC),
      descuento: deCentavos(descuentoC),
      total: deCentavos(totalC),
    };
  });

  // ---------- 2) CORREO: fuera de la transacción ----------
  // Si el correo falla, la venta NO se revierte.
  let correoEnviado = false;
  try {
    const usuario = await Usuario.findByPk(usercod);

    if (usuario?.useremail) {
      await enviarFacturaPorCorreo({
        destinatario: usuario.useremail,
        nombreCliente: usuario.username,
        numeroVenta: resultado.venta.venta_id,
        fecha: resultado.fecha.toLocaleString("es-HN"),
        productos: resultado.productosCorreo,
        subtotal: resultado.subtotal,
        impuesto: resultado.impuesto,
        descuento: resultado.descuento,
        total: resultado.total,
      });
      correoEnviado = true;
    }
  } catch (error) {
    console.error(
      `No se pudo enviar el correo de la venta #${resultado.venta.venta_id}:`,
      error,
    );
  }

  return { venta: resultado.venta, correoEnviado };
}
