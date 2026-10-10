import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse } from "../../utils/sendResponses.js";
import Usuario from "../../models/Usuario.model.js";

export const login = async (req: Request, res: Response) => {
  try {
    const ENV = process.env;
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json(errorResponse("Usuario y contraseña son requeridos"));
    }

    const usuarioEncontrado = await Usuario.findOne
    ({ where: 
      { username: user } }); 
    if (!usuarioEncontrado) {
      return res.status(401).json(errorResponse("Credenciales incorrectas"));
    }

    const isMatch = await bcrypt.compare(password, usuarioEncontrado.userpswd);
    if (!isMatch) {
      return res.status(401).json(errorResponse("Credenciales incorrectas"));
    }


const secretKey = ENV.JWT_SECRET;

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
        nombre: usuarioEncontrado.username
      }
    });

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error en el login";
    return res.status(500).json(errorResponse(msg));
  }
};
