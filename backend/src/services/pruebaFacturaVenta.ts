
import 'dotenv/config';
import { QueryTypes } from 'sequelize';
import { DB_LACTAXUME } from '../config/db.js';
import { enviarFacturaPorCorreo } from './correo.service.js';

const VENTA_ID = 30;
const CORREO_PRUEBA = 'fergomezfu@gmail.com';

interface VentaPrueba {
    venta_id: number;
    venta_fecha: Date | string;
    venta_subtotal: number;
    venta_impuesto: number;
    venta_descuento: number;
    venta_total: number;
    username: string;
}

interface ProductoPrueba {
    producto_nombre: string;
    cantidad: number;
    precio_unitario: number;
    descuento: number;
    subtotal: number;
}

async function probarFactura(): Promise<void> {
    try {
        const ventas = await DB_LACTAXUME.query<VentaPrueba>(
            `SELECT
        v.venta_id,
        v.venta_fecha,
        v.venta_subtotal,
        v.venta_impuesto,
        v.venta_descuento,
        v.venta_total,
        u.username
      FROM ventas v
      INNER JOIN usuario u ON u.usercod = v.usercod
      WHERE v.venta_id = :ventaId
        AND v.venta_estado = 'APR'
      LIMIT 1`,
            {
                replacements: { ventaId: VENTA_ID },
                type: QueryTypes.SELECT,
            }
        );

        if (!ventas.length) {
            throw new Error('La venta no existe o no está aprobada.');
        }

        const pagos = await DB_LACTAXUME.query<{ pago_id: number }>(
            `SELECT pago_id
       FROM pagos
       WHERE venta_id = :ventaId
         AND pago_estado = 'APR'
       LIMIT 1`,
            {
                replacements: { ventaId: VENTA_ID },
                type: QueryTypes.SELECT,
            }
        );

        if (!pagos.length) {
            throw new Error('La venta no tiene un pago aprobado.');
        }

        const productos = await DB_LACTAXUME.query<ProductoPrueba>(
            `SELECT producto_nombre, cantidad, precio_unitario, descuento, subtotal
       FROM venta_detalle
       WHERE venta_id = :ventaId`,
            {
                replacements: { ventaId: VENTA_ID },
                type: QueryTypes.SELECT,
            }
        );

        if (!productos.length) {
            throw new Error('La venta no tiene productos registrados.');
        }

        const venta = ventas[0];

        await enviarFacturaPorCorreo({
            destinatario: CORREO_PRUEBA,
            nombreCliente: venta.username,
            numeroVenta: venta.venta_id,
            fecha: new Date(venta.venta_fecha).toLocaleDateString('es-HN'),
            productos: productos.map((producto) => ({
                nombre: producto.producto_nombre,
                cantidad: Number(producto.cantidad),
                precioUnitario: Number(producto.precio_unitario),
                descuento: Number(producto.descuento),
                subtotal: Number(producto.subtotal),
            })),
            subtotal: Number(venta.venta_subtotal),
            impuesto: Number(venta.venta_impuesto),
            descuento: Number(venta.venta_descuento),
            total: Number(venta.venta_total),
        });

        console.log(
            `Factura de prueba de la venta ${VENTA_ID} enviada a ${CORREO_PRUEBA}.`
        );
    } finally {
        await DB_LACTAXUME.close();
    }
}

probarFactura().catch((error: unknown) => {
    console.error('Falló la prueba de la factura:', error);
    process.exitCode = 1;
});
