import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import Usuario from '../modelos/modeloUsuario';

interface LoginBody {
  useremail?: string;
  password?: string;
}

interface AuthUser {
  usercod: number;
  useremail: string;
  username: string;
  usertipo: string;
}

const login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<Response> => {
  try {
    const { useremail, password } = req.body;

    if (!useremail || !password) {
      return res.status(400).json({ mensaje: 'El correo y la contraseña son obligatorios.' });
    }

    const usuario = await Usuario.findOne({
      where: Sequelize.where(
        Sequelize.fn('BINARY', Sequelize.col('useremail')),
        useremail
      )
    });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    if (usuario.userest !== 'ACT') {
      return res.status(403).json({ mensaje: 'El usuario se encuentra inactivo.' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.userpswd);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    const token = jwt.sign(
      {
        usercod: usuario.usercod,
        useremail: usuario.useremail,
        username: usuario.username,
        usertipo: usuario.usertipo
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );

    const usuarioRespuesta: AuthUser = {
      usercod: usuario.usercod,
      useremail: usuario.useremail,
      username: usuario.username,
      usertipo: usuario.usertipo
    };

    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso.',
      token,
      usuario: usuarioRespuesta
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

export { login };
