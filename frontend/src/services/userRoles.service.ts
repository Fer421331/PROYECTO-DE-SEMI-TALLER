import api from "./api";

export interface Rol {
    rolescod: string;
    rolesdsc: string;
    rolesest: "ACT" | "INA";
}

export interface RolUsuario {
    usercod: number;
    rolescod: string;
    roleuserest: "ACT" | "INA";
    roleuserfch: string;
    roleuserexp: string | null;
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

// Obtener todas las asignaciones de roles
export const getRolesUsuarios = async (): Promise<RolUsuario[]> => {
    const response = await api.get<ApiSuccess<RolUsuario[]>>(
        "/roles-usuarios/all"
    );

    return response.data.success.data;
};

// Asignar rol a usuario
export const createRolUsuario = async (
    data: RolUsuario
): Promise<RolUsuario> => {
    const response = await api.post<ApiSuccess<RolUsuario>>(
        "/roles-usuarios/create",
        data
    );

    return response.data.success.data;
};

// Actualizar asignación
export const updateRolUsuario = async (
    usercod: number,
    rolescod: string,
    data: Partial<RolUsuario>
): Promise<RolUsuario> => {
    const response = await api.put<ApiSuccess<RolUsuario>>(
        `/roles-usuarios/update?usercod=${usercod}&rolescod=${rolescod}`,
        data
    );

    return response.data.success.data;
};

// Eliminar asignación
export const deleteRolUsuario = async (
    usercod: number,
    rolescod: string
): Promise<void> => {
    await api.delete(
        `/roles-usuarios/delete?usercod=${usercod}&rolescod=${rolescod}`
    );
};
