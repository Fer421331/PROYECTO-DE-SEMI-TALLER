
import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../controllers/categorias/controladorCategorias.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todas las categorías
router.get('/all', obtenerCategorias);

// Obtener categoría por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerCategoriaPorId
);

// Crear categoría
router.post(
  '/create',
  [
    body('categoria_nombre')
      .notEmpty()
      .withMessage('El nombre de la categoría es obligatorio')
      .isLength({ max: 100 })
      .withMessage('El nombre no puede superar los 100 caracteres'),

    body('categoria_descripcion')
      .notEmpty()
      .withMessage('La descripcion de la categoría es obligatoria')
      .isLength({ max: 50 })
      .withMessage('La descripción debe ser texto'),

    body('categoria_estado')
      .notEmpty()
      .withMessage('El estado es obligatorio')
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),
  ],
  crearCategoria
);

// Actualizar categoría
router.put(
  '/update',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    body('categoria_nombre')
      .optional()
      .notEmpty()
      .withMessage('El nombre no puede estar vacío')
      .isLength({ max: 100 })
      .withMessage('El nombre no puede superar los 100 caracteres'),

    body('categoria_descripcion')
      .optional()
      .isString()
      .withMessage('La descripción debe ser texto'),

    body('categoria_estado')
      .optional()
      .notEmpty()
      .withMessage('El estado no puede estar vacío')
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),
  ],
  actualizarCategoria
);

// Eliminar categoría
router.delete(
  '/delete',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarCategoria
);

export default router;
