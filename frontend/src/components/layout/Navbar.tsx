import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {

    const navigate = useNavigate();
    const { usuario, estaLogueado, cerrarSesion } = useAuth();

    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Cerrar el menú al hacer clic fuera
    useEffect(() => {

        const clicFuera = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setMenuAbierto(false);
            }
        };

        document.addEventListener("mousedown", clicFuera);

        return () => document.removeEventListener("mousedown", clicFuera);

    }, []);

    const manejarCerrarSesion = () => {
        cerrarSesion();
        setMenuAbierto(false);
        navigate("/");
    };

    const nombre = usuario?.nombre ?? "";
    const inicial = nombre.trim().charAt(0).toUpperCase();

    const claseLink = ({ isActive }: { isActive: boolean }) =>
        isActive ? "navbar-link active" : "navbar-link";

    return (

        <header className="navbar">

            <div className="navbar-container">

                <Link to="/" className="navbar-logo">

                    <span className="navbar-logo-title">
                        Lácteos <span>Axúme</span>
                    </span>

                    <small>
                        Calidad que nace <span>de lo natural</span>
                    </small>

                </Link>

                <nav className="navbar-links">

                    <NavLink to="/" end className={claseLink}>
                        Inicio
                    </NavLink>

                    <NavLink to="/catalog" className={claseLink}>
                        Catálogo
                    </NavLink>

                    <NavLink to="/favorites" className={claseLink}>
                        Favoritos
                    </NavLink>

                     <NavLink to="/cart" className={claseLink}>
                        Carrito
                    </NavLink>

                </nav>

                <div className="navbar-actions">
                    {estaLogueado ? (

                        <div className="navbar-user" ref={menuRef}>

                            <button
                                type="button"
                                className="navbar-user-button"
                                onClick={() => setMenuAbierto((v) => !v)}
                                aria-expanded={menuAbierto}
                            >

                                <span className="navbar-avatar">
                                    {inicial}
                                </span>

                                <span className="navbar-user-name">
                                    {nombre}
                                </span>

                            </button>

                            {menuAbierto && (

                                <div className="navbar-dropdown">

                                    <div className="navbar-dropdown-header">
                                        <strong>{nombre}</strong>
                                        <span>Sesión iniciada</span>
                                    </div>

                                    <Link
                                        to="/favorites"
                                        onClick={() => setMenuAbierto(false)}
                                    >
                                        Mis favoritos
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={manejarCerrarSesion}
                                    >
                                        Cerrar sesión
                                    </button>

                                </div>

                            )}

                        </div>

                    ) : (

                        <Link to="/login" className="navbar-login">
                            Iniciar sesión
                        </Link>

                    )}

                </div>

            </div>

        </header>

    );
}