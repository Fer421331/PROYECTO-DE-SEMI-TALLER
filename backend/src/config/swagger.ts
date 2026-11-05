import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Express } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Lácteos Axúme - API',
      version: '1.0.0',
      description:
        'Documentación interactiva de la API de Lácteos Axúme. Permite consultar y ejecutar operaciones de autenticación, usuarios, catálogo, carrito, ventas, pagos, inventario, archivos y correo.',
      contact: { name: 'Equipo de desarrollo - Lácteos Axúme' },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor local de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Inicie sesión en POST /api/auth/login y pegue aquí únicamente el token recibido.',
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../docs/openapi.yaml'),
    path.join(__dirname, '../routes/**/*.ts'),
  ],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customSiteTitle: 'Lácteos Axúme | API Docs',
    swaggerOptions: { persistAuthorization: true },
  }));
  app.get('/api-docs.json', (_req, res) => res.json(specs));
};