import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

import { useFavorites } from "../../hooks/useFavorites";
import { useCart } from "../../hooks/useCart";

export default function Favorites() {

    const navigate = useNavigate();

    const { favoritos, quitarFavorito } = useFavorites();
    const { agregarAlCarrito } = useCart();

    const [busqueda, setBusqueda] = useState("");
    const [mensaje, setMensaje] = useState("");

    const irAlCatalogo = () => navigate("/catalog");

    const favoritosFiltrados = favoritos.filter((p) => {
        const texto = busqueda.toLowerCase().trim();
        return (
            p.nombre.toLowerCase().includes(texto) ||
            p.categoria.toLowerCase().includes(texto)
        );
    });

    const obtenerRutaImagen = (ruta: string) => {
        if (!ruta) return "";
        if (
            ruta.startsWith("http://") ||
            ruta.startsWith("https://") ||
            ruta.startsWith("/")
        ) {
            return ruta;
        }
        return `/${ruta}`;
    };

    const manejarAgregarCarrito = (p: (typeof favoritos)[number]) => {

        const agregado = agregarAlCarrito(p);

        setMensaje(
            agregado
                ? `${p.nombre} se agregó al carrito.`
                : `Ya agregaste todo el stock disponible de ${p.nombre}.`
        );

        setTimeout(() => setMensaje(""), 2500);
    };

    return (
        <div className="favorites-page">

            <div className="favorites-header">
                <h1>Mis Favoritos</h1>
                <p>Tus productos lácteos favoritos.</p>
            </div>

            {mensaje && <div className="favorites-toast">{mensaje}</div>}

            {favoritos.length === 0 ? (

                <div className="favorites-empty">

                    <h2>No tienes favoritos todavía</h2>

                    <p>
                        Explora nuestro catálogo y guarda tus productos
                        lácteos favoritos para encontrarlos fácilmente.
                    </p>

                    <button
                        type="button"
                        className="favorites-back"
                        onClick={irAlCatalogo}
                    >
                        Ir al catálogo
                    </button>

                </div>

            ) : (
                <>
                    {/* BUSCADOR */}
                    <div className="favorites-search">
                        <input
                            type="text"
                            placeholder="Buscar favorito..."
                            autoComplete="off"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    {/* PRODUCTOS FAVORITOS */}
                    {favoritosFiltrados.length > 0 ? (

                        <div className="favorites-grid">

                            {favoritosFiltrados.map((p) => (

                                <article className="favorites-card" key={p.id}>

                                    <div className="favorites-image">
                                        {p.imagen ? (
                                            <img
                                                src={obtenerRutaImagen(p.imagen)}
                                                alt={p.nombre}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            <span>Sin imagen</span>
                                        )}
                                    </div>

                                    <div className="favorites-info">

                                        <h3>{p.nombre}</h3>

                                        <span className="favorites-category">
                                            {p.categoria}
                                        </span>

                                        <p>
                                            {p.descripcion ||
                                                "Producto lácteo de calidad."}
                                        </p>

                                        <div className="favorites-price">
                                            L {p.precio.toFixed(2)}
                                        </div>

                                        <div className="favorites-stock">
                                            {p.stock > 0
                                                ? `Disponible: ${p.stock}`
                                                : "Agotado"}
                                        </div>

                                        <div className="favorites-actions">

                                            <button
                                                type="button"
                                                className="favorites-add-cart"
                                                disabled={p.stock <= 0}
                                                onClick={() => manejarAgregarCarrito(p)}
                                            >
                                                Agregar al carrito
                                            </button>

                                            <button
                                                type="button"
                                                className="favorites-remove"
                                                onClick={() => quitarFavorito(p.id)}
                                            >
                                                Quitar favorito
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    ) : (
                        <div className="favorites-empty">
                            <h2>Sin resultados</h2>
                            <p>Ningún favorito coincide con tu búsqueda.</p>
                        </div>
                    )}

                    <div className="favorites-footer">
                        <button
                            type="button"
                            className="favorites-back"
                            onClick={irAlCatalogo}
                        >
                            Regresar al catálogo
                        </button>
                    </div>
                </>
            )}

        </div>
    );
}