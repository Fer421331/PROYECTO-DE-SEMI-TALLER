import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerProductoImagenes,
  obtenerProductoImagenePorId,
  crearProductoImagene,
  actualizarProductoImagene,
  eliminarProductoImagene,
} from '../controllers/productoimagen/controladorProductoImagenes.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerProductoImagenes);
router.get('/one', obtenerProductoImagenePorId);
router.post('/', crearProductoImagene);
router.put('/', actualizarProductoImagene);
router.delete('/', eliminarProductoImagene);

export default router;
