import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Venta from '../../models/modeloVenta.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerVentas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ventas = await Venta.findAll({
      order: [['venta_id', 'ASC']],
    });

    return res.json(successResponse(ventas, 'Ventas encontradas'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al listar las ventas';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerVentaPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { venta_id } = req.query;

  try {
    const venta = await Venta.findByPk(venta_id as string);

    if (!venta) {
      return res.status(404).json(errorResponse('Venta no encontrada'));
    }

    return res.json(successResponse(venta, 'Venta encontrada'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener la venta';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearVenta = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nuevaVenta = await Venta.create(req.body);

    return res.status(201).json(
      successResponse(nuevaVenta, 'Venta creada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al crear la venta';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarVenta = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { venta_id } = req.query;

  try {
    const venta = await Venta.findByPk(venta_id as string);

    if (!venta) {
      return res.status(404).json(errorResponse('Venta no encontrada'));
    }

    await venta.update(req.body);

    return res.json(
      successResponse(venta, 'Venta actualizada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar la venta';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarVenta = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { venta_id } = req.query;

  try {
    const venta = await Venta.findByPk(venta_id as string);

    if (!venta) {
      return res.status(404).json(errorResponse('Venta no encontrada'));
    }

    await venta.destroy();

    return res.json(
      successResponse(null, 'Venta eliminada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar la venta';
    return res.status(500).json(errorResponse(msg));
  }
};