import api from "./api";

// ===============================
// INTERFACES DEL CATÁLOGO
// ===============================

export interface CatalogProducto {
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

export interface CatalogCategoria {
    categoria_id: number;
    categoria_nombre: string;
    categoria_descripcion: string | null;
    categoria_estado: string;
}

export interface CatalogProductoImagen {
    imagen_id: number;
    producto_id: number;
    imagen_ruta: string;
    imagen_principal: boolean;
    imagen_orden: number;
    imagen_estado: string;
}

// OBTENER DATOS DE LA RESPUESTA


const obtenerDatos = (respuesta: any) => {
    return respuesta?.success?.data ??
        respuesta?.data ??
        respuesta;
};


// OBTENER PRODUCTOS


export const getProductosCatalogo = async (): Promise<CatalogProducto[]> => {
    const respuesta = await api.get("/productos/all");
    return obtenerDatos(respuesta.data);
};


// OBTENER CATEGORÍAS


export const getCategoriasCatalogo = async (): Promise<CatalogCategoria[]> => {
    const respuesta = await api.get("/categorias/all");
    return obtenerDatos(respuesta.data);
};


// OBTENER IMÁGENES

export const getImagenesCatalogo = async (): Promise<CatalogProductoImagen[]> => {
    const respuesta = await api.get("/producto-imagenes/all");
    return obtenerDatos(respuesta.data);
};