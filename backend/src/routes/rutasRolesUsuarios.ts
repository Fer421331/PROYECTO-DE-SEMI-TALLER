import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerRolesUsuarios,
  obtenerRolesUsuariosPorId,
  crearRolesUsuarios,
  actualizarRolesUsuarios,
  eliminarRolesUsuarios,
} from '../controllers/roleusuario/controladorRolesUsuarios.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerRolesUsuarios);
router.get('/one', obtenerRolesUsuariosPorId);
router.post('/', crearRolesUsuarios);
router.put('/', actualizarRolesUsuarios);
router.delete('/', eliminarRolesUsuarios);

export default router;