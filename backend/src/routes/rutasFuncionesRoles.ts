import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerFuncionesRoles,
  obtenerFuncionesRolesPorId,
  crearFuncionesRoles,
  actualizarFuncionesRoles,
  eliminarFuncionesRoles,
} from '../controllers/funcionesroles/controladorFuncionesRoles.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerFuncionesRoles);
router.get('/one', obtenerFuncionesRolesPorId);
router.post('/', crearFuncionesRoles);
router.put('/', actualizarFuncionesRoles);
router.delete('/', eliminarFuncionesRoles);

export default router;
