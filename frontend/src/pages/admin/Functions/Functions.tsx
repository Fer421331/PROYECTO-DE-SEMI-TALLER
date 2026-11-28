import { useState } from "react";
import "./Functions.css";

export default function Functions() {

    const [buscar, setBuscar] = useState("");
    const [estado, setEstado] = useState("");

    const funciones = [
        {
            codigo: "FN001",
            descripcion: "Administrar productos",
            tipo: "CRUD",
            estado: "ACT"
        },
        {
            codigo: "FN002",
            descripcion: "Consultar inventario",
            tipo: "READ",
            estado: "ACT"
        },
        {
            codigo: "FN003",
            descripcion: "Administrar ventas",
            tipo: "CRUD",
            estado: "ACT"
        },
        {
            codigo: "FN004",
            descripcion: "Gestionar usuarios",
            tipo: "CRUD",
            estado: "INA"
        },
        {
            codigo: "FN005",
            descripcion: "Consultar bitácora",
            tipo: "READ",
            estado: "ACT"
        },
        {
            codigo: "FN006",
            descripcion: "Administrar categorías",
            tipo: "CRUD",
            estado: "ACT"
        },
        {
            codigo: "FN007",
            descripcion: "Gestionar direcciones",
            tipo: "CRUD",
            estado: "INA"
        }
    ];

    const funcionesFiltradas = funciones.filter((funcion) => {

        const coincideBusqueda =
            funcion.codigo.toLowerCase().includes(buscar.toLowerCase()) ||
            funcion.descripcion.toLowerCase().includes(buscar.toLowerCase()) ||
            funcion.tipo.toLowerCase().includes(buscar.toLowerCase());

        const coincideEstado =
            estado === "" || funcion.estado === estado;

        return coincideBusqueda && coincideEstado;

    });

    return (

        <div className="functions-page">

            {/* ENCABEZADO */}

            <div className="functions-header">

                <div>
                    <h1>Funciones</h1>

                    <p>
                        Administra las funciones y permisos disponibles
                        dentro del sistema.
                    </p>
                </div>

                <div className="functions-header-icon">
                    <span>⚙️</span>
                </div>

            </div>

            {/* FILTROS */}

            <div className="functions-card">

                <h2 className="functions-section-title">
                    Filtrar funciones
                </h2>

                <div className="functions-filters">

                    <div className="functions-filter-group">
                        <label htmlFor="buscarFuncion">
                            Descripción
                        </label>

                        <div className="functions-search-input">
                            <span>🔎</span>

                            <input
                                type="text"
                                id="buscarFuncion"
                                placeholder="Buscar función..."
                                value={buscar}
                                onChange={(e) => setBuscar(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="functions-filter-group">
                        <label htmlFor="estadoFuncion">
                            Estado
                        </label>

                        <select
                            id="estadoFuncion"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="ACT">Activo</option>
                            <option value="INA">Inactivo</option>
                        </select>
                    </div>

                    <div className="functions-filter-buttons">

                        <button
                            type="button"
                            className="functions-clear-button"
                            onClick={() => {
                                setBuscar("");
                                setEstado("");
                            }}
                        >
                            Limpiar
                        </button>

                    </div>

                </div>

            </div>

            {/* TABLA */}

            <div className="functions-table-card">

                <div className="functions-table-header">

                    <div>
                        <h2>Listado de funciones</h2>

                        <p>
                            Consulta y administra las funciones del sistema.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="functions-create-button"
                    >
                        <span>+</span>
                        Crear función
                    </button>

                </div>

                <div className="functions-table-container">

                    <table className="functions-table">

                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {funcionesFiltradas.map((funcion) => (

                                <tr key={funcion.codigo}>

                                    <td>
                                        <span className="functions-code">
                                            {funcion.codigo}
                                        </span>
                                    </td>

                                    <td>
                                        <strong className="functions-description">
                                            {funcion.descripcion}
                                        </strong>
                                    </td>

                                    <td>
                                        <span className="functions-type">
                                            {funcion.tipo}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={
                                            funcion.estado === "ACT"
                                                ? "functions-status functions-status-active"
                                                : "functions-status functions-status-inactive"
                                        }>
                                            {funcion.estado === "ACT"
                                                ? "Activo"
                                                : "Inactivo"}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="functions-actions">

                                            <button
                                                type="button"
                                                className="functions-action-view"
                                                title="Ver función"
                                            >
                                                Ver
                                            </button>

                                            <button
                                                type="button"
                                                className="functions-action-edit"
                                                title="Editar función"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                className="functions-action-delete"
                                                title="Eliminar función"
                                            >
                                                Eliminar
                                            </button>

                                        </div>
                                    </td>

                                </tr>

                            ))}

                            {funcionesFiltradas.length === 0 && (

                                <tr>
                                    <td colSpan={5}>
                                        <div className="functions-empty">
                                            <span>📭</span>

                                            <strong>
                                                No se encontraron funciones
                                            </strong>

                                            <p>
                                                Intenta modificar los filtros
                                                de búsqueda.
                                            </p>
                                        </div>
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="functions-table-footer">
                    <span>
                        Mostrando {funcionesFiltradas.length} de {funciones.length} funciones
                    </span>
                </div>

            </div>

            {/* REGRESAR */}

            <div className="functions-footer">

                <button
                    type="button"
                    className="functions-back-button"
                >
                    Regresar
                </button>

            </div>

        </div>

    );

}
