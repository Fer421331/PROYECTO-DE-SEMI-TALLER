import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Rol,
    getRoles,
    deleteRol,
} from "../../../services/roles.service";

import "./RolesList.css";

export default function RolesList() {

    const navigate = useNavigate();

    const [roles, setRoles] = useState<Rol[]>([]);
    const [buscar, setBuscar] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Cargar roles
    const cargarRoles = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getRoles();

            setRoles(Array.isArray(data) ? data : []);

        } catch (err: unknown) {
            console.error("Error al cargar roles:", err);

            setError(
                "No se pudieron cargar los roles. Verifica la conexión."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarRoles();
    }, []);

    // Buscar roles
    const rolesFiltrados = roles.filter((rol) =>
        `${rol.rolescod} ${rol.rolesdsc} ${rol.rolesest}`
            .toLowerCase()
            .includes(buscar.toLowerCase().trim())
    );

    // Nuevo rol
    const handleAdd = () => {
        navigate("/admin/roles/detail?mode=INS");
    };

    // Ver rol
    const handleView = (rol: Rol) => {
        navigate(
            `/admin/roles/detail?mode=DSP&rolescod=${encodeURIComponent(rol.rolescod)}`
        );
    };

    // Editar rol
    const handleEdit = (rol: Rol) => {
        navigate(
            `/admin/roles/detail?mode=UPD&rolescod=${encodeURIComponent(rol.rolescod)}`
        );
    };

    // Eliminar rol
    const handleDelete = async (rolescod: string) => {

        const confirmed = window.confirm(
            "¿Estás seguro de que deseas eliminar este rol?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteRol(rolescod);

            alert("Rol eliminado correctamente.");

            await cargarRoles();

        } catch (err: unknown) {
            console.error("Error al eliminar rol:", err);

            setError(
                "No se pudo eliminar el rol. Puede tener usuarios asociados."
            );
        }
    };

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

            </div>

            {/* TARJETA */}

            <div className="roles-list-card">

                {error && (
                    <div className="roles-list-error" role="alert">
                        {error}
                    </div>
                )}

                <div className="roles-list-toolbar">

                    <div className="roles-list-search">

                        <input
                            type="text"
                            placeholder="Buscar rol..."
                            value={buscar}
                            autoComplete="off"
                            onChange={(e) =>
                                setBuscar(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="button"
                        className="roles-list-create"
                        onClick={handleAdd}
                    >
                        + Nuevo rol
                    </button>

                </div>

                {/* TABLA */}

                <div className="roles-list-table-container">

                    {loading ? (

                        <p className="roles-list-empty">
                            Cargando roles...
                        </p>

                    ) : (

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

                                        <tr key={rol.rolescod}>

                                            <td>
                                                <span className="roles-list-code">
                                                    {rol.rolescod}
                                                </span>
                                            </td>

                                            <td>
                                                <strong>
                                                    {rol.rolesdsc}
                                                </strong>
                                            </td>

                                            <td>

                                                <span
                                                    className={`roles-list-status ${rol.rolesest === "ACT"
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

                                                <div className="roles-list-actions">

                                                    <button
                                                        type="button"
                                                        className="roles-list-view"
                                                        onClick={() => handleView(rol)}
                                                    >
                                                        Ver
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="roles-list-edit"
                                                        onClick={() => handleEdit(rol)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="roles-list-delete"
                                                        onClick={() =>
                                                            handleDelete(rol.rolescod)
                                                        }
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

                    )}

                </div>

                {/* PIE */}

                <div className="roles-list-footer">

                    <span>
                        Mostrando {rolesFiltrados.length} de {roles.length} roles
                    </span>

                </div>

            </div>

            {/* REGRESAR */}

            <div className="roles-list-bottom">

                <button
                    type="button"
                    className="roles-list-back"
                    onClick={() => navigate("/admin/panel")}
                >
                    ← Regresar
                </button>

            </div>

        </div>

    );

}
