
import { google } from 'googleapis';

import {
  oauth2Client,
  cargarTokens,
} from '../config/googleOAuth.js';

import { Readable } from 'node:stream';

interface ImagenDrive {
  fileId: string;
  url: string;
}

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

const verificarAutorizacion = async (): Promise<void> => {
  const autorizado = await cargarTokens();

  if (!autorizado) {
    throw new Error(
      'Google Drive no está autorizado. Visita /auth/google'
    );
  }

  if (!oauth2Client.credentials.refresh_token) {
    throw new Error(
      'No existe un refresh token de Google Drive'
    );
  }
};

// Subir imagen
export const subirImagenDrive = async (
  archivo: Express.Multer.File
): Promise<ImagenDrive> => {

  await verificarAutorizacion();

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
 throw new Error('No se ha configurado el ID de la carpeta de Google Drive');
  }

  const respuesta = await drive.files.create({
    requestBody: {
      name: `${Date.now()}-${archivo.originalname}`,
      mimeType: archivo.mimetype,
      parents: [folderId],
    },
    media: {
      mimeType: archivo.mimetype,
      body: Readable.from(archivo.buffer),
    },
    fields: 'id, name',
  });

  const fileId = respuesta.data.id;

  if (!fileId) {
    throw new Error('Google Drive no devolvió el ID de la imagen');
  }

  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        type: 'anyone',
        role: 'reader',
      },
    });

    return {
      fileId,
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
    };

  } catch (error) {
 await drive.files.delete({ fileId }).catch(() => undefined);
    throw error;
  }
};

// Eliminar imagen
export const eliminarImagenDrive = async (
  fileId: string
): Promise<void> => {

  await verificarAutorizacion();

  await drive.files.delete({
    fileId,
  });
};
