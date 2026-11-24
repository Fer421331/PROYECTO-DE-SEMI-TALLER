
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import fs from 'node:fs/promises';
import path from 'node:path';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  throw new Error(
    'Faltan las variables de entorno de Google OAuth'
  );
}

export const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Archivo donde guardaremos los tokens
const TOKEN_PATH = path.resolve(
  process.cwd(),
  'credentials',
  'google-token.json'
);

// Guardar tokens
export const guardarTokens = async (
  tokens: object
): Promise<void> => {

  await fs.mkdir(path.dirname(TOKEN_PATH), {
    recursive: true,
  });

  let tokensAnteriores = {};

  try {
    const contenido = await fs.readFile(
      TOKEN_PATH,
      'utf-8'
    );

    tokensAnteriores = JSON.parse(contenido);

  } catch {

  }

  await fs.writeFile(
    TOKEN_PATH,
    JSON.stringify({
      ...tokensAnteriores,
      ...tokens,
    }, null, 2),
    { mode: 0o600 }
  );
};

// Cargar tokens existentes
export const cargarTokens = async (): Promise<boolean> => {

  try {
    const contenido = await fs.readFile(
      TOKEN_PATH,
      'utf-8'
    );

    const tokens = JSON.parse(contenido);

    oauth2Client.setCredentials(tokens);

    return true;

  } catch {
    return false;
  }
};

// url auth
export const obtenerUrlAutorizacion = (): string => {

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',

    prompt: 'consent',

    scope: [
      'https://www.googleapis.com/auth/drive',
    ],
  });
};
