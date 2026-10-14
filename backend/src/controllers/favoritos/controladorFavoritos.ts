import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Favorito from '../../models/modeloFavorito.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerFavoritos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const favoritos = await Favorito.findAll({
      order: [['favorito_id', 'ASC']],
    });

    return res.json(successResponse(favoritos, "Favoritos encontrados"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar los favoritos";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerFavoritoPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const favorito = await Favorito.findByPk(id as string);

    if (!favorito) {
      return res.status(404).json(errorResponse("Favorito no encontrado"));
    }

    return res.json(successResponse(favorito, "Favorito encontrado"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener el favorito por ID";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearFavorito = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usercod, producto_id, favorito_fecha } = req.body;

  try {
    if (!usercod || !producto_id) {
      return res.status(400).json(
        errorResponse("El código de usuario (usercod) y el producto (producto_id) son obligatorios")
      );
    }

    const nuevoFavorito = await Favorito.create({
      usercod,
      producto_id,
      favorito_fecha,
    });

    return res.status(201).json(
      successResponse(nuevoFavorito, "Favorito creado correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear el favorito";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarFavorito = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const { usercod, producto_id, favorito_fecha } = req.body;

  try {
    const favorito = await Favorito.findByPk(id as string);

    if (!favorito) {
      return res.status(404).json(errorResponse("Favorito no encontrado"));
    }

    favorito.usercod = usercod ?? favorito.usercod;
    favorito.producto_id = producto_id ?? favorito.producto_id;
    favorito.favorito_fecha = favorito_fecha ?? favorito.favorito_fecha;

    await favorito.save();

    return res.json(successResponse(favorito, "Favorito actualizado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar el favorito";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarFavorito = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const favorito = await Favorito.findByPk(id as string);

    if (!favorito) {
      return res.status(404).json(errorResponse("Favorito no encontrado"));
    }

    await favorito.destroy();

    return res.json(successResponse(null, "Favorito eliminado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar el favorito";
    return res.status(500).json(errorResponse(msg));
  }
};