
import { QueryTypes } from 'sequelize';
import { DB_LACTAXUME } from '../config/db.js';
import { enviarFacturaPorCorreo } from './correo.service.js';

interface DatosFactura {
    venta_id: number;
    venta_fecha: Date | string;
    venta_subtotal: number;
    venta_impuesto: number;
    venta_descuento: number;
    venta_total: number;
    username: string;
    useremail: string;
}

interface ProductoFacturaDB {
    producto_nombre: string;
    cantidad: number;
    precio_unitario: number;
    descuento: number;
    subtotal: number;
}

interface RegistroCorreo {
    factura_correo_id: number;
    estado: string;
}

export async function enviarFacturaDeVenta(
    ventaId: number
): Promise<void> {
    const venta = await DB_LACTAXUME.query<DatosFactura>(
        `SELECT
      v.venta_id,
      v.venta_fecha,
      v.venta_subtotal,
      v.venta_impuesto,
      v.venta_descuento,
      v.venta_total,
      u.username,
      u.useremail
    FROM ventas v
    INNER JOIN usuario u ON u.usercod = v.usercod
    WHERE v.venta_id = :ventaId
      AND v.venta_estado = 'PAG'
    LIMIT 1`,
        {
            replacements: { ventaId },
            type: QueryTypes.SELECT,
        }
    );

    if (!venta.length) {
        throw new Error(
            `La venta ${ventaId} no está aprobada o no se encontró su cliente.`
        );
    }

    const datos = venta[0];

    const pagos = await DB_LACTAXUME.query<{ pago_id: number }>(
        `SELECT pago_id
    FROM pagos
    WHERE venta_id = :ventaId
      AND pago_estado = 'APR'
    LIMIT 1`,
        {
            replacements: { ventaId },
            type: QueryTypes.SELECT,
        }
    );

    if (!pagos.length) {
        throw new Error(`La venta ${ventaId} no tiene un pago aprobado.`);
    }

    const productos = await DB_LACTAXUME.query<ProductoFacturaDB>(
        `SELECT producto_nombre, cantidad, precio_unitario, descuento, subtotal
    FROM venta_detalle
    WHERE venta_id = :ventaId`,
        {
            replacements: { ventaId },
            type: QueryTypes.SELECT,
        }
    );

    if (!productos.length) {
        throw new Error(`La venta ${ventaId} no tiene productos registrados.`);
    }

    const registros = await DB_LACTAXUME.query<RegistroCorreo>(
        `SELECT factura_correo_id, estado
    FROM facturas_correo
    WHERE venta_id = :ventaId
    LIMIT 1`,
        {
            replacements: { ventaId },
            type: QueryTypes.SELECT,
        }
    );

    if (registros.length && registros[0].estado === 'ENV') {
        return;
    }

    if (!registros.length) {
        await DB_LACTAXUME.query(
            `INSERT INTO facturas_correo (venta_id, correo_destino, estado)
       VALUES (:ventaId, :correo, 'PEN')`,
            {
                replacements: {
                    ventaId,
                    correo: datos.useremail,
                },
                type: QueryTypes.INSERT,
            }
        );
    } else {
        await DB_LACTAXUME.query(
            `UPDATE facturas_correo
       SET correo_destino = :correo, estado = 'PEN'
       WHERE venta_id = :ventaId`,
            {
                replacements: {
                    ventaId,
                    correo: datos.useremail,
                },
                type: QueryTypes.UPDATE,
            }
        );
    }

    try {
        await enviarFacturaPorCorreo({
            destinatario: datos.useremail,
            nombreCliente: datos.username,
            numeroVenta: datos.venta_id,
            fecha: new Date(datos.venta_fecha).toLocaleDateString('es-HN'),
            productos: productos.map((producto) => ({
                nombre: producto.producto_nombre,
                cantidad: Number(producto.cantidad),
                precioUnitario: Number(producto.precio_unitario),
                descuento: Number(producto.descuento),
                subtotal: Number(producto.subtotal),
            })),
            subtotal: Number(datos.venta_subtotal),
            impuesto: Number(datos.venta_impuesto),
            descuento: Number(datos.venta_descuento),
            total: Number(datos.venta_total),
        });

        await DB_LACTAXUME.query(
            `UPDATE facturas_correo
       SET estado = 'ENV', fecha_envio = CURRENT_TIMESTAMP
       WHERE venta_id = :ventaId`,
            {
                replacements: { ventaId },
                type: QueryTypes.UPDATE,
            }
        );
    } catch (error) {
        console.error(
            `No se pudo enviar la factura de la venta ${ventaId}:`,
            error
        );
        throw error;
    }
}
