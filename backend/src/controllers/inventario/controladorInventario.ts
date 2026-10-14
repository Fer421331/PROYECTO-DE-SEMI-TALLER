import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import InventarioMovimiento from '../../models/modeloInventarioMovimiento.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerInventario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const inventario = await InventarioMovimiento.findAll({
      order: [['movimiento_id', 'ASC']],
    });

    return res.json(successResponse(inventario, "Movimientos de inventario encontrados"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar los movimientos de inventario";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerInventarioPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const movimiento = await InventarioMovimiento.findByPk(id as string);

    if (!movimiento) {
      return res.status(404).json(errorResponse("Movimiento de inventario no encontrado"));
    }

    return res.json(successResponse(movimiento, "Movimiento de inventario encontrado"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener el movimiento de inventario";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearInventario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    producto_id,
    usercod,
    movimiento_tipo,
    movimiento_cantidad,
    movimiento_stock_anterior,
    movimiento_stock_nuevo,
    movimiento_observacion,
  } = req.body;

  try {
    if (
      !producto_id ||
      !usercod ||
      !movimiento_tipo ||
      movimiento_cantidad == null ||
      movimiento_stock_anterior == null ||
      movimiento_stock_nuevo == null
    ) {
      return res.status(400).json(
        errorResponse("Los campos producto_id, usercod, movimiento_tipo, movimiento_cantidad, movimiento_stock_anterior y movimiento_stock_nuevo son obligatorios")
      );
    }

    const nuevoMovimiento = await InventarioMovimiento.create({
      producto_id,
      usercod,
      movimiento_tipo,
      movimiento_cantidad,
      movimiento_stock_anterior,
      movimiento_stock_nuevo,
      movimiento_observacion,
    });

    return res.status(201).json(
      successResponse(nuevoMovimiento, "Movimiento de inventario creado correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear el movimiento de inventario";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarInventario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const {
    producto_id,
    usercod,
    movimiento_tipo,
    movimiento_cantidad,
    movimiento_stock_anterior,
    movimiento_stock_nuevo,
    movimiento_observacion,
  } = req.body;

  try {
    const movimiento = await InventarioMovimiento.findByPk(id as string);

    if (!movimiento) {
      return res.status(404).json(errorResponse("Movimiento de inventario no encontrado"));
    }

    movimiento.producto_id = producto_id ?? movimiento.producto_id;
    movimiento.usercod = usercod ?? movimiento.usercod;
    movimiento.movimiento_tipo = movimiento_tipo ?? movimiento.movimiento_tipo;
    movimiento.movimiento_cantidad = movimiento_cantidad ?? movimiento.movimiento_cantidad;
    movimiento.movimiento_stock_anterior = movimiento_stock_anterior ?? movimiento.movimiento_stock_anterior;
    movimiento.movimiento_stock_nuevo = movimiento_stock_nuevo ?? movimiento.movimiento_stock_nuevo;
    movimiento.movimiento_observacion = movimiento_observacion ?? movimiento.movimiento_observacion;

    await movimiento.save();

    return res.json(
      successResponse(movimiento, "Movimiento de inventario actualizado correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar el movimiento de inventario";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarInventario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const movimiento = await InventarioMovimiento.findByPk(id as string);

    if (!movimiento) {
      return res.status(404).json(errorResponse("Movimiento de inventario no encontrado"));
    }

    await movimiento.destroy();

    return res.json(
      successResponse(null, "Movimiento de inventario eliminado correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar el movimiento de inventario";
    return res.status(500).json(errorResponse(msg));
  }
};