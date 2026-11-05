
import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

import {
  oauth2Client,
  obtenerUrlAutorizacion,
  guardarTokens,
} from '../../config/googleOAuth.js';

const estadosOAuth = new Map<string, number>();

export const iniciarAutorizacionGoogle = (
  _req: Request,
  res: Response
): void => {

  const state = randomUUID();

  estadosOAuth.set(state, Date.now());

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/drive',
    ],
    state,
  });

  res.redirect(url);
};

export const callbackGoogle = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { code, state, error } = req.query;

    if (error) {
      res.status(400).send(
        'No se autorizó el acceso a Google Drive.'
      );
      return;
    }

    if (
      typeof state !== 'string' ||
      !estadosOAuth.has(state)
    ) {
      res.status(400).send(
        'Estado OAuth inválido o expirado.'
      );
      return;
    }

    const fechaEstado = estadosOAuth.get(state)!;

    estadosOAuth.delete(state);

    if (Date.now() - fechaEstado > 5 * 60 * 1000) {
      res.status(400).send(
        'La autorización ha expirado. Inténtalo nuevamente.'
      );
      return;
    }

    if (typeof code !== 'string') {
      res.status(400).send(
        'Google no devolvió el código de autorización.'
      );
      return;
    }

    // Intercambiar código por tokens
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      res.status(400).send(
        'No se recibió refresh token. Vuelve a autorizar con consentimiento.'
      );
      return;
    }

    // Guardar credenciales
    await guardarTokens(tokens);

    oauth2Client.setCredentials(tokens);

    res.status(200).send(`
      <h2>¡Google Drive conectado correctamente!</h2>
      <p>Tu backend ya está autorizado para acceder a Google Drive.</p>
      <p>Puedes cerrar esta ventana.</p>
    `);

  } catch (error) {

    console.error(
      'Error en la autenticación de Google:',
      error
    );

    res.status(500).send(
      'Error al completar la autenticación con Google.'
    );
  }
};
