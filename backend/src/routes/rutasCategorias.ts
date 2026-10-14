import { Router } from 'express';
import { verificarToken } from '../config/auth.middleware.js';
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../controllers/categorias/controladorCategorias.js';

const router: Router = Router();

router.use(verificarToken);

router.get('/all', obtenerCategorias);
router.get('/one', obtenerCategoriaPorId);
router.post('/', crearCategoria);
router.put('/', actualizarCategoria);
router.delete('/', eliminarCategoria);

export default router;
