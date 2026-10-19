import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerRolesUsuarios,
  obtenerRolesUsuariosPorId,
  crearRolesUsuarios,
  actualizarRolesUsuarios,
  eliminarRolesUsuarios,
} from '../controllers/roleusuario/controladorRolesUsuarios.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todos los roles de usuarios
router.get('/all', obtenerRolesUsuarios);

// Obtener un rol de usuario por sus códigos
router.get(
  '/one',
  [
    query('usercod')
      .notEmpty()
      .withMessage('El código del usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El código del usuario debe ser un número entero positivo'),

    query('rolescod')
      .notEmpty()
      .withMessage('El código del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),
  ],
  obtenerRolesUsuariosPorId
);

// Crear rol de usuario
router.post(
  '/create',
  [
    body('usercod')
      .notEmpty()
      .withMessage('El código del usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El código del usuario debe ser un número entero positivo'),

    body('rolescod')
      .notEmpty()
      .withMessage('El código del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),

    body('roleuserest')
      .notEmpty()
      .withMessage('El estado del rol de usuario es obligatorio')
      .isString()
      .withMessage('El estado del rol de usuario debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El estado del rol de usuario debe tener exactamente 3 caracteres'),

    body('roleuserfch')
      .notEmpty()
      .withMessage('La fecha de asignación del rol es obligatoria')
      .isISO8601()
      .withMessage('La fecha de asignación debe tener un formato válido'),

    body('roleuserexp')
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage('La fecha de expiración debe tener un formato válido'),
  ],
  crearRolesUsuarios
);

// Actualizar rol de usuario
router.put(
  '/update',
  [
    query('usercod')
      .notEmpty()
      .withMessage('El código del usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El código del usuario debe ser un número entero positivo'),

    query('rolescod')
      .notEmpty()
      .withMessage('El código del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),

    body('roleuserest')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('El estado del rol de usuario debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El estado del rol de usuario debe tener exactamente 3 caracteres'),

    body('roleuserfch')
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage('La fecha de asignación debe tener un formato válido'),

    body('roleuserexp')
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage('La fecha de expiración debe tener un formato válido'),
  ],
  actualizarRolesUsuarios
);

// Eliminar rol de usuario
router.delete(
  '/delete',
  [
    query('usercod')
      .notEmpty()
      .withMessage('El código del usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El código del usuario debe ser un número entero positivo'),

    query('rolescod')
      .notEmpty()
      .withMessage('El código del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),
  ],
  eliminarRolesUsuarios
);

export default router;
