
import api from "./api";

export interface ApiSuccess<T> {
  success: {
    code: number;
    data: T;
    message: { value: string };
  };
}

export interface ProductoAdmin {
  producto_id: number;
  producto_nombre: string;
  producto_sku?: string;
  categoria_id?: number;
  producto_precio: string | number;
  producto_stock: number;
}

export interface VentaAdmin {
  venta_id: number;
  usercod: number;
  direccion_id: number;
  metodo_pago_id: number;
  venta_fecha: string;
  venta_total: string | number;
  venta_estado: string;
  venta_observaciones?: string | null;
}

export interface CategoriaAdmin {
  categoria_id: number;
  categoria_nombre: string;
}

export interface UsuarioAdmin {
  usercod: number;
}

export interface RutaEntrega {
  id_ruta: number;
  origen: string;
  destino: string;
  distancia_km: string | number;
  duracion_min: number;
  estado: string;
}

export interface VentaDetalleAdmin {
  detalle_venta_id: number;
  venta_id: number;
  producto_id: number;
  producto_nombre: string;
  precio_unitario: string | number;
  cantidad: number;
  descuento: string | number;
  subtotal: string | number;
}

export const obtenerProductosAdmin = async () =>
  (await api.get<ApiSuccess<ProductoAdmin[]>>("/productos/all")).data.success.data ?? [];

export const obtenerCategoriasAdmin = async () =>
  (await api.get<ApiSuccess<CategoriaAdmin[]>>("/categorias/all")).data.success.data ?? [];

export const obtenerUsuariosAdmin = async () =>
  (await api.get<ApiSuccess<UsuarioAdmin[]>>("/usuarios/all")).data.success.data ?? [];

export const obtenerVentasAdmin = async () =>
  (await api.get<ApiSuccess<VentaAdmin[]>>("/ventas/all")).data.success.data ?? [];

export const obtenerRutasEntrega = async () =>
  (await api.get<ApiSuccess<RutaEntrega[]>>("/rutas-entrega/all")).data.success.data ?? [];

export const obtenerRutaEntrega = async (id: number) =>
  (await api.get<ApiSuccess<RutaEntrega>>("/rutas-entrega/one", {
    params: { id_ruta: id }
  })).data.success.data;

export const crearRutaEntrega = async (ruta: Omit<RutaEntrega, "id_ruta">) =>
  (await api.post<ApiSuccess<RutaEntrega>>("/rutas-entrega/", ruta)).data.success.data;

export const actualizarRutaEntrega = async (
  id: number,
  ruta: Partial<Omit<RutaEntrega, "id_ruta">>
) =>
  (await api.put<ApiSuccess<RutaEntrega>>("/rutas-entrega/", ruta, {
    params: { id_ruta: id }
  })).data.success.data;

export const eliminarRutaEntrega = async (id: number) => {
  await api.delete("/rutas-entrega/", { params: { id_ruta: id } });
};

export const obtenerVentaAdmin = async (id: number) =>
  (await api.get<ApiSuccess<VentaAdmin>>("/ventas/one", {
    params: { venta_id: id }
  })).data.success.data;

export const obtenerDetallesVentasAdmin = async () =>
  (await api.get<ApiSuccess<VentaDetalleAdmin[]>>("/venta-detalle/all")).data.success.data ?? [];
