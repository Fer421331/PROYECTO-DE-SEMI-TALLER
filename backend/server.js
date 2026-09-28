const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Lácteos Axúme funcionando correctamente'
    });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log('Conexión con MySQL establecida correctamente.');
        console.log('Base de datos: lacteos_axume');

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al conectar con MySQL:');
        console.error(error.message);
    }
}

iniciarServidor();

