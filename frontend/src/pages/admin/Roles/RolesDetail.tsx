import { useEffect, useState } from "react";
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    Rol,
    RolInput,
    getRolById,
    createRol,
    updateRol,
} from "../../../services/roles.service";

import "./RolesDetail.css";

type RoleMode = "INS" | "UPD" | "DSP";

export default function RolesDetail() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const mode = searchParams.get("mode") || "INS";
    const rolescod = searchParams.get("rolescod") || "";

    const isViewMode = mode === "DSP";
    const isEditMode = mode === "UPD";
    const isInsertMode = mode === "INS";

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [codigo, setCodigo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] =
        useState<"ACT" | "INA">("ACT");

    const [codigoError, setCodigoError] = useState("");
    const [descripcionError, setDescripcionError] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Cargar rol
    useEffect(() => {

        if (!isInsertMode && rolescod.trim()) {
            cargarRol();
        }

    }, [rolescod, mode]);

    const cargarRol = async () => {

        try {

            setLoading(true);
            setErrorMessage("");

            const rol: Rol = await getRolById(rolescod);

            setCodigo(rol.rolescod);
            setDescripcion(rol.rolesdsc);
            setEstado(rol.rolesest);

        } catch (error) {

            console.error("Error al consultar rol:", error);

            setErrorMessage(
                "No se pudo cargar la información del rol."
            );

        } finally {

            setLoading(false);

        }

    };

    const formTitle = isInsertMode
        ? "Nuevo rol"
        : isEditMode
            ? "Editar rol"
            : "Detalle del rol";

    // Guardar rol
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setCodigoError("");
        setDescripcionError("");
        setErrorMessage("");
        setSuccessMessage("");

        // Validar código
        if (isInsertMode && !codigo.trim()) {

            setCodigoError(
                "El código del rol es obligatorio."
            );

            return;
        }

        if (isInsertMode && codigo.trim().length > 3) {

            setCodigoError(
                "El código no puede superar los 3 caracteres."
            );

            return;
        }

        // Validar descripción
        if (!descripcion.trim()) {

            setDescripcionError(
                "La descripción del rol es obligatoria."
            );

            return;
        }

        if (descripcion.trim().length > 255) {

            setDescripcionError(
                "La descripción no puede superar los 255 caracteres."
            );

            return;
        }

        const data: RolInput = {
            rolescod: codigo.trim(),
            rolesdsc: descripcion.trim(),
            rolesest: estado,
        };

        try {

            setSaving(true);

            if (isInsertMode) {

                await createRol(data);

                setSuccessMessage(
                    "Rol registrado correctamente."
                );

            } else if (isEditMode) {

                await updateRol(rolescod, {
                    rolesdsc: descripcion.trim(),
                    rolesest: estado,
                });

                setSuccessMessage(
                    "Rol actualizado correctamente."
                );

            }

            navigate("/admin/roles");

        } catch (error) {

            console.error("Error al guardar rol:", error);

            setErrorMessage(
                "No se pudo guardar el rol. Verifica los datos e intenta nuevamente."
            );

        } finally {

            setSaving(false);

        }

    };

    // Validar modo
    if (!["INS", "UPD", "DSP"].includes(mode)) {

        return (
            <div className="roles-detail-page">

                <h1>Modo no válido</h1>

                <button
                    type="button"
                    className="roles-detail-back"
                    onClick={() => navigate("/admin/roles")}
                >
                    Regresar
                </button>

            </div>
        );

    }

    // Validar código
    if (!isInsertMode && !rolescod.trim()) {

        return (
            <div className="roles-detail-page">

                <h1>Identificador no válido</h1>

                <button
                    type="button"
                    className="roles-detail-back"
                    onClick={() => navigate("/admin/roles")}
                >
                    Regresar
                </button>

            </div>
        );

    }

    return (

        <div className="roles-detail-page">

            {/* ENCABEZADO */}

            <div className="roles-detail-header">

                <div>

                    <h1>{formTitle}</h1>

                    <p>
                        Consulta y administra la información de los
                        roles del sistema.
                    </p>

                </div>

            </div>

            {/* FORMULARIO */}

            <div className="roles-detail-card">

                {loading ? (

                    <p>
                        Cargando información del rol...
                    </p>

                ) : (

                    <form
                        className="roles-detail-form"
                        onSubmit={handleSubmit}
                    >

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
                                    maxLength={3}
                                    disabled={!isInsertMode || saving}
                                    onChange={(e) => {
                                        setCodigo(
                                            e.target.value.toUpperCase()
                                        );
                                        setCodigoError("");
                                    }}
                                    placeholder="Ej. ADM"
                                />

                                {codigoError && (
                                    <span className="roles-detail-error">
                                        {codigoError}
                                    </span>
                                )}

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
                                    maxLength={255}
                                    disabled={isViewMode || saving}
                                    onChange={(e) => {
                                        setDescripcion(e.target.value);
                                        setDescripcionError("");
                                    }}
                                    placeholder="Ingrese la descripción del rol"
                                />

                                {descripcionError && (
                                    <span className="roles-detail-error">
                                        {descripcionError}
                                    </span>
                                )}

                            </div>

                            {/* ESTADO */}

                            <div className="roles-detail-group">

                                <label htmlFor="rolesest">
                                    Estado
                                </label>

                                <select
                                    id="rolesest"
                                    value={estado}
                                    disabled={isViewMode || saving}
                                    onChange={(e) =>
                                        setEstado(
                                            e.target.value as "ACT" | "INA"
                                        )
                                    }
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

                        {/* MENSAJES */}

                        {errorMessage && (

                            <div className="roles-detail-error-message">
                                {errorMessage}
                            </div>

                        )}

                        {successMessage && (

                            <div className="roles-detail-success">
                                {successMessage}
                            </div>

                        )}

                        {/* BOTONES */}

                        <div className="roles-detail-buttons">

                            {!isViewMode && (

                                <button
                                    type="submit"
                                    className="roles-detail-submit"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Guardando..."
                                        : isInsertMode
                                            ? "Registrar rol"
                                            : "Guardar cambios"}
                                </button>

                            )}

                            <button
                                type="button"
                                className="roles-detail-back"
                                disabled={saving}
                                onClick={() =>
                                    navigate("/admin/roles")
                                }
                            >
                                Cancelar
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>

    );

}
