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

// Obtener todos los carritos
router.get('/all', obtenerCarrito);

// Obtener carrito por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerCarritoPorId
);

// Crear carrito
router.post(
  '/',
  [
    body('usercod')
      .notEmpty()
      .withMessage('El usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El usuario debe ser un número válido'),

    body('carrito_estado')
      .optional()
      .isString()
      .withMessage('El estado debe ser texto'),

    body('carrito_fecha_creacion')
      .optional()
      .isISO8601()
      .withMessage('La fecha de creación no es válida'),

    body('carrito_fecha_actualizacion')
      .optional()
      .isISO8601()
      .withMessage('La fecha de actualización no es válida'),
  ],
  crearCarrito
);

// Actualizar carrito
router.put(
  '/',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    body('usercod')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El usuario debe ser un número válido'),

    body('carrito_estado')
      .optional()
      .isString()
      .withMessage('El estado debe ser texto'),

    body('carrito_fecha_creacion')
      .optional()
      .isISO8601()
      .withMessage('La fecha de creación no es válida'),

    body('carrito_fecha_actualizacion')
      .optional()
      .isISO8601()
      .withMessage('La fecha de actualización no es válida'),
  ],
  actualizarCarrito
);

// Eliminar carrito
router.delete(
  '/',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarCarrito
);

export default router;