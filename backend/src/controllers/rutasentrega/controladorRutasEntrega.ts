import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import RutaEntrega from '../../models/modeloRutaEntrega.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerRutasEntrega = async (req: Request, res: Response): Promise<Response> => {
  try {
    const rutasEntrega = await RutaEntrega.findAll({
      order: [['id_ruta', 'ASC']],
    });

    return res.json(successResponse(rutasEntrega, 'Rutas de entrega encontradas'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al listar las rutas de entrega';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerRutasEntregaPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_ruta } = req.query;

  try {
    const rutaEntrega = await RutaEntrega.findOne({
      where: {
        id_ruta: id_ruta as string,
      },
    });

    if (!rutaEntrega) {
      return res.status(404).json(errorResponse('Ruta de entrega no encontrada'));
    }

    return res.json(successResponse(rutaEntrega, 'Ruta de entrega encontrada'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener la ruta de entrega';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearRutasEntrega = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_ruta, ...datosRuta } = req.body;

  try {
    const nuevaRuta = await RutaEntrega.create({
      ...datosRuta,
    });

    return res.status(201).json(
      successResponse(nuevaRuta, 'Ruta de entrega creada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al crear la ruta de entrega';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarRutasEntrega = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_ruta } = req.query;
  const datosRuta = req.body;

  try {
    const rutaEntrega = await RutaEntrega.findOne({
      where: {
        id_ruta: id_ruta as string,
      },
    });

    if (!rutaEntrega) {
      return res.status(404).json(errorResponse('Ruta de entrega no encontrada'));
    }

    Object.assign(rutaEntrega, datosRuta);

    await rutaEntrega.save();

    return res.json(
      successResponse(rutaEntrega, 'Ruta de entrega actualizada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar la ruta de entrega';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarRutasEntrega = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_ruta } = req.query;

  try {
    const rutaEntrega = await RutaEntrega.findOne({
      where: {
        id_ruta: id_ruta as string,
      },
    });

    if (!rutaEntrega) {
      return res.status(404).json(errorResponse('Ruta de entrega no encontrada'));
    }

    await rutaEntrega.destroy();

    return res.json(
      successResponse(null, 'Ruta de entrega eliminada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar la ruta de entrega';
    return res.status(500).json(errorResponse(msg));
  }
};