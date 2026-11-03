import { Router } from 'express';
import { body } from 'express-validator';
import { verificarToken } from '../config/auth.middleware.js';
import { enviarCorreoPrueba } from '../controllers/correo/correo.controller.js';

const router: Router = Router();
router.use(verificarToken);

router.post(
  '/prueba',
  [
    body('destinatario').isEmail().withMessage('El destinatario debe ser un correo válido'),
    body('asunto').isString().trim().notEmpty().withMessage('El asunto es obligatorio'),
    body('mensaje').isString().trim().notEmpty().withMessage('El mensaje es obligatorio'),
  ],
  enviarCorreoPrueba
);

export default router;
