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

// Obtener una bitácora por ID
router.get(
  '/one',
  [
    query('bitacoracod')
      .notEmpty()
      .withMessage('El código de la bitácora es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El código de la bitácora debe ser un número entero positivo'),
  ],
  obtenerBitacoraPorId
);

// Crear bitácora
router.post(
  '/create',
  [
    body('bitcorafch')
      .notEmpty()
      .withMessage('La fecha de la bitácora es obligatoria')
      .bail()
      .isISO8601()
      .withMessage('La fecha de la bitácora debe ser válida'),

    body('bitprograma')
      .trim()
      .notEmpty()
      .withMessage('El programa es obligatorio')
      .bail()
      .isLength({ max: 255 })
      .withMessage('El programa no puede superar los 255 caracteres'),

    body('bitdescripcion')
      .trim()
      .notEmpty()
      .withMessage('La descripción es obligatoria')
      .bail()
      .isLength({ max: 255 })
      .withMessage('La descripción no puede superar los 255 caracteres'),

    body('bitobservacion')
      .optional({ values: 'null' })
      .trim()
      .isLength({ max: 255 })
      .withMessage('La observación no puede superar los 255 caracteres'),

    body('bittipo')
      .trim()
      .notEmpty()
      .withMessage('El tipo de bitácora es obligatorio')
      .bail()
      .isLength({ min: 3, max: 3 })
      .withMessage('El tipo de bitácora debe tener exactamente 3 caracteres'),

    body('bitusuario')
      .notEmpty()
      .withMessage('El usuario es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El usuario debe ser un número entero positivo'),
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
      .bail()
      .isInt({ min: 1 })
      .withMessage('El código de la bitácora debe ser un número entero positivo'),

    body('bitcorafch')
      .optional()
      .notEmpty()
      .withMessage('La fecha no puede estar vacía')
      .bail()
      .isISO8601()
      .withMessage('La fecha de la bitácora debe ser válida'),

    body('bitprograma')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('El programa no puede estar vacío')
      .bail()
      .isLength({ max: 255 })
      .withMessage('El programa no puede superar los 255 caracteres'),

    body('bitdescripcion')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('La descripción no puede estar vacía')
      .bail()
      .isLength({ max: 255 })
      .withMessage('La descripción no puede superar los 255 caracteres'),

    body('bitobservacion')
      .optional({ values: 'null' })
      .trim()
      .isLength({ max: 255 })
      .withMessage('La observación no puede superar los 255 caracteres'),

    body('bittipo')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('El tipo de bitácora no puede estar vacío')
      .bail()
      .isLength({ min: 3, max: 3 })
      .withMessage('El tipo de bitácora debe tener exactamente 3 caracteres'),

    body('bitusuario')
      .optional()
      .notEmpty()
      .withMessage('El usuario no puede estar vacío')
      .bail()
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
      .bail()
      .isInt({ min: 1 })
      .withMessage('El código de la bitácora debe ser un número entero positivo'),
  ],
  eliminarBitacora
);

export default router;
