import { Request, Response, NextFunction } from "express";
import passport from "../config/passport.js";
import { errorResponse } from "../utils/sendResponses.js";

export const verificarToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: Express.User | false, info: unknown) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        const message = info instanceof Error && info.message === "No auth token"
          ? "Acceso denegado. Token no proporcionado."
          : "Token inválido o expirado.";

        return res.status(401).json(errorResponse(message));
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};