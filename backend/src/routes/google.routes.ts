import { Router } from 'express';
import { callbackGoogle, iniciarAutorizacionGoogle } from '../controllers/googleAuth/google.controller.js';


const router: Router = Router();

// autoreizacion de google
router.get('/',iniciarAutorizacionGoogle);

// respuesta de google
router.get('/callback',callbackGoogle);

export default router;
