import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import { setupSwagger } from './config/swagger.js';
import path from 'node:path';
import googleRoutes from './routes/google.routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use('/api', router);
app.use('/uploads', express.static(path.resolve(process.cwd(), 'public', 'uploads')));
app.use('/auth/google', googleRoutes);
setupSwagger(app);

export default app;