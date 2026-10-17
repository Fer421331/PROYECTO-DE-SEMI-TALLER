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
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  obtenerBitacoraPorId
);

// Crear bitácora
router.post(
  '/',
  [
    // Agregar aquí las validaciones reales según el controlador
  ],
  crearBitacora
);

// Actualizar bitácora
router.put(
  '/',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),

    // Agregar aquí las validaciones reales según el controlador
  ],
  actualizarBitacora
);

// Eliminar bitácora
router.delete(
  '/',
  [
    query('id')
      .notEmpty()
      .withMessage('El ID es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID debe ser un número entero positivo'),
  ],
  eliminarBitacora
);

export default router;