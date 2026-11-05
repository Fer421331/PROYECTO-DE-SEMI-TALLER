import { Router } from 'express';
import { body, query } from 'express-validator';
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

const MAX_INT = 2147483647;
const MAX_CANTIDAD = 10000;

const validarId = query('id')
  .notEmpty()
  .withMessage('El ID es obligatorio')
  .isInt({ min: 1, max: MAX_INT })
  .withMessage('El ID debe ser un número entero positivo');

const soloCampos = (permitidos: string[]) =>
  body().custom((_, { req }) => {
    const desconocidos = Object.keys(req.body ?? {}).filter((c) => !permitidos.includes(c));
    if (desconocidos.length > 0) {
      throw new Error(`Campos no permitidos: ${desconocidos.join(', ')}`);
    }
    return true;
  });

const validarCantidad = body('cantidad')
  .notEmpty()
  .withMessage('La cantidad es obligatoria')
  .bail()
  .isInt({ min: 1, max: MAX_CANTIDAD })
  .withMessage(`La cantidad debe ser un entero entre 1 y ${MAX_CANTIDAD}`);

// Obtener todos los detalles
router.get('/all', obtenerCarritoDetalle);

// Obtener detalle por ID
router.get('/one', [validarId], obtenerCarritoDetallePorId);

// Crear detalle (precio y subtotal los calcula el servidor)
router.post(
  '/',
  [
    body('carrito_id')
      .notEmpty()
      .withMessage('El carrito es obligatorio')
      .bail()
      .isInt({ min: 1, max: MAX_INT })
      .withMessage('El carrito debe ser un entero positivo válido'),

    body('producto_id')
      .notEmpty()
      .withMessage('El producto es obligatorio')
      .bail()
      .isInt({ min: 1, max: MAX_INT })
      .withMessage('El producto debe ser un entero positivo válido'),

    validarCantidad,
    soloCampos(['carrito_id', 'producto_id', 'cantidad']),
  ],
  crearCarritoDetalle
);

// Actualizar cantidad
router.put(
  '/',
  [validarId, validarCantidad, soloCampos(['cantidad'])],
  actualizarCarritoDetalle
);

// Eliminar detalle
router.delete('/', [validarId], eliminarCarritoDetalle);

export default router;