import { useState } from "react";
import "./RolesList.css";

const rolesIniciales = [
    {
        codigo: "ROL001",
        descripcion: "Administrador",
        estado: "ACT"
    },
    {
        codigo: "ROL002",
        descripcion: "Empleado",
        estado: "ACT"
    },
    {
        codigo: "ROL003",
        descripcion: "Cliente",
        estado: "ACT"
    },
    {
        codigo: "ROL004",
        descripcion: "Supervisor",
        estado: "INA"
    }
];

export default function RolesList() {

    const [buscar, setBuscar] = useState("");

    const rolesFiltrados = rolesIniciales.filter((rol) =>
        `${rol.codigo} ${rol.descripcion} ${rol.estado}`
            .toLowerCase()
            .includes(buscar.toLowerCase().trim())
    );

    return (

        <div className="roles-list-page">

            {/* ENCABEZADO */}

            <div className="roles-list-header">

                <div>
                    <h1>Administración de roles</h1>

                    <p>
                        Consulta y administra los roles y permisos
                        disponibles en el sistema.
                    </p>
                </div>

                <div className="roles-list-icon">
                    👥
                </div>

            </div>

            {/* TARJETA */}

            <div className="roles-list-card">

                <div className="roles-list-toolbar">

                    <div className="roles-list-search">

                        <span>🔎</span>

                        <input
                            type="text"
                            placeholder="Buscar rol..."
                            value={buscar}
                            onChange={(e) => setBuscar(e.target.value)}
                        />

                    </div>

                    <button
                        type="button"
                        className="roles-list-create"
                    >
                        + Nuevo rol
                    </button>

                </div>

                {/* TABLA */}

                <div className="roles-list-table-container">

                    <table className="roles-list-table">

                        <thead>

                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {rolesFiltrados.length > 0 ? (

                                rolesFiltrados.map((rol) => (

                                    <tr key={rol.codigo}>

                                        <td>
                                            <span className="roles-list-code">
                                                {rol.codigo}
                                            </span>
                                        </td>

                                        <td>
                                            <strong>
                                                {rol.descripcion}
                                            </strong>
                                        </td>

                                        <td>

                                            <span
                                                className={`roles-list-status ${rol.estado === "ACT"
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

                                            <div className="roles-list-actions">

                                                <button
                                                    type="button"
                                                    className="roles-list-view"
                                                >
                                                    Ver
                                                </button>

                                                <button
                                                    type="button"
                                                    className="roles-list-edit"
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="roles-list-delete"
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan={4}
                                        className="roles-list-empty"
                                    >
                                        No se encontraron roles.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* PIE */}

                <div className="roles-list-footer">

                    <span>
                        Mostrando {rolesFiltrados.length} de {rolesIniciales.length} roles
                    </span>

                </div>

            </div>

            {/* REGRESAR */}

            <div className="roles-list-bottom">

                <button
                    type="button"
                    className="roles-list-back"
                >
                    ← Regresar
                </button>

            </div>

        </div>

    );

}
