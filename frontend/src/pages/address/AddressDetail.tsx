import "./AddressDetail.css";

export default function AddressDetail() {

    return (
        <div className="address-detail-page">

            <div className="address-detail-header">

                <h1>Detalle de dirección</h1>

                <p>
                    Registra y administra la información de tus
                    direcciones de entrega.
                </p>

            </div>

            <div className="address-detail-card">

                <form className="address-detail-form">

                    {/* INFORMACIÓN GENERAL */}

                    <h2 className="address-detail-section-title">
                        Información general
                    </h2>

                    <div className="address-detail-grid">

                        <div className="address-detail-group">
                            <label>Alias de la dirección</label>

                            <input
                                type="text"
                                placeholder="Ej. Casa, Trabajo..."
                            />
                        </div>

                        <div className="address-detail-group">
                            <label>Nombre del receptor</label>

                            <input
                                type="text"
                                placeholder="Ingrese el nombre del receptor"
                            />
                        </div>

                    </div>

                    {/* INFORMACIÓN DE CONTACTO */}

                    <h2 className="address-detail-section-title">
                        Información de contacto
                    </h2>

                    <div className="address-detail-grid">

                        <div className="address-detail-group address-detail-full">
                            <label>Teléfono</label>

                            <input
                                type="tel"
                                placeholder="Ej. 9999-1234"
                            />
                        </div>

                    </div>

                    {/* UBICACIÓN */}

                    <h2 className="address-detail-section-title">
                        Ubicación
                    </h2>

                    <div className="address-detail-grid">

                        <div className="address-detail-group">
                            <label>Departamento</label>

                            <input
                                type="text"
                                placeholder="Ej. Francisco Morazán"
                            />
                        </div>

                        <div className="address-detail-group">
                            <label>Ciudad</label>

                            <input
                                type="text"
                                placeholder="Ej. Tegucigalpa"
                            />
                        </div>

                    </div>

                    {/* RUTA DE ENTREGA */}

                    <h2 className="address-detail-section-title">
                        Ruta de entrega
                    </h2>

                    <div className="address-detail-grid">

                        <div className="address-detail-group address-detail-full">
                            <label>Seleccionar ruta</label>

                            <select defaultValue="">
                                <option value="">
                                    Seleccione una ruta
                                </option>

                                <option value="1">
                                    Centro → Palmira (5 km)
                                </option>

                                <option value="2">
                                    Centro → Colonia Kennedy (8 km)
                                </option>

                                <option value="3">
                                    Centro → El Carrizal (12 km)
                                </option>
                            </select>

                            <span className="address-detail-help">
                                Seleccione la ruta correspondiente a su
                                ubicación para facilitar la entrega.
                            </span>
                        </div>

                    </div>

                    {/* DIRECCIÓN EXACTA */}

                    <h2 className="address-detail-section-title">
                        Detalles de entrega
                    </h2>

                    <div className="address-detail-grid">

                        <div className="address-detail-group address-detail-full">
                            <label>Dirección exacta</label>

                            <textarea
                                rows={4}
                                placeholder="Ingrese la dirección exacta de entrega..."
                            />
                        </div>

                        <div className="address-detail-group address-detail-full">
                            <label>Referencia</label>

                            <textarea
                                rows={3}
                                placeholder="Ej. Frente al parque, casa de portón blanco..."
                            />
                        </div>

                    </div>

                    {/* DIRECCIÓN PRINCIPAL */}

                    <div className="address-detail-default">

                        <input
                            type="checkbox"
                            id="direccionPrincipal"
                        />

                        <label htmlFor="direccionPrincipal">
                            <strong>Usar como dirección principal</strong>

                            <span>
                                Esta dirección será la seleccionada
                                por defecto al realizar tus compras.
                            </span>
                        </label>

                    </div>

                    {/* BOTONES */}

                    <div className="address-detail-buttons">

                        <button
                            type="button"
                            className="address-detail-submit"
                        >
                            Guardar dirección
                        </button>

                        <button
                            type="button"
                            className="address-detail-back"
                        >
                            Regresar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
