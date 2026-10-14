import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import RolUsuario from '../../models/modeloRolUsuario.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerRolesUsuarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const rolesUsuarios = await RolUsuario.findAll({
      order: [['usercod', 'ASC']],
    });

    return res.json(successResponse(rolesUsuarios, 'Roles de usuarios encontrados'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al listar los roles de usuarios';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerRolesUsuariosPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usercod, rolescod } = req.query;

  try {
    const rolUsuario = await RolUsuario.findOne({
      where: {
        usercod: usercod as string,
        rolescod: rolescod as string,
      },
    });

    if (!rolUsuario) {
      return res.status(404).json(errorResponse('Rol de usuario no encontrado'));
    }

    return res.json(successResponse(rolUsuario, 'Rol de usuario encontrado'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener el rol de usuario';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearRolesUsuarios = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usercod, rolescod, roleuserest, roleuserfch, roleuserexp } = req.body;

  try {
    if (!usercod || !rolescod || !roleuserest) {
      return res.status(400).json(
        errorResponse('Los campos usercod, rolescod y roleuserest son obligatorios')
      );
    }

    const nuevoRolUsuario = await RolUsuario.create({
      usercod,
      rolescod,
      roleuserest,
      roleuserfch,
      roleuserexp,
    });

    return res.status(201).json(
      successResponse(nuevoRolUsuario, 'Rol de usuario creado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al crear el rol de usuario';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarRolesUsuarios = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usercod, rolescod } = req.query;
  const { roleuserest, roleuserfch, roleuserexp } = req.body;

  try {
    const rolUsuario = await RolUsuario.findOne({
      where: {
        usercod: usercod as string,
        rolescod: rolescod as string,
      },
    });

    if (!rolUsuario) {
      return res.status(404).json(errorResponse('Rol de usuario no encontrado'));
    }

    rolUsuario.roleuserest = roleuserest ?? rolUsuario.roleuserest;
    rolUsuario.roleuserfch = roleuserfch ?? rolUsuario.roleuserfch;
    rolUsuario.roleuserexp = roleuserexp ?? rolUsuario.roleuserexp;

    await rolUsuario.save();

    return res.json(
      successResponse(rolUsuario, 'Rol de usuario actualizado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar el rol de usuario';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarRolesUsuarios = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usercod, rolescod } = req.query;

  try {
    const rolUsuario = await RolUsuario.findOne({
      where: {
        usercod: usercod as string,
        rolescod: rolescod as string,
      },
    });

    if (!rolUsuario) {
      return res.status(404).json(errorResponse('Rol de usuario no encontrado'));
    }

    await rolUsuario.destroy();

    return res.json(
      successResponse(null, 'Rol de usuario eliminado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar el rol de usuario';
    return res.status(500).json(errorResponse(msg));
  }
};
