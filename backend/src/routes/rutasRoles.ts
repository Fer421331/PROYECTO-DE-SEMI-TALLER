import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/roles/controladorRoles.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todos los roles
router.get('/all', getAllRoles);

// Obtener un rol por código
router.get(
  '/one',
  [
    query('rolescod')
      .notEmpty()
      .withMessage('El código del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),
  ],
  getRoleById
);

// Crear rol
router.post(
  '/create',
  [
    body('rolescod')
      .notEmpty()
      .withMessage('El código del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),

    body('rolesdsc')
      .notEmpty()
      .withMessage('La descripción del rol es obligatoria')
      .isString()
      .withMessage('La descripción del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('La descripción del rol debe tener entre 1 y 255 caracteres'),

    body('rolesest')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('El estado del rol debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El estado del rol debe tener exactamente 3 caracteres'),
  ],
  createRole
);

// Actualizar rol
router.put(
  '/update',
  [
    query('rolescod')
      .notEmpty()
      .withMessage('El código del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),

    body('rolesdsc')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('La descripción del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('La descripción del rol debe tener entre 1 y 255 caracteres'),

    body('rolesest')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('El estado del rol debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El estado del rol debe tener exactamente 3 caracteres'),
  ],
  updateRole
);

// Eliminar rol
router.delete(
  '/delete',
  [
    query('rolescod')
      .notEmpty()
      .withMessage('El código del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),
  ],
  deleteRole
);

export default router;
