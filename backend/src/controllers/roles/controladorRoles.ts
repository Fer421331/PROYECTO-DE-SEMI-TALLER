import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Role from '../../models/Roles.model.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const getAllRoles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await Role.findAll({
      order: [['rolescod', 'ASC']],
    });
    return res.json(successResponse(roles, "Roles encontrados"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar los roles";
    return res.status(500).json(errorResponse(msg));
  }
};

export const getRoleById = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod } = req.query;
  try {
    const role = await Role.findByPk(rolescod as string);
    if (!role) {
      return res.status(404).json(errorResponse("Rol no encontrado"));
    }
    return res.json(successResponse(role, "Rol encontrado"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener el rol por ID";
    return res.status(500).json(errorResponse(msg));
  }
};


export const createRole = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod, rolesdsc, rolesest = 'ACT' } = req.body;
  try {
    if (!rolescod || !rolesdsc) {
      return res.status(400).json(errorResponse("El código (rolescod) y la descripción (rolesdsc) son obligatorios"));
    }

    const nuevoRol = await Role.create({ 
      rolescod, 
      rolesdsc, 
      rolesest 
    });
    return res.status(201).json(successResponse(nuevoRol, "Rol creado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear el rol";
    return res.status(500).json(errorResponse(msg));
  }
};

export const updateRole = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod } = req.query;
  const { rolesdsc, rolesest } = req.body;
  try {
    const role = await Role.findByPk(rolescod as string);
    if (!role) {
      return res.status(404).json(errorResponse("Rol no encontrado"));
    }

    role.rolesdsc = rolesdsc ?? role.rolesdsc;
    if (rolesest !== undefined) role.rolesest = rolesest;

    await role.save();
    return res.json(successResponse(role, "Rol actualizado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar el rol";
    return res.status(500).json(errorResponse(msg));
  }
};

export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rolescod } = req.query;
  try {
    const role = await Role.findByPk(rolescod as string);
    if (!role) {
      return res.status(404).json(errorResponse("Rol no encontrado"));
    }
    await role.destroy();
    return res.json(successResponse(null, "Rol eliminado correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar el rol";
    return res.status(500).json(errorResponse(msg));
  }
};
