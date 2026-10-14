import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerVentaDetalle,
  obtenerVentaDetallePorId,
  crearVentaDetalle,
  actualizarVentaDetalle,
  eliminarVentaDetalle,
} from '../controllers/ventadetalle/controladorVentaDetalle.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerVentaDetalle);
router.get('/one', obtenerVentaDetallePorId);
router.post('/', crearVentaDetalle);
router.put('/', actualizarVentaDetalle);
router.delete('/', eliminarVentaDetalle);

export default router;