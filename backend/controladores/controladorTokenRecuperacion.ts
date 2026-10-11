import { Request, Response } from 'express';

let TokenRecuperacion: any;
try {
  const modulo = require('../modelos/modeloTokenRecuperacion');
  TokenRecuperacion = modulo.default || modulo.TokenRecuperacion || modulo;
} catch (error) {
  TokenRecuperacion = {};
}

export const obtenerTokensRecuperacion = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tokens = await TokenRecuperacion.findAll();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los tokens de recuperación', error });
  }
};

export const obtenerTokenRecuperacionPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const token = await TokenRecuperacion.findByPk(id);

    if (!token) {
      res.status(404).json({ mensaje: 'Token no encontrado' });
      return;
    }

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el token', error });
  }
};

export const crearTokenRecuperacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoToken = await TokenRecuperacion.create(req.body);
    res.status(201).json(nuevoToken);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el token de recuperación', error });
  }
};

export const eliminarTokenRecuperacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const eliminado = await TokenRecuperacion.destroy({ where: { id } });

    if (!eliminado) {
      res.status(404).json({ mensaje: 'Token no encontrado' });
      return;
    }

    res.status(200).json({ mensaje: 'Token eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el token', error });
  }
};