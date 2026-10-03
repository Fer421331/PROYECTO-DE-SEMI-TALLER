import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({ mensaje: 'API de Lácteos Axúme funcionando correctamente' });
});

const PORT = Number(process.env.PORT) || 3000;

async function iniciarServidor(): Promise<void> {
  try {
    await sequelize.authenticate();

    console.log('Conexión con MySQL establecida correctamente.');
    console.log('Base de datos: lacteos_axume');

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con MySQL:');
    console.error(error instanceof Error ? error.message : error);
  }
}

void iniciarServidor();
