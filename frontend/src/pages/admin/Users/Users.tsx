import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Usuario,
    getUsuarios,
} from "../../../services/users.service";

import "./Users.css";

export default function Users() {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [buscar, setBuscar] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const cargarUsuarios = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getUsuarios();

            setUsuarios(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Error al cargar usuarios:", error);

            setError(
                "No se pudieron cargar los usuarios. Verifica la conexión."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    // Buscar usuarios
    const usuariosFiltrados = usuarios.filter((usuario) =>
        `${usuario.usercod} ${usuario.useremail} ${usuario.username} ${usuario.userest} ${usuario.usertipo}`
            .toLowerCase()
            .includes(buscar.toLowerCase().trim())
    );

    // Administrar roles del usuario
    const handleAdministrarRoles = (usuario: Usuario) => {
        navigate(
            `/admin/user-roles?usercod=${usuario.usercod}`
        );
    };

    const handleBack = () => {
        navigate("/admin/panel");
    };

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

            </div>

            {/* TARJETA */}

            <div className="users-card">

                {/* BUSCADOR */}

                <div className="users-toolbar">

                    <div className="users-search">

                        <input
                            type="text"
                            placeholder="Buscar por ID, correo, nombre o tipo..."
                            value={buscar}
                            onChange={(e) =>
                                setBuscar(e.target.value)
                            }
                        />

                    </div>

                </div>

                {/* ERROR */}

                {error && (
                    <div className="users-error" role="alert">
                        {error}
                    </div>
                )}

                {/* TABLA */}

                <div className="users-table-container">

                    {loading ? (

                        <p className="users-empty">
                            Cargando usuarios...
                        </p>

                    ) : (

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

                                        <tr key={usuario.usercod}>

                                            <td>
                                                <span className="users-code">
                                                    {usuario.usercod}
                                                </span>
                                            </td>

                                            <td>
                                                {usuario.useremail}
                                            </td>

                                            <td>
                                                <strong>
                                                    {usuario.username}
                                                </strong>
                                            </td>

                                            <td>

                                                <span
                                                    className={`users-status ${usuario.userest === "ACT"
                                                            ? "active"
                                                            : "inactive"
                                                        }`}
                                                >
                                                    {usuario.userest === "ACT"
                                                        ? "Activo"
                                                        : "Inactivo"}
                                                </span>

                                            </td>

                                            <td>
                                                <span className="users-type">
                                                    {usuario.usertipo === "ADM"
                                                        ? "Administrador"
                                                        : "Cliente"}
                                                </span>
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="users-roles-button"
                                                    onClick={() =>
                                                        handleAdministrarRoles(usuario)
                                                    }
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

                    )}

                </div>

                {/* PIE */}

                <div className="users-footer">

                    <span>
                        Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
                    </span>

                </div>

            </div>

            {/* REGRESAR */}

            <div className="users-bottom">

                <button
                    type="button"
                    className="users-back"
                    onClick={handleBack}
                >
                    ← Regresar
                </button>

            </div>

        </div>

    );

}
