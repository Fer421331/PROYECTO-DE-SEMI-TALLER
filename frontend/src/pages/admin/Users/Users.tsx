import { useState } from "react";
import "./Users.css";

const usuariosIniciales = [
    {
        codigo: "USR001",
        correo: "admin@axume.com",
        nombre: "Administrador General",
        estado: "ACT",
        tipo: "Administrador"
    },
    {
        codigo: "USR002",
        correo: "empleado@axume.com",
        nombre: "Carlos Martínez",
        estado: "ACT",
        tipo: "Empleado"
    },
    {
        codigo: "USR003",
        correo: "cliente@gmail.com",
        nombre: "María López",
        estado: "ACT",
        tipo: "Cliente"
    },
    {
        codigo: "USR004",
        correo: "usuario@gmail.com",
        nombre: "Juan Hernández",
        estado: "INA",
        tipo: "Cliente"
    }
];

export default function Users() {

    const [buscar, setBuscar] = useState("");

    const usuariosFiltrados = usuariosIniciales.filter((usuario) =>
        `${usuario.codigo} ${usuario.correo} ${usuario.nombre} ${usuario.estado} ${usuario.tipo}`
            .toLowerCase()
            .includes(buscar.toLowerCase().trim())
    );

    return (

        <div className="users-page">

            {/* ENCABEZADO */}

            <div className="users-header">

                <div>
                    <h1>Usuarios del sistema</h1>

                    <p>
                        Consulta los usuarios registrados y administra
                        sus roles dentro del sistema.
                    </p>
                </div>

                <div className="users-header-icon">
                    👤
                </div>

            </div>

            {/* TARJETA */}

            <div className="users-card">

                {/* BUSCADOR */}

                <div className="users-toolbar">

                    <div className="users-search">

                        <span>🔎</span>

                        <input
                            type="text"
                            placeholder="Buscar por ID, correo, nombre o tipo..."
                            value={buscar}
                            onChange={(e) => setBuscar(e.target.value)}
                        />

                    </div>

                </div>

                {/* TABLA */}

                <div className="users-table-container">

                    <table className="users-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Correo</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {usuariosFiltrados.length > 0 ? (

                                usuariosFiltrados.map((usuario) => (

                                    <tr key={usuario.codigo}>

                                        <td>
                                            <span className="users-code">
                                                {usuario.codigo}
                                            </span>
                                        </td>

                                        <td>
                                            {usuario.correo}
                                        </td>

                                        <td>
                                            <strong>
                                                {usuario.nombre}
                                            </strong>
                                        </td>

                                        <td>

                                            <span
                                                className={`users-status ${usuario.estado === "ACT"
                                                        ? "active"
                                                        : "inactive"
                                                    }`}
                                            >
                                                {usuario.estado === "ACT"
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>

                                        </td>

                                        <td>
                                            <span className="users-type">
                                                {usuario.tipo}
                                            </span>
                                        </td>

                                        <td>

                                            <button
                                                type="button"
                                                className="users-roles-button"
                                            >
                                                ⚙ Administrar roles
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan={6}
                                        className="users-empty"
                                    >
                                        No se encontraron usuarios.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* PIE */}

                <div className="users-footer">

                    <span>
                        Mostrando {usuariosFiltrados.length} de {usuariosIniciales.length} usuarios
                    </span>

                </div>

            </div>

            {/* REGRESAR */}

            <div className="users-bottom">

                <button
                    type="button"
                    className="users-back"
                >
                    ← Regresar
                </button>

            </div>

        </div>

    );

}
