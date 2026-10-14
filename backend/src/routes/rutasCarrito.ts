import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerCarrito,
  obtenerCarritoPorId,
  crearCarrito,
  actualizarCarrito,
  eliminarCarrito,
} from '../controllers/carrito/controladorCarrito.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerCarrito);
router.get('/one', obtenerCarritoPorId);
router.post('/', crearCarrito);
router.put('/', actualizarCarrito);
router.delete('/', eliminarCarrito);

export default router;