import "./SalesList.css";

export default function SalesList() {

    return (
        <div className="sales-page">

            {/* ENCABEZADO */}

            <div className="sales-header">

                <h1>Ventas</h1>

                <p>
                    Administra y consulta las ventas realizadas
                    en la tienda de productos lácteos.
                </p>

            </div>

            {/* FILTROS */}

            <div className="sales-filters">

                <div className="sales-filter-group">

                    <label>Buscar venta</label>

                    <input
                        type="text"
                        placeholder="Buscar por ID, usuario o fecha..."
                        autoComplete="off"
                    />

                </div>

                <div className="sales-filter-group">

                    <label>Estado</label>

                    <select defaultValue="">
                        <option value="">Todos los estados</option>
                        <option value="APR">Aprobada</option>
                        <option value="PEN">Pendiente</option>
                        <option value="CAN">Cancelada</option>
                    </select>

                </div>

                <div className="sales-filter-button">

                    <button type="button">
                        🔎 Filtrar
                    </button>

                </div>

            </div>

            {/* TABLA DE VENTAS */}

            <div className="sales-card">

                <div className="sales-table-container">

                    <table className="sales-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Fecha</th>
                                <th>Método de pago</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>#VTA-001</td>

                                <td>
                                    <strong>cliente01</strong>
                                </td>

                                <td>20/11/2026</td>

                                <td>Tarjeta de crédito</td>

                                <td className="sales-total">
                                    L 265.00
                                </td>

                                <td>
                                    <span className="sales-status sales-status-approved">
                                        Aprobada
                                    </span>
                                </td>

                                <td>
                                    <button type="button" className="sales-view">
                                        Ver detalle
                                    </button>
                                </td>

                            </tr>

                            <tr>

                                <td>#VTA-002</td>

                                <td>
                                    <strong>cliente02</strong>
                                </td>

                                <td>21/11/2026</td>

                                <td>Transferencia bancaria</td>

                                <td className="sales-total">
                                    L 480.00
                                </td>

                                <td>
                                    <span className="sales-status sales-status-pending">
                                        Pendiente
                                    </span>
                                </td>

                                <td>
                                    <button type="button" className="sales-view">
                                        Ver detalle
                                    </button>
                                </td>

                            </tr>

                            <tr>

                                <td>#VTA-003</td>

                                <td>
                                    <strong>cliente03</strong>
                                </td>

                                <td>22/11/2026</td>

                                <td>Efectivo</td>

                                <td className="sales-total">
                                    L 150.00
                                </td>

                                <td>
                                    <span className="sales-status sales-status-cancelled">
                                        Cancelada
                                    </span>
                                </td>

                                <td>
                                    <button type="button" className="sales-view">
                                        Ver detalle
                                    </button>
                                </td>

                            </tr>

                            <tr>

                                <td>#VTA-004</td>

                                <td>
                                    <strong>cliente04</strong>
                                </td>

                                <td>23/11/2026</td>

                                <td>Tarjeta de débito</td>

                                <td className="sales-total">
                                    L 320.00
                                </td>

                                <td>
                                    <span className="sales-status sales-status-approved">
                                        Aprobada
                                    </span>
                                </td>

                                <td>
                                    <button type="button" className="sales-view">
                                        Ver detalle
                                    </button>
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                {/* PAGINACIÓN */}

                <div className="sales-pagination">

                    <button type="button" disabled>
                        Anterior
                    </button>

                    <button type="button" className="sales-page-active">
                        1
                    </button>

                    <button type="button">
                        2
                    </button>

                    <button type="button">
                        3
                    </button>

                    <button type="button">
                        Siguiente
                    </button>

                </div>

            </div>

            {/* FOOTER */}

            <div className="sales-footer">

                <button type="button" className="sales-back">
                    Regresar
                </button>

            </div>

        </div>
    );
}
