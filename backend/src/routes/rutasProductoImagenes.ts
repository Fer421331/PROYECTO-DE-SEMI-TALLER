import { Router } from 'express';
import { body, query } from 'express-validator';

import { verificarToken } from '../config/auth.middleware.js';
import { subirArchivo } from '../config/multer.middleware.js';

import {
  subirCrearProductoImagen,
  obtenerProductoImagenes,
  obtenerProductoImagenePorId,
  eliminarProductoImagene,
} from '../controllers/productoimagen/controladorProductoImagenes.js';

const router: Router = Router();

router.use(verificarToken);

//Subida de imagen
router.post(
  '/upload',
  subirArchivo.single('imagen'),
  [
    body('producto_id')
      .notEmpty()
      .withMessage('El producto es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El producto debe ser un entero positivo'),

    body('imagen_principal')
      .notEmpty()
      .withMessage('El campo principal es obligatorio')
      .bail()
      .isBoolean()
      .withMessage('Debe ser true o false'),

    body('imagen_orden')
      .notEmpty()
      .withMessage('El orden es obligatorio')
      .bail()
      .isInt({ min: 0, max: 32767 })
      .withMessage('El orden debe estar entre 0 y 32767'),

    body('imagen_estado')
      .notEmpty()
      .withMessage('El estado es obligatorio')
      .bail()
      .isIn(['ACT', 'INA'])
      .withMessage('El estado debe ser ACT o INA'),
  ],

  subirCrearProductoImagen
);

router.get(
  '/all',
  obtenerProductoImagenes
);

router.get(
  '/one',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El ID debe ser positivo'),
  ],
  obtenerProductoImagenePorId
);


router.delete(
  '/delete',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .bail()
      .isInt({ min: 1 })
      .withMessage('El ID debe ser positivo'),
  ],
  eliminarProductoImagene
);

export default router;
