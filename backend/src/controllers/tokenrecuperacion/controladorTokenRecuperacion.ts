import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import TokenRecuperacion from '../../models/modeloTokenRecuperacion.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerTokenRecuperacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tokens = await TokenRecuperacion.findAll({
      attributes: { exclude: ['token_hash'] },
      order: [['token_id', 'ASC']],
    });

    return res.json(successResponse(tokens, 'Tokens de recuperación encontrados'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al listar los tokens de recuperación';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerTokenRecuperacionPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token_id } = req.query;

  try {
    const token = await TokenRecuperacion.findOne({
      where: {
        token_id: token_id as string,
      },
      attributes: { exclude: ['token_hash'] },
    });

    if (!token) {
      return res.status(404).json(errorResponse('Token de recuperación no encontrado'));
    }

    return res.json(successResponse(token, 'Token de recuperación encontrado'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener el token de recuperación';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearTokenRecuperacion = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const datosToken = req.body;

  try {
    const nuevoToken = await TokenRecuperacion.create(datosToken);

    const tokenRespuesta = await TokenRecuperacion.findByPk(nuevoToken.get('token_id'), {
      attributes: { exclude: ['token_hash'] },
    });

    return res.status(201).json(
      successResponse(tokenRespuesta, 'Token de recuperación creado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al crear el token de recuperación';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarTokenRecuperacion = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token_id } = req.query;
  const datosToken = req.body;

  try {
    const token = await TokenRecuperacion.findByPk(token_id as string);

    if (!token) {
      return res.status(404).json(errorResponse('Token de recuperación no encontrado'));
    }

    await token.update(datosToken);

    const tokenRespuesta = await TokenRecuperacion.findByPk(token_id as string, {
      attributes: { exclude: ['token_hash'] },
    });

    return res.json(
      successResponse(tokenRespuesta, 'Token de recuperación actualizado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar el token de recuperación';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarTokenRecuperacion = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token_id } = req.query;

  try {
    const token = await TokenRecuperacion.findByPk(token_id as string);

    if (!token) {
      return res.status(404).json(errorResponse('Token de recuperación no encontrado'));
    }

    await token.destroy();

    return res.json(
      successResponse(null, 'Token de recuperación eliminado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar el token de recuperación';
    return res.status(500).json(errorResponse(msg));
  }
};

