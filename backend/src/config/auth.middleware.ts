import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/sendResponses.js";

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token del header 'Authorization'
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Separa el "Bearer TOKEN"

  if (!token) {
    return res.status(401).json(errorResponse("Acceso denegado. Token no proporcionado."));
  }

  try {
    const secretKey = process.env.JWT_SECRET || "tu_clave_secreta_super_segura";
    
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json(errorResponse("Token inválido o expirado."));
  }
};
