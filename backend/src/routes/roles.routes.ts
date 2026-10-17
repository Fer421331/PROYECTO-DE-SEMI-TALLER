import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} from '../controllers/roles/roles.controller.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todos los roles
router.get('/all', getAllRoles);

// Obtener rol por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  getRoleById
);

// Crear rol
router.post(
  '/create',
  [
    body('rol_nombre')
      .notEmpty()
      .withMessage('El nombre del rol es obligatorio')
      .isLength({ max: 100 })
      .withMessage('El nombre no puede superar los 100 caracteres'),

    body('rol_descripcion')
      .optional()
      .isString()
      .withMessage('La descripción debe ser texto'),

    body('rol_estado')
      .optional()
      .isBoolean()
      .withMessage('El estado debe ser true o false'),
  ],
  createRole
);

// Actualizar rol
router.put(
  '/update',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    body('rol_nombre')
      .optional()
      .isLength({ max: 100 })
      .withMessage('El nombre no puede superar los 100 caracteres'),

    body('rol_descripcion')
      .optional()
      .isString()
      .withMessage('La descripción debe ser texto'),

    body('rol_estado')
      .optional()
      .isBoolean()
      .withMessage('El estado debe ser true o false'),
  ],
  updateRole
);

// Eliminar rol
router.delete(
  '/delete',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  deleteRole
);

export default router;