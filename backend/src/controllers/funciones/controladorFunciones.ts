import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Funcion from '../../models/modeloFuncion.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerFunciones = async (req: Request, res: Response): Promise<Response> => {
  try {
    const funciones = await Funcion.findAll({
      order: [['fncod', 'ASC']],
    });

    return res.json(successResponse(funciones, "Funciones encontradas"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar las funciones";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerFuncionesPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fncod } = req.query;

  try {
    const funcion = await Funcion.findByPk(fncod as string);

    if (!funcion) {
      return res.status(404).json(errorResponse("Función no encontrada"));
    }

    return res.json(successResponse(funcion, "Función encontrada"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener la función por ID";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearFunciones = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fncod, fndsc, fnest, fntyp } = req.body;

  try {
    if (!fncod || !fndsc || !fnest || !fntyp) {
      return res.status(400).json(
        errorResponse("El código (fncod), la descripción (fndsc), el estado (fnest) y el tipo (fntyp) son obligatorios")
      );
    }

    const nuevaFuncion = await Funcion.create({
      fncod,
      fndsc,
      fnest,
      fntyp,
    });

    return res.status(201).json(
      successResponse(nuevaFuncion, "Función creada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear la función";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarFunciones = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fncod } = req.query;
  const { fndsc, fnest, fntyp } = req.body;

  try {
    const funcion = await Funcion.findByPk(fncod as string);

    if (!funcion) {
      return res.status(404).json(errorResponse("Función no encontrada"));
    }

    funcion.fndsc = fndsc ?? funcion.fndsc;
    funcion.fnest = fnest ?? funcion.fnest;
    funcion.fntyp = fntyp ?? funcion.fntyp;

    await funcion.save();

    return res.json(
      successResponse(funcion, "Función actualizada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar la función";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarFunciones = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fncod } = req.query;

  try {
    const funcion = await Funcion.findByPk(fncod as string);

    if (!funcion) {
      return res.status(404).json(errorResponse("Función no encontrada"));
    }

    await funcion.destroy();

    return res.json(
      successResponse(null, "Función eliminada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar la función";
    return res.status(500).json(errorResponse(msg));
  }
};