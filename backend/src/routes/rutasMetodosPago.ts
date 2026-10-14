import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerMetodosPago,
  obtenerMetodosPagoPorId,
  crearMetodosPago,
  actualizarMetodosPago,
  eliminarMetodosPago,
} from '../controllers/metodospago/controladorMetodosPago.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerMetodosPago);
router.get('/one', obtenerMetodosPagoPorId);
router.post('/', crearMetodosPago);
router.put('/', actualizarMetodosPago);
router.delete('/', eliminarMetodosPago);

export default router;