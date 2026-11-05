import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { Readable } from 'node:stream';

const auth = new GoogleAuth({
  keyFile: process.env.GOOGLE_DRIVE_KEY_FILE,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
  version: 'v3',
  auth,
});

export const subirImagenDrive = async (archivo: Express.Multer.File) => {
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
  } catch (error) {
    await drive.files.delete({ fileId }).catch(() => undefined);
    throw error;
  }

  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

export const eliminarImagenDrive = async (url: string) => {
  const coincidencia = url.match(/[?&]id=([^&]+)/);

  if (!coincidencia) {
    throw new Error('No se pudo identificar el archivo de Google Drive');
  }

  await drive.files.delete({
    fileId: coincidencia[1],
  });
};
