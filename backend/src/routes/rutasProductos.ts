
import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/producto/controladorProductos.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todos los productos
router.get('/all', obtenerProductos);

// Obtener producto por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerProductoPorId
);

// Crear producto
router.post(
  '/create',
  [
    body('categoria_id')
      .notEmpty()
      .withMessage('La categoría es obligatoria')
      .isInt({ min: 1 })
      .withMessage('La categoría debe ser un entero positivo'),

    body('marca_id')
      .notEmpty()
      .withMessage('La marca es obligatoria')
      .isInt({ min: 1 })
      .withMessage('La marca debe ser un entero positivo'),

    body('producto_sku')
      .trim()
      .notEmpty()
      .withMessage('El SKU del producto es obligatorio')
      .isLength({ max: 40 })
      .withMessage('El SKU no puede superar los 40 caracteres'),

    body('producto_nombre')
      .trim()
      .notEmpty()
      .withMessage('El nombre del producto es obligatorio')
      .isLength({ max: 150 })
      .withMessage('El nombre no puede superar los 150 caracteres'),

    body('producto_slug')
      .trim()
      .notEmpty()
      .withMessage('El slug del producto es obligatorio')
      .isLength({ max: 180 })
      .withMessage('El slug no puede superar los 180 caracteres')
      .isSlug()
      .withMessage('El slug debe tener un formato válido'),

    body('producto_descripcion')
      .optional({ nullable: true })
      .isString()
      .withMessage('La descripción debe ser texto'),

    body('producto_costo')
      .notEmpty()
      .withMessage('El costo del producto es obligatorio')
      .isFloat({ min: 0 })
      .withMessage('El costo debe ser un número mayor o igual a cero'),

    body('producto_precio')
      .notEmpty()
      .withMessage('El precio del producto es obligatorio')
      .isFloat({ min: 0 })
      .withMessage('El precio debe ser un número mayor o igual a cero'),

    body('producto_stock')
      .notEmpty()
      .withMessage('El stock del producto es obligatorio')
      .isInt({ min: 0 })
      .withMessage('El stock debe ser un entero mayor o igual a cero'),

    body('producto_activo')
      .notEmpty()
      .withMessage('El campo activo es obligatorio')
      .isIn(['ACT', 'INA', 'ACT ', 'INA '])
      .withMessage('El campo activo debe ser ACT o INA'),

    body('producto_estado')
      .notEmpty()
      .withMessage('El estado del producto es obligatorio')
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),
  ],
  crearProducto
);

// Actualizar producto
router.put(
  '/update',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    body('categoria_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('La categoría debe ser un entero positivo'),

    body('marca_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('La marca debe ser un entero positivo'),

    body('producto_sku')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('El SKU no puede estar vacío')
      .isLength({ max: 40 })
      .withMessage('El SKU no puede superar los 40 caracteres'),

    body('producto_nombre')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('El nombre no puede estar vacío')
      .isLength({ max: 150 })
      .withMessage('El nombre no puede superar los 150 caracteres'),

    body('producto_slug')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('El slug no puede estar vacío')
      .isLength({ max: 180 })
      .withMessage('El slug no puede superar los 180 caracteres')
      .isSlug()
      .withMessage('El slug debe tener un formato válido'),

    body('producto_descripcion')
      .optional({ nullable: true })
      .isString()
      .withMessage('La descripción debe ser texto'),

    body('producto_costo')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('El costo debe ser un número mayor o igual a cero'),

    body('producto_precio')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('El precio debe ser un número mayor o igual a cero'),

    body('producto_stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('El stock debe ser un entero mayor o igual a cero'),

    body('producto_activo')
      .optional()
      .isIn(['SÍ', 'NO', 'SÍ ', 'NO '])
      .withMessage('El campo activo debe ser SÍ o NO'),

    body('producto_estado')
      .optional()
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),

    body().custom((_, { req }) => {
      const camposPermitidos = [
        'categoria_id',
        'marca_id',
        'producto_sku',
        'producto_nombre',
        'producto_slug',
        'producto_descripcion',
        'producto_costo',
        'producto_precio',
        'producto_stock',
        'producto_activo',
        'producto_estado',
      ];

      const enviado = Object.keys(req.body ?? {});

      if (enviado.length === 0) {
        throw new Error('Debes enviar al menos un campo para actualizar');
      }

      const desconocidos = enviado.filter(
        (campo) => !camposPermitidos.includes(campo)
      );

      if (desconocidos.length > 0) {
        throw new Error(
          `Campos no permitidos: ${desconocidos.join(', ')}`
        );
      }

      return true;
    }),
  ],
  actualizarProducto
);

// Eliminar producto
router.delete(
  '/delete',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarProducto
);

export default router;
