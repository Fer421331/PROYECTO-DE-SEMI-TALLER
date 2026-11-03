import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/usuarios/controladorUsuarios.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todos los usuarios
router.get('/all', obtenerUsuarios);

// Obtener usuario por código
router.get(
  '/one',
  [
    query('usercod')
      .notEmpty()
      .withMessage('El código de usuario es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El código de usuario debe ser un entero positivo'),
  ],
  obtenerUsuarioPorId
);

// Crear usuario
router.post(
  '/create',
  [
    body('useremail')
      .trim()
      .notEmpty()
      .withMessage('El correo es obligatorio')
      .bail()
      .isEmail()
      .withMessage('El correo no tiene un formato válido')
      .bail()
      .isLength({ max: 80 })
      .withMessage('El correo no puede superar los 80 caracteres'),

    body('username')
      .trim()
      .notEmpty()
      .withMessage('El nombre es obligatorio')
      .bail()
      .isLength({ min: 3, max: 80 })
      .withMessage('El nombre debe tener entre 3 y 80 caracteres'),

    body('password')
      .isString()
      .withMessage('La contraseña debe ser texto')
      .bail()
      .notEmpty()
      .withMessage('La contraseña es obligatoria')
      .bail()
      .isLength({ min: 8, max: 72 })
      .withMessage('La contraseña debe tener entre 8 y 72 caracteres')
      .bail()
      .matches(/[A-Za-z]/)
      .withMessage('La contraseña debe incluir al menos una letra')
      .bail()
      .matches(/\d/)
      .withMessage('La contraseña debe incluir al menos un número'),

    body('userpswdest')
      .optional()
      .isIn(['ACT', 'INA'])
      .withMessage('El estado de la contraseña debe ser ACT o INA'),

    body('userpswdexp')
      .optional({ nullable: true })
      .isISO8601({ strict: true })
      .withMessage('La fecha de expiración no es válida'),

    body('userest')
      .optional()
      .isIn(['ACT', 'INA'])
      .withMessage('El estado del usuario debe ser ACT o INA'),

    body('usertipo')
      .optional()
      .isIn(['ADM', 'CLI'])
      .withMessage('El tipo de usuario debe ser ADM o CLI'),

    body().custom((_, { req }) => {
      const camposPermitidos = [
        'useremail',
        'username',
        'password',
        'userpswdest',
        'userpswdexp',
        'userest',
        'usertipo',
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
  crearUsuario
);

// Actualizar usuario (la contraseña no se cambia desde aquí)
router.put(
  '/update',
  [
    query('usercod')
      .notEmpty()
      .withMessage('El código de usuario es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El código de usuario debe ser un entero positivo'),

    body('useremail')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('El correo no puede estar vacío')
      .bail()
      .isEmail()
      .withMessage('El correo no tiene un formato válido')
      .bail()
      .isLength({ max: 80 })
      .withMessage('El correo no puede superar los 80 caracteres'),

    body('username')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('El nombre no puede estar vacío')
      .bail()
      .isLength({ min: 3, max: 80 })
      .withMessage('El nombre debe tener entre 3 y 80 caracteres'),

    body('userpswdest')
      .optional()
      .isIn(['ACT', 'INA'])
      .withMessage('El estado de la contraseña debe ser ACT o INA'),

    body('userpswdexp')
      .optional({ nullable: true })
      .isISO8601({ strict: true })
      .withMessage('La fecha de expiración no es válida'),

    body('userest')
      .optional()
      .isIn(['ACT', 'INA'])
      .withMessage('El estado del usuario debe ser ACT o INA'),

    body('usertipo')
      .optional()
      .isIn(['ADM', 'CLI'])
      .withMessage('El tipo de usuario debe ser ADM o CLI'),

    body().custom((_, { req }) => {
      const camposPermitidos = [
        'useremail',
        'username',
        'userpswdest',
        'userpswdexp',
        'userest',
        'usertipo',
      ];

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
  actualizarUsuario
);

// Eliminar usuario
router.delete(
  '/delete',
  [
    query('usercod')
      .notEmpty()
      .withMessage('El código de usuario es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El código de usuario debe ser un entero positivo'),
  ],
  eliminarUsuario
);

export default router;