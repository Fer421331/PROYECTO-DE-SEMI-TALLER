import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerFunciones,
  obtenerFuncionesPorId,
  crearFunciones,
  actualizarFunciones,
  eliminarFunciones,
} from '../controllers/funciones/controladorFunciones.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerFunciones);
router.get('/one', obtenerFuncionesPorId);
router.post('/', crearFunciones);
router.put('/', actualizarFunciones);
router.delete('/', eliminarFunciones);

export default router;