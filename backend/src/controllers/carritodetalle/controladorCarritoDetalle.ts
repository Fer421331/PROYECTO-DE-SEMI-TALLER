import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from 'sequelize';

import { DB_LACTAXUME } from '../../config/db.js';
import Carrito from '../../models/modeloCarrito.js';
import CarritoDetalle from '../../models/modeloCarritoDetalle.js';
import Producto from '../../models/modeloProducto.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

class ErrorNegocio extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const redondear = (n: number): number => Math.round(n * 100) / 100;

const manejarError = (error: unknown, res: Response, mensajePorDefecto: string): Response => {
  if (error instanceof ErrorNegocio) {
    return res.status(error.status).json(errorResponse(error.message));
  }
  if (error instanceof ForeignKeyConstraintError) {
    return res.status(400).json(errorResponse('El carrito o el producto indicado no existe'));
  }
  if (error instanceof UniqueConstraintError) {
    return res.status(409).json(errorResponse('Ese producto ya está en el carrito'));
  }
  if (error instanceof ValidationError) {
    return res.status(400).json(errorResponse(error.errors.map((e) => e.message).join(', ')));
  }
  console.error(mensajePorDefecto, error);
  const msg = error instanceof Error ? error.message || error.name : mensajePorDefecto;
  return res.status(500).json(errorResponse(msg || mensajePorDefecto));
};

export const obtenerCarritoDetalle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const detalles = await CarritoDetalle.findAll({
      order: [['detalle_id', 'ASC']],
    });
    return res.json(successResponse(detalles, 'Detalles del carrito encontrados'));
  } catch (error) {
    return manejarError(error, res, 'Error al listar los detalles del carrito');
  }
};

export const obtenerCarritoDetallePorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const detalle = await CarritoDetalle.findByPk(id as string);
    if (!detalle) {
      return res.status(404).json(errorResponse('Detalle del carrito no encontrado'));
    }
    return res.json(successResponse(detalle, 'Detalle del carrito encontrado'));
  } catch (error) {
    return manejarError(error, res, 'Error al obtener el detalle del carrito por ID');
  }
};

export const crearCarritoDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const carrito_id = Number(req.body.carrito_id);
  const producto_id = Number(req.body.producto_id);
  const cantidad = Number(req.body.cantidad);

  try {
    const { detalle, creado } = await DB_LACTAXUME.transaction(async (t) => {
      const carrito = await Carrito.findByPk(carrito_id, { transaction: t });
      if (!carrito) {
        throw new ErrorNegocio(404, 'El carrito no existe');
      }
      if (String(carrito.carrito_estado).trim() !== 'ACT') {
        throw new ErrorNegocio(409, 'El carrito no está activo');
      }

      const producto = await Producto.findByPk(producto_id, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!producto) {
        throw new ErrorNegocio(404, 'El producto no existe');
      }
      if (
        String(producto.producto_activo).trim() !== 'ACT' ||
        String(producto.producto_estado).trim() !== 'ACT'
      ) {
        throw new ErrorNegocio(409, 'El producto no está disponible');
      }

      const existente = await CarritoDetalle.findOne({
        where: { carrito_id, producto_id },
        transaction: t,
      });

      const cantidadTotal = cantidad + (existente ? Number(existente.cantidad) : 0);
      if (cantidadTotal > producto.producto_stock) {
        throw new ErrorNegocio(409, `Stock insuficiente. Disponible: ${producto.producto_stock}`);
      }

      const precio = Number(producto.producto_precio);
      const subtotal = redondear(precio * cantidadTotal);

      carrito.carrito_fecha_actualizacion = new Date();
      await carrito.save({ transaction: t });

      if (existente) {
        existente.cantidad = cantidadTotal;
        existente.precio_unitario = precio;
        existente.subtotal = subtotal;
        await existente.save({ transaction: t });
        return { detalle: existente, creado: false };
      }

      const nuevo = await CarritoDetalle.create(
        { carrito_id, producto_id, cantidad: cantidadTotal, precio_unitario: precio, subtotal },
        { transaction: t }
      );
      return { detalle: nuevo, creado: true };
    });

    return res
      .status(creado ? 201 : 200)
      .json(
        successResponse(
          detalle,
          creado
            ? 'Detalle del carrito creado correctamente'
            : 'El producto ya estaba en el carrito, se sumó la cantidad'
        )
      );
  } catch (error) {
    return manejarError(error, res, 'Error al crear el detalle del carrito');
  }
};

export const actualizarCarritoDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const cantidad = Number(req.body.cantidad);

  try {
    const detalle = await DB_LACTAXUME.transaction(async (t) => {
      const actual = await CarritoDetalle.findByPk(id as string, { transaction: t });
      if (!actual) {
        throw new ErrorNegocio(404, 'Detalle del carrito no encontrado');
      }

      const producto = await Producto.findByPk(actual.producto_id, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!producto) {
        throw new ErrorNegocio(404, 'El producto ya no existe');
      }
      if (cantidad > producto.producto_stock) {
        throw new ErrorNegocio(409, `Stock insuficiente. Disponible: ${producto.producto_stock}`);
      }

      const precio = Number(producto.producto_precio);
      actual.cantidad = cantidad;
      actual.precio_unitario = precio;
      actual.subtotal = redondear(precio * cantidad);
      await actual.save({ transaction: t });

      return actual;
    });

    return res.json(successResponse(detalle, 'Detalle del carrito actualizado correctamente'));
  } catch (error) {
    return manejarError(error, res, 'Error al actualizar el detalle del carrito');
  }
};

export const eliminarCarritoDetalle = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const detalle = await CarritoDetalle.findByPk(id as string);
    if (!detalle) {
      return res.status(404).json(errorResponse('Detalle del carrito no encontrado'));
    }

    await detalle.destroy();

    return res.json(successResponse(null, 'Detalle del carrito eliminado correctamente'));
  } catch (error) {
    return manejarError(error, res, 'Error al eliminar el detalle del carrito');
  }
};