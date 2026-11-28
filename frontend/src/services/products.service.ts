import api from './api';

export interface ProductoBackend {
    producto_id: number;
    categoria_id: number;
    marca_id: number;
    producto_sku: string;
    producto_nombre: string;
    producto_slug: string;
    producto_descripcion: string | null;
    producto_costo: number | string;
    producto_precio: number | string;
    producto_stock: number;
    producto_activo: string;
    producto_estado: string;
    producto_fecha_creacion: string;
    producto_fecha_actualizacion: string;
}

interface ProductosResponse {
    success: {
        code: number;
        data: ProductoBackend[];
        message: {
            value: string;
        };
    };
}

// Obtener todos los productos
export const obtenerProductos = async (): Promise<ProductoBackend[]> => {
    const response = await api.get<ProductosResponse>('/productos/all');

    if (response.data.success?.code !== 1) {
        throw new Error('No se pudieron obtener los productos');
    }

    return response.data.success.data;
};