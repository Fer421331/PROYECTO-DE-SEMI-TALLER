import api from "./api";

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
        message: {
            value: string;
        };
    };
}

// Obtener todas las categorías
export const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get<ApiSuccess<Categoria[]>>(
        "/categorias/all"
    );

    return response.data.success.data;
};

// Obtener una categoría por ID
export const getCategoriaById = async (
    id: number
): Promise<Categoria> => {
    const response = await api.get<ApiSuccess<Categoria>>(
        `/categorias/one?id=${id}`
    );

    return response.data.success.data;
};

// Crear categoría
export const createCategoria = async (
    data: CategoriaInput
): Promise<Categoria> => {
    const response = await api.post<ApiSuccess<Categoria>>(
        "/categorias/create",
        data
    );

    return response.data.success.data;
};

// Actualizar categoría
export const updateCategoria = async (
    id: number,
    data: CategoriaInput
): Promise<Categoria> => {
    const response = await api.put<ApiSuccess<Categoria>>(
        `/categorias/update?id=${id}`,
        data
    );

    return response.data.success.data;
};

// Eliminar categoría
export const deleteCategoria = async (
    id: number
): Promise<void> => {
    await api.delete(`/categorias/delete?id=${id}`);
};