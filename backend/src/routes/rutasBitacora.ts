import { Router } from 'express';
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

router.get('/all', obtenerBitacora);
router.get('/one', obtenerBitacoraPorId);
router.post('/', crearBitacora);
router.put('/', actualizarBitacora);
router.delete('/', eliminarBitacora);

export default router;
