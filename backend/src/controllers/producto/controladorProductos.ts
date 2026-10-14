
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  ForeignKeyConstraintError,
  ValidationError,
  UniqueConstraintError,
} from 'sequelize';

import Producto from '../../models/modeloProducto.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerProductos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productos = await Producto.findAll({
      order: [['producto_id', 'ASC']],
    });

    return res.json(successResponse(productos, 'Productos obtenidos correctamente'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener los productos';
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerProductoPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const producto = await Producto.findByPk(id as string);

    if (!producto) {
      return res.status(404).json(errorResponse('Producto no encontrado'));
    }

    return res.json(successResponse(producto, 'Producto obtenido correctamente'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error al obtener el producto';
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearProducto = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    categoria_id,
    marca_id,
    producto_sku,
    producto_nombre,
    producto_slug,
    producto_descripcion,
    producto_costo,
    producto_precio,
    producto_stock,
    producto_activo,
    producto_estado,
  } = req.body;

  try {
    if (
      categoria_id == null ||
      marca_id == null ||
      !producto_sku ||
      !producto_nombre ||
      !producto_slug ||
      producto_costo == null ||
      producto_precio == null ||
      producto_stock == null ||
      producto_activo == null ||
      !producto_estado
    ) {
      return res.status(400).json(
        errorResponse('Faltan campos obligatorios para crear el producto')
      );
    }

    const producto = await Producto.create({
      categoria_id,
      marca_id,
      producto_sku,
      producto_nombre,
      producto_slug,
      producto_descripcion,
      producto_costo,
      producto_precio,
      producto_stock,
      producto_activo,
      producto_estado,
    });

    return res.status(201).json(
      successResponse(producto, 'Producto creado correctamente')
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json(
        errorResponse(error.errors.map((e) => e.message).join(', '))
      );
    }

    if (error instanceof ForeignKeyConstraintError) {
      return res.status(400).json(
        errorResponse('La categoría o marca indicada no existe')
      );
    }

    if (error instanceof UniqueConstraintError) {
      return res.status(409).json(
        errorResponse('Ya existe un producto con alguno de los valores únicos enviados')
      );
    }

    const msg = error instanceof Error ? error.message : 'Error al crear el producto';
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarProducto = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const {
    categoria_id,
    marca_id,
    producto_sku,
    producto_nombre,
    producto_slug,
    producto_descripcion,
    producto_costo,
    producto_precio,
    producto_stock,
    producto_activo,
    producto_estado,
  } = req.body;

  try {
    const producto = await Producto.findByPk(id as string);

    if (!producto) {
      return res.status(404).json(errorResponse('Producto no encontrado'));
    }

    producto.categoria_id = categoria_id ?? producto.categoria_id;
    producto.marca_id = marca_id ?? producto.marca_id;
    producto.producto_sku = producto_sku ?? producto.producto_sku;
    producto.producto_nombre = producto_nombre ?? producto.producto_nombre;
    producto.producto_slug = producto_slug ?? producto.producto_slug;
    producto.producto_descripcion = producto_descripcion ?? producto.producto_descripcion;
    producto.producto_costo = producto_costo ?? producto.producto_costo;
    producto.producto_precio = producto_precio ?? producto.producto_precio;
    producto.producto_stock = producto_stock ?? producto.producto_stock;
    producto.producto_activo = producto_activo ?? producto.producto_activo;
    producto.producto_estado = producto_estado ?? producto.producto_estado;
    producto.producto_fecha_actualizacion = new Date();

    await producto.save();

    return res.json(successResponse(producto, 'Producto actualizado correctamente'));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json(
        errorResponse(error.errors.map((e) => e.message).join(', '))
      );
    }

    if (error instanceof ForeignKeyConstraintError) {
      return res.status(400).json(
        errorResponse('La categoría o marca indicada no existe')
      );
    }

    if (error instanceof UniqueConstraintError) {
      return res.status(409).json(
        errorResponse('Ya existe un producto con alguno de los valores únicos enviados')
      );
    }

    const msg = error instanceof Error ? error.message : 'Error al actualizar el producto';
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarProducto = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const producto = await Producto.findByPk(id as string);

    if (!producto) {
      return res.status(404).json(errorResponse('Producto no encontrado'));
    }

    await producto.destroy();

    return res.json(successResponse(null, 'Producto eliminado correctamente'));
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      return res.status(409).json(
        errorResponse('No se pudo eliminar el producto porque tiene registros relacionados')
      );
    }

    const msg = error instanceof Error ? error.message : 'Error al eliminar el producto';
    return res.status(500).json(errorResponse(msg));
  }
};