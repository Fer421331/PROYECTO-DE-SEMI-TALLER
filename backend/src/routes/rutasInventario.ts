import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerInventario,
  obtenerInventarioPorId,
  crearInventario,
  actualizarInventario,
  eliminarInventario,
} from '../controllers/inventario/controladorInventario.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerInventario);
router.get('/one', obtenerInventarioPorId);
router.post('/', crearInventario);
router.put('/', actualizarInventario);
router.delete('/', eliminarInventario);

export default router;