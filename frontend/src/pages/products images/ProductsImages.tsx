import { useState } from "react";
import "./ProductsImages.css";

export default function ProductsImages() {
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <section className="product-image-detail-page">

            {/* Encabezado */}

            <div className="product-image-detail-header">

                <div>
                    <span className="product-image-detail-subtitle">
                        ADMINISTRACIÓN DE INVENTARIO
                    </span>

                    <h1>Detalle de Imagen</h1>

                    <p>
                        Administra la imagen y su configuración dentro
                        de la galería del producto.
                    </p>
                </div>

            </div>

            <form className="product-image-detail-card">

                {/* Información de la imagen */}

                <div className="product-image-detail-section">

                    <div className="product-image-detail-section-header">
                        <h2>Información de la imagen</h2>

                        <p>
                            Datos de identificación y asociación.
                        </p>
                    </div>

                    <div className="product-image-detail-grid">

                        <div className="product-image-detail-group">
                            <label>ID de imagen</label>

                            <input
                                type="text"
                                placeholder="Automático"
                                readOnly
                            />
                        </div>

                        <div className="product-image-detail-group">
                            <label>ID del producto</label>

                            <input
                                type="number"
                                placeholder="ID del producto"
                            />
                        </div>

                        <div className="product-image-detail-group">
                            <label>Orden de visualización</label>

                            <input
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Orden de la imagen"
                            />
                        </div>

                        <div className="product-image-detail-group">
                            <label>ID de Google Drive</label>

                            <input
                                type="text"
                                placeholder="Identificador de Google Drive"
                            />
                        </div>

                    </div>

                </div>

                {/* Imagen */}

                <div className="product-image-detail-section">

                    <div className="product-image-detail-section-header">
                        <h2>Imagen del producto</h2>

                        <p>
                            Selecciona la fotografía que deseas asociar
                            al producto.
                        </p>
                    </div>

                    <div className="product-image-detail-preview-container">

                        {image ? (

                            <img
                                src={image}
                                alt="Vista previa del producto"
                                className="product-image-detail-preview"
                            />

                        ) : (

                            <div className="product-image-detail-placeholder">

                                <span>+</span>

                                <strong>
                                    Sin imagen seleccionada
                                </strong>

                                <p>
                                    Selecciona una imagen para visualizarla.
                                </p>

                            </div>

                        )}

                    </div>

                    <label className="product-image-detail-upload">

                        Seleccionar imagen

                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleImageChange}
                        />

                    </label>

                </div>

                {/* Configuración */}

                <div className="product-image-detail-section">

                    <div className="product-image-detail-section-header">
                        <h2>Configuración</h2>

                        <p>
                            Define cómo se mostrará la imagen en el catálogo.
                        </p>
                    </div>

                    <div className="product-image-detail-grid">

                        <div className="product-image-detail-group">
                            <label>Imagen principal</label>

                            <select defaultValue="false">
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="product-image-detail-group">
                            <label>Estado</label>

                            <select defaultValue="ACT">
                                <option value="ACT">Activo</option>
                                <option value="INA">Inactivo</option>
                            </select>
                        </div>

                    </div>

                </div>

                {/* Botones */}

                <div className="product-image-detail-buttons">

                    <button
                        type="submit"
                        className="product-image-detail-submit"
                    >
                        Guardar imagen
                    </button>

                    <button
                        type="button"
                        className="product-image-detail-back"
                    >
                        Regresar
                    </button>

                </div>

            </form>

        </section>
    );
}
