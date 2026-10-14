import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
} from '../controllers/venta/controladorVentas.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerVentas);
router.get('/one', obtenerVentaPorId);
router.post('/', crearVenta);
router.put('/', actualizarVenta);
router.delete('/', eliminarVenta);

export default router;