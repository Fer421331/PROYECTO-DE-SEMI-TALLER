import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerFavoritos,
  obtenerFavoritoPorId,
  crearFavorito,
  actualizarFavorito,
  eliminarFavorito,
} from '../controllers/favoritos/controladorFavoritos.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todos los favoritos
router.get('/all', obtenerFavoritos);

// Obtener favorito por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerFavoritoPorId
);

// Crear favorito
router.post(
  '/create',
  [
    body('usercod')
      .trim()
      .notEmpty()
      .withMessage('El código de usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El código de usuario debe ser un número válido')
      .toInt(),

    body('producto_id')
      .trim()
      .notEmpty()
      .withMessage('El producto es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El producto debe ser un número válido')
      .toInt(),

    body('favorito_fecha')
      .optional({ nullable: true })
      .isISO8601()
      .withMessage('La fecha debe tener un formato válido'),
  ],
  crearFavorito
);

// Actualizar favorito
router.put(
  '/update',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    body('usercod')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El código de usuario debe ser un número válido'),

    body('producto_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El producto debe ser un número válido'),

    body('favorito_fecha')
      .optional()
      .isISO8601()
      .withMessage('La fecha debe tener un formato válido'),
  ],
  actualizarFavorito
);

// Eliminar favorito
router.delete(
  '/delete',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarFavorito
);

export default router;