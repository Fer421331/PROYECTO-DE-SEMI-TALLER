import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import FuncionRol from '../../models/modeloFuncionRol.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerFuncionesRoles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const funcionesRoles = await FuncionRol.findAll({
      order: [['fncod', 'ASC']],
    });

    return res.json(successResponse(funcionesRoles, "Funciones de roles encontradas"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar las funciones de roles";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerFuncionesRolesPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const funcionRol = await FuncionRol.findByPk(id as string);

    if (!funcionRol) {
      return res.status(404).json(errorResponse("Función de rol no encontrada"));
    }

    return res.json(successResponse(funcionRol, "Función de rol encontrada"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener la función de rol por ID";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearFuncionesRoles = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod, fncod, fnrolest, fnexp } = req.body;

  try {
    if (!rolescod || !fncod || !fnrolest) {
      return res.status(400).json(
        errorResponse("El código del rol (rolescod), el código de función (fncod) y el estado (fnrolest) son obligatorios")
      );
    }

    const nuevaFuncionRol = await FuncionRol.create({
      rolescod,
      fncod,
      fnrolest,
      fnexp,
    });

    return res.status(201).json(
      successResponse(nuevaFuncionRol, "Función de rol creada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear la función de rol";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarFuncionesRoles = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const { rolescod, fncod, fnrolest, fnexp } = req.body;

  try {
    const funcionRol = await FuncionRol.findByPk(id as string);

    if (!funcionRol) {
      return res.status(404).json(errorResponse("Función de rol no encontrada"));
    }

    funcionRol.rolescod = rolescod ?? funcionRol.rolescod;
    funcionRol.fncod = fncod ?? funcionRol.fncod;
    funcionRol.fnrolest = fnrolest ?? funcionRol.fnrolest;
    funcionRol.fnexp = fnexp ?? funcionRol.fnexp;

    await funcionRol.save();

    return res.json(
      successResponse(funcionRol, "Función de rol actualizada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar la función de rol";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarFuncionesRoles = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const funcionRol = await FuncionRol.findByPk(id as string);

    if (!funcionRol) {
      return res.status(404).json(errorResponse("Función de rol no encontrada"));
    }

    await funcionRol.destroy();

    return res.json(
      successResponse(null, "Función de rol eliminada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar la función de rol";
    return res.status(500).json(errorResponse(msg));
  }
};