import "./Address.css";

export default function Address() {

    return (
        <div className="address-page">

            {/* ENCABEZADO */}

            <div className="address-header">

                <div>
                    <h1>Mis direcciones de entrega</h1>

                    <p>
                        Administra tus direcciones para recibir
                        tus productos lácteos.
                    </p>
                </div>

                <button type="button" className="address-add-button">
                    + Nueva dirección
                </button>

            </div>

            {/* LISTADO DE DIRECCIONES */}

            <div className="address-card">

                <div className="address-table-container">

                    <table className="address-table">

                        <thead>

                            <tr>
                                <th>Alias</th>
                                <th>Receptor</th>
                                <th>Teléfono</th>
                                <th>Ciudad</th>
                                <th>Ruta</th>
                                <th>Predeterminada</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>
                                    <strong>Casa</strong>
                                </td>

                                <td>Juan Pérez</td>

                                <td>9999-1234</td>

                                <td>Tegucigalpa</td>

                                <td>
                                    <div className="address-route">
                                        <span>Centro</span>
                                        <span className="address-route-arrow">→</span>
                                        <span>Palmira</span>
                                    </div>
                                </td>

                                <td>
                                    <span className="address-primary">
                                        Principal
                                    </span>
                                </td>

                                <td>
                                    <div className="address-actions">

                                        <button type="button" className="address-view">
                                            Ver
                                        </button>

                                        <button type="button" className="address-edit">
                                            Editar
                                        </button>

                                        <button type="button" className="address-use" disabled>
                                            Principal
                                        </button>

                                        <button type="button" className="address-delete">
                                            Eliminar
                                        </button>

                                    </div>
                                </td>

                            </tr>

                            <tr>

                                <td>
                                    <strong>Trabajo</strong>
                                </td>

                                <td>Juan Pérez</td>

                                <td>9999-1234</td>

                                <td>Tegucigalpa</td>

                                <td>
                                    <div className="address-route">
                                        <span>Centro</span>
                                        <span className="address-route-arrow">→</span>
                                        <span>Colonia Kennedy</span>
                                    </div>
                                </td>

                                <td>
                                    <span className="address-not-primary">
                                        No principal
                                    </span>
                                </td>

                                <td>
                                    <div className="address-actions">

                                        <button type="button" className="address-view">
                                            Ver
                                        </button>

                                        <button type="button" className="address-edit">
                                            Editar
                                        </button>

                                        <button type="button" className="address-use">
                                            Usar esta
                                        </button>

                                        <button type="button" className="address-delete">
                                            Eliminar
                                        </button>

                                    </div>
                                </td>

                            </tr>

                            <tr>

                                <td>
                                    <strong>Casa de mis padres</strong>
                                </td>

                                <td>María López</td>

                                <td>9888-5678</td>

                                <td>Comayagüela</td>

                                <td>
                                    <div className="address-route">
                                        <span>Centro</span>
                                        <span className="address-route-arrow">→</span>
                                        <span>El Carrizal</span>
                                    </div>
                                </td>

                                <td>
                                    <span className="address-not-primary">
                                        No principal
                                    </span>
                                </td>

                                <td>
                                    <div className="address-actions">

                                        <button type="button" className="address-view">
                                            Ver
                                        </button>

                                        <button type="button" className="address-edit">
                                            Editar
                                        </button>

                                        <button type="button" className="address-use">
                                            Usar esta
                                        </button>

                                        <button type="button" className="address-delete">
                                            Eliminar
                                        </button>

                                    </div>
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                {/* ESTADO VACÍO - REFERENCIA VISUAL */}

                {/*
                <div className="address-empty">

                    <div className="address-empty-icon">
                        📍
                    </div>

                    <h2>No tienes direcciones registradas</h2>

                    <p>
                        Agrega una dirección para recibir tus productos.
                    </p>

                    <button type="button" className="address-add-button">
                        + Nueva dirección
                    </button>

                </div>
                */}

            </div>

            {/* FOOTER */}

            <div className="address-footer">

                <button type="button" className="address-back">
                    Ir al checkout
                </button>

            </div>

        </div>
    );
}
