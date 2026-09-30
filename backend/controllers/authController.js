const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const Usuario = require('../models/Usuario');

const login = async (req, res) => {
    try {
        const { useremail, password } = req.body;

        // Validar datos recibidos
        if (!useremail || !password) {
            return res.status(400).json({
                mensaje: 'El correo y la contraseña son obligatorios.'
            });
        }

        // Buscar usuario por correo con comparación exacta
        // BINARY hace que se distingan mayúsculas y minúsculas.
        const usuario = await Usuario.findOne({
            where: Sequelize.where(
                Sequelize.fn('BINARY', Sequelize.col('useremail')),
                useremail
            )
        });

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos.'
            });
        }

        // Verificar que el usuario esté activo
        if (usuario.userest !== 'ACT') {
            return res.status(403).json({
                mensaje: 'El usuario se encuentra inactivo.'
            });
        }

        // Comparar contraseña
        const passwordValida = await bcrypt.compare(
            password,
            usuario.userpswd
        );

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos.'
            });
        }

        // Crear token JWT
        const token = jwt.sign(
            {
                usercod: usuario.usercod,
                useremail: usuario.useremail,
                username: usuario.username,
                usertipo: usuario.usertipo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso.',
            token: token,
            usuario: {
                usercod: usuario.usercod,
                useremail: usuario.useremail,
                username: usuario.username,
                usertipo: usuario.usertipo
            }
        });

    } catch (error) {
        console.error('Error en login:', error);

        return res.status(500).json({
            mensaje: 'Error interno del servidor.'
        });
    }
};

const hashPassword = async (password) => {
const salt = await bcrypt.genSalt(10);
return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hash) => {
return await bcrypt.compare(password, hash);
};

module.exports = {
    login
}; 