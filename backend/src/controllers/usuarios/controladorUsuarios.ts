import argon2 from "argon2";
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Usuario from '../../models/Usuario.model.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerUsuarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: {
        exclude: ['userpswd', 'useractcod', 'userpswdchg'],
      },
      order: [['usercod', 'ASC']],
    });

    return res.json(successResponse(usuarios, 'Usuarios encontrados'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al listar los usuarios';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerUsuarioPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usercod } = req.query;

  try {
    const usuario = await Usuario.findOne({
      where: {
        usercod: usercod as string,
      },
      attributes: {
        exclude: ['userpswd', 'useractcod', 'userpswdchg'],
      },
    });

    if (!usuario) {
      return res.status(404).json(errorResponse('Usuario no encontrado'));
    }

    return res.json(successResponse(usuario, 'Usuario encontrado'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener el usuario';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearUsuario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    useremail,
    username,
    password,
    userpswdest,
    userpswdexp,
    userest,
    usertipo,
  } = req.body;

  try {
    if (
      typeof useremail !== 'string' ||
      !useremail.trim() ||
      typeof username !== 'string' ||
      !username.trim() ||
      typeof password !== 'string' ||
      !password
    ) {
      return res.status(400).json(
        errorResponse('El correo, nombre y contraseña son obligatorios')
      );
    }

    if (password.length < 8) {
      return res.status(400).json(
        errorResponse('La contraseña debe tener al menos 8 caracteres')
      );
    }

    const usuarioExistente = await Usuario.findOne({
      where: { useremail: useremail.trim() },
    });

    if (usuarioExistente) {
      return res.status(409).json(
        errorResponse('Ya existe un usuario con ese correo')
      );
    }

    const userpswd = await argon2.hash(password, {type: argon2.argon2id,});

    const nuevoUsuario = await Usuario.create({
      useremail: useremail.trim(),
      username: username.trim(),
      userpswd,
      userfching: new Date(),
      userpswdest: userpswdest ?? 'ACT',
      userpswdexp: userpswdexp ?? null,
      userest: userest ?? 'ACT',
      useractcod: null,
      userpswdchg: null,
      usertipo: usertipo ?? 'CLI',
    });

    const respuesta = nuevoUsuario.toJSON() as Record<string, unknown>;
    delete respuesta.userpswd;
    delete respuesta.useractcod;
    delete respuesta.userpswdchg;

    return res.status(201).json(
      successResponse(respuesta, 'Usuario creado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al crear el usuario';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarUsuario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usercod } = req.query;
  const { useremail, username, userpswdest, userpswdexp, userest, usertipo } = req.body;

  try {
    const usuario = await Usuario.findByPk(usercod as string);

    if (!usuario) {
      return res.status(404).json(errorResponse('Usuario no encontrado'));
    }

    if (useremail !== undefined) {
      if (typeof useremail !== 'string' || !useremail.trim()) {
        return res.status(400).json(errorResponse('El correo no es válido'));
      }

      const correoExistente = await Usuario.findOne({
        where: { useremail: useremail.trim() },
      });

      if (
        correoExistente &&
        String(correoExistente.get('usercod')) !== String(usercod)
      ) {
        return res.status(409).json(
          errorResponse('Ya existe un usuario con ese correo')
        );
      }

      usuario.useremail = useremail.trim();
    }

    if (username !== undefined) {
      if (typeof username !== 'string' || !username.trim()) {
        return res.status(400).json(errorResponse('El nombre no es válido'));
      }

      usuario.username = username.trim();
    }

    if (userpswdest !== undefined) usuario.userpswdest = userpswdest;
    if (userpswdexp !== undefined) usuario.userpswdexp = userpswdexp;
    if (userest !== undefined) usuario.userest = userest;
    if (usertipo !== undefined) usuario.usertipo = usertipo;

    await usuario.save();

    const respuesta = usuario.toJSON() as Record<string, unknown>;
    delete respuesta.userpswd;
    delete respuesta.useractcod;
    delete respuesta.userpswdchg;

    return res.json(
      successResponse(respuesta, 'Usuario actualizado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar el usuario';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarUsuario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usercod } = req.query;

  try {
    const usuario = await Usuario.findByPk(usercod as string);

    if (!usuario) {
      return res.status(404).json(errorResponse('Usuario no encontrado'));
    }

    await usuario.destroy();

    return res.json(
      successResponse(null, 'Usuario eliminado correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar el usuario';
    return res.status(500).json(errorResponse(msg));
  }
};