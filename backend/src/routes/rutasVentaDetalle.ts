import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerVentaDetalle,
  obtenerVentaDetallePorId,
  crearVentaDetalle,
  actualizarVentaDetalle,
  eliminarVentaDetalle,
} from '../controllers/ventadetalle/controladorVentaDetalle.js';

const router: Router = Router();

router.use(verificarToken);

const MAX_INT = 2147483647;
const MAX_CANTIDAD = 10000;
const MAX_DECIMAL = 99999999.99;

const validarDetalleId = query('detalle_venta_id')
  .exists()
  .withMessage('El ID del detalle es obligatorio')
  .bail()
  .isString()
  .withMessage('El ID del detalle debe enviarse una sola vez')
  .bail()
  .isInt({ min: 1, max: MAX_INT })
  .withMessage('El ID del detalle debe ser un entero positivo');

const validarDinero = (campo: string, etiqueta: string, obligatorio: boolean) => {
  const base = body(campo);
  return (obligatorio
    ? base.exists({ values: 'null' }).withMessage(`${etiqueta} es obligatorio`).bail()
    : base.optional()
  )
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage(`${etiqueta} debe ser un número con máximo 2 decimales`)
    .bail()
    .isFloat({ min: 0, max: MAX_DECIMAL })
    .withMessage(`${etiqueta} debe estar entre 0 y ${MAX_DECIMAL}`);
};

const CAMPOS_CREAR = [
  'venta_id',
  'producto_id',
  'producto_nombre',
  'precio_unitario',
  'cantidad',
  'descuento',
  'subtotal',
];

const soloCampos = (permitidos: string[]) =>
  body().custom((_, { req }) => {
    const desconocidos = Object.keys(req.body ?? {}).filter((c) => !permitidos.includes(c));
    if (desconocidos.length > 0) {
      throw new Error(`Campos no permitidos: ${desconocidos.join(', ')}`);
    }
    return true;
  });
const validarSubtotal = body().custom((_, { req }) => {
  const { precio_unitario, cantidad, descuento, subtotal } = req.body ?? {};
  if ([precio_unitario, cantidad, subtotal].every((v) => v != null)) {
    const c = (v: unknown) => Math.round(Number(v) * 100);
    const bruto = c(precio_unitario) * Number(cantidad);
    const desc = descuento != null ? c(descuento) : 0;
    if (desc > bruto) {
      throw new Error('El descuento no puede ser mayor que precio × cantidad');
    }
    const esperado = bruto - desc;
    if (c(subtotal) !== esperado) {
      throw new Error(`El subtotal debe ser precio × cantidad − descuento (${(esperado / 100).toFixed(2)})`);
    }
  }
  return true;
});
router.get('/all', obtenerVentaDetalle);
router.get('/one', [validarDetalleId], obtenerVentaDetallePorId);
router.post(
  '/',
  [
    body('venta_id')
      .notEmpty().withMessage('La venta es obligatoria').bail()
      .isInt({ min: 1, max: MAX_INT }).withMessage('La venta debe ser un entero positivo'),

    body('producto_id')
      .notEmpty().withMessage('El producto es obligatorio').bail()
      .isInt({ min: 1, max: MAX_INT }).withMessage('El producto debe ser un entero positivo'),

    body('producto_nombre')
      .isString().withMessage('El nombre del producto debe ser texto').bail()
      .trim()
      .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
      .isLength({ max: 150 }).withMessage('El nombre no puede superar los 150 caracteres'),

    validarDinero('precio_unitario', 'El precio unitario', true),

    body('cantidad')
      .notEmpty().withMessage('La cantidad es obligatoria').bail()
      .isInt({ min: 1, max: MAX_CANTIDAD })
      .withMessage(`La cantidad debe ser un entero entre 1 y ${MAX_CANTIDAD}`),

    validarDinero('descuento', 'El descuento', false),
    validarDinero('subtotal', 'El subtotal', true),

    validarSubtotal,
    soloCampos(CAMPOS_CREAR),
  ],
  crearVentaDetalle
);
router.put(
  '/',
  [
    validarDetalleId,

    body('cantidad')
      .optional()
      .isInt({ min: 1, max: MAX_CANTIDAD })
      .withMessage(`La cantidad debe ser un entero entre 1 y ${MAX_CANTIDAD}`),

    validarDinero('descuento', 'El descuento', false),

    body().custom((_, { req }) => {
      if (Object.keys(req.body ?? {}).length === 0) {
        throw new Error('Debes enviar al menos un campo para actualizar');
      }
      return true;
    }),

    soloCampos(['cantidad', 'descuento']),
  ],
  actualizarVentaDetalle
);
router.delete('/', [validarDetalleId], eliminarVentaDetalle);

export default router;