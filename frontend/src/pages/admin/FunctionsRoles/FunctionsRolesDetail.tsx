import "./FunctionsRolesDetail.css";

export default function FunctionsRolesDetail() {

    return (
        <div className="functions-roles-detail-page">

            <div className="functions-roles-detail-header">
                <h1>Administración de Funciones del Rol</h1>
                <h2>Administrador</h2>
                <p>Código del rol: ROL-001</p>
            </div>

            <div className="functions-roles-detail-card">

                <div className="functions-roles-container">

                    {/* Funciones asignadas */}
                    <div className="functions-column">

                        <h3>Funciones Asignadas</h3>

                        <div className="functions-search">
                            <label htmlFor="buscarAsignadas">
                                Buscar función
                            </label>

                            <input
                                type="text"
                                id="buscarAsignadas"
                                placeholder="Buscar función..."
                                autoComplete="off"
                            />
                        </div>

                        <div className="functions-table-wrapper">

                            <table>
                                <thead>
                                    <tr>
                                        <th>Función</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Administrar productos</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="functions-btn-remove"
                                            >
                                                Quitar
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Administrar ventas</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="functions-btn-remove"
                                            >
                                                Quitar
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Consultar inventario</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="functions-btn-remove"
                                            >
                                                Quitar
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>

                    {/* Funciones disponibles */}
                    <div className="functions-column">

                        <h3>Funciones Disponibles</h3>

                        <div className="functions-search">
                            <label htmlFor="buscarDisponibles">
                                Buscar función
                            </label>

                            <input
                                type="text"
                                id="buscarDisponibles"
                                placeholder="Buscar función..."
                                autoComplete="off"
                            />
                        </div>

                        <div className="functions-table-wrapper">

                            <table>
                                <thead>
                                    <tr>
                                        <th>Función</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Administrar usuarios</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="functions-btn-add"
                                            >
                                                Asignar
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Administrar roles</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="functions-btn-add"
                                            >
                                                Asignar
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Consultar bitácora</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="functions-btn-add"
                                            >
                                                Asignar
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>

                <div className="functions-detail-buttons">

                    <button
                        type="button"
                        className="functions-btn-back"
                    >
                        Regresar
                    </button>

                </div>

            </div>

        </div>
    );
}
