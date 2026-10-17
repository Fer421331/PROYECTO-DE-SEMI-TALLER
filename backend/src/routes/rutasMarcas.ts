
import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerMarcas,
  obtenerMarcaPorId,
  crearMarca,
  actualizarMarca,
  eliminarMarca,
} from '../controllers/marcas/controladorMarcas.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todas las marcas
router.get('/all', obtenerMarcas);

// Obtener una marca por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerMarcaPorId
);

// Crear una marca
router.post(
  '/create',
  [
    body('marca_nombre')
      .trim()
      .notEmpty()
      .withMessage('El nombre de la marca es obligatorio')
      .isLength({ max: 100 })
      .withMessage('El nombre no puede superar los 100 caracteres'),

    body('marca_descripcion')
      .optional({ nullable: true })
      .isString()
      .withMessage('La descripción debe ser texto')
      .trim(),

    body('marca_estado')
      .trim()
      .notEmpty()
      .withMessage('El estado es obligatorio')
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),
  ],
  crearMarca
);

// Actualizar una marca
router.put(
  '/update',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    body('marca_nombre')
      .optional()
      .notEmpty()
      .withMessage('El nombre no puede estar vacío')
      .isLength({ max: 100 })
      .withMessage('El nombre no puede superar los 100 caracteres'),

    body('marca_descripcion')
      .optional()
      .isString()
      .withMessage('La descripción debe ser texto'),

    body('marca_estado')
      .optional()
      .notEmpty()
      .withMessage('El estado no puede estar vacío')
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),
  ],
  actualizarMarca
);

// Eliminar una marca
router.delete(
  '/delete',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarMarca
);

export default router;
