
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Rol,
    getRoles,
} from "../../../services/functionroles.service";

import "./FunctionsRoles.css";

export default function FunctionsRoles() {

    const navigate = useNavigate();

    const [roles, setRoles] = useState<Rol[]>([]);
    const [buscar, setBuscar] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Cargar roles
    const cargarRoles = useCallback(async () => {

        try {

            setLoading(true);
            setError("");

            const rolesData = await getRoles();

            setRoles(rolesData);

        } catch (error) {

            console.error("Error al cargar roles:", error);

            setError(
                "No se pudieron cargar los roles. Verifica la conexión."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {
        cargarRoles();
    }, [cargarRoles]);

    // Filtrar roles
    const rolesFiltrados = roles.filter((rol) =>
        `${rol.rolescod} ${rol.rolesdsc} ${rol.rolesest}`
            .toLowerCase()
            .includes(buscar.toLowerCase().trim())
    );

    // Contar roles activos
    const rolesActivos = roles.filter(
        (rol) => rol.rolesest === "ACT"
    ).length;

    // Administrar funciones
    const administrarFunciones = (rol: Rol) => {

        navigate(
            `/admin/functions-roles/detail?rolescod=${encodeURIComponent(rol.rolescod)}`
        );

    };

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

            </div>

            {/* RESUMEN */}

            <div className="functions-roles-summary">

                <div className="functions-roles-summary-card">

                    <div>
                        <strong>{roles.length}</strong>
                        <span>Roles registrados</span>
                    </div>

                </div>

                <div className="functions-roles-summary-card">

                    <div className="functions-roles-summary-icon active-icon">
                        ✓
                    </div>

                    <div>
                        <strong>{rolesActivos}</strong>
                        <span>Roles activos</span>
                    </div>

                </div>

            </div>

            {/* ERROR */}

            {error && (
                <div className="functions-roles-error" role="alert">
                    {error}
                </div>
            )}

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

                            {loading ? (

                                <tr>
                                    <td colSpan={4} className="functions-roles-empty">
                                        Cargando roles...
                                    </td>
                                </tr>

                            ) : error ? (

                                <tr>
                                    <td colSpan={4} className="functions-roles-empty">

                                        <button
                                            type="button"
                                            onClick={cargarRoles}
                                        >
                                            Reintentar
                                        </button>

                                    </td>
                                </tr>

                            ) : rolesFiltrados.length > 0 ? (

                                rolesFiltrados.map((rol) => (

                                    <tr key={rol.rolescod}>

                                        <td>
                                            <span className="functions-roles-code">
                                                {rol.rolescod}
                                            </span>
                                        </td>

                                        <td>
                                            <strong>{rol.rolesdsc}</strong>
                                        </td>

                                        <td>

                                            <span
                                                className={`functions-roles-status ${rol.rolesest === "ACT"
                                                    ? "active"
                                                    : "inactive"
                                                    }`}
                                            >
                                                {rol.rolesest === "ACT"
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                type="button"
                                                className="functions-roles-manage"
                                                disabled={rol.rolesest !== "ACT"}
                                                onClick={() =>
                                                    administrarFunciones(rol)
                                                }
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

                <div className="functions-roles-footer">
                    Mostrando {rolesFiltrados.length} de {roles.length} roles
                </div>

            </div>

            {/* REGRESAR */}

            <div className="functions-roles-bottom">

                <button
                    type="button"
                    className="functions-roles-back"
                    onClick={() => navigate("/admin/panel")}
                >
                    ← Regresar
                </button>

            </div>

        </div>

    );

}
