import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerFuncionesRoles,
  obtenerFuncionesRolesPorId,
  crearFuncionesRoles,
  actualizarFuncionesRoles,
  eliminarFuncionesRoles,
} from '../controllers/funcionesroles/controladorFuncionesRoles.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todas las funciones de roles
router.get('/all', obtenerFuncionesRoles);

// Obtener una función de rol por sus códigos
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

    query('fncod')
      .notEmpty()
      .withMessage('El código de la función es obligatorio')
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),
  ],
  obtenerFuncionesRolesPorId
);

// Crear una función de rol
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

    body('fncod')
      .notEmpty()
      .withMessage('El código de la función es obligatorio')
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),

    body('fnrolest')
      .notEmpty()
      .withMessage('El estado de la función de rol es obligatorio')
      .isString()
      .withMessage('El estado de la función de rol debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El estado de la función de rol debe tener exactamente 3 caracteres'),

    body('fnexp')
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage('La fecha de expiración debe tener un formato válido'),
  ],
  crearFuncionesRoles
);

// Actualizar una función de rol
router.put(
  '/update',
  [
    query('rolescod')
      .notEmpty()
      .withMessage('El código actual del rol es obligatorio')
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),

    query('fncod')
      .notEmpty()
      .withMessage('El código actual de la función es obligatorio')
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),

    body('rolescod')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('El código del rol debe ser texto')
      .trim()
      .isLength({ min: 1, max: 3 })
      .withMessage('El código del rol debe tener entre 1 y 3 caracteres'),

    body('fncod')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),

    body('fnrolest')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('El estado de la función de rol debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El estado de la función de rol debe tener exactamente 3 caracteres'),

    body('fnexp')
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage('La fecha de expiración debe tener un formato válido'),
  ],
  actualizarFuncionesRoles
);

// Eliminar una función de rol
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

    query('fncod')
      .notEmpty()
      .withMessage('El código de la función es obligatorio')
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),
  ],
  eliminarFuncionesRoles
);

export default router;
