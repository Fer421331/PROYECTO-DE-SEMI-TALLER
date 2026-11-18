import axios from 'axios';
import api from './api';

export interface AuthUser {
  id: number;
  email: string;
  nombre: string;
}

export interface LoginResponse {
  ok: true;
  token: string;
  user: AuthUser;
}

interface BackendErrorResponse {
  error?: {
    message?: {
      value?: string;
    };
  };
}

export const iniciarSesion = async (
  user: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      user,
      password,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError<BackendErrorResponse>(error)) {
      const message =
        error.response?.data?.error?.message?.value ??
        (error.code === 'ECONNABORTED'
          ? 'El servidor tardó demasiado en responder.'
          : 'No se pudo conectar con el servidor.');

      throw new Error(message);
    }

    throw new Error('Ocurrió un error inesperado al iniciar sesión.');
  }
};
