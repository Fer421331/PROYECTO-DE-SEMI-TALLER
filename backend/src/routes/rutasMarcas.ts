import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerMarcas,
  obtenerMarcaPorId,
  crearMarca,
  actualizarMarca,
  eliminarMarca,
} from '../controllers/marcas/controladorMarcas.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerMarcas);
router.get('/one', obtenerMarcaPorId);
router.post('/create', crearMarca);
router.put('/update', actualizarMarca);
router.delete('/delete', eliminarMarca);

export default router;