import "./DeliveryRoutesList.css";

export default function DeliveryRoutesList() {

    const rutas = [
        {
            id: 1,
            origen: "Tegucigalpa",
            destino: "Comayagua",
            distancia: 88,
            duracion: 90,
            estado: "Activo"
        },
        {
            id: 2,
            origen: "Tegucigalpa",
            destino: "San Pedro Sula",
            distancia: 243,
            duracion: 210,
            estado: "Activo"
        },
        {
            id: 3,
            origen: "Comayagua",
            destino: "La Paz",
            distancia: 35,
            duracion: 40,
            estado: "Inactivo"
        }
    ];

    return (
        <div className="delivery-routes-page">

            <div className="delivery-routes-header">

                <h1>Rutas de Entrega</h1>

                <p>
                    Administra los recorridos y destinos utilizados
                    para la distribución de productos lácteos.
                </p>

            </div>

            <div className="delivery-routes-card">

                <div className="delivery-routes-filters">

                    <div className="delivery-filter-group">

                        <label htmlFor="buscarRuta">
                            Buscar ruta
                        </label>

                        <input
                            type="text"
                            id="buscarRuta"
                            placeholder="Buscar por origen o destino..."
                        />

                    </div>

                    <div className="delivery-filter-group">

                        <label htmlFor="estadoRuta">
                            Estado
                        </label>

                        <select id="estadoRuta" defaultValue="">
                            <option value="">Todos</option>
                            <option value="ACT">Activo</option>
                            <option value="INA">Inactivo</option>
                        </select>

                    </div>

                    <button type="button" className="delivery-filter-button">
                        🔎 Filtrar
                    </button>

                </div>

                <div className="delivery-routes-actions">

                    <button type="button" className="delivery-add-button">
                        + Nueva Ruta
                    </button>

                </div>

                <div className="delivery-routes-table-wrapper">

                    <table className="delivery-routes-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Distancia (Km)</th>
                                <th>Duración (Min)</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {rutas.map((ruta) => (

                                <tr key={ruta.id}>

                                    <td>{ruta.id}</td>

                                    <td>{ruta.origen}</td>

                                    <td>{ruta.destino}</td>

                                    <td>{ruta.distancia} km</td>

                                    <td>{ruta.duracion} min</td>

                                    <td>
                                        <span className={`delivery-status ${ruta.estado === "Activo"
                                                ? "delivery-status-active"
                                                : "delivery-status-inactive"
                                            }`}>
                                            {ruta.estado}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="delivery-row-actions">

                                            <button
                                                type="button"
                                                className="delivery-view-button"
                                            >
                                                Ver
                                            </button>

                                            <button
                                                type="button"
                                                className="delivery-edit-button"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                className="delivery-delete-button"
                                            >
                                                Eliminar
                                            </button>

                                        </div>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="delivery-routes-footer">

                    <button type="button" className="delivery-back-button">
                        Regresar
                    </button>

                </div>

            </div>

        </div>
    );
}
