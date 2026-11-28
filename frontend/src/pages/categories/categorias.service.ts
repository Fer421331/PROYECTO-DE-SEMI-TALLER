import api from "../../services/api";

export interface Categoria {
  categoria_id: number;
  categoria_nombre: string;
  categoria_descripcion: string;
  categoria_estado: "ACT" | "INA";
  categoria_fecha_creacion: string;
  categoria_fecha_actualizacion: string;
}

export interface CategoriaInput {
  categoria_nombre: string;
  categoria_descripcion: string;
  categoria_estado: "ACT" | "INA";
}

interface ApiSuccess<T> {
  success: {
    code: number;
    data: T;
    message: { value: string };
  };
}

// Obtener todas
export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get<ApiSuccess<Categoria[]>>("/categorias/all");
  return response.data.success.data;
};

// Crear
export const createCategoria = async (
  data: CategoriaInput,
): Promise<Categoria> => {
  const response = await api.post<ApiSuccess<Categoria>>(
    "/categorias/create",
    data,
  );
  return response.data.success.data;
};

// Actualizar
export const updateCategoria = async (
  id: number,
  data: CategoriaInput,
): Promise<Categoria> => {
  const response = await api.put<ApiSuccess<Categoria>>(
    `/categorias/update?id=${id}`,
    data,
  );
  return response.data.success.data;
};

// Eliminar
export const deleteCategoria = async (id: number): Promise<void> => {
  await api.delete(`/categorias/delete?id=${id}`);
};
