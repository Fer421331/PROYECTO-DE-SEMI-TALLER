import { Request, Response } from 'express';
import * as ModuloUsuario from '../modelos/modeloUsuario';

// Soporta export default, export const Usuario o export class Usuario
const Usuario: any = (ModuloUsuario as any).default || (ModuloUsuario as any).Usuario || ModuloUsuario;

export const obtenerUsuarios = async (_req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la lista de usuarios', error });
  }
};

export const obtenerUsuarioPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
  }
};

export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar el usuario', error });
  }
};

export const actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [filasAfectadas] = await Usuario.update(req.body, { where: { id } });

    if (filasAfectadas === 0) {
      res.status(404).json({ mensaje: 'Usuario no encontrado o sin cambios' });
      return;
    }

    res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el usuario', error });
  }
};

export const eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const eliminado = await Usuario.destroy({ where: { id } });

    if (!eliminado) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
  }
};