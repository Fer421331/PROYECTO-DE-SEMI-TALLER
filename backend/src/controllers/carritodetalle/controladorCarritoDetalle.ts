import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import CarritoDetalle from '../../models/modeloCarritoDetalle.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerCarritoDetalle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const detalles = await CarritoDetalle.findAll({
      order: [['detalle_id', 'ASC']],
    });
    return res.json(successResponse(detalles, "Detalles del carrito encontrados"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar los detalles del carrito";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerCarritoDetallePorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const detalle = await CarritoDetalle.findByPk(id as string);
    if (!detalle) {
      return res.status(404).json(errorResponse("Detalle del carrito no encontrado"));
    }
    return res.json(successResponse(detalle, "Detalle del carrito encontrado"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener el detalle del carrito por ID";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearCarritoDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    carrito_id,
    producto_id,
    cantidad,
    precio_unitario,
    subtotal,
  } = req.body;

  try {
    if (!carrito_id || !producto_id || !cantidad || precio_unitario === undefined || subtotal === undefined) {
      return res.status(400).json(
        errorResponse("El carrito, producto, cantidad, precio unitario y subtotal son obligatorios")
      );
    }

    const nuevoDetalle = await CarritoDetalle.create({
      carrito_id,
      producto_id,
      cantidad,
      precio_unitario,
      subtotal,
    });

    return res.status(201).json(successResponse(nuevoDetalle, "Detalle del carrito creado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear el detalle del carrito";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarCarritoDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const {
    carrito_id,
    producto_id,
    cantidad,
    precio_unitario,
    subtotal,
  } = req.body;

  try {
    const detalle = await CarritoDetalle.findByPk(id as string);
    if (!detalle) {
      return res.status(404).json(errorResponse("Detalle del carrito no encontrado"));
    }

    detalle.carrito_id = carrito_id ?? detalle.carrito_id;
    detalle.producto_id = producto_id ?? detalle.producto_id;
    detalle.cantidad = cantidad ?? detalle.cantidad;
    detalle.precio_unitario = precio_unitario ?? detalle.precio_unitario;
    detalle.subtotal = subtotal ?? detalle.subtotal;

    await detalle.save();

    return res.json(successResponse(detalle, "Detalle del carrito actualizado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar el detalle del carrito";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarCarritoDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const detalle = await CarritoDetalle.findByPk(id as string);
    if (!detalle) {
      return res.status(404).json(errorResponse("Detalle del carrito no encontrado"));
    }

    await detalle.destroy();

    return res.json(successResponse(null, "Detalle del carrito eliminado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar el detalle del carrito";
    return res.status(500).json(errorResponse(msg));
  }
};
