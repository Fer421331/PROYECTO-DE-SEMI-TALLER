import type { Request, Response } from 'express';
import { enviarCorreoDePrueba } from '../../services/correo.service.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const enviarCorreoPrueba = async (req: Request, res: Response): Promise<Response> => {
  const { destinatario, asunto, mensaje } = req.body ?? {};

  if (
    typeof destinatario !== 'string' ||
    typeof asunto !== 'string' ||
    typeof mensaje !== 'string' ||
    !destinatario.trim() ||
    !asunto.trim() ||
    !mensaje.trim()
  ) {
    return res.status(400).json(
      errorResponse('Los campos destinatario, asunto y mensaje son obligatorios.')
    );
  }

  try {
    await enviarCorreoDePrueba(destinatario.trim(), asunto.trim(), mensaje.trim());
    return res.status(200).json(
      successResponse({ destinatario: destinatario.trim() }, 'Correo enviado correctamente.')
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo enviar el correo.';
    return res.status(500).json(errorResponse(message));
  }
};
