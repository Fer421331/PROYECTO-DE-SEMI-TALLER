import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Carrito from '../../models/modeloCarrito.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerCarrito = async (req: Request, res: Response): Promise<Response> => {
  try {
    const carritos = await Carrito.findAll({
      order: [['carrito_id', 'ASC']],
    });
    return res.json(successResponse(carritos, "Carritos encontrados"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar los carritos";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerCarritoPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  try {
    const carrito = await Carrito.findByPk(id as string);
    if (!carrito) {
      return res.status(404).json(errorResponse("Carrito no encontrado"));
    }
    return res.json(successResponse(carrito, "Carrito encontrado"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener el carrito por ID";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearCarrito = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    usercod,
    carrito_estado,
    carrito_fecha_creacion,
    carrito_fecha_actualizacion,
  } = req.body;

  try {
    if (!usercod) {
      return res.status(400).json(errorResponse("El código de usuario (usercod) es obligatorio"));
    }

    const nuevoCarrito = await Carrito.create({
      usercod,
      carrito_estado,
      carrito_fecha_creacion,
      carrito_fecha_actualizacion,
    });

    return res.status(201).json(successResponse(nuevoCarrito, "Carrito creado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear el carrito";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarCarrito = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const {
    usercod,
    carrito_estado,
    carrito_fecha_creacion,
    carrito_fecha_actualizacion,
  } = req.body;

  try {
    const carrito = await Carrito.findByPk(id as string);
    if (!carrito) {
      return res.status(404).json(errorResponse("Carrito no encontrado"));
    }

    carrito.usercod = usercod ?? carrito.usercod;
    carrito.carrito_estado = carrito_estado ?? carrito.carrito_estado;
    carrito.carrito_fecha_creacion = carrito_fecha_creacion ?? carrito.carrito_fecha_creacion;
    carrito.carrito_fecha_actualizacion = carrito_fecha_actualizacion ?? carrito.carrito_fecha_actualizacion;

    await carrito.save();

    return res.json(successResponse(carrito, "Carrito actualizado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar el carrito";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarCarrito = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const carrito = await Carrito.findByPk(id as string);
    if (!carrito) {
      return res.status(404).json(errorResponse("Carrito no encontrado"));
    }

    await carrito.destroy();

    return res.json(successResponse(null, "Carrito eliminado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar el carrito";
    return res.status(500).json(errorResponse(msg));
  }
};