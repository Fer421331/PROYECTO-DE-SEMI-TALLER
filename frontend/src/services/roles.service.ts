import api from "./api";

export interface Rol {
    rolescod: string;
    rolesdsc: string;
    rolesest: "ACT" | "INA";
}

export interface RolInput {
    rolescod: string;
    rolesdsc: string;
    rolesest: "ACT" | "INA";
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

// Obtener un rol por código
export const getRolById = async (
    rolescod: string
): Promise<Rol> => {
    const response = await api.get<ApiSuccess<Rol>>(
        `/roles/one?rolescod=${encodeURIComponent(rolescod)}`
    );

    return response.data.success.data;
};

// Crear rol
export const createRol = async (
    data: RolInput
): Promise<Rol> => {
    const response = await api.post<ApiSuccess<Rol>>(
        "/roles/create",
        data
    );

    return response.data.success.data;
};

// Actualizar rol
export const updateRol = async (
    rolescod: string,
    data: Omit<RolInput, "rolescod">
): Promise<Rol> => {
    const response = await api.put<ApiSuccess<Rol>>(
        `/roles/update?rolescod=${encodeURIComponent(rolescod)}`,
        data
    );

    return response.data.success.data;
};

// Eliminar rol
export const deleteRol = async (
    rolescod: string
): Promise<void> => {
    await api.delete(
        `/roles/delete?rolescod=${encodeURIComponent(rolescod)}`
    );
};
