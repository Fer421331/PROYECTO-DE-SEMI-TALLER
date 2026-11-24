import { useState } from "react";
import "./FunctionsRoles.css";

const rolesIniciales = [
    {
        codigo: "ROL001",
        descripcion: "Administrador",
        estado: "ACT"
    },
    {
        codigo: "ROL002",
        descripcion: "Gestor de inventario",
        estado: "ACT"
    },
    {
        codigo: "ROL003",
        descripcion: "Vendedor",
        estado: "ACT"
    },
    {
        codigo: "ROL004",
        descripcion: "Supervisor",
        estado: "INA"
    },
    {
        codigo: "ROL005",
        descripcion: "Consulta",
        estado: "ACT"
    }
];

export default function FunctionsRoles() {

    const [buscar, setBuscar] = useState("");

    const rolesFiltrados = rolesIniciales.filter((rol) =>
        `${rol.codigo} ${rol.descripcion} ${rol.estado}`
            .toLowerCase()
            .includes(buscar.toLowerCase().trim())
    );

    return (

        <div className="functions-roles-page">

            {/* ENCABEZADO */}

            <div className="functions-roles-header">

                <div>
                    <h1>Asignar funciones a roles</h1>

                    <p>
                        Administra las funciones y permisos
                        disponibles para cada rol del sistema.
                    </p>
                </div>

                <div className="functions-roles-header-icon">
                    🔐
                </div>

            </div>

            {/* RESUMEN */}

            <div className="functions-roles-summary">

                <div className="functions-roles-summary-card">

                    <div className="functions-roles-summary-icon">
                        👥
                    </div>

                    <div>
                        <strong>{rolesIniciales.length}</strong>
                        <span>Roles registrados</span>
                    </div>

                </div>

                <div className="functions-roles-summary-card">

                    <div className="functions-roles-summary-icon active-icon">
                        ✓
                    </div>

                    <div>
                        <strong>
                            {rolesIniciales.filter(rol => rol.estado === "ACT").length}
                        </strong>
                        <span>Roles activos</span>
                    </div>

                </div>

            </div>

            {/* TABLA */}

            <div className="functions-roles-card">

                <div className="functions-roles-toolbar">

                    <div>
                        <h2>Listado de roles</h2>

                        <p>
                            Selecciona un rol para administrar sus funciones.
                        </p>
                    </div>

                    <div className="functions-roles-search">

                        <span>🔎</span>

                        <input
                            type="text"
                            placeholder="Buscar rol..."
                            value={buscar}
                            onChange={(e) => setBuscar(e.target.value)}
                        />

                    </div>

                </div>

                <div className="functions-roles-table-container">

                    <table className="functions-roles-table">

                        <thead>

                            <tr>
                                <th>Código</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {rolesFiltrados.length > 0 ? (

                                rolesFiltrados.map((rol) => (

                                    <tr key={rol.codigo}>

                                        <td>
                                            <span className="functions-roles-code">
                                                {rol.codigo}
                                            </span>
                                        </td>

                                        <td>
                                            <strong>{rol.descripcion}</strong>
                                        </td>

                                        <td>

                                            <span
                                                className={`functions-roles-status ${rol.estado === "ACT"
                                                        ? "active"
                                                        : "inactive"
                                                    }`}
                                            >
                                                {rol.estado === "ACT"
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                type="button"
                                                className="functions-roles-manage"
                                            >
                                                ⚙ Administrar funciones
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan={4}
                                        className="functions-roles-empty"
                                    >
                                        No se encontraron roles.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* PIE */}

                <div className="functions-roles-footer">

                    Mostrando {rolesFiltrados.length} de {rolesIniciales.length} roles

                </div>

            </div>

            {/* REGRESAR */}

            <div className="functions-roles-bottom">

                <button
                    type="button"
                    className="functions-roles-back"
                >
                    ← Regresar
                </button>

            </div>

        </div>

    );

}
