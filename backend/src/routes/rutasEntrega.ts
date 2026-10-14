import { Router } from 'express';
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

router.get('/all', obtenerRutasEntrega);
router.get('/one', obtenerRutasEntregaPorId);
router.post('/', crearRutasEntrega);
router.put('/', actualizarRutasEntrega);
router.delete('/', eliminarRutasEntrega);

export default router;