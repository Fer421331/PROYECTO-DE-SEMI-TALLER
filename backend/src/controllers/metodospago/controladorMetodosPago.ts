import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import MetodoPago from '../../models/modeloMetodoPago.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerMetodosPago = async (req: Request, res: Response): Promise<Response> => {
  try {
    const metodosPago = await MetodoPago.findAll({
      order: [['metodo_pago_id', 'ASC']],
    });

    return res.json(successResponse(metodosPago, "Métodos de pago encontrados"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar los métodos de pago";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerMetodosPagoPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const metodoPago = await MetodoPago.findByPk(id as string);

    if (!metodoPago) {
      return res.status(404).json(errorResponse("Método de pago no encontrado"));
    }

    return res.json(successResponse(metodoPago, "Método de pago encontrado"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener el método de pago";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearMetodosPago = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { metodo_nombre, metodo_descripcion, metodo_estado } = req.body;

  try {
    if (!metodo_nombre || !metodo_estado) {
      return res.status(400).json(
        errorResponse("El nombre y el estado del método de pago son obligatorios")
      );
    }

    const nuevoMetodoPago = await MetodoPago.create({
      metodo_nombre,
      metodo_descripcion,
      metodo_estado,
    });

    return res.status(201).json(
      successResponse(nuevoMetodoPago, "Método de pago creado correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear el método de pago";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarMetodosPago = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const { metodo_nombre, metodo_descripcion, metodo_estado } = req.body;

  try {
    const metodoPago = await MetodoPago.findByPk(id as string);

    if (!metodoPago) {
      return res.status(404).json(errorResponse("Método de pago no encontrado"));
    }

    metodoPago.metodo_nombre = metodo_nombre ?? metodoPago.metodo_nombre;
    metodoPago.metodo_descripcion = metodo_descripcion ?? metodoPago.metodo_descripcion;
    metodoPago.metodo_estado = metodo_estado ?? metodoPago.metodo_estado;

    await metodoPago.save();

    return res.json(
      successResponse(metodoPago, "Método de pago actualizado correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar el método de pago";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarMetodosPago = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const metodoPago = await MetodoPago.findByPk(id as string);

    if (!metodoPago) {
      return res.status(404).json(errorResponse("Método de pago no encontrado"));
    }

    await metodoPago.destroy();

    return res.json(
      successResponse(null, "Método de pago eliminado correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar el método de pago";
    return res.status(500).json(errorResponse(msg));
  }
};