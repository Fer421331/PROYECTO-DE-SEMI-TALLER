import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
} from '../controllers/venta/controladorVentas.js';

const router: Router = Router();

router.use(verificarToken);

const ESTADOS = ['PEN', 'PAG', 'CAN', 'ENT']; // ajusta a tus valores reales

const validarVentaId = query('venta_id')
  .exists()
  .withMessage('El ID de la venta es obligatorio')
  .bail()
  .isString()
  .withMessage('El ID de la venta debe enviarse una sola vez')
  .bail()
  .isInt({ min: 1, max: 2147483647 })
  .withMessage('El ID de la venta debe ser un entero positivo');

const validarDinero = (campo: string, etiqueta: string, obligatorio: boolean) => {
  const base = body(campo);
  return (obligatorio
    ? base.exists({ values: 'null' }).withMessage(`${etiqueta} es obligatorio`).bail()
    : base.optional()
  )
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage(`${etiqueta} debe ser un número con máximo 2 decimales`)
    .bail()
    .isFloat({ min: 0, max: 99999999.99 })
    .withMessage(`${etiqueta} debe estar entre 0 y 99999999.99`);
};
const validarTotales = body().custom((_, { req }) => {
  const { venta_subtotal, venta_impuesto, venta_descuento, venta_total } = req.body ?? {};
  if ([venta_subtotal, venta_impuesto, venta_descuento, venta_total].every((v) => v != null)) {
    const c = (v: unknown) => Math.round(Number(v) * 100);
    if (c(venta_descuento) > c(venta_subtotal)) {
      throw new Error('El descuento no puede ser mayor que el subtotal');
    }
    const esperado = c(venta_subtotal) + c(venta_impuesto) - c(venta_descuento);
    if (c(venta_total) !== esperado) {
      throw new Error(`El total debe ser subtotal + impuesto - descuento (${(esperado / 100).toFixed(2)})`);
    }
  }
  return true;
});

const CAMPOS_PERMITIDOS = [
  'usercod',
  'direccion_id',
  'metodo_pago_id',
  'venta_fecha',
  'venta_subtotal',
  'venta_impuesto',
  'venta_descuento',
  'venta_total',
  'venta_estado',
  'venta_observaciones',
];

const soloCamposPermitidos = body().custom((_, { req }) => {
  const desconocidos = Object.keys(req.body ?? {}).filter((c) => !CAMPOS_PERMITIDOS.includes(c));
  if (desconocidos.length > 0) {
    throw new Error(`Campos no permitidos: ${desconocidos.join(', ')}`);
  }
  return true;
});

router.get('/all', obtenerVentas);
router.get('/one', [validarVentaId], obtenerVentaPorId);
router.post(
  '/create',
  [
    body('usercod')
      .notEmpty().withMessage('El usuario es obligatorio').bail()
      .isInt({ min: 1, max: 2147483647 }).withMessage('El usuario debe ser un entero positivo'),

    body('direccion_id')
      .notEmpty().withMessage('La dirección es obligatoria').bail()
      .isInt({ min: 1, max: 2147483647 }).withMessage('La dirección debe ser un entero positivo'),

    body('metodo_pago_id')
      .notEmpty().withMessage('El método de pago es obligatorio').bail()
      .isInt({ min: 1, max: 2147483647 }).withMessage('El método de pago debe ser un entero positivo'),

    body('venta_fecha')
      .optional()
      .isISO8601({ strict: true }).withMessage('La fecha de la venta no es válida'),

    validarDinero('venta_subtotal', 'El subtotal', true),
    validarDinero('venta_impuesto', 'El impuesto', true),
    validarDinero('venta_descuento', 'El descuento', true),
    validarDinero('venta_total', 'El total', true),

    body('venta_estado')
      .notEmpty().withMessage('El estado es obligatorio').bail()
      .isIn(ESTADOS).withMessage(`El estado debe ser: ${ESTADOS.join(', ')}`),

    body('venta_observaciones')
      .optional({ nullable: true })
      .isString().withMessage('Las observaciones deben ser texto').bail()
      .isLength({ max: 500 }).withMessage('Las observaciones no pueden superar los 500 caracteres'),

    validarTotales,
    soloCamposPermitidos,
  ],
  crearVenta
);

// Actualizar venta
router.put(
  '/update',
  [
    validarVentaId,

    body('usercod')
      .optional()
      .isInt({ min: 1, max: 2147483647 }).withMessage('El usuario debe ser un entero positivo'),

    body('direccion_id')
      .optional()
      .isInt({ min: 1, max: 2147483647 }).withMessage('La dirección debe ser un entero positivo'),

    body('metodo_pago_id')
      .optional()
      .isInt({ min: 1, max: 2147483647 }).withMessage('El método de pago debe ser un entero positivo'),

    body('venta_fecha')
      .optional()
      .isISO8601({ strict: true }).withMessage('La fecha de la venta no es válida'),

    validarDinero('venta_subtotal', 'El subtotal', false),
    validarDinero('venta_impuesto', 'El impuesto', false),
    validarDinero('venta_descuento', 'El descuento', false),
    validarDinero('venta_total', 'El total', false),

    body('venta_estado')
      .optional()
      .isIn(ESTADOS).withMessage(`El estado debe ser: ${ESTADOS.join(', ')}`),

    body('venta_observaciones')
      .optional({ nullable: true })
      .isString().withMessage('Las observaciones deben ser texto').bail()
      .isLength({ max: 500 }).withMessage('Las observaciones no pueden superar los 500 caracteres'),

    body().custom((_, { req }) => {
      if (Object.keys(req.body ?? {}).length === 0) {
        throw new Error('Debes enviar al menos un campo para actualizar');
      }
      return true;
    }),

    validarTotales,
    soloCamposPermitidos,
  ],
  actualizarVenta
);

router.delete('/delete', [validarVentaId], eliminarVenta);

export default router;