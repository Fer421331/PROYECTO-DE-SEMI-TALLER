import 'dotenv/config';

import { DB_LACTAXUME } from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await DB_LACTAXUME.authenticate();
    console.log('Conexión a la base de datos establecida.');

    await DB_LACTAXUME.sync();
    console.log('Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error: any) {
    console.error('Error al iniciar el servidor:', error);
  }
};

iniciarServidor();