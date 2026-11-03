import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerFunciones,
  obtenerFuncionesPorId,
  crearFunciones,
  actualizarFunciones,
  eliminarFunciones,
} from '../controllers/funciones/controladorFunciones.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todas las funciones
router.get('/all', obtenerFunciones);

// Obtener una función por código
router.get(
  '/one',
  [
    query('fncod')
      .notEmpty()
      .withMessage('El código de la función es obligatorio')
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),
  ],
  obtenerFuncionesPorId
);

// Crear función
router.post(
  '/create',
  [
    body('fncod')
      .notEmpty()
      .withMessage('El código de la función es obligatorio')
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),

    body('fndsc')
      .notEmpty()
      .withMessage('La descripción de la función es obligatoria')
      .isString()
      .withMessage('La descripción de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('La descripción de la función debe tener entre 1 y 255 caracteres'),

    body('fnest')
      .notEmpty()
      .withMessage('El estado de la función es obligatorio')
      .isString()
      .withMessage('El estado de la función debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El estado de la función debe tener exactamente 3 caracteres'),

    body('fntyp')
      .notEmpty()
      .withMessage('El tipo de función es obligatorio')
      .isString()
      .withMessage('El tipo de función debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El tipo de función debe tener exactamente 3 caracteres'),
  ],
  crearFunciones
);

// Actualizar función
router.put(
  '/update',
  [
    query('fncod')
      .notEmpty()
      .withMessage('El código de la función es obligatorio')
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),

    body('fndsc')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('La descripción de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('La descripción de la función debe tener entre 1 y 255 caracteres'),

    body('fnest')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('El estado de la función debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El estado de la función debe tener exactamente 3 caracteres'),

    body('fntyp')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('El tipo de función debe ser texto')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('El tipo de función debe tener exactamente 3 caracteres'),
  ],
  actualizarFunciones
);

// Eliminar función
router.delete(
  '/delete',
  [
    query('fncod')
      .notEmpty()
      .withMessage('El código de la función es obligatorio')
      .isString()
      .withMessage('El código de la función debe ser texto')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('El código de la función debe tener entre 1 y 255 caracteres'),
  ],
  eliminarFunciones
);

export default router;
