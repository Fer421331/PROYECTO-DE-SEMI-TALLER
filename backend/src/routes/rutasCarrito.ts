import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerCarrito,
  obtenerCarritoPorId,
  crearCarrito,
  actualizarCarrito,
  eliminarCarrito,
} from '../controllers/carrito/controladorCarrito.js';

const router: Router = Router();

router.use(verificarToken);

const ESTADOS = ['ACT', 'INA'];
const CAMPOS_PERMITIDOS = [
  'usercod',
  'carrito_estado',
  'carrito_fecha_creacion',
  'carrito_fecha_actualizacion',
];

const validarId = query('id')
  .notEmpty()
  .withMessage('El ID es obligatorio')
  .isInt({ min: 1, max: 2147483647 })
  .withMessage('El ID debe ser un número entero positivo');

const validarCamposDesconocidos = body().custom((_, { req }) => {
  const desconocidos = Object.keys(req.body ?? {}).filter(
    (campo) => !CAMPOS_PERMITIDOS.includes(campo)
  );
  if (desconocidos.length > 0) {
    throw new Error(`Campos no permitidos: ${desconocidos.join(', ')}`);
  }
  return true;
});

const validarOrdenFechas = body().custom((_, { req }) => {
  const { carrito_fecha_creacion, carrito_fecha_actualizacion } = req.body ?? {};
  if (carrito_fecha_creacion && carrito_fecha_actualizacion) {
    if (new Date(carrito_fecha_actualizacion) < new Date(carrito_fecha_creacion)) {
      throw new Error('La fecha de actualización no puede ser anterior a la de creación');
    }
  }
  return true;
});

// Obtener todos los carritos
router.get('/all', obtenerCarrito);

// Obtener carrito por ID
router.get('/one', [validarId], obtenerCarritoPorId);

// Crear carrito
router.post(
  '/',
  [
    body('usercod')
      .notEmpty()
      .withMessage('El usuario es obligatorio')
      .isInt({ min: 1, max: 2147483647 })
      .withMessage('El usuario debe ser un entero positivo válido'),

    body('carrito_estado')
      .optional()
      .isString()
      .withMessage('El estado debe ser texto')
      .bail()
      .trim()
      .isIn(ESTADOS)
      .withMessage(`El estado debe ser: ${ESTADOS.join(' o ')}`),

    body('carrito_fecha_creacion')
      .optional()
      .isISO8601({ strict: true })
      .withMessage('La fecha de creación no es válida'),

    body('carrito_fecha_actualizacion')
      .optional()
      .isISO8601({ strict: true })
      .withMessage('La fecha de actualización no es válida'),

    validarOrdenFechas,
    validarCamposDesconocidos,
  ],
  crearCarrito
);

// Actualizar carrito
router.put(
  '/',
  [
    validarId,

    body('usercod')
      .optional()
      .isInt({ min: 1, max: 2147483647 })
      .withMessage('El usuario debe ser un entero positivo válido'),

    body('carrito_estado')
      .optional()
      .isString()
      .withMessage('El estado debe ser texto')
      .bail()
      .trim()
      .isIn(ESTADOS)
      .withMessage(`El estado debe ser: ${ESTADOS.join(' o ')}`),

    body('carrito_fecha_creacion')
      .optional()
      .isISO8601({ strict: true })
      .withMessage('La fecha de creación no es válida'),

    body('carrito_fecha_actualizacion')
      .optional()
      .isISO8601({ strict: true })
      .withMessage('La fecha de actualización no es válida'),

    body().custom((_, { req }) => {
      if (Object.keys(req.body ?? {}).length === 0) {
        throw new Error('Debes enviar al menos un campo para actualizar');
      }
      return true;
    }),

    validarOrdenFechas,
    validarCamposDesconocidos,
  ],
  actualizarCarrito
);

// Eliminar carrito
router.delete('/', [validarId], eliminarCarrito);

export default router;