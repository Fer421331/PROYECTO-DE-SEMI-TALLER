import { useState } from "react";
import "./UserRoles.css";

const rolesIniciales = [
    { codigo: "ROL001", descripcion: "Administrador" },
    { codigo: "ROL002", descripcion: "Gestor de inventario" }
];

const rolesDisponiblesIniciales = [
    { codigo: "ROL003", descripcion: "Vendedor" },
    { codigo: "ROL004", descripcion: "Supervisor" },
    { codigo: "ROL005", descripcion: "Consulta" }
];

export default function UserRoles() {

    const [rolesAsignados, setRolesAsignados] = useState(rolesIniciales);

    const [rolesDisponibles, setRolesDisponibles] = useState(
        rolesDisponiblesIniciales
    );

    const asignarRol = (rol: typeof rolesIniciales[0]) => {
        setRolesDisponibles(prev =>
            prev.filter(item => item.codigo !== rol.codigo)
        );

        setRolesAsignados(prev => [...prev, rol]);
    };

    const inactivarRol = (rol: typeof rolesIniciales[0]) => {
        setRolesAsignados(prev =>
            prev.filter(item => item.codigo !== rol.codigo)
        );

        setRolesDisponibles(prev => [...prev, rol]);
    };

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

                <div className="user-roles-header-icon">
                    ⚙️
                </div>

            </div>

            {/* INFORMACIÓN DEL USUARIO */}

            <div className="user-roles-user-card">

                <div className="user-roles-avatar">
                    👤
                </div>

                <div className="user-roles-user-info">

                    <span className="user-roles-label">
                        USUARIO SELECCIONADO
                    </span>

                    <h2>Administrador General</h2>

                    <p>admin@axume.com</p>

                    <span className="user-roles-user-code">
                        ID: USR001
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
                            <p>Permisos que tiene actualmente el usuario.</p>
                        </div>

                        <span className="user-roles-count assigned-count">
                            {rolesAsignados.length}
                        </span>

                    </div>

                    <div className="user-roles-list">

                        {rolesAsignados.length > 0 ? (

                            rolesAsignados.map(rol => (

                                <div
                                    className="user-roles-item"
                                    key={rol.codigo}
                                >

                                    <div className="user-roles-item-info">

                                        <div className="user-roles-item-icon">
                                            🔐
                                        </div>

                                        <div>
                                            <strong>{rol.descripcion}</strong>
                                            <span>{rol.codigo}</span>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        className="user-roles-remove"
                                        onClick={() => inactivarRol(rol)}
                                    >
                                        Inactivar
                                    </button>

                                </div>

                            ))

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
                            <p>Roles que puedes asignar al usuario.</p>
                        </div>

                        <span className="user-roles-count available-count">
                            {rolesDisponibles.length}
                        </span>

                    </div>

                    <div className="user-roles-list">

                        {rolesDisponibles.length > 0 ? (

                            rolesDisponibles.map(rol => (

                                <div
                                    className="user-roles-item"
                                    key={rol.codigo}
                                >

                                    <div className="user-roles-item-info">

                                        <div className="user-roles-item-icon available-icon">
                                            🛡️
                                        </div>

                                        <div>
                                            <strong>{rol.descripcion}</strong>
                                            <span>{rol.codigo}</span>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        className="user-roles-add"
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
                >
                    ← Regresar
                </button>

            </div>

        </div>

    );

}
