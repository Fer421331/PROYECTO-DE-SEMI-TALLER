import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/producto/controladorProductos.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerProductos);
router.get('/one', obtenerProductoPorId);
router.post('/', crearProducto);
router.put('/', actualizarProducto);
router.delete('/', eliminarProducto);

export default router;