
import app from './app';
import sequelize from './configuraciones/database';


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