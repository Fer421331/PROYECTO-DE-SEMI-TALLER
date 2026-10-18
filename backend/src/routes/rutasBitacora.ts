import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerBitacora,
  obtenerBitacoraPorId,
  crearBitacora,
  actualizarBitacora,
  eliminarBitacora,
} from '../controllers/bitacora/controladorBitacora.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todas las bitácoras
router.get('/all', obtenerBitacora);

// Obtener una bitácora por código
router.get(
  '/one',
  [
    query('bitacoracod')
      .notEmpty()
      .withMessage('El código de la bitácora es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El código debe ser un número entero positivo'),
  ],
  obtenerBitacoraPorId
);

// Crear bitácora
router.post(
  '/create',
  [
    body('bitcorafch')
      .notEmpty()
      .withMessage('La fecha es obligatoria')
      .isISO8601()
      .withMessage('La fecha debe tener un formato válido'),

    body('bitprograma')
      .notEmpty()
      .withMessage('El programa es obligatorio')
      .isString()
      .withMessage('El programa debe ser texto')
      .trim(),

    body('bitdescripcion')
      .notEmpty()
      .withMessage('La descripción es obligatoria')
      .isString()
      .withMessage('La descripción debe ser texto')
      .trim(),

    body('bitobservacion')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('La observación debe ser texto')
      .trim(),

    body('bittipo')
      .notEmpty()
      .withMessage('El tipo de bitácora es obligatorio')
      .isString()
      .withMessage('El tipo debe ser texto')
      .trim(),

    body('bitusuario')
      .notEmpty()
      .withMessage('El usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El usuario debe ser un número entero positivo'),
      
    body('bitobservacion')
      .optional({ values: 'null' })
      .isString()
      .withMessage('La observación debe ser texto')
      .bail()
      .isLength({ max: 255 })
      .withMessage('La observación no puede superar los 255 caracteres'),

    body('bittipo')
      .notEmpty()
      .withMessage('El tipo de bitácora es obligatorio')
      .bail()
      .isString()
      .withMessage('El tipo de bitácora debe ser texto')
      .bail()
      .isLength({ min: 3, max: 3 })
      .withMessage('El tipo de bitácora debe tener exactamente 3 caracteres'),
  ],
  crearBitacora
);

// Actualizar bitácora
router.put(
  '/update',
  [
    query('bitacoracod')
      .notEmpty()
      .withMessage('El código de la bitácora es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El código debe ser un número entero positivo'),

    body('bitcorafch')
      .notEmpty()
      .withMessage('La fecha es obligatoria')
      .isISO8601()
      .withMessage('La fecha debe tener un formato válido'),

    body('bitprograma')
      .notEmpty()
      .withMessage('El programa es obligatorio')
      .isString()
      .withMessage('El programa debe ser texto')
      .trim(),

    body('bitdescripcion')
      .notEmpty()
      .withMessage('La descripción es obligatoria')
      .isString()
      .withMessage('La descripción debe ser texto')
      .trim(),

    body('bitobservacion')
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .withMessage('La observación debe ser texto')
      .trim(),

    body('bittipo')
      .notEmpty()
      .withMessage('El tipo de bitácora es obligatorio')
      .isString()
      .withMessage('El tipo debe ser texto')
      .trim(),

    body('bitusuario')
      .notEmpty()
      .withMessage('El usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El usuario debe ser un número entero positivo'),
  ],
  actualizarBitacora
);

// Eliminar bitácora
router.delete(
  '/delete',
  [
    query('bitacoracod')
      .notEmpty()
      .withMessage('El código de la bitácora es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El código debe ser un número entero positivo'),
  ],
  eliminarBitacora
);

export default router;