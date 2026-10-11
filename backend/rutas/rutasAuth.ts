import { Router } from 'express';
import { login } from '../controladores/controladorAuth';

const router = Router();

router.post('/login', login);

export default router;
