import multer, { type FileFilterCallback } from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const uploadDirectory = path.resolve(process.cwd(), 'public', 'uploads', 'productos');
fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeExtension = ['.jpg', '.jpeg', '.png', '.webp'].includes(extension)
      ? extension
      : (file.mimetype === 'image/png' ? '.png' : file.mimetype === 'image/webp' ? '.webp' : '.jpg');
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExtension}`;
    callback(null, uniqueName);
  },
});

const fileFilter = (_req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (allowedMimeTypes.has(file.mimetype)) {
    callback(null, true);
    return;
  }
  callback(new Error('Formato no permitido. Utilice JPG, PNG o WEBP.'));
};

export const uploadImagen = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});
