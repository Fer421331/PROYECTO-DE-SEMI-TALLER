import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Pago from '../../models/modeloPago.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerPagos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pagos = await Pago.findAll({
      order: [['pago_id', 'ASC']],
    });

    return res.json(successResponse(pagos, "Pagos encontrados"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar los pagos";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerPagoPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const pago = await Pago.findByPk(id as string);

    if (!pago) {
      return res.status(404).json(errorResponse("Pago no encontrado"));
    }

    return res.json(successResponse(pago, "Pago encontrado"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener el pago";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearPago = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    venta_id,
    metodo_pago_id,
    pago_monto,
    pago_referencia,
    pago_estado,
  } = req.body;

  try {
    if (
      !venta_id ||
      !metodo_pago_id ||
      pago_monto == null ||
      !pago_estado
    ) {
      return res.status(400).json(
        errorResponse("Los campos venta_id, metodo_pago_id, pago_monto y pago_estado son obligatorios")
      );
    }

    const nuevoPago = await Pago.create({
      venta_id,
      metodo_pago_id,
      pago_monto,
      pago_referencia,
      pago_estado,
    });

    return res.status(201).json(
      successResponse(nuevoPago, "Pago creado correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear el pago";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarPago = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const {
    venta_id,
    metodo_pago_id,
    pago_monto,
    pago_referencia,
    pago_estado,
  } = req.body;

  try {
    const pago = await Pago.findByPk(id as string);

    if (!pago) {
      return res.status(404).json(errorResponse("Pago no encontrado"));
    }

    pago.venta_id = venta_id ?? pago.venta_id;
    pago.metodo_pago_id = metodo_pago_id ?? pago.metodo_pago_id;
    pago.pago_monto = pago_monto ?? pago.pago_monto;
    pago.pago_referencia = pago_referencia ?? pago.pago_referencia;
    pago.pago_estado = pago_estado ?? pago.pago_estado;

    await pago.save();

    return res.json(successResponse(pago, "Pago actualizado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar el pago";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarPago = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const pago = await Pago.findByPk(id as string);

    if (!pago) {
      return res.status(404).json(errorResponse("Pago no encontrado"));
    }

    await pago.destroy();

    return res.json(successResponse(null, "Pago eliminado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar el pago";
    return res.status(500).json(errorResponse(msg));
  }
};