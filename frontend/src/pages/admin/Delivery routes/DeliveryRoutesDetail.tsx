import "./DeliveryRoutesDetail.css";

export default function DeliveryRoutesDetail() {

    return (
        <div className="delivery-detail-page">

            <div className="delivery-detail-header">
                <h1>Detalle de la Ruta de Entrega</h1>

                <p>
                    Consulta y administra la información de los recorridos
                    utilizados para la distribución de productos lácteos.
                </p>
            </div>

            <div className="delivery-detail-card">

                <form className="delivery-detail-form">

                    <h2 className="delivery-detail-section-title">
                        Información de la ruta
                    </h2>

                    <div className="delivery-detail-grid">

                        <div className="delivery-detail-group">
                            <label>ID de la ruta</label>
                            <input
                                type="text"
                                value="RUT-001"
                                readOnly
                            />
                        </div>

                        <div className="delivery-detail-group">
                            <label>Estado</label>
                            <select defaultValue="ACT">
                                <option value="ACT">Activo</option>
                                <option value="INA">Inactivo</option>
                            </select>
                        </div>

                        <div className="delivery-detail-group">
                            <label>Origen</label>
                            <input
                                type="text"
                                placeholder="Ingrese el lugar de origen"
                            />
                        </div>

                        <div className="delivery-detail-group">
                            <label>Destino</label>
                            <input
                                type="text"
                                placeholder="Ingrese el lugar de destino"
                            />
                        </div>

                    </div>

                    <h2 className="delivery-detail-section-title">
                        Información del recorrido
                    </h2>

                    <div className="delivery-detail-grid">

                        <div className="delivery-detail-group">
                            <label>Distancia (Km)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Ej. 85.50"
                            />
                        </div>

                        <div className="delivery-detail-group">
                            <label>Duración estimada (Min)</label>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Ej. 90"
                            />
                        </div>

                    </div>

                    <div className="delivery-detail-notice">
                        <span>🚚</span>
                        <p>
                            La información de esta ruta permitirá organizar
                            las entregas de productos lácteos y estimar
                            los tiempos de distribución.
                        </p>
                    </div>

                    <div className="delivery-detail-buttons">

                        <button
                            type="button"
                            className="delivery-detail-submit"
                        >
                            Confirmar
                        </button>

                        <button
                            type="button"
                            className="delivery-detail-back"
                        >
                            Regresar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
