import { useState } from "react";
import "./FunctionDetail.css";

export default function FunctionDetail() {

    const [codigo, setCodigo] = useState("FN001");
    const [descripcion, setDescripcion] = useState("Administrar productos");
    const [tipo, setTipo] = useState("CRUD");
    const [estado, setEstado] = useState("ACT");

    return (

        <div className="function-detail-page">

            {/* ENCABEZADO */}

            <div className="function-detail-header">

                <div>
                    <h1>Detalle de función</h1>

                    <p>
                        Consulta y administra la información de las
                        funciones del sistema.
                    </p>
                </div>

                <div className="function-detail-icon">
                    ⚙️
                </div>

            </div>

            {/* FORMULARIO */}

            <div className="function-detail-card">

                <form className="function-detail-form">

                    <h2 className="function-detail-section-title">
                        Información de la función
                    </h2>

                    <div className="function-detail-grid">

                        {/* CÓDIGO */}

                        <div className="function-detail-group">
                            <label htmlFor="fncod">
                                Código
                            </label>

                            <input
                                type="text"
                                id="fncod"
                                value={codigo}
                                maxLength={20}
                                onChange={(e) => setCodigo(e.target.value)}
                                placeholder="Ingrese el código"
                            />
                        </div>

                        {/* DESCRIPCIÓN */}

                        <div className="function-detail-group function-detail-full">
                            <label htmlFor="fndsc">
                                Descripción
                            </label>

                            <input
                                type="text"
                                id="fndsc"
                                value={descripcion}
                                maxLength={150}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ingrese la descripción de la función"
                            />
                        </div>

                        {/* TIPO */}

                        <div className="function-detail-group">
                            <label htmlFor="fntyp">
                                Tipo
                            </label>

                            <input
                                type="text"
                                id="fntyp"
                                value={tipo}
                                maxLength={30}
                                onChange={(e) => setTipo(e.target.value)}
                                placeholder="Ej. CRUD, READ..."
                            />
                        </div>

                        {/* ESTADO */}

                        <div className="function-detail-group">
                            <label htmlFor="fnest">
                                Estado
                            </label>

                            <select
                                id="fnest"
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

                    {/* INFORMACIÓN ADICIONAL */}

                    <div className="function-detail-notice">
                        <span>ℹ️</span>

                        <p>
                            Las funciones permiten controlar las operaciones
                            disponibles dentro del sistema y su administración
                            de permisos.
                        </p>
                    </div>

                    {/* BOTONES */}

                    <div className="function-detail-buttons">

                        <button
                            type="button"
                            className="function-detail-submit"
                        >
                            Confirmar
                        </button>

                        <button
                            type="button"
                            className="function-detail-back"
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}
