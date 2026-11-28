
import api from "../../services/api";

export interface CategoriaHome {
    categoria_id: number;
    categoria_nombre: string;
    categoria_descripcion: string;
    categoria_estado: string;
}

export interface ProductoHome {
    producto_id: number;
    categoria_id: number;
    marca_id: number;
    producto_sku: string;
    producto_nombre: string;
    producto_slug: string;
    producto_descripcion: string;
    producto_costo: number;
    producto_precio: number;
    producto_stock: number;
    producto_activo: string;
    producto_estado: string;
    producto_fecha_creacion: string;
    producto_fecha_actualizacion: string | null;
}
export interface ImagenProductoHome {
    imagen_id: number;
    producto_id: number;
    imagen_drive_id: string;
    imagen_ruta: string;
    imagen_principal: boolean;
    imagen_orden: number;
    imagen_estado: string;
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

export const getCategoriasHome = async (): Promise<CategoriaHome[]> => {
    const response = await api.get<ApiSuccess<CategoriaHome[]>>(
        "/categorias/all"
    );

    return response.data.success.data;
};

export const getProductosHome = async (): Promise<ProductoHome[]> => {
    const response = await api.get<ApiSuccess<ProductoHome[]>>(
        "/productos/all"
    );

    return response.data.success.data;
};
export const getImagenesHome = async (): Promise<ImagenProductoHome[]> => {
    const response = await api.get<ApiSuccess<ImagenProductoHome[]>>(
        "/producto-imagenes/all"
    );

    return response.data.success.data;
};