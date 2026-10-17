
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Categoria from '../../models/modeloCategoria.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

// Obtener todas las categorías
export const obtenerCategorias = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categorias = await Categoria.findAll({
      order: [['categoria_id', 'ASC']],
    });

    return res.json(
      successResponse(categorias, 'Categorías encontradas')
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al listar las categorías';

    return res.status(500).json(errorResponse(msg));
  }
};

// Obtener categoría por ID
export const obtenerCategoriaPorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const categoria = await Categoria.findByPk(id as string);

    if (!categoria) {
      return res.status(404).json(
        errorResponse('Categoría no encontrada')
      );
    }

    return res.json(
      successResponse(categoria, 'Categoría encontrada')
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al obtener la categoría por ID';

    return res.status(500).json(errorResponse(msg));
  }
};

// Crear categoría
export const crearCategoria = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    categoria_nombre,
    categoria_descripcion,
    categoria_estado,
  } = req.body;

  try {
    // Validación adicional de los datos
    if (
      typeof categoria_nombre !== 'string' ||
      !categoria_nombre.trim() ||
      categoria_nombre.length > 100
    ) {
      return res.status(400).json(
        errorResponse(
          'El nombre es obligatorio y no puede superar los 100 caracteres'
        )
      );
    }

    if (!['ACT', 'INA'].includes(categoria_estado)) {
      return res.status(400).json(
        errorResponse('El estado debe ser ACT o INA')
      );
    }

    const nuevaCategoria = await Categoria.create({
      categoria_nombre: categoria_nombre.trim(),
      categoria_descripcion,
      categoria_estado,
      categoria_fecha_creacion: new Date(),
      categoria_fecha_actualizacion: new Date(),
    });

    return res.status(201).json(
      successResponse(
        nuevaCategoria,
        'Categoría creada correctamente'
      )
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al crear la categoría';

    return res.status(500).json(errorResponse(msg));
  }
};

// Actualizar categoría
export const actualizarCategoria = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  const {
    categoria_nombre,
    categoria_descripcion,
    categoria_estado,
  } = req.body;

  try {
    const categoria = await Categoria.findByPk(id as string);

    if (!categoria) {
      return res.status(404).json(
        errorResponse('Categoría no encontrada')
      );
    }

    // Validar el nombre si se envía
    if (categoria_nombre !== undefined) {
      if (
        typeof categoria_nombre !== 'string' ||
        !categoria_nombre.trim() ||
        categoria_nombre.length > 100
      ) {
        return res.status(400).json(
          errorResponse(
            'El nombre no puede estar vacío ni superar los 100 caracteres'
          )
        );
      }

      categoria.categoria_nombre = categoria_nombre.trim();
    }

    // Validar el estado si se envía
    if (categoria_estado !== undefined) {
      if (!['ACT', 'INA'].includes(categoria_estado)) {
        return res.status(400).json(
          errorResponse('El estado debe ser ACT o INA')
        );
      }

      categoria.categoria_estado = categoria_estado;
    }

    // Actualizar la descripción si se envía
    if (categoria_descripcion !== undefined) {
      if (
        categoria_descripcion !== null &&
        typeof categoria_descripcion !== 'string'
      ) {
        return res.status(400).json(
          errorResponse('La descripción debe ser texto o null')
        );
      }

      categoria.categoria_descripcion = categoria_descripcion;
    }

    categoria.categoria_fecha_actualizacion = new Date();

    await categoria.save();

    return res.json(
      successResponse(
        categoria,
        'Categoría actualizada correctamente'
      )
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Error al actualizar la categoría';

    return res.status(500).json(errorResponse(msg));
  }
};

// Eliminar categoría
export const eliminarCategoria = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const categoria = await Categoria.findByPk(id as string);

    if (!categoria) {
      return res.status(404).json(
        errorResponse('Categoría no encontrada')
      );
    }

    await categoria.destroy();

    return res.json(
      successResponse(null, 'Categoría eliminada correctamente')
    );
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : 'No se pudo eliminar la categoría. Puede tener productos relacionados.';

    return res.status(409).json(errorResponse(msg));
  }
};
