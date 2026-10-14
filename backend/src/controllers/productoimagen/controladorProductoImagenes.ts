import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ProductoImagen from '../../models/modeloProductoImagen.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerProductoImagenes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productoImagenes = await ProductoImagen.findAll({
      order: [['imagen_id', 'ASC']],
    });

    return res.json(successResponse(productoImagenes, 'Imágenes de productos encontradas'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al listar las imágenes de productos';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerProductoImagenePorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const productoImagen = await ProductoImagen.findByPk(id as string);

    if (!productoImagen) {
      return res.status(404).json(errorResponse('Imagen de producto no encontrada'));
    }

    return res.json(successResponse(productoImagen, 'Imagen de producto encontrada'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener la imagen de producto';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearProductoImagene = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    producto_id,
    imagen_ruta,
    imagen_principal,
    imagen_orden,
    imagen_estado,
  } = req.body;

  try {
    if (
      producto_id == null ||
      !imagen_ruta ||
      imagen_principal == null ||
      imagen_orden == null ||
      !imagen_estado
    ) {
      return res.status(400).json(
        errorResponse('Los campos producto_id, imagen_ruta, imagen_principal, imagen_orden e imagen_estado son obligatorios')
      );
    }

    const nuevaImagen = await ProductoImagen.create({
      producto_id,
      imagen_ruta,
      imagen_principal,
      imagen_orden,
      imagen_estado,
    });

    return res.status(201).json(
      successResponse(nuevaImagen, 'Imagen de producto creada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al crear la imagen de producto';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarProductoImagene = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const {
    producto_id,
    imagen_ruta,
    imagen_principal,
    imagen_orden,
    imagen_estado,
  } = req.body;

  try {
    const productoImagen = await ProductoImagen.findByPk(id as string);

    if (!productoImagen) {
      return res.status(404).json(errorResponse('Imagen de producto no encontrada'));
    }

    productoImagen.producto_id = producto_id ?? productoImagen.producto_id;
    productoImagen.imagen_ruta = imagen_ruta ?? productoImagen.imagen_ruta;
    productoImagen.imagen_principal = imagen_principal ?? productoImagen.imagen_principal;
    productoImagen.imagen_orden = imagen_orden ?? productoImagen.imagen_orden;
    productoImagen.imagen_estado = imagen_estado ?? productoImagen.imagen_estado;

    await productoImagen.save();

    return res.json(
      successResponse(productoImagen, 'Imagen de producto actualizada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al actualizar la imagen de producto';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarProductoImagene = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const productoImagen = await ProductoImagen.findByPk(id as string);

    if (!productoImagen) {
      return res.status(404).json(errorResponse('Imagen de producto no encontrada'));
    }

    await productoImagen.destroy();

    return res.json(
      successResponse(null, 'Imagen de producto eliminada correctamente')
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al eliminar la imagen de producto';
    return res.status(500).json(errorResponse(msg));
  }
};