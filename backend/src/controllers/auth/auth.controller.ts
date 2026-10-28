
import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { errorResponse } from "../../utils/sendResponses.js";
import Usuario from "../../models/Usuario.model.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res
        .status(400)
        .json(errorResponse("Usuario y contraseña son requeridos"));
    }

    const usuarioEncontrado = await Usuario.findOne({
      where: { username: user },
    });

    if (!usuarioEncontrado) {
      return res
        .status(401)
        .json(errorResponse("Credenciales incorrectas"));
    }

    // Verificar la contraseña con Argon2
    const isMatch = await argon2.verify(
      usuarioEncontrado.userpswd,
      password
    );

    if (!isMatch) {
      return res
        .status(401)
        .json(errorResponse("Credenciales incorrectas"));
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error("JWT_SECRET no está configurado");
    }

    // Generar el JWT
    const token = jwt.sign(
      { Id: usuarioEncontrado.usercod },
      secretKey,
      { expiresIn: "8h" }
    );

    return res.json({
      ok: true,
      token,
      user: {
        id: usuarioEncontrado.usercod,
        email: usuarioEncontrado.useremail,
        nombre: usuarioEncontrado.username,
      },
    });
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Error en el login";

    return res.status(500).json(errorResponse(msg));
  }
};
