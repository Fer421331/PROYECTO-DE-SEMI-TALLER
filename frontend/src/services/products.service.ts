import api from "./api";

// ===============================
// INTERFACES
// ===============================

export interface Producto {
    producto_id: number;
    categoria_id: number;
    producto_sku: string;
    producto_nombre: string;
    producto_slug: string;
    producto_descripcion: string | null;
    producto_costo: number;
    producto_precio: number;
    producto_stock: number;
    producto_activo: string;
    producto_estado: string;
}

export interface Categoria {
    categoria_id: number;
    categoria_nombre: string;
    categoria_descripcion: string | null;
    categoria_estado: string;
}

export interface ProductoImagen {
    imagen_id: number;
    producto_id: number;
    imagen_ruta: string;
    imagen_principal: boolean;
    imagen_orden: number;
    imagen_estado: string;
}

// ===============================
// OBTENER DATOS DE LA RESPUESTA
// ===============================

const obtenerDatos = (respuesta: any) => {
    return respuesta?.success?.data ??
        respuesta?.data ??
        respuesta;
};

// ===============================
// OBTENER TODOS LOS PRODUCTOS
// ===============================

export const getProductos = async (): Promise<Producto[]> => {
    const respuesta = await api.get("/productos/all");

    return obtenerDatos(respuesta.data);
};

// ===============================
// OBTENER TODAS LAS CATEGORÍAS
// ===============================

export const getCategorias = async (): Promise<Categoria[]> => {
    const respuesta = await api.get("/categorias/all");

    return obtenerDatos(respuesta.data);
};

// ===============================
// OBTENER IMÁGENES DE PRODUCTOS
// ===============================

export const getProductoImagenes = async (): Promise<ProductoImagen[]> => {
    const respuesta = await api.get("/producto-imagenes/all");

    return obtenerDatos(respuesta.data);
};

// ===============================
// DESACTIVAR PRODUCTO
// ===============================

export const desactivarProducto = async (
    id: number
): Promise<void> => {

    await api.put(`/productos/update?id=${id}`, {
        producto_activo: "INA",
        producto_estado: "INA"
    });
};