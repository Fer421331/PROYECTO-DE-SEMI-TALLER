import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerPagos,
  obtenerPagoPorId,
  crearPago,
  actualizarPago,
  eliminarPago,
} from '../controllers/pagos/controladorPagos.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerPagos);
router.get('/one', obtenerPagoPorId);
router.post('/', crearPago);
router.put('/', actualizarPago);
router.delete('/', eliminarPago);

export default router;