import "./ProductDetail.css";

export default function ProductDetail() {

    return (
        <div className="product-detail-page">

            <h1>Detalle del producto</h1>

            <div className="product-detail-card">

                <form className="product-detail-form">

                    <h2 className="product-detail-section-title">
                        Información general
                    </h2>

                    <div className="product-detail-grid">

                        <div className="product-detail-group">
                            <label>ID del producto</label>
                            <input type="text" value="LAC-001" readOnly />
                        </div>

                        <div className="product-detail-group">
                            <label>SKU</label>
                            <input type="text" maxLength={40} placeholder="Ej. LAC-LEC-001" />
                        </div>

                        <div className="product-detail-group product-detail-full">
                            <label>Nombre</label>
                            <input type="text" maxLength={150} placeholder="Ej. Leche entera" />
                        </div>

                        <div className="product-detail-group product-detail-full">
                            <label>Categoría</label>
                            <select defaultValue="">
                                <option value="">Seleccione una categoría</option>
                                <option value="1">Leches</option>
                                <option value="2">Quesos</option>
                                <option value="3">Yogures</option>
                                <option value="4">Cremas</option>
                            </select>
                        </div>

                    </div>

                    <h2 className="product-detail-section-title">
                        Imagen del producto
                    </h2>

                    <div className="product-detail-image-area">

                        <div className="product-detail-image-preview">
                            🥛
                        </div>

                        <div className="product-detail-image-info">
                            <p>
                                Seleccione la imagen principal del producto.
                                Formatos permitidos: JPG, JPEG, PNG y WEBP.
                            </p>

                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp"
                            />
                        </div>

                    </div>

                    <h2 className="product-detail-section-title">
                        Descripción
                    </h2>

                    <div className="product-detail-grid">

                        <div className="product-detail-group product-detail-full">
                            <label>Descripción del producto</label>
                            <textarea
                                rows={5}
                                placeholder="Ingrese la descripción del producto lácteo"
                            />
                        </div>

                    </div>

                    <h2 className="product-detail-section-title">
                        Información comercial
                    </h2>

                    <div className="product-detail-grid">

                        <div className="product-detail-group">
                            <label>Costo (L)</label>
                            <input type="number" min="0" step="0.01" placeholder="0.00" />
                        </div>

                        <div className="product-detail-group">
                            <label>Precio de venta (L)</label>
                            <input type="number" min="0.01" step="0.01" placeholder="0.00" />
                        </div>

                        <div className="product-detail-group">
                            <label>Stock</label>
                            <input type="number" min="0" step="1" placeholder="0" />
                        </div>

                    </div>

                    <h2 className="product-detail-section-title">
                        Publicación y estado
                    </h2>

                    <div className="product-detail-grid">

                        <div className="product-detail-group">
                            <label>Visible en el catálogo web</label>
                            <select defaultValue="ACT">
                                <option value="ACT">Publicado</option>
                                <option value="INA">Oculto</option>
                            </select>
                        </div>

                        <div className="product-detail-group">
                            <label>Estado</label>
                            <select defaultValue="ACT">
                                <option value="ACT">Activo</option>
                                <option value="INA">Inactivo</option>
                            </select>
                        </div>

                    </div>

                    <div className="product-detail-buttons">

                        <button type="button" className="product-detail-submit">
                            Confirmar
                        </button>

                        <button type="button" className="product-detail-back">
                            Regresar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
