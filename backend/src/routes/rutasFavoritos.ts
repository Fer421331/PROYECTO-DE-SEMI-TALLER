import { Router } from 'express';
import { obtenerFavoritos, obtenerFavoritoPorId, crearFavorito, actualizarFavorito, eliminarFavorito } from '../controladores/controladorFavoritos';
const router = Router();
router.get('/', obtenerFavoritos);
router.get('/:id', obtenerFavoritoPorId);
router.post('/', crearFavorito);
router.put('/:id', actualizarFavorito);
router.delete('/:id', eliminarFavorito);
export default router;
