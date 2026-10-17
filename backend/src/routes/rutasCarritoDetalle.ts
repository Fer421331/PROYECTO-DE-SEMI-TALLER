import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerCarritoDetalle,
  obtenerCarritoDetallePorId,
  crearCarritoDetalle,
  actualizarCarritoDetalle,
  eliminarCarritoDetalle,
} from '../controllers/carritodetalle/controladorCarritoDetalle.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todos los detalles
router.get('/all', obtenerCarritoDetalle);

// Obtener detalle por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerCarritoDetallePorId
);

// Crear detalle
router.post(
  '/',
  [
    body('carrito_id')
      .notEmpty()
      .withMessage('El carrito es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El carrito debe ser un número válido'),

    body('producto_id')
      .notEmpty()
      .withMessage('El producto es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El producto debe ser un número válido'),

    body('cantidad')
      .notEmpty()
      .withMessage('La cantidad es obligatoria')
      .isInt({ min: 1 })
      .withMessage('La cantidad debe ser mayor a cero'),

    body('precio_unitario')
      .notEmpty()
      .withMessage('El precio unitario es obligatorio')
      .isFloat({ min: 0 })
      .withMessage('El precio unitario debe ser válido'),

    body('subtotal')
      .notEmpty()
      .withMessage('El subtotal es obligatorio')
      .isFloat({ min: 0 })
      .withMessage('El subtotal debe ser válido'),
  ],
  crearCarritoDetalle
);

// Actualizar detalle
router.put(
  '/',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    body('carrito_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El carrito debe ser un número válido'),

    body('producto_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El producto debe ser un número válido'),

    body('cantidad')
      .optional()
      .isInt({ min: 1 })
      .withMessage('La cantidad debe ser mayor a cero'),

    body('precio_unitario')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('El precio unitario debe ser válido'),

    body('subtotal')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('El subtotal debe ser válido'),
  ],
  actualizarCarritoDetalle
);

// Eliminar detalle
router.delete(
  '/',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarCarritoDetalle
);

export default router;