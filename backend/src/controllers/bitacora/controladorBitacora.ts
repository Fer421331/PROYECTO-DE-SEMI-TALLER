import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Bitacora from '../../models/modeloBitacora.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

// Obtener todas las bitácoras
export const obtenerBitacora = async (req: Request, res: Response): Promise<Response> => {
  try {
    const bitacoras = await Bitacora.findAll({
      order: [['bitacoracod', 'ASC']],
    });

    return res.json(
      successResponse(bitacoras, 'Registros de bitácora encontrados')
    );
  } catch (error) {
    const msg = error instanceof Error
      ? error.message
      : 'Error al listar la bitácora';

    return res.status(500).json(errorResponse(msg));
  }
};

// Obtener una bitácora por ID
export const obtenerBitacoraPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { bitacoracod } = req.query;

  try {
    const bitacora = await Bitacora.findByPk(bitacoracod as string);

    if (!bitacora) {
      return res.status(404).json(
        errorResponse('Registro de bitácora no encontrado')
      );
    }

    return res.json(
      successResponse(bitacora, 'Registro de bitácora encontrado')
    );
  } catch (error) {
    const msg = error instanceof Error
      ? error.message
      : 'Error al obtener el registro de bitácora';

    return res.status(500).json(errorResponse(msg));
  }
};

// Crear bitácora
export const crearBitacora = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nuevaBitacora = await Bitacora.create(req.body);

    return res.status(201).json(
      successResponse(
        nuevaBitacora,
        'Registro de bitácora creado correctamente'
      )
    );
  } catch (error) {
    const msg = error instanceof Error
      ? error.message
      : 'Error al crear el registro de bitácora';

    return res.status(500).json(errorResponse(msg));
  }
};

// Actualizar bitácora
export const actualizarBitacora = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { bitacoracod } = req.query;

  try {
    const bitacora = await Bitacora.findByPk(bitacoracod as string);

    if (!bitacora) {
      return res.status(404).json(
        errorResponse('Registro de bitácora no encontrado')
      );
    }

    await bitacora.update(req.body);

    return res.json(
      successResponse(
        bitacora,
        'Registro de bitácora actualizado correctamente'
      )
    );
  } catch (error) {
    const msg = error instanceof Error
      ? error.message
      : 'Error al actualizar el registro de bitácora';

    return res.status(500).json(errorResponse(msg));
  }
};

// Eliminar bitácora
export const eliminarBitacora = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { bitacoracod } = req.query;

  try {
    const bitacora = await Bitacora.findByPk(bitacoracod as string);

    if (!bitacora) {
      return res.status(404).json(
        errorResponse('Registro de bitácora no encontrado')
      );
    }

    await bitacora.destroy();

    return res.json(
      successResponse(
        null,
        'Registro de bitácora eliminado correctamente'
      )
    );
  } catch (error) {
    const msg = error instanceof Error
      ? error.message
      : 'Error al eliminar el registro de bitácora';

    return res.status(500).json(errorResponse(msg));
  }
};
