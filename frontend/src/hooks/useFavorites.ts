import { useEffect, useState } from "react";

export interface ProductoGuardado {
    id: number;
    sku: string;
    nombre: string;
    categoria: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
}

const CLAVE = "favoritos";

function leer(): ProductoGuardado[] {
    try {
        const raw = localStorage.getItem(CLAVE);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function useFavorites() {

    const [favoritos, setFavoritos] = useState<ProductoGuardado[]>(leer);

    useEffect(() => {
        localStorage.setItem(CLAVE, JSON.stringify(favoritos));
    }, [favoritos]);

    const esFavorito = (id: number) =>
        favoritos.some((f) => f.id === id);

    const alternarFavorito = (producto: ProductoGuardado) => {
        setFavoritos((actuales) =>
            actuales.some((f) => f.id === producto.id)
                ? actuales.filter((f) => f.id !== producto.id)
                : [...actuales, producto]
        );
    };

    const quitarFavorito = (id: number) => {
        setFavoritos((actuales) => actuales.filter((f) => f.id !== id));
    };

    return { favoritos, esFavorito, alternarFavorito, quitarFavorito };
}