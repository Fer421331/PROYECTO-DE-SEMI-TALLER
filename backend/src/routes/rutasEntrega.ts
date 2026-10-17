import { Router } from 'express';
import { query } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';

import {
  obtenerRutasEntrega,
  obtenerRutasEntregaPorId,
  crearRutasEntrega,
  actualizarRutasEntrega,
  eliminarRutasEntrega,
} from '../controllers/rutasentrega/controladorRutasEntrega.js';

const router: Router = Router();

router.use(verificarToken);

// Obtener todas las rutas
router.get('/all', obtenerRutasEntrega);

// Obtener ruta por ID
router.get(
  '/one',
  [
    query('id_ruta')
      .notEmpty()
      .withMessage('El ID de la ruta es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID de la ruta debe ser un número entero positivo'),
  ],
  obtenerRutasEntregaPorId
);

// Crear ruta
router.post('/', crearRutasEntrega);

// Actualizar ruta
router.put(
  '/',
  [
    query('id_ruta')
      .notEmpty()
      .withMessage('El ID de la ruta es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID de la ruta debe ser un número entero positivo'),
  ],
  actualizarRutasEntrega
);

// Eliminar ruta
router.delete(
  '/',
  [
    query('id_ruta')
      .notEmpty()
      .withMessage('El ID de la ruta es obligatorio')
      .isInt({ min: 1 })
      .withMessage('El ID de la ruta debe ser un número entero positivo'),
  ],
  eliminarRutasEntrega
);

export default router;