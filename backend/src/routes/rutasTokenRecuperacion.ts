import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerTokenRecuperacion,
  obtenerTokenRecuperacionPorId,
  crearTokenRecuperacion,
  actualizarTokenRecuperacion,
  eliminarTokenRecuperacion,
} from '../controllers/tokenrecuperacion/controladorTokenRecuperacion.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todos los tokens
router.get('/all', obtenerTokenRecuperacion);

// Obtener token por ID
router.get(
  '/one',
  [
    query('token_id')
      .exists()
      .withMessage('El ID del token es obligatorio')
      .bail()
      .isString()
      .withMessage('El ID del token debe enviarse una sola vez')
      .bail()
      .isInt({ min: 1, max: 2147483647 })
      .withMessage('El ID del token debe ser un entero positivo'),
  ],
  obtenerTokenRecuperacionPorId
);

// Crear token
router.post(
  '/',
  [
    body('usercod')
      .notEmpty()
      .withMessage('El usuario es obligatorio')
      .bail()
      .isInt({ min: 1, max: 2147483647 })
      .withMessage('El usuario debe ser un entero positivo'),

    body('token_hash')
      .isString()
      .withMessage('El hash del token debe ser texto')
      .bail()
      .trim()
      .notEmpty()
      .withMessage('El hash del token es obligatorio')
      .bail()
      .isHexadecimal()
      .withMessage('El hash del token debe ser hexadecimal')
      .bail()
      .isLength({ min: 64, max: 64 })
      .withMessage('El hash del token debe tener 64 caracteres (SHA-256)'),

    body('token_expiration')
      .notEmpty()
      .withMessage('La fecha de expiración es obligatoria')
      .bail()
      .isISO8601({ strict: true })
      .withMessage('La fecha de expiración no es válida')
      .bail()
      .custom((valor) => {
        if (new Date(valor) <= new Date()) {
          throw new Error('La fecha de expiración debe ser futura');
        }
        return true;
      }),

    body('token_usado')
      .optional()
      .isBoolean({ strict: true })
      .withMessage('token_usado debe ser true o false'),

    body('token_fecha_creacion')
      .optional()
      .isISO8601({ strict: true })
      .withMessage('La fecha de creación no es válida'),

    body().custom((_, { req }) => {
      const camposPermitidos = [
        'usercod',
        'token_hash',
        'token_expiration',
        'token_usado',
        'token_fecha_creacion',
      ];
      const desconocidos = Object.keys(req.body ?? {}).filter(
        (campo) => !camposPermitidos.includes(campo)
      );
      if (desconocidos.length > 0) {
        throw new Error(`Campos no permitidos: ${desconocidos.join(', ')}`);
      }
      return true;
    }),
  ],
  crearTokenRecuperacion
);

// Actualizar token
router.put(
  '/',
  [
    query('token_id')
      .exists()
      .withMessage('El ID del token es obligatorio')
      .bail()
      .isString()
      .withMessage('El ID del token debe enviarse una sola vez')
      .bail()
      .isInt({ min: 1, max: 2147483647 })
      .withMessage('El ID del token debe ser un entero positivo'),

    body('token_usado')
      .optional()
      .isBoolean({ strict: true })
      .withMessage('token_usado debe ser true o false'),

    body('token_expiration')
      .optional()
      .isISO8601({ strict: true })
      .withMessage('La fecha de expiración no es válida'),

    body().custom((_, { req }) => {
      const camposPermitidos = ['token_usado', 'token_expiration'];
      const enviado = Object.keys(req.body ?? {});

      if (enviado.length === 0) {
        throw new Error('Debes enviar al menos un campo para actualizar');
      }

      const desconocidos = enviado.filter(
        (campo) => !camposPermitidos.includes(campo)
      );
      if (desconocidos.length > 0) {
        throw new Error(`Campos no permitidos: ${desconocidos.join(', ')}`);
      }
      return true;
    }),
  ],
  actualizarTokenRecuperacion
);

// Eliminar token
router.delete(
  '/',
  [
    query('token_id')
      .exists()
      .withMessage('El ID del token es obligatorio')
      .bail()
      .isString()
      .withMessage('El ID del token debe enviarse una sola vez')
      .bail()
      .isInt({ min: 1, max: 2147483647 })
      .withMessage('El ID del token debe ser un entero positivo'),
  ],
  eliminarTokenRecuperacion
);

export default router;