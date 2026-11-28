import { useEffect, useState } from "react";
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    Funcion,
    FuncionInput,
    getFuncionById,
    createFuncion,
    updateFuncion,
} from "../../../services/functions.service";

import "./FunctionDetail.css";

type FunctionMode = "INS" | "UPD" | "DSP";

export default function FunctionDetail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const mode = searchParams.get("mode") || "INS";
    const fncod = searchParams.get("fncod") || "";

    const isInsertMode = mode === "INS";
    const isEditMode = mode === "UPD";
    const isViewMode = mode === "DSP";

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [codigo, setCodigo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("CRUD");
    const [estado, setEstado] = useState<"ACT" | "INA">("ACT");

    const [codigoError, setCodigoError] = useState("");
    const [descripcionError, setDescripcionError] = useState("");
    const [tipoError, setTipoError] = useState("");
    const [estadoError, setEstadoError] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    // Consultar función
    useEffect(() => {
        if (!isInsertMode && fncod.trim()) {
            cargarFuncion();
        }
    }, [fncod, mode]);

    const cargarFuncion = async () => {
        try {
            setLoading(true);
            setErrorMessage("");

            const funcion: Funcion = await getFuncionById(fncod);

            setCodigo(funcion.fncod);
            setDescripcion(funcion.fndsc);
            setTipo(funcion.fntyp.trim());
            setEstado(funcion.fnest.trim() as "ACT" | "INA");

        } catch (error) {
            console.error("Error al consultar función:", error);

            setErrorMessage(
                "No se pudo cargar la información de la función."
            );
        } finally {
            setLoading(false);
        }
    };

    const formTitle = isInsertMode
        ? "Nueva función"
        : isEditMode
            ? "Editar función"
            : "Detalle de función";

    // Validar formulario
    const validarFormulario = (): boolean => {
        let valido = true;

        setCodigoError("");
        setDescripcionError("");
        setTipoError("");
        setEstadoError("");

        if (isInsertMode && !codigo.trim()) {
            setCodigoError("El código de la función es obligatorio.");
            valido = false;
        }

        if (codigo.trim().length > 255) {
            setCodigoError("El código no puede superar los 255 caracteres.");
            valido = false;
        }

        if (!descripcion.trim()) {
            setDescripcionError("La descripción es obligatoria.");
            valido = false;
        } else if (descripcion.trim().length > 255) {
            setDescripcionError(
                "La descripción no puede superar los 255 caracteres."
            );
            valido = false;
        }

        if (!tipo.trim()) {
            setTipoError("El tipo de función es obligatorio.");
            valido = false;
        } else if (tipo.trim().length !== 3) {
            setTipoError(
                "El tipo debe tener exactamente 3 caracteres. Ejemplo: CRUD."
            );
            valido = false;
        }

        if (!["ACT", "INA"].includes(estado)) {
            setEstadoError("Selecciona un estado válido.");
            valido = false;
        }

        return valido;
    };

    // Registrar o actualizar función
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setErrorMessage("");

        if (!validarFormulario()) return;

        try {
            setSaving(true);

            if (isInsertMode) {
                const data: FuncionInput = {
                    fncod: codigo.trim(),
                    fndsc: descripcion.trim(),
                    fnest: estado,
                    fntyp: tipo.trim().toUpperCase(),
                };

                await createFuncion(data);

                alert("Función registrada correctamente.");

            } else if (isEditMode) {
                await updateFuncion(fncod, {
                    fndsc: descripcion.trim(),
                    fnest: estado,
                    fntyp: tipo.trim().toUpperCase(),
                });

                alert("Función actualizada correctamente.");
            }

            navigate("/admin/functions");

        } catch (error: any) {
            console.error("Error al guardar función:", error);

            const mensaje =
                error?.response?.data?.error?.message?.value ||
                error?.response?.data?.errors?.[0]?.msg ||
                "No se pudo guardar la función. Verifica los datos e intenta nuevamente.";

            setErrorMessage(mensaje);

        } finally {
            setSaving(false);
        }
    };

    // Validar modo
    if (!["INS", "UPD", "DSP"].includes(mode)) {
        return (
            <div className="function-detail-page">

                <h1>Modo no válido</h1>

                <button
                    type="button"
                    className="function-detail-back"
                    onClick={() => navigate("/admin/functions")}
                >
                    Regresar
                </button>

            </div>
        );
    }

    // Validar código para consulta y edición
    if (!isInsertMode && !fncod.trim()) {
        return (
            <div className="function-detail-page">

                <h1>Código de función no válido</h1>

                <button
                    type="button"
                    className="function-detail-back"
                    onClick={() => navigate("/admin/functions")}
                >
                    Regresar
                </button>

            </div>
        );
    }

    return (
        <div className="function-detail-page">

            {/* ENCABEZADO */}
            <div className="function-detail-header">

                <div>
                    <h1>{formTitle}</h1>

                    <p>
                        Consulta y administra la información de las
                        funciones del sistema.
                    </p>
                </div>

                <div className="function-detail-icon">
                    Funciones
                </div>

            </div>

            {/* FORMULARIO */}
            <div className="function-detail-card">

                {loading ? (

                    <p>Cargando información de la función...</p>

                ) : (

                    <form
                        className="function-detail-form"
                        onSubmit={handleSubmit}
                    >

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
                                    maxLength={255}
                                    placeholder="Ej. FN001"
                                    disabled={!isInsertMode || saving}
                                    onChange={(e) => {
                                        setCodigo(e.target.value);
                                        setCodigoError("");
                                    }}
                                />

                                {codigoError && (
                                    <span className="function-detail-error">
                                        {codigoError}
                                    </span>
                                )}

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
                                    maxLength={255}
                                    placeholder="Ingrese la descripción de la función"
                                    disabled={isViewMode || saving}
                                    onChange={(e) => {
                                        setDescripcion(e.target.value);
                                        setDescripcionError("");
                                    }}
                                />

                                {descripcionError && (
                                    <span className="function-detail-error">
                                        {descripcionError}
                                    </span>
                                )}

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
                                    maxLength={3}
                                    placeholder="CRUD"
                                    disabled={isViewMode || saving}
                                    onChange={(e) => {
                                        setTipo(e.target.value.toUpperCase());
                                        setTipoError("");
                                    }}
                                />

                                {tipoError && (
                                    <span className="function-detail-error">
                                        {tipoError}
                                    </span>
                                )}

                            </div>

                            {/* ESTADO */}
                            <div className="function-detail-group">

                                <label htmlFor="fnest">
                                    Estado
                                </label>

                                <select
                                    id="fnest"
                                    value={estado}
                                    disabled={isViewMode || saving}
                                    onChange={(e) => {
                                        setEstado(
                                            e.target.value as "ACT" | "INA"
                                        );
                                        setEstadoError("");
                                    }}
                                >
                                    <option value="ACT">
                                        Activo
                                    </option>

                                    <option value="INA">
                                        Inactivo
                                    </option>
                                </select>

                                {estadoError && (
                                    <span className="function-detail-error">
                                        {estadoError}
                                    </span>
                                )}

                            </div>

                        </div>

                        {/* INFORMACIÓN ADICIONAL */}
                        <div className="function-detail-notice">

                            <p>
                                Las funciones permiten controlar las
                                operaciones disponibles dentro del sistema
                                y su administración de permisos.
                            </p>

                        </div>

                        {/* MENSAJE DE ERROR */}
                        {errorMessage && (
                            <div
                                className="function-detail-error-message"
                                role="alert"
                            >
                                {errorMessage}
                            </div>
                        )}

                        {/* BOTONES */}
                        <div className="function-detail-buttons">

                            {!isViewMode && (
                                <button
                                    type="submit"
                                    className="function-detail-submit"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Guardando..."
                                        : isInsertMode
                                            ? "Registrar función"
                                            : "Guardar cambios"}
                                </button>
                            )}

                            <button
                                type="button"
                                className="function-detail-back"
                                disabled={saving}
                                onClick={() =>
                                    navigate("/admin/functions")
                                }
                            >
                                {isViewMode ? "Regresar" : "Cancelar"}
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
}