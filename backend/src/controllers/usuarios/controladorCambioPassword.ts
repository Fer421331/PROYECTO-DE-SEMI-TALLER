import bcrypt from "bcryptjs";
import { randomInt } from "node:crypto";
import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";
import { DB_LACTAXUME } from "../../config/db.js";
import Usuario from "../../models/Usuario.model.js";
import { enviarCodigoCambioPassword } from "../../services/correo.service.js";
import { errorResponse, successResponse } from "../../utils/sendResponses.js";
import CambioPassword from "../../models/CambioPassword.model.js";

const MINUTOS_EXPIRACION = 10;
const MAX_INTENTOS = 5;
const SEGUNDOS_ENTRE_SOLICITUDES = 60;

// PASO 1: solicitar el cambio y enviar el código
export const solicitarCambioPassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { useremail, password } = req.body;
  const mensajeGenerico =
    "Si el correo está registrado, se envió un código de verificación.";

  try {
    const usuario = await Usuario.findOne({
      where: { useremail: useremail.trim() },
    });

    // Respuesta genérica para no revelar qué correos existen
    if (!usuario || usuario.userest !== "ACT") {
      return res.json(successResponse(null, mensajeGenerico));
    }

    const mismaPassword = await bcrypt.compare(password, usuario.userpswd);
    if (mismaPassword) {
      return res
        .status(400)
        .json(
          errorResponse("La nueva contraseña no puede ser igual a la actual"),
        );
    }

    // Anti-spam: una solicitud por minuto
    const reciente = await CambioPassword.findOne({
      where: {
        usercod: usuario.usercod,
        cpest: "PEN",
        cpfchcrea: {
          [Op.gt]: new Date(Date.now() - SEGUNDOS_ENTRE_SOLICITUDES * 1000),
        },
      },
    });
    if (reciente) {
      return res
        .status(429)
        .json(
          errorResponse("Espera un momento antes de solicitar otro código"),
        );
    }

    // Cancelar solicitudes pendientes anteriores
    await CambioPassword.update(
      { cpest: "CAN" },
      { where: { usercod: usuario.usercod, cpest: "PEN" } },
    );

    const codigo = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const ahora = new Date();

    const registro = await CambioPassword.create({
      usercod: usuario.usercod,
      cpcodigo: await bcrypt.hash(codigo, 10),
      cppswd: await bcrypt.hash(password, 10),
      cpfchcrea: ahora,
      cpfchexp: new Date(ahora.getTime() + MINUTOS_EXPIRACION * 60 * 1000),
      cpintentos: 0,
      cpest: "PEN",
    });

    try {
      await enviarCodigoCambioPassword(
        usuario.useremail,
        usuario.username,
        codigo,
        MINUTOS_EXPIRACION,
      );
    } catch (errorCorreo) {
      await registro.destroy();
      console.error("Error enviando código:", errorCorreo);
      return res
        .status(500)
        .json(errorResponse("No se pudo enviar el correo con el código"));
    }

    return res.json(successResponse(null, mensajeGenerico));
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : "Error al solicitar el cambio de contraseña";
    return res.status(500).json(errorResponse(msg));
  }
};

// PASO 2: confirmar con el código y aplicar la contraseña
export const confirmarCambioPassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { useremail, codigo } = req.body;
  const errorGenerico = "Código inválido o expirado";

  try {
    const usuario = await Usuario.findOne({
      where: { useremail: useremail.trim() },
    });
    if (!usuario) {
      return res.status(400).json(errorResponse(errorGenerico));
    }

    const registro = await CambioPassword.findOne({
      where: { usercod: usuario.usercod, cpest: "PEN" },
      order: [["cpcod", "DESC"]],
    });

    if (!registro) {
      return res.status(400).json(errorResponse(errorGenerico));
    }

    if (registro.cpfchexp < new Date()) {
      await registro.update({ cpest: "EXP" });
      return res.status(400).json(errorResponse(errorGenerico));
    }

    if (registro.cpintentos >= MAX_INTENTOS) {
      await registro.update({ cpest: "CAN" });
      return res
        .status(400)
        .json(errorResponse("Demasiados intentos. Solicita un nuevo código"));
    }

    const codigoValido = await bcrypt.compare(
      String(codigo),
      registro.cpcodigo,
    );

    if (!codigoValido) {
      const intentos = registro.cpintentos + 1;
      await registro.update({
        cpintentos: intentos,
        cpest: intentos >= MAX_INTENTOS ? "CAN" : "PEN",
      });
      return res.status(400).json(errorResponse(errorGenerico));
    }

    await DB_LACTAXUME.transaction(async (t) => {
      await usuario.update(
        { userpswd: registro.cppswd, userpswdchg: null },
        { transaction: t },
      );
      await registro.update({ cpest: "USA" }, { transaction: t });
    });

    return res.json(
      successResponse(null, "Contraseña actualizada correctamente"),
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : "Error al confirmar el cambio de contraseña";
    return res.status(500).json(errorResponse(msg));
  }
};
