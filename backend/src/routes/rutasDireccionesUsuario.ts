
import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerDireccionesUsuario,
  obtenerDireccionesUsuarioPorId,
  crearDireccionesUsuario,
  actualizarDireccionesUsuario,
  eliminarDireccionesUsuario,
} from '../controllers/direccionesusuarios/controladorDireccionesUsuario.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todas las direcciones
router.get('/all', obtenerDireccionesUsuario);

// Obtener una dirección por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerDireccionesUsuarioPorId
);

// Crear dirección
router.post(
  '/create',
  [
    body('usercod')
      .notEmpty()
      .withMessage('El usuario es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El usuario debe ser un número válido'),

    body('direccion_alias')
      .notEmpty()
      .withMessage('El alias es obligatorio')
      .isString()
      .withMessage('El alias debe ser texto'),

    body('direccion_receptor')
      .notEmpty()
      .withMessage('El receptor es obligatorio')
      .isString()
      .withMessage('El receptor debe ser texto'),

    body('direccion_telefono')
      .notEmpty()
      .withMessage('El teléfono es obligatorio')
      .isString()
      .withMessage('El teléfono debe ser texto'),

    body('direccion_departamento')
      .notEmpty()
      .withMessage('El departamento es obligatorio')
      .isString()
      .withMessage('El departamento debe ser texto'),

    body('direccion_ciudad')
      .notEmpty()
      .withMessage('La ciudad es obligatoria')
      .isString()
      .withMessage('La ciudad debe ser texto'),

    body('id_ruta')
      .notEmpty()
      .withMessage('La ruta es obligatoria')
      .isInt({ min: 1 })
      .withMessage('La ruta debe ser un número válido'),

    body('direccion_detalle')
      .notEmpty()
      .withMessage('La dirección detallada es obligatoria')
      .isString()
      .withMessage('La dirección detallada debe ser texto'),

    body('direccion_referencia')
      .optional()
      .isString()
      .withMessage('La referencia debe ser texto'),

    body('direccion_predeterminada')
      .optional()
      .isBoolean()
      .withMessage('La dirección predeterminada debe ser true o false'),

    body('direccion_estado')
    .notEmpty()
    .withMessage('El estado es obligatorio')
    .isIn(['ACT', 'INA'])
    .withMessage('El estado debe ser ACT o INA'),
  ],
  crearDireccionesUsuario
);

// Actualizar dirección
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
      .withMessage('El usuario debe ser un número válido'),

    body('direccion_alias')
      .optional()
      .notEmpty()
      .withMessage('El alias no puede estar vacío')
      .isString()
      .withMessage('El alias debe ser texto'),

    body('direccion_receptor')
      .optional()
      .notEmpty()
      .withMessage('El receptor no puede estar vacío')
      .isString()
      .withMessage('El receptor debe ser texto'),

    body('direccion_telefono')
      .optional()
      .notEmpty()
      .withMessage('El teléfono no puede estar vacío')
      .isString()
      .withMessage('El teléfono debe ser texto'),

    body('direccion_departamento')
      .optional()
      .notEmpty()
      .withMessage('El departamento no puede estar vacío')
      .isString()
      .withMessage('El departamento debe ser texto'),

    body('direccion_ciudad')
      .optional()
      .notEmpty()
      .withMessage('La ciudad no puede estar vacía')
      .isString()
      .withMessage('La ciudad debe ser texto'),

    body('id_ruta')
      .optional()
      .isInt({ min: 1 })
      .withMessage('La ruta debe ser un número válido'),

    body('direccion_detalle')
      .optional()
      .notEmpty()
      .withMessage('La dirección detallada no puede estar vacía')
      .isString()
      .withMessage('La dirección detallada debe ser texto'),

    body('direccion_referencia')
      .optional()
      .isString()
      .withMessage('La referencia debe ser texto'),

    body('direccion_predeterminada')
      .optional()
      .isBoolean()
      .withMessage('La dirección predeterminada debe ser true o false'),

    body('direccion_estado')
    .optional()
    .notEmpty()
    .withMessage('El estado no puede estar vacío')
    .isIn(['ACT', 'INA'])
    .withMessage('El estado debe ser ACT o INA'),
  ],
  actualizarDireccionesUsuario
);

// Eliminar dirección
router.delete(
  '/delete',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarDireccionesUsuario
);

export default router;
