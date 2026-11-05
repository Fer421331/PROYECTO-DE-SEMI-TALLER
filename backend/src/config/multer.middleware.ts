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
    },
    fileFilter: (_req, archivo, callback) => {
        if (tiposPermitidos.includes(archivo.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Solo se permiten imágenes JPG, PNG o WEBP.'));
        }
    },
});
