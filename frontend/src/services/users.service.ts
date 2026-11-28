import api from "./api";

export interface Usuario {
    usercod: number;
    useremail: string;
    username: string;
    userfching: string;
    userpswdest: "ACT" | "INA";
    userpswdexp: string | null;
    userest: "ACT" | "INA";
    usertipo: "ADM" | "CLI";
}

export interface UsuarioInput {
    useremail: string;
    username: string;
    password: string;
    userpswdest?: "ACT" | "INA";
    userpswdexp?: string | null;
    userest?: "ACT" | "INA";
    usertipo?: "ADM" | "CLI";
}

export interface UsuarioUpdateInput {
    useremail?: string;
    username?: string;
    userpswdest?: "ACT" | "INA";
    userpswdexp?: string | null;
    userest?: "ACT" | "INA";
    usertipo?: "ADM" | "CLI";
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

// Obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await api.get<ApiSuccess<Usuario[]>>(
        "/usuarios/all"
    );

    return response.data.success.data;
};

// Obtener usuario por ID
export const getUsuarioById = async (
    id: number
): Promise<Usuario> => {
    const response = await api.get<ApiSuccess<Usuario>>(
        `/usuarios/one?usercod=${id}`
    );

    return response.data.success.data;
};

// Crear usuario
export const createUsuario = async (
    data: UsuarioInput
): Promise<Usuario> => {
    const response = await api.post<ApiSuccess<Usuario>>(
        "/usuarios/create",
        data
    );

    return response.data.success.data;
};

// Actualizar usuario
export const updateUsuario = async (
    id: number,
    data: UsuarioUpdateInput
): Promise<Usuario> => {
    const response = await api.put<ApiSuccess<Usuario>>(
        `/usuarios/update?usercod=${id}`,
        data
    );

    return response.data.success.data;
};

// Eliminar usuario
export const deleteUsuario = async (
    id: number
): Promise<void> => {
    await api.delete(`/usuarios/delete?usercod=${id}`);
};
