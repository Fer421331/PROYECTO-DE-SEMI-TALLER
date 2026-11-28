import multer from 'multer';

const almacenamiento = multer.memoryStorage();

const tiposPermitidos = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

export const subirArchivo = multer({
  storage: almacenamiento,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (_req, archivo, callback) => {
    if (tiposPermitidos.includes(archivo.mimetype)) {
      return callback(null, true);
    }

    return callback(
      new Error('Solo se permiten imágenes JPG, PNG o WEBP.')
    );
  },
});
