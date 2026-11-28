import api from "./api";

export interface BitacoraRegistro {
  bitacoracod: number;
  bitcorafch: string;
  bitprograma: string;
  bitdescripcion: string;
  bitobservacion: string | null;
  bittipo: string;
  bitusuario: number;
}

interface ApiSuccess<T> {
  success: {
    code: number;
    data: T;
    message: { value: string };
  };
}

export const obtenerBitacora = async (): Promise<BitacoraRegistro[]> => {
  const response = await api.get<ApiSuccess<BitacoraRegistro[]>>(
    "/bitacora/all"
  );

  return response.data.success.data ?? [];
};
