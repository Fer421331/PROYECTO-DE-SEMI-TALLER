import { useEffect, useState } from "react";
import type { ProductoGuardado } from "./useFavorites";

export interface ItemCarrito extends ProductoGuardado {
    cantidad: number;
}

const CLAVE = "carrito";

function leer(): ItemCarrito[] {
    try {
        const raw = localStorage.getItem(CLAVE);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function useCart() {

    const [carrito, setCarrito] = useState<ItemCarrito[]>(leer);

    useEffect(() => {
        localStorage.setItem(CLAVE, JSON.stringify(carrito));
    }, [carrito]);

    // Devuelve false si ya no hay stock suficiente
    const agregarAlCarrito = (producto: ProductoGuardado): boolean => {

        const existente = carrito.find((i) => i.id === producto.id);
        const cantidadActual = existente?.cantidad ?? 0;

        if (cantidadActual >= producto.stock) return false;

        setCarrito((actuales) =>
            existente
                ? actuales.map((i) =>
                    i.id === producto.id
                        ? { ...i, cantidad: i.cantidad + 1 }
                        : i
                )
                : [...actuales, { ...producto, cantidad: 1 }]
        );

        return true;
    };

    const totalItems = carrito.reduce((suma, i) => suma + i.cantidad, 0);

    return { carrito, agregarAlCarrito, totalItems };
}