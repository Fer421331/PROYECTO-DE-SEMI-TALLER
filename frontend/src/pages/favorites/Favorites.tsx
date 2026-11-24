import "./Favorites.css";

export default function Favorites() {

    return (
        <div className="favorites-page">

            <div className="favorites-header">

                <h1>❤️ Mis Favoritos</h1>

                <p>
                    Tus productos lácteos favoritos.
                </p>

            </div>

            {/* BUSCADOR */}

            <div className="favorites-search">

                <input
                    type="text"
                    placeholder="Buscar favorito..."
                    autoComplete="off"
                />

            </div>

            {/* PRODUCTOS FAVORITOS */}

            <div className="favorites-grid">

                <article className="favorites-card">

                    <div className="favorites-image">
                        🥛
                    </div>

                    <div className="favorites-info">

                        <h3>Leche entera pasteurizada</h3>

                        <span className="favorites-category">
                            Leches
                        </span>

                        <p>
                            Presentación: Botella de 1 litro
                        </p>

                        <div className="favorites-price">
                            L 35.00
                        </div>

                        <div className="favorites-stock">
                            Disponible
                        </div>

                        <div className="favorites-actions">

                            <button
                                type="button"
                                className="favorites-add-cart"
                            >
                                Agregar al carrito
                            </button>

                            <button
                                type="button"
                                className="favorites-remove"
                            >
                                ❤️ Quitar favorito
                            </button>

                        </div>

                    </div>

                </article>

                <article className="favorites-card">

                    <div className="favorites-image">
                        🧀
                    </div>

                    <div className="favorites-info">

                        <h3>Queso fresco</h3>

                        <span className="favorites-category">
                            Quesos
                        </span>

                        <p>
                            Presentación: Libra
                        </p>

                        <div className="favorites-price">
                            L 85.00
                        </div>

                        <div className="favorites-stock">
                            Disponible
                        </div>

                        <div className="favorites-actions">

                            <button
                                type="button"
                                className="favorites-add-cart"
                            >
                                Agregar al carrito
                            </button>

                            <button
                                type="button"
                                className="favorites-remove"
                            >
                                ❤️ Quitar favorito
                            </button>

                        </div>

                    </div>

                </article>

                <article className="favorites-card">

                    <div className="favorites-image">
                        🥣
                    </div>

                    <div className="favorites-info">

                        <h3>Yogur natural</h3>

                        <span className="favorites-category">
                            Yogures
                        </span>

                        <p>
                            Presentación: Envase de 500 ml
                        </p>

                        <div className="favorites-price">
                            L 55.00
                        </div>

                        <div className="favorites-stock">
                            Disponible
                        </div>

                        <div className="favorites-actions">

                            <button
                                type="button"
                                className="favorites-add-cart"
                            >
                                Agregar al carrito
                            </button>

                            <button
                                type="button"
                                className="favorites-remove"
                            >
                                ❤️ Quitar favorito
                            </button>

                        </div>

                    </div>

                </article>

                <article className="favorites-card">

                    <div className="favorites-image">
                        🧈
                    </div>

                    <div className="favorites-info">

                        <h3>Mantequilla artesanal</h3>

                        <span className="favorites-category">
                            Mantequillas
                        </span>

                        <p>
                            Presentación: Envase de 250 g
                        </p>

                        <div className="favorites-price">
                            L 65.00
                        </div>

                        <div className="favorites-stock">
                            Disponible
                        </div>

                        <div className="favorites-actions">

                            <button
                                type="button"
                                className="favorites-add-cart"
                            >
                                Agregar al carrito
                            </button>

                            <button
                                type="button"
                                className="favorites-remove"
                            >
                                ❤️ Quitar favorito
                            </button>

                        </div>

                    </div>

                </article>

            </div>

            {/* REFERENCIA VISUAL: FAVORITOS VACÍOS */}

            {/*
            <div className="favorites-empty">

                <div className="favorites-empty-icon">
                    ❤️
                </div>

                <h2>No tienes favoritos todavía</h2>

                <p>
                    Explora nuestro catálogo y guarda tus productos
                    lácteos favoritos para encontrarlos fácilmente.
                </p>

                <button type="button" className="favorites-back">
                    Ir al catálogo
                </button>

            </div>
            */}

            <div className="favorites-footer">

                <button
                    type="button"
                    className="favorites-back"
                >
                    Regresar al catálogo
                </button>

            </div>

        </div>
    );
}
