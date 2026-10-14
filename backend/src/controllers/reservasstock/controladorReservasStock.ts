import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ReservaStock from '../../models/modeloReservaStock.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerReservasStock = async (req: Request, res: Response): Promise<Response> => {
  try {
    const reservas = await ReservaStock.findAll({
      order: [['reserva_id', 'ASC']],
    });

    return res.json(successResponse(reservas, 'Reservas de stock encontradas'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al listar las reservas de stock';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerReservasStockPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const reserva = await ReservaStock.findByPk(id as string);

    if (!reserva) {
      return res.status(404).json(errorResponse('Reserva de stock no encontrada'));
    }

    return res.json(successResponse(reserva, 'Reserva de stock encontrada'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener la reserva de stock';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearReservasStock = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    producto_id,
    usercod,
    cantidad_reservada,
    reserva_estado,
    reserva_fecha_expiracion,
    reserva_fecha_confirmacion,
    reserva_fecha_liberacion,
  } = req.body;

  try {
    if (
      producto_id == null ||
      usercod == null ||
      cantidad_reservada == null ||
      !reserva_estado
    ) {
      return res.status(400).json(
        errorResponse('Los campos producto_id, usercod, cantidad_reservada y reserva_estado son obligatorios')
      );
    }

    const nuevaReserva = await ReservaStock.create({
      producto_id,
      usercod,
      cantidad_reservada,
      reserva_estado,
      reserva_fecha_expiracion,
      reserva_fecha_confirmacion,
      reserva_fecha_liberacion,
    });

    return res.status(201).json(
      successResponse(nuevaReserva, 'Reserva de stock creada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al crear la reserva de stock';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarReservasStock = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  const {
    producto_id,
    usercod,
    cantidad_reservada,
    reserva_estado,
    reserva_fecha_expiracion,
    reserva_fecha_confirmacion,
    reserva_fecha_liberacion,
  } = req.body;

  try {
    const reserva = await ReservaStock.findByPk(id as string);

    if (!reserva) {
      return res.status(404).json(errorResponse('Reserva de stock no encontrada'));
    }

    reserva.producto_id = producto_id ?? reserva.producto_id;
    reserva.usercod = usercod ?? reserva.usercod;
    reserva.cantidad_reservada = cantidad_reservada ?? reserva.cantidad_reservada;
    reserva.reserva_estado = reserva_estado ?? reserva.reserva_estado;
    reserva.reserva_fecha_expiracion = reserva_fecha_expiracion ?? reserva.reserva_fecha_expiracion;
    reserva.reserva_fecha_confirmacion = reserva_fecha_confirmacion ?? reserva.reserva_fecha_confirmacion;
    reserva.reserva_fecha_liberacion = reserva_fecha_liberacion ?? reserva.reserva_fecha_liberacion;

    await reserva.save();

    return res.json(
      successResponse(reserva, 'Reserva de stock actualizada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar la reserva de stock';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarReservasStock = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const reserva = await ReservaStock.findByPk(id as string);

    if (!reserva) {
      return res.status(404).json(errorResponse('Reserva de stock no encontrada'));
    }

    await reserva.destroy();

    return res.json(
      successResponse(null, 'Reserva de stock eliminada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar la reserva de stock';
    return res.status(500).json(errorResponse(msg));
  }
};