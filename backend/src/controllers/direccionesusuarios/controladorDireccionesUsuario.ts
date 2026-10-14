import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import DireccionUsuario from '../../models/modeloDireccionUsuario.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerDireccionesUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const direcciones = await DireccionUsuario.findAll({
      order: [['direccion_id', 'ASC']],
    });

    return res.json(successResponse(direcciones, "Direcciones encontradas"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar las direcciones";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerDireccionesUsuarioPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const direccion = await DireccionUsuario.findByPk(id as string);

    if (!direccion) {
      return res.status(404).json(errorResponse("Dirección no encontrada"));
    }

    return res.json(successResponse(direccion, "Dirección encontrada"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener la dirección por ID";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearDireccionesUsuario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    usercod,
    direccion_alias,
    direccion_receptor,
    direccion_telefono,
    direccion_departamento,
    direccion_ciudad,
    id_ruta,
    direccion_detalle,
    direccion_referencia,
    direccion_predeterminada,
    direccion_estado,
  } = req.body;

  try {
    if (
      !usercod ||
      !direccion_alias ||
      !direccion_receptor ||
      !direccion_telefono ||
      !direccion_departamento ||
      !direccion_ciudad ||
      !id_ruta ||
      !direccion_detalle ||
      !direccion_estado
    ) {
      return res.status(400).json(
        errorResponse("Faltan campos obligatorios para crear la dirección")
      );
    }

    const nuevaDireccion = await DireccionUsuario.create({
      usercod,
      direccion_alias,
      direccion_receptor,
      direccion_telefono,
      direccion_departamento,
      direccion_ciudad,
      id_ruta,
      direccion_detalle,
      direccion_referencia,
      direccion_predeterminada,
      direccion_estado,
    });

    return res.status(201).json(
      successResponse(nuevaDireccion, "Dirección creada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear la dirección";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarDireccionesUsuario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  const {
    usercod,
    direccion_alias,
    direccion_receptor,
    direccion_telefono,
    direccion_departamento,
    direccion_ciudad,
    id_ruta,
    direccion_detalle,
    direccion_referencia,
    direccion_predeterminada,
    direccion_estado,
  } = req.body;

  try {
    const direccion = await DireccionUsuario.findByPk(id as string);

    if (!direccion) {
      return res.status(404).json(errorResponse("Dirección no encontrada"));
    }

    direccion.usercod = usercod ?? direccion.usercod;
    direccion.direccion_alias = direccion_alias ?? direccion.direccion_alias;
    direccion.direccion_receptor = direccion_receptor ?? direccion.direccion_receptor;
    direccion.direccion_telefono = direccion_telefono ?? direccion.direccion_telefono;
    direccion.direccion_departamento = direccion_departamento ?? direccion.direccion_departamento;
    direccion.direccion_ciudad = direccion_ciudad ?? direccion.direccion_ciudad;
    direccion.id_ruta = id_ruta ?? direccion.id_ruta;
    direccion.direccion_detalle = direccion_detalle ?? direccion.direccion_detalle;
    direccion.direccion_referencia = direccion_referencia ?? direccion.direccion_referencia;
    direccion.direccion_predeterminada = direccion_predeterminada ?? direccion.direccion_predeterminada;
    direccion.direccion_estado = direccion_estado ?? direccion.direccion_estado;

    await direccion.save();

    return res.json(
      successResponse(direccion, "Dirección actualizada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar la dirección";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarDireccionesUsuario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const direccion = await DireccionUsuario.findByPk(id as string);

    if (!direccion) {
      return res.status(404).json(errorResponse("Dirección no encontrada"));
    }

    await direccion.destroy();

    return res.json(
      successResponse(null, "Dirección eliminada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar la dirección";
    return res.status(500).json(errorResponse(msg));
  }
};