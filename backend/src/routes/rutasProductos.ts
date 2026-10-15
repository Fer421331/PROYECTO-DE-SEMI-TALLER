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
router.post('/create', crearProducto);
router.put('/update', actualizarProducto);
router.delete('/delete', eliminarProducto);

export default router;