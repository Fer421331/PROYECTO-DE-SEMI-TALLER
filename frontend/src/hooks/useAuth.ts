import { useEffect, useState } from "react";

export interface UsuarioSesion {
    nombre: string;
    [clave: string]: unknown;
}

const EVENTO = "auth-change";

function leerUsuario(): UsuarioSesion | null {
    try {
        const token = localStorage.getItem("token");
        const raw = localStorage.getItem("usuario");

        if (!token || !raw) return null;

        return JSON.parse(raw);
    } catch {
        return null;
    }
}

// Llamar desde el Login cuando el inicio de sesión sea exitoso
export function guardarSesion(token: string, usuario: UsuarioSesion) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    window.dispatchEvent(new Event(EVENTO));
}

export function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.dispatchEvent(new Event(EVENTO));
}

export function useAuth() {

    const [usuario, setUsuario] = useState<UsuarioSesion | null>(leerUsuario);

    useEffect(() => {

        const actualizar = () => setUsuario(leerUsuario());

        window.addEventListener(EVENTO, actualizar);
        window.addEventListener("storage", actualizar);

        return () => {
            window.removeEventListener(EVENTO, actualizar);
            window.removeEventListener("storage", actualizar);
        };

    }, []);

    return { usuario, estaLogueado: usuario !== null, cerrarSesion };
}

export default useAuth;