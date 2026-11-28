import "./SaleDetail.css";

export default function SaleDetail() {

    return (
        <div className="sale-detail-page">

            {/* ENCABEZADO */}

            <div className="sale-detail-header">

                <h1>Detalle de Venta #VTA-001</h1>

                <p>
                    Consulta la información completa de esta venta
                    y los productos adquiridos.
                </p>

            </div>

            <div className="sale-detail-card">

                {/* INFORMACIÓN DE LA VENTA */}

                <h2 className="sale-detail-section-title">
                    Información de la venta
                </h2>

                <div className="sale-detail-info-grid">

                    <div className="sale-detail-info-item">
                        <span>Usuario</span>
                        <strong>cliente01</strong>
                    </div>

                    <div className="sale-detail-info-item">
                        <span>Fecha</span>
                        <strong>20/11/2026</strong>
                    </div>

                    <div className="sale-detail-info-item">
                        <span>Método de pago</span>
                        <strong>Tarjeta de crédito</strong>
                    </div>

                    <div className="sale-detail-info-item">
                        <span>Estado</span>
                        <strong>
                            <span className="sale-detail-status sale-detail-status-approved">
                                Aprobada
                            </span>
                        </strong>
                    </div>

                    <div className="sale-detail-info-item sale-detail-full">
                        <span>Total de la venta</span>
                        <strong className="sale-detail-total">
                            L 265.00
                        </strong>
                    </div>

                </div>

                {/* DIRECCIÓN DE ENTREGA */}

                <h2 className="sale-detail-section-title">
                    Dirección de entrega
                </h2>

                <div className="sale-detail-info-grid">

                    <div className="sale-detail-info-item">
                        <span>Receptor</span>
                        <strong>Juan Pérez</strong>
                    </div>

                    <div className="sale-detail-info-item">
                        <span>Teléfono</span>
                        <strong>9999-1234</strong>
                    </div>

                    <div className="sale-detail-info-item">
                        <span>Departamento</span>
                        <strong>Francisco Morazán</strong>
                    </div>

                    <div className="sale-detail-info-item">
                        <span>Ciudad</span>
                        <strong>Tegucigalpa</strong>
                    </div>

                    <div className="sale-detail-info-item sale-detail-full">
                        <span>Detalle de dirección</span>
                        <strong>
                            Colonia Palmira, avenida principal,
                            casa número 15.
                        </strong>
                    </div>

                    <div className="sale-detail-info-item sale-detail-full">
                        <span>Referencia</span>
                        <strong>
                            Frente al parque, portón color blanco.
                        </strong>
                    </div>

                </div>

                {/* PRODUCTOS */}

                <h2 className="sale-detail-section-title">
                    Productos vendidos
                </h2>

                <div className="sale-detail-table-container">

                    <table className="sale-detail-table">

                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>
                                    <strong>Leche entera pasteurizada</strong>
                                    <span className="sale-detail-product-category">
                                        Leches
                                    </span>
                                </td>

                                <td>L 35.00</td>

                                <td>3</td>

                                <td className="sale-detail-table-total">
                                    L 105.00
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Queso fresco</strong>
                                    <span className="sale-detail-product-category">
                                        Quesos
                                    </span>
                                </td>

                                <td>L 80.00</td>

                                <td>1</td>

                                <td className="sale-detail-table-total">
                                    L 80.00
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Yogur natural</strong>
                                    <span className="sale-detail-product-category">
                                        Yogures
                                    </span>
                                </td>

                                <td>L 40.00</td>

                                <td>2</td>

                                <td className="sale-detail-table-total">
                                    L 80.00
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

                {/* RESUMEN */}

                <div className="sale-detail-summary">

                    <span>Total de la venta</span>

                    <strong>L 265.00</strong>

                </div>

                {/* BOTONES */}

                <div className="sale-detail-buttons">

                    <button type="button" className="sale-detail-back">
                        Regresar
                    </button>

                </div>

            </div>

        </div>
    );
}
