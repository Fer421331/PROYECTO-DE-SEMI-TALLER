import { Router } from 'express';
import {
  obtenerFavoritos,
  obtenerFavoritoPorId,
  crearFavorito,
  actualizarFavorito,
  eliminarFavorito
} from '../controllers/favoritos/controladorFavoritos.js';

const router = Router();

router.get('/all', obtenerFavoritos);
router.get('/one', obtenerFavoritoPorId);
router.post('/create', crearFavorito);
router.put('/update', actualizarFavorito);
router.delete('/delete', eliminarFavorito);

export default router;