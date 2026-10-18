import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerTokenRecuperacion,
  obtenerTokenRecuperacionPorId,
  crearTokenRecuperacion,
  actualizarTokenRecuperacion,
  eliminarTokenRecuperacion,
} from '../controllers/tokenrecuperacion/controladorTokenRecuperacion.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerTokenRecuperacion);
router.get('/one', obtenerTokenRecuperacionPorId);
router.post('/create', crearTokenRecuperacion);
router.put('/update', actualizarTokenRecuperacion);
router.delete('/delete', eliminarTokenRecuperacion);

export default router;