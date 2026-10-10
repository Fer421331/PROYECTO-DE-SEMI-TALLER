import 'dotenv/config';

import { DB_LACTAXUME } from './config/db.js';
import app from './app.js';
const PORT = process.env.PORT || 3000;

DB_LACTAXUME.authenticate()
    .then(() => {
      console.log('Conexión a la base de datos establecida.');
      DB_LACTAXUME.sync() // Sincroniza los modelos con la base de datos
      console.log('Modelos sincronizados con la base de datos.');
    })
    .catch((error:any) => console.error('Error al conectar a la base de datos:', error));
    
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});