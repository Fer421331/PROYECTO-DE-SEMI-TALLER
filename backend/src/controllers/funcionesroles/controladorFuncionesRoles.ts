import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import FuncionRol from '../../models/modeloFuncionRol.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

// Obtener todas las funciones de roles
export const obtenerFuncionesRoles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const funcionesRoles = await FuncionRol.findAll({
      order: [['fncod', 'ASC']],
    });

    return res.json(
      successResponse(funcionesRoles, 'Funciones de roles encontradas')
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al listar las funciones de roles';

    return res.status(500).json(errorResponse(msg));
  }
};

// Obtener una función de rol por sus códigos
export const obtenerFuncionesRolesPorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod, fncod } = req.query;

  try {
    const funcionRol = await FuncionRol.findOne({
      where: {
        rolescod: rolescod as string,
        fncod: fncod as string,
      },
    });

    if (!funcionRol) {
      return res.status(404).json(
        errorResponse('Función de rol no encontrada')
      );
    }

    return res.json(
      successResponse(funcionRol, 'Función de rol encontrada')
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al obtener la función de rol';

    return res.status(500).json(errorResponse(msg));
  }
};

// Crear una función de rol
export const crearFuncionesRoles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod, fncod, fnrolest, fnexp } = req.body;

  try {
    if (!rolescod || !fncod || !fnrolest) {
      return res.status(400).json(
        errorResponse(
          'El código del rol (rolescod), el código de función (fncod) y el estado (fnrolest) son obligatorios'
        )
      );
    }

    const nuevaFuncionRol = await FuncionRol.create({
      rolescod,
      fncod,
      fnrolest,
      fnexp: fnexp ?? null,
    });

    return res.status(201).json(
      successResponse(
        nuevaFuncionRol,
        'Función de rol creada correctamente'
      )
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al crear la función de rol';

    return res.status(500).json(errorResponse(msg));
  }
};

// Actualizar una función de rol
export const actualizarFuncionesRoles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod, fncod } = req.query;
  const {
    rolescod: nuevoRolescod,
    fncod: nuevoFncod,
    fnrolest,
    fnexp,
  } = req.body;

  try {
    const funcionRol = await FuncionRol.findOne({
      where: {
        rolescod: rolescod as string,
        fncod: fncod as string,
      },
    });

    if (!funcionRol) {
      return res.status(404).json(
        errorResponse('Función de rol no encontrada')
      );
    }

    if (nuevoRolescod !== undefined) {
      funcionRol.rolescod = nuevoRolescod;
    }

    if (nuevoFncod !== undefined) {
      funcionRol.fncod = nuevoFncod;
    }

    if (fnrolest !== undefined) {
      funcionRol.fnrolest = fnrolest;
    }

    if (fnexp !== undefined) {
      funcionRol.fnexp = fnexp;
    }

    await funcionRol.save();

    return res.json(
      successResponse(
        funcionRol,
        'Función de rol actualizada correctamente'
      )
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al actualizar la función de rol';

    return res.status(500).json(errorResponse(msg));
  }
};

// Eliminar una función de rol
export const eliminarFuncionesRoles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod, fncod } = req.query;

  try {
    const funcionRol = await FuncionRol.findOne({
      where: {
        rolescod: rolescod as string,
        fncod: fncod as string,
      },
    });

    if (!funcionRol) {
      return res.status(404).json(
        errorResponse('Función de rol no encontrada')
      );
    }

    await funcionRol.destroy();

    return res.json(
      successResponse(
        null,
        'Función de rol eliminada correctamente'
      )
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al eliminar la función de rol';

    return res.status(500).json(errorResponse(msg));
  }
};
