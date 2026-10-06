import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './rutas/rutasAuth';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    mensaje: 'API de Lácteos Axúme funcionando correctamente'
  });
});

export default app;