import { Router } from 'express';
import { body, query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerProductoImagenes,
  obtenerProductoImagenePorId,
  crearProductoImagene,
  actualizarProductoImagene,
  eliminarProductoImagene,
} from '../controllers/productoimagen/controladorProductoImagenes.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todas las imágenes
router.get('/all', obtenerProductoImagenes);

// Obtener imagen por ID
router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerProductoImagenePorId
);

// Crear imagen
router.post(
  '/create',
  [
    body('producto_id')
      .notEmpty()
      .withMessage('El producto es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El producto debe ser un entero positivo'),

    body('imagen_ruta')
      .trim()
      .notEmpty()
      .withMessage('La ruta de la imagen es obligatoria')
      .bail()
      .isLength({ max: 255 })
      .withMessage('La ruta no puede superar los 255 caracteres')
      .bail()
      .not()
      .matches(/\.\.|\\/)
      .withMessage('La ruta de la imagen no es válida')
      .bail()
      .matches(/\.(jpe?g|png|webp|gif|avif)$/i)
      .withMessage('La imagen debe ser jpg, jpeg, png, webp, gif o avif'),

    body('imagen_principal')
      .exists({ values: 'null' })
      .withMessage('El campo principal es obligatorio')
      .bail()
      .isBoolean({ strict: true })
      .withMessage('El campo principal debe ser true o false'),

    body('imagen_orden')
      .exists({ values: 'null' })
      .withMessage('El orden es obligatorio')
      .bail()
      .isInt({ min: 0, max: 32767 })
      .withMessage('El orden debe ser un entero entre 0 y 32767'),

    body('imagen_estado')
      .notEmpty()
      .withMessage('El estado es obligatorio')
      .bail()
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),

    body().custom((_, { req }) => {
      const camposPermitidos = [
        'producto_id',
        'imagen_ruta',
        'imagen_principal',
        'imagen_orden',
        'imagen_estado',
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
  crearProductoImagene
);

// Actualizar imagen
router.put(
  '/update',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    body('producto_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('El producto debe ser un entero positivo'),

    body('imagen_ruta')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('La ruta de la imagen no puede estar vacía')
      .bail()
      .isLength({ max: 255 })
      .withMessage('La ruta no puede superar los 255 caracteres')
      .bail()
      .not()
      .matches(/\.\.|\\/)
      .withMessage('La ruta de la imagen no es válida')
      .bail()
      .matches(/\.(jpe?g|png|webp|gif|avif)$/i)
      .withMessage('La imagen debe ser jpg, jpeg, png, webp, gif o avif'),

    body('imagen_principal')
      .optional()
      .isBoolean({ strict: true })
      .withMessage('El campo principal debe ser true o false'),

    body('imagen_orden')
      .optional()
      .isInt({ min: 0, max: 32767 })
      .withMessage('El orden debe ser un entero entre 0 y 32767'),

    body('imagen_estado')
      .optional()
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),

    body().custom((_, { req }) => {
      const camposPermitidos = [
        'producto_id',
        'imagen_ruta',
        'imagen_principal',
        'imagen_orden',
        'imagen_estado',
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
  actualizarProductoImagene
);

// Eliminar imagen
router.delete(
  '/delete',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarProductoImagene
);

export default router;