import api from "./api";

export interface Funcion {
    fncod: string;
    fndsc: string;
    fnest: string;
    fntyp: string;
}

export interface FuncionInput {
    fncod: string;
    fndsc: string;
    fnest: string;
    fntyp: string;
}

export type FuncionUpdate = Partial<
    Omit<FuncionInput, "fncod">
>;

interface ApiSuccess<T> {
    success: {
        code: number;
        data: T;
        message: {
            value: string;
        };
    };
}

// Obtener todas las funciones
export const getFunciones = async (): Promise<Funcion[]> => {
    const response = await api.get<ApiSuccess<Funcion[]>>(
        "/funciones/all"
    );

    return response.data.success.data;
};

// Obtener una función por código
export const getFuncionById = async (
    fncod: string
): Promise<Funcion> => {
    const response = await api.get<ApiSuccess<Funcion>>(
        "/funciones/one",
        {
            params: { fncod }
        }
    );

    return response.data.success.data;
};

// Crear función
export const createFuncion = async (
    data: FuncionInput
): Promise<Funcion> => {
    const response = await api.post<ApiSuccess<Funcion>>(
        "/funciones/create",
        data
    );

    return response.data.success.data;
};

// Actualizar función
export const updateFuncion = async (
    fncod: string,
    data: FuncionUpdate
): Promise<Funcion> => {
    const response = await api.put<ApiSuccess<Funcion>>(
        "/funciones/update",
        data,
        {
            params: { fncod }
        }
    );

    return response.data.success.data;
};

// Eliminar función
export const deleteFuncion = async (
    fncod: string
): Promise<void> => {
    await api.delete("/funciones/delete", {
        params: { fncod }
    });
};