import "./Catalog.css";

export default function Catalog() {

    return (
        <div className="catalog-page">

            {/* ENCABEZADO */}

            <div className="catalog-header">

                <h1>Catálogo de Productos</h1>

                <p>
                    Descubre nuestra variedad de productos lácteos
                    frescos y de calidad.
                </p>

            </div>

            {/* FILTROS */}

            <div className="catalog-filters">

                <div className="catalog-filter-group">

                    <label>Buscar producto</label>

                    <input
                        type="text"
                        placeholder="Ej. Leche, queso, yogur..."
                    />

                </div>

                <div className="catalog-filter-group">

                    <label>Categoría</label>

                    <select defaultValue="0">
                        <option value="0">Todas las categorías</option>
                        <option value="1">Leches</option>
                        <option value="2">Quesos</option>
                        <option value="3">Yogures</option>
                        <option value="4">Cremas</option>
                        <option value="5">Mantequillas</option>
                    </select>

                </div>

                <div className="catalog-filter-group">

                    <label>Ordenar por</label>

                    <select defaultValue="recientes">
                        <option value="recientes">Más recientes</option>
                        <option value="nombre_asc">Nombre A-Z</option>
                        <option value="nombre_desc">Nombre Z-A</option>
                        <option value="precio_asc">Precio menor a mayor</option>
                        <option value="precio_desc">Precio mayor a menor</option>
                        <option value="favoritos">❤️ Favoritos</option>
                        <option value="mas_populares">Más populares</option>
                    </select>

                </div>

                <div className="catalog-filter-group catalog-filter-button">

                    <button type="button">
                        🔎 Buscar
                    </button>

                </div>

            </div>

            {/* PRODUCTOS */}

            <div className="catalog-product-grid">

                <article className="catalog-product-card">

                    <div className="catalog-product-image">
                        🥛
                    </div>

                    <div className="catalog-product-info">

                        <h3>Leche entera pasteurizada</h3>

                        <span className="catalog-product-category">
                            Leches
                        </span>

                        <p>Presentación: Botella de 1 litro</p>

                        <div className="catalog-product-price">
                            L 35.00
                        </div>

                        <div className="catalog-product-stock">
                            Disponible
                        </div>

                        <div className="catalog-product-actions">

                            <button type="button" className="catalog-add-cart">
                                Agregar al carrito
                            </button>

                            <button type="button" className="catalog-add-favorite">
                                🤍 Agregar favorito
                            </button>

                        </div>

                    </div>

                </article>

                <article className="catalog-product-card">

                    <div className="catalog-product-image">
                        🧀
                    </div>

                    <div className="catalog-product-info">

                        <h3>Queso fresco</h3>

                        <span className="catalog-product-category">
                            Quesos
                        </span>

                        <p>Presentación: Libra</p>

                        <div className="catalog-product-price">
                            L 85.00
                        </div>

                        <div className="catalog-product-stock">
                            Disponible
                        </div>

                        <div className="catalog-product-actions">

                            <button type="button" className="catalog-add-cart">
                                Agregar al carrito
                            </button>

                            <button type="button" className="catalog-add-favorite">
                                🤍 Agregar favorito
                            </button>

                        </div>

                    </div>

                </article>

                <article className="catalog-product-card">

                    <div className="catalog-product-image">
                        🥣
                    </div>

                    <div className="catalog-product-info">

                        <h3>Yogur natural</h3>

                        <span className="catalog-product-category">
                            Yogures
                        </span>

                        <p>Presentación: Envase de 500 ml</p>

                        <div className="catalog-product-price">
                            L 55.00
                        </div>

                        <div className="catalog-product-stock">
                            Disponible
                        </div>

                        <div className="catalog-product-actions">

                            <button type="button" className="catalog-add-cart">
                                Agregar al carrito
                            </button>

                            <button type="button" className="catalog-add-favorite">
                                🤍 Agregar favorito
                            </button>

                        </div>

                    </div>

                </article>

                <article className="catalog-product-card">

                    <div className="catalog-product-image">
                        🧈
                    </div>

                    <div className="catalog-product-info">

                        <h3>Mantequilla artesanal</h3>

                        <span className="catalog-product-category">
                            Mantequillas
                        </span>

                        <p>Presentación: Envase de 250 g</p>

                        <div className="catalog-product-price">
                            L 65.00
                        </div>

                        <div className="catalog-product-stock">
                            Disponible
                        </div>

                        <div className="catalog-product-actions">

                            <button type="button" className="catalog-add-cart">
                                Agregar al carrito
                            </button>

                            <button type="button" className="catalog-add-favorite">
                                🤍 Agregar favorito
                            </button>

                        </div>

                    </div>

                </article>

                <article className="catalog-product-card">

                    <div className="catalog-product-image">
                        🥛
                    </div>

                    <div className="catalog-product-info">

                        <h3>Crema de leche</h3>

                        <span className="catalog-product-category">
                            Cremas
                        </span>

                        <p>Presentación: Envase de 250 ml</p>

                        <div className="catalog-product-price">
                            L 45.00
                        </div>

                        <div className="catalog-product-stock">
                            Disponible
                        </div>

                        <div className="catalog-product-actions">

                            <button type="button" className="catalog-add-cart">
                                Agregar al carrito
                            </button>

                            <button type="button" className="catalog-add-favorite">
                                🤍 Agregar favorito
                            </button>

                        </div>

                    </div>

                </article>

                <article className="catalog-product-card">

                    <div className="catalog-product-image">
                        🧀
                    </div>

                    <div className="catalog-product-info">

                        <h3>Quesillo artesanal</h3>

                        <span className="catalog-product-category">
                            Quesos
                        </span>

                        <p>Presentación: Libra</p>

                        <div className="catalog-product-price">
                            L 95.00
                        </div>

                        <div className="catalog-product-stock">
                            Disponible
                        </div>

                        <div className="catalog-product-actions">

                            <button type="button" className="catalog-add-cart">
                                Agregar al carrito
                            </button>

                            <button type="button" className="catalog-add-favorite">
                                🤍 Agregar favorito
                            </button>

                        </div>

                    </div>

                </article>

            </div>

            {/* REFERENCIA VISUAL: CATÁLOGO SIN PRODUCTOS */}

            {/*
            <div className="catalog-empty">

                <div className="catalog-empty-icon">
                    🥛
                </div>

                <h2>No encontramos productos</h2>

                <p>
                    No hay productos disponibles para mostrar.
                    Intenta realizar otra búsqueda.
                </p>

            </div>
            */}

            <div className="catalog-footer">

                <button type="button" className="catalog-back">
                    Regresar
                </button>

            </div>

        </div>
    );
}
