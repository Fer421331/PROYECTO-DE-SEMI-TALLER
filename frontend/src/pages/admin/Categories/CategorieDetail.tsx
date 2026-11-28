import { useEffect, useState } from "react";
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    Categoria,
    CategoriaInput,
    getCategoriaById,
    createCategoria,
    updateCategoria,
} from "../../../services/categories.service";

import "./CategorieDetail.css";

type CategoryMode = "INS" | "UPD" | "DSP";

export default function CategorieDetail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const mode = searchParams.get("mode") || "INS";
    const categoryId = Number(
        searchParams.get("categoria_id") || 0
    );

    const isViewMode = mode === "DSP";
    const isEditMode = mode === "UPD";
    const isInsertMode = mode === "INS";

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] =
        useState<"ACT" | "INA">("ACT");

    const [nameError, setNameError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Cargar categoría cuando se consulta o edita
    useEffect(() => {
        if (!isInsertMode && categoryId > 0) {
            cargarCategoria();
        }
    }, [categoryId, mode]);

    const cargarCategoria = async () => {
        try {
            setLoading(true);
            setErrorMessage("");

            const category: Categoria =
                await getCategoriaById(categoryId);

            setName(category.categoria_nombre);
            setDescription(
                category.categoria_descripcion || ""
            );
            setStatus(category.categoria_estado);

        } catch (error) {
            console.error("Error al consultar categoría:", error);

            setErrorMessage(
                "No se pudo cargar la información de la categoría."
            );
        } finally {
            setLoading(false);
        }
    };

    const formTitle = isInsertMode
        ? "Nueva Categoría"
        : isEditMode
            ? "Editar Categoría"
            : "Detalles de Categoría";

    // Guardar categoría
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setNameError("");
        setErrorMessage("");
        setSuccessMessage("");

        if (!name.trim()) {
            setNameError(
                "El nombre de la categoría es obligatorio."
            );
            return;
        }

        if (description.length > 50) {
            setErrorMessage(
                "La descripción no puede superar los 50 caracteres."
            );
            return;
        }

        const data: CategoriaInput = {
            categoria_nombre: name.trim(),
            categoria_descripcion: description.trim(),
            categoria_estado: status,
        };

        try {
            setSaving(true);

            if (isInsertMode) {
                await createCategoria(data);
                setSuccessMessage(
                    "Categoría registrada correctamente."
                );
            } else if (isEditMode) {
                await updateCategoria(categoryId, data);
                setSuccessMessage(
                    "Categoría actualizada correctamente."
                );
            }

            // Regresar al listado después de guardar
            navigate("/admin/categories");

        } catch (error) {
            console.error("Error al guardar categoría:", error);

            setErrorMessage(
                "No se pudo guardar la categoría. Verifica los datos e intenta nuevamente."
            );
        } finally {
            setSaving(false);
        }
    };

    if (
        !["INS", "UPD", "DSP"].includes(mode)
    ) {
        return (
            <div className="category-detail-page">
                <h1>Modo no válido</h1>

                <button
                    type="button"
                    className="category-detail-back"
                    onClick={() => navigate("/admin/categories")}
                >
                    Regresar
                </button>
            </div>
        );
    }

    if (
        !isInsertMode &&
        (!Number.isInteger(categoryId) || categoryId <= 0)
    ) {
        return (
            <div className="category-detail-page">
                <h1>Identificador no válido</h1>

                <button
                    type="button"
                    className="category-detail-back"
                    onClick={() => navigate("/admin/categories")}
                >
                    Regresar
                </button>
            </div>
        );
    }

    return (
        <div className="category-detail-page">

            <h1>{formTitle}</h1>

            <div className="category-detail-card">

                {loading ? (
                    <p>Cargando información de la categoría...</p>
                ) : (

                    <form
                        className="category-detail-form"
                        onSubmit={handleSubmit}
                    >

                        {/* ID */}
                        <div className="category-detail-group">

                            <label htmlFor="categoria_id">
                                ID Categoría
                            </label>

                            <input
                                type="text"
                                id="categoria_id"
                                value={
                                    isInsertMode
                                        ? "Se asignará automáticamente"
                                        : categoryId
                                }
                                readOnly
                            />

                        </div>

                        {/* Nombre */}
                        <div className="category-detail-group">

                            <label htmlFor="categoria_nombre">
                                Nombre
                            </label>

                            <input
                                type="text"
                                id="categoria_nombre"
                                value={name}
                                placeholder="Ej. Quesos"
                                maxLength={100}
                                disabled={isViewMode || saving}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameError("");
                                }}
                            />

                            {nameError && (
                                <span className="category-detail-error">
                                    {nameError}
                                </span>
                            )}

                        </div>

                        {/* Descripción */}
                        <div className="category-detail-group">

                            <label htmlFor="categoria_descripcion">
                                Descripción
                            </label>

                            <textarea
                                id="categoria_descripcion"
                                value={description}
                                placeholder="Describe la categoría..."
                                maxLength={50}
                                disabled={isViewMode || saving}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                        </div>

                        {/* Estado */}
                        <div className="category-detail-group">

                            <label htmlFor="categoria_estado">
                                Estado
                            </label>

                            <select
                                id="categoria_estado"
                                value={status}
                                disabled={isViewMode || saving}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value as "ACT" | "INA"
                                    )
                                }
                            >
                                <option value="ACT">Activo</option>
                                <option value="INA">Inactivo</option>
                            </select>

                        </div>

                        {/* Mensajes */}
                        {errorMessage && (
                            <div className="category-detail-error-message">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="category-detail-success">
                                {successMessage}
                            </div>
                        )}

                        {/* Botones */}
                        <div className="category-detail-buttons">

                            {!isViewMode && (
                                <button
                                    type="submit"
                                    className="category-detail-submit"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Guardando..."
                                        : isInsertMode
                                            ? "Registrar categoría"
                                            : "Guardar cambios"}
                                </button>
                            )}

                            <button
                                type="button"
                                className="category-detail-back"
                                disabled={saving}
                                onClick={() =>
                                    navigate("/admin/categories")
                                }
                            >
                                Regresar
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
}