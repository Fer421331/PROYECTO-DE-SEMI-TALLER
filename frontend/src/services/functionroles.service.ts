import api from "./api";

// Interfaces
export interface Rol {
    rolescod: string;
    rolesdsc: string;
    rolesest: "ACT" | "INA";
}

export interface Funcion {
    fncod: string;
    fndsc: string;
    fnest: "ACT" | "INA";
    fntyp: string;
}

export interface FuncionRol {
    rolescod: string;
    fncod: string;
    fnrolest: "ACT" | "INA";
    fnexp: string | null;
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

// Obtener todos los roles
export const getRoles = async (): Promise<Rol[]> => {
    const response = await api.get<ApiSuccess<Rol[]>>(
        "/roles/all"
    );

    return response.data.success.data;
};

// Obtener todas las funciones
export const getFunciones = async (): Promise<Funcion[]> => {
    const response = await api.get<ApiSuccess<Funcion[]>>(
        "/funciones/all"
    );

    return response.data.success.data;
};

// Obtener todas las funciones asignadas a roles
export const getFuncionesRoles = async (): Promise<FuncionRol[]> => {
    const response = await api.get<ApiSuccess<FuncionRol[]>>(
        "/funciones-roles/all"
    );

    return response.data.success.data;
};

// Crear asignación de función a rol
export const createFuncionRol = async (
    data: FuncionRol
): Promise<FuncionRol> => {

    const response = await api.post<ApiSuccess<FuncionRol>>(
        "/funciones-roles/create",
        data
    );

    return response.data.success.data;
};

// Actualizar asignación de función a rol
export const updateFuncionRol = async (
    rolescod: string,
    fncod: string,
    data: Partial<FuncionRol>
): Promise<FuncionRol> => {

    const response = await api.put<ApiSuccess<FuncionRol>>(
        `/funciones-roles/update?rolescod=${encodeURIComponent(rolescod)}&fncod=${encodeURIComponent(fncod)}`,
        data
    );

    return response.data.success.data;
};

// Eliminar asignación de función a rol
export const deleteFuncionRol = async (
    rolescod: string,
    fncod: string
): Promise<void> => {

    await api.delete(
        `/funciones-roles/delete?rolescod=${encodeURIComponent(rolescod)}&fncod=${encodeURIComponent(fncod)}`
    );

};
