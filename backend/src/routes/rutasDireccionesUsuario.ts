import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerDireccionesUsuario,
  obtenerDireccionesUsuarioPorId,
  crearDireccionesUsuario,
  actualizarDireccionesUsuario,
  eliminarDireccionesUsuario,
} from '../controllers/direccionesusuarios/controladorDireccionesUsuario.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerDireccionesUsuario);
router.get('/one', obtenerDireccionesUsuarioPorId);
router.post('/create', crearDireccionesUsuario);
router.put('/update', actualizarDireccionesUsuario);
router.delete('/delete', eliminarDireccionesUsuario);

export default router;