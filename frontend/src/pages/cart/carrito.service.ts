import api from "../../services/api";

export interface ProductoResumen {
  producto_id: number;
  producto_nombre: string;
  producto_sku?: string;
}

export interface CarritoDetalle {
  detalle_id: number;
  carrito_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: string | number;
  subtotal: string | number;
  descuento: string | number;
  // La API devuelve el producto anidado:
  producto?: ProductoResumen;
}

export interface Carrito {
  carrito_id: number;
  usercod: number;
  carrito_estado: "ACT" | "INA";
  carrito_fecha_creacion: string;
  carrito_fecha_actualizacion: string;
}

export interface DireccionUsuario {
  direccion_id: number;
  usercod: number;
  direccion_alias: string;
  direccion_receptor: string;
  direccion_telefono: string;
  direccion_departamento: string;
  direccion_ciudad: string;
  id_ruta: number;
  direccion_detalle: string;
  direccion_referencia: string | null;
  direccion_predeterminada: boolean;
  direccion_estado: "ACT" | "INA";
  direccion_fecha_creacion: string;
  direccion_fecha_actualizacion: string;
}

export interface CheckoutPayload {
  usercod: number;
  direccion_id: number;
  metodo_pago_id: number;
  venta_observaciones?: string;
}

export interface MetodoPago {
  metodo_pago_id: number;
  metodo_nombre: string;
}

interface ApiSuccess<T> {
  success: { code: number; data: T; message: { value: string } };
}

// ---------------- CARRITO ----------------

// Carrito activo del usuario
export const getCarritoActivoPorUsuario = async (
  usercod: number,
): Promise<Carrito | null> => {
  const response = await api.get<ApiSuccess<Carrito[]>>("/carrito/all");
  const carritos = response.data.success.data;
  return (
    carritos.find(
      (c) =>
        Number(c.usercod) === usercod &&
        String(c.carrito_estado).trim() === "ACT",
    ) ?? null
  );
};

// Detalles del carrito
export const getDetallesPorCarrito = async (
  carrito_id: number,
): Promise<CarritoDetalle[]> => {
  const response = await api.get<ApiSuccess<CarritoDetalle[]>>(
    "/carrito-detalle/all",
  );
  const detalles = response.data.success.data;
  return detalles.filter((d) => Number(d.carrito_id) === carrito_id);
};

// Actualizar cantidad
export const updateCantidadDetalle = async (
  detalle_id: number,
  cantidad: number,
): Promise<CarritoDetalle> => {
  const response = await api.put<ApiSuccess<CarritoDetalle>>(
    `/carrito-detalle/?id=${detalle_id}`,
    { cantidad },
  );
  return response.data.success.data;
};

// Eliminar detalle
export const deleteDetalle = async (detalle_id: number): Promise<void> => {
  await api.delete(`/carrito-detalle/?id=${detalle_id}`);
};

// ---------------- CHECKOUT ----------------

export const checkoutCarrito = async (
  payload: CheckoutPayload,
): Promise<{ venta: unknown; correoEnviado: boolean }> => {
  const response = await api.post<
    ApiSuccess<{ venta: unknown; correoEnviado: boolean }>
  >("/ventas/checkout", payload);
  return response.data.success.data;
};

// ---------------- DIRECCIONES ----------------

// Direcciones del usuario (filtradas en cliente, igual patrón que carrito)
export const getDireccionesPorUsuario = async (
  usercod: number,
): Promise<DireccionUsuario[]> => {
  try {
    const response = await api.get<ApiSuccess<DireccionUsuario[]>>(
      "/direcciones-usuario/all",
    );
    const direcciones = response.data.success.data ?? [];
    return direcciones
      .filter(
        (d) =>
          Number(d.usercod) === usercod &&
          String(d.direccion_estado).trim() === "ACT",
      )
      .sort((a, b) => {
        // Predeterminada primero, luego por id
        if (a.direccion_predeterminada === b.direccion_predeterminada) {
          return a.direccion_id - b.direccion_id;
        }
        return a.direccion_predeterminada ? -1 : 1;
      });
  } catch {
    return [];
  }
};

// ---------------- MÉTODOS DE PAGO ----------------

export const getMetodosPago = async (): Promise<MetodoPago[]> => {
  try {
    const response =
      await api.get<ApiSuccess<MetodoPago[]>>("/metodos-pago/all");
    return response.data.success.data ?? [];
  } catch {
    // Fallback mientras no exista endpoint
    return [
      { metodo_pago_id: 1, metodo_nombre: "Efectivo" },
      { metodo_pago_id: 2, metodo_nombre: "Tarjeta" },
      { metodo_pago_id: 3, metodo_nombre: "Transferencia" },
    ];
  }
};
