import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getUsuarioById, Usuario } from "../../../services/users.service";

import {
    Rol,
    RolUsuario,
    getRoles,
    getRolesUsuarios,
    createRolUsuario,
    updateRolUsuario,
} from "../../../services/userRoles.service";

import "./UserRoles.css";

export default function UserRoles() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const usercod = Number(searchParams.get("usercod"));

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [roles, setRoles] = useState<Rol[]>([]);
    const [asignaciones, setAsignaciones] = useState<RolUsuario[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Cargar información
    const cargarInformacion = useCallback(async () => {

        try {
            setLoading(true);
            setError("");

            const [usuarioData, rolesData, asignacionesData] =
                await Promise.all([
                    getUsuarioById(usercod),
                    getRoles(),
                    getRolesUsuarios(),
                ]);

            setUsuario(usuarioData);
            setRoles(rolesData);
            setAsignaciones(
                asignacionesData.filter(
                    (item) => item.usercod === usercod
                )
            );

        } catch (error) {

            console.error(
                "Error al cargar información de roles:",
                error
            );

            setError(
                "No se pudo cargar la información. Verifica la conexión."
            );

        } finally {
            setLoading(false);
        }

    }, [usercod]);

    useEffect(() => {

        if (Number.isInteger(usercod) && usercod > 0) {
            cargarInformacion();
        } else {
            setLoading(false);
            setError("El identificador del usuario no es válido.");
        }

    }, [usercod, cargarInformacion]);

    // Roles asignados activos
    const rolesAsignados = asignaciones.filter(
        (asignacion) => asignacion.roleuserest === "ACT"
    );

    // Roles disponibles
    const rolesDisponibles = roles.filter((rol) => {

        if (rol.rolesest !== "ACT") {
            return false;
        }

        const asignacion = asignaciones.find(
            (item) => item.rolescod === rol.rolescod
        );

        return !asignacion || asignacion.roleuserest === "INA";

    });

    // Asignar rol
    const asignarRol = async (rol: Rol) => {

        try {

            setSaving(true);
            setError("");

            const asignacionExistente = asignaciones.find(
                (item) => item.rolescod === rol.rolescod
            );

            if (asignacionExistente) {

                await updateRolUsuario(
                    usercod,
                    rol.rolescod,
                    {
                        roleuserest: "ACT",
                        roleuserfch: new Date().toISOString(),
                    }
                );

            } else {

                await createRolUsuario({
                    usercod,
                    rolescod: rol.rolescod,
                    roleuserest: "ACT",
                    roleuserfch: new Date().toISOString(),
                    roleuserexp: null,
                });

            }

            await cargarInformacion();

        } catch (error) {

            console.error("Error al asignar rol:", error);

            setError(
                "No se pudo asignar el rol. Intenta nuevamente."
            );

        } finally {
            setSaving(false);
        }

    };

    // Inactivar rol
    const inactivarRol = async (rol: Rol) => {

        const confirmado = window.confirm(
            `¿Deseas inactivar el rol ${rol.rolesdsc}?`
        );

        if (!confirmado) return;

        try {

            setSaving(true);
            setError("");

            await updateRolUsuario(
                usercod,
                rol.rolescod,
                {
                    roleuserest: "INA",
                }
            );

            await cargarInformacion();

        } catch (error) {

            console.error("Error al inactivar rol:", error);

            setError(
                "No se pudo inactivar el rol. Intenta nuevamente."
            );

        } finally {
            setSaving(false);
        }

    };

    // Obtener descripción del rol
    const obtenerRol = (codigo: string) => {

        return roles.find(
            (rol) => rol.rolescod === codigo
        );

    };

    if (loading) {

        return (
            <div className="user-roles-page">
                <h1>Cargando información de roles...</h1>
            </div>
        );

    }

    if (!usuario) {

        return (
            <div className="user-roles-page">

                <h1>Administración de roles</h1>

                <div className="user-roles-empty">
                    {error || "No se encontró el usuario."}
                </div>

                <button
                    type="button"
                    className="user-roles-back"
                    onClick={() => navigate("/admin/users")}
                >
                    ← Regresar
                </button>

            </div>
        );

    }

    return (

        <div className="user-roles-page">

            {/* ENCABEZADO */}

            <div className="user-roles-header">

                <div>
                    <h1>Administración de roles</h1>

                    <p>
                        Gestiona los permisos y roles asignados
                        a los usuarios del sistema.
                    </p>
                </div>

            </div>

            {/* ERROR */}

            {error && (
                <div className="user-roles-error" role="alert">
                    {error}
                </div>
            )}

            {/* INFORMACIÓN DEL USUARIO */}

            <div className="user-roles-user-card">

                <div className="user-roles-user-info">

                    <span className="user-roles-label">
                        USUARIO SELECCIONADO
                    </span>

                    <h2>{usuario.username}</h2>

                    <p>{usuario.useremail}</p>

                    <span className="user-roles-user-code">
                        ID: {usuario.usercod}
                    </span>

                </div>

            </div>

            {/* CONTADORES */}

            <div className="user-roles-summary">

                <div className="user-roles-summary-card">

                    <span className="user-roles-summary-icon assigned">
                        ✓
                    </span>

                    <div>
                        <strong>{rolesAsignados.length}</strong>
                        <p>Roles asignados</p>
                    </div>

                </div>

                <div className="user-roles-summary-card">

                    <span className="user-roles-summary-icon available">
                        +
                    </span>

                    <div>
                        <strong>{rolesDisponibles.length}</strong>
                        <p>Roles disponibles</p>
                    </div>

                </div>

            </div>

            {/* ADMINISTRACIÓN DE ROLES */}

            <div className="user-roles-grid">

                {/* ROLES ASIGNADOS */}

                <div className="user-roles-card">

                    <div className="user-roles-card-header">

                        <div>
                            <h2>Roles asignados</h2>
                            <p>
                                Permisos que tiene actualmente el usuario.
                            </p>
                        </div>

                        <span className="user-roles-count assigned-count">
                            {rolesAsignados.length}
                        </span>

                    </div>

                    <div className="user-roles-list">

                        {rolesAsignados.length > 0 ? (

                            rolesAsignados.map((asignacion) => {

                                const rol = obtenerRol(
                                    asignacion.rolescod
                                );

                                if (!rol) return null;

                                return (

                                    <div
                                        className="user-roles-item"
                                        key={rol.rolescod}
                                    >

                                        <div className="user-roles-item-info">

                                            <div>
                                                <strong>{rol.rolesdsc}</strong>
                                                <span>{rol.rolescod}</span>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            className="user-roles-remove"
                                            disabled={saving}
                                            onClick={() => inactivarRol(rol)}
                                        >
                                            Inactivar
                                        </button>

                                    </div>

                                );

                            })

                        ) : (

                            <div className="user-roles-empty">
                                No hay roles asignados.
                            </div>

                        )}

                    </div>

                </div>

                {/* ROLES DISPONIBLES */}

                <div className="user-roles-card">

                    <div className="user-roles-card-header">

                        <div>
                            <h2>Roles disponibles</h2>
                            <p>
                                Roles que puedes asignar al usuario.
                            </p>
                        </div>

                        <span className="user-roles-count available-count">
                            {rolesDisponibles.length}
                        </span>

                    </div>

                    <div className="user-roles-list">

                        {rolesDisponibles.length > 0 ? (

                            rolesDisponibles.map((rol) => (

                                <div
                                    className="user-roles-item"
                                    key={rol.rolescod}
                                >

                                    <div className="user-roles-item-info">

                                        <div>
                                            <strong>{rol.rolesdsc}</strong>
                                            <span>{rol.rolescod}</span>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        className="user-roles-add"
                                        disabled={saving}
                                        onClick={() => asignarRol(rol)}
                                    >
                                        + Asignar
                                    </button>

                                </div>

                            ))

                        ) : (

                            <div className="user-roles-empty">
                                No hay roles disponibles.
                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* REGRESAR */}

            <div className="user-roles-bottom">

                <button
                    type="button"
                    className="user-roles-back"
                    disabled={saving}
                    onClick={() => navigate("/admin/users")}
                >
                    ← Regresar
                </button>

            </div>

        </div>

    );

}
