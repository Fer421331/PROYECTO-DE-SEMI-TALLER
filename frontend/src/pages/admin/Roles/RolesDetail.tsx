import { useState } from "react";
import "./RolesDetail.css";

export default function RolesDetail() {

    const [codigo, setCodigo] = useState("ROL001");
    const [descripcion, setDescripcion] = useState("Administrador");
    const [estado, setEstado] = useState("ACT");

    return (

        <div className="roles-detail-page">

            {/* ENCABEZADO */}

            <div className="roles-detail-header">

                <div>
                    <h1>Detalle del rol</h1>

                    <p>
                        Consulta y administra la información de los
                        roles del sistema.
                    </p>
                </div>

                <div className="roles-detail-icon">
                    👥
                </div>

            </div>

            {/* FORMULARIO */}

            <div className="roles-detail-card">

                <form className="roles-detail-form">

                    <h2 className="roles-detail-section-title">
                        Información del rol
                    </h2>

                    <div className="roles-detail-grid">

                        {/* CÓDIGO */}

                        <div className="roles-detail-group">
                            <label htmlFor="rolescod">
                                Código
                            </label>

                            <input
                                type="text"
                                id="rolescod"
                                value={codigo}
                                maxLength={20}
                                onChange={(e) => setCodigo(e.target.value)}
                                placeholder="Ingrese el código del rol"
                            />
                        </div>

                        {/* DESCRIPCIÓN */}

                        <div className="roles-detail-group roles-detail-full">
                            <label htmlFor="rolesdsc">
                                Descripción
                            </label>

                            <input
                                type="text"
                                id="rolesdsc"
                                value={descripcion}
                                maxLength={150}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ingrese la descripción del rol"
                            />
                        </div>

                        {/* ESTADO */}

                        <div className="roles-detail-group">
                            <label htmlFor="rolesest">
                                Estado
                            </label>

                            <select
                                id="rolesest"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="ACT">
                                    Activo
                                </option>

                                <option value="INA">
                                    Inactivo
                                </option>
                            </select>
                        </div>

                    </div>

                    {/* AVISO */}

                    <div className="roles-detail-notice">

                        <span>ℹ️</span>

                        <p>
                            Los roles permiten organizar y controlar
                            los permisos de acceso de los usuarios
                            dentro del sistema.
                        </p>

                    </div>

                    {/* BOTONES */}

                    <div className="roles-detail-buttons">

                        <button
                            type="button"
                            className="roles-detail-submit"
                        >
                            Confirmar
                        </button>

                        <button
                            type="button"
                            className="roles-detail-back"
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}
