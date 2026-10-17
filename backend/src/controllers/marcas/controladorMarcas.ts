import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Marca from '../../models/modeloMarca.js';
import { errorResponse, successResponse } from '../../utils/sendResponses.js';

export const obtenerMarcas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const marcas = await Marca.findAll({
      order: [['marca_id', 'ASC']],
    });

    return res.json(successResponse(marcas, "Marcas encontradas"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al listar las marcas";
    return res.status(500).json(errorResponse(msg));
  }
};

export const obtenerMarcaPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const marca = await Marca.findByPk(id as string);

    if (!marca) {
      return res.status(404).json(errorResponse("Marca no encontrada"));
    }

    return res.json(successResponse(marca, "Marca encontrada"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al obtener la marca";
    return res.status(500).json(errorResponse(msg));
  }
};

export const crearMarca = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { marca_nombre, marca_descripcion, marca_estado } = req.body;

  try {
    const nuevaMarca = await Marca.create({
      marca_nombre,
      marca_descripcion,
      marca_estado,
    });

    return res.status(201).json(
      successResponse(nuevaMarca, "Marca creada correctamente")
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear la marca";
    return res.status(500).json(errorResponse(msg));
  }
};

export const actualizarMarca = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const { marca_nombre, marca_descripcion, marca_estado } = req.body;

  try {
    const marca = await Marca.findByPk(id as string);

    if (!marca) {
      return res.status(404).json(errorResponse("Marca no encontrada"));
    }

    marca.marca_nombre = marca_nombre ?? marca.marca_nombre;
    marca.marca_descripcion = marca_descripcion ?? marca.marca_descripcion;
    marca.marca_estado = marca_estado ?? marca.marca_estado;
    marca.marca_fecha_actualizacion = new Date();

    await marca.save();

    return res.json(successResponse(marca, "Marca actualizada correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar la marca";
    return res.status(500).json(errorResponse(msg));
  }
};

export const eliminarMarca = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const marca = await Marca.findByPk(id as string);

    if (!marca) {
      return res.status(404).json(errorResponse("Marca no encontrada"));
    }

    await marca.destroy();

    return res.json(successResponse(null, "Marca eliminada correctamente"));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar la marca";
    return res.status(500).json(errorResponse(msg));
  }
};