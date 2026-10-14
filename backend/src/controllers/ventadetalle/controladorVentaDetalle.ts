import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import VentaDetalle from '../../models/modeloVentaDetalle.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerVentaDetalle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const detalles = await VentaDetalle.findAll({
      order: [['detalle_venta_id', 'ASC']],
    });

    return res.json(successResponse(detalles, 'Detalles de ventas encontrados'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al listar los detalles de ventas';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerVentaDetallePorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { detalle_venta_id } = req.query;

  try {
    const detalle = await VentaDetalle.findByPk(detalle_venta_id as string);

    if (!detalle) {
      return res.status(404).json(errorResponse('Detalle de venta no encontrado'));
    }

    return res.json(successResponse(detalle, 'Detalle de venta encontrado'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener el detalle de venta';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearVentaDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nuevoDetalle = await VentaDetalle.create(req.body);

    return res.status(201).json(
      successResponse(nuevoDetalle, 'Detalle de venta creado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al crear el detalle de venta';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarVentaDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { detalle_venta_id } = req.query;

  try {
    const detalle = await VentaDetalle.findByPk(detalle_venta_id as string);

    if (!detalle) {
      return res.status(404).json(errorResponse('Detalle de venta no encontrado'));
    }

    await detalle.update(req.body);

    return res.json(
      successResponse(detalle, 'Detalle de venta actualizado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar el detalle de venta';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarVentaDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { detalle_venta_id } = req.query;

  try {
    const detalle = await VentaDetalle.findByPk(detalle_venta_id as string);

    if (!detalle) {
      return res.status(404).json(errorResponse('Detalle de venta no encontrado'));
    }

    await detalle.destroy();

    return res.json(
      successResponse(null, 'Detalle de venta eliminado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar el detalle de venta';
    return res.status(500).json(errorResponse(msg));
  }
};
