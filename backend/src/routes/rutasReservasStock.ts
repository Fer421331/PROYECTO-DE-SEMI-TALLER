import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerReservasStock,
  obtenerReservasStockPorId,
  crearReservasStock,
  actualizarReservasStock,
  eliminarReservasStock,
} from '../controllers/reservasstock/controladorReservasStock.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerReservasStock);
router.get('/one', obtenerReservasStockPorId);
router.post('/', crearReservasStock);
router.put('/', actualizarReservasStock);
router.delete('/', eliminarReservasStock);

export default router;