import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/usuarios/controladorUsuarios.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerUsuarios);
router.get('/one', obtenerUsuarioPorId);
router.post('/create', crearUsuario);
router.put('/update', actualizarUsuario);
router.delete('/delete', eliminarUsuario);

export default router;