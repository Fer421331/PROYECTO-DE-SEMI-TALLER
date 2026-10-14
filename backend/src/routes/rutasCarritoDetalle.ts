import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerCarritoDetalle,
  obtenerCarritoDetallePorId,
  crearCarritoDetalle,
  actualizarCarritoDetalle,
  eliminarCarritoDetalle,
} from '../controllers/carritodetalle/controladorCarritoDetalle.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerCarritoDetalle);
router.get('/one', obtenerCarritoDetallePorId);
router.post('/', crearCarritoDetalle);
router.put('/', actualizarCarritoDetalle);
router.delete('/', eliminarCarritoDetalle);

export default router;