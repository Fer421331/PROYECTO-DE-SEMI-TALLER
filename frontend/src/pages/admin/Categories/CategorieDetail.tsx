import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./CategorieDetail.css";

type CategoryStatus = "ACT" | "INA";
type CategoryMode = "INS" | "UPD" | "DSP";

interface Category {
    id: number;
    name: string;
    description: string;
    status: CategoryStatus;
}

const initialCategories: Category[] = [
    {
        id: 1,
        name: "Leche",
        description: "Leche entera, descremada y deslactosada",
        status: "ACT",
    },
    {
        id: 2,
        name: "Quesos",
        description: "Quesos frescos, semisecos y maduros",
        status: "ACT",
    },
    {
        id: 3,
        name: "Yogures",
        description: "Yogures naturales, griegos y saborizados",
        status: "ACT",
    },
    {
        id: 4,
        name: "Mantequillas",
        description: "Mantequilla y productos derivados de la crema",
        status: "ACT",
    },
    {
        id: 5,
        name: "Cremas",
        description: "Crema de leche y crema ácida",
        status: "INA",
    },
];

export default function CategorieDetail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const mode = (searchParams.get("mode") || "INS") as CategoryMode;

    const categoryId = Number(searchParams.get("categoria_id") || 0);

    const selectedCategory = initialCategories.find(
        (category) => category.id === categoryId
    );

    const isViewMode = mode === "DSP";
    const isEditMode = mode === "UPD";
    const isInsertMode = mode === "INS";

    const [name, setName] = useState(
        selectedCategory?.name || ""
    );

    const [description, setDescription] = useState(
        selectedCategory?.description || ""
    );

    const [status, setStatus] = useState<CategoryStatus>(
        selectedCategory?.status || "ACT"
    );

    const [nameError, setNameError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const formTitle = isInsertMode
        ? "Nueva Categoría"
        : isEditMode
            ? "Editar Categoría"
            : "Detalles de Categoría";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setNameError("");
        setErrorMessage("");
        setSuccessMessage("");

        if (!name.trim()) {
            setNameError("El nombre de la categoría es obligatorio.");
            return;
        }

        if (name.trim().length < 3) {
            setNameError("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        if (isInsertMode) {
            const newCategory: Category = {
                id: Math.max(
                    0,
                    ...initialCategories.map((category) => category.id)
                ) + 1,
                name: name.trim(),
                description: description.trim(),
                status,
            };

            console.log("Nueva categoría:", newCategory);

            setSuccessMessage(
                "Categoría registrada correctamente (modo de prueba)."
            );
        }

        if (isEditMode) {
            const updatedCategory: Category = {
                id: categoryId,
                name: name.trim(),
                description: description.trim(),
                status,
            };

            console.log("Categoría actualizada:", updatedCategory);

            setSuccessMessage(
                "Categoría actualizada correctamente (modo de prueba)."
            );
        }
    };

    if (mode !== "INS" && mode !== "UPD" && mode !== "DSP") {
        return (
            <div className="category-detail-page">
                <h1>Modo no válido</h1>
                <button
                    type="button"
                    className="category-detail-back"
                    onClick={() => navigate("/categories")}
                >
                    Regresar
                </button>
            </div>
        );
    }

    if (!isInsertMode && !selectedCategory) {
        return (
            <div className="category-detail-page">
                <h1>Categoría no encontrada</h1>
                <p>No se encontró la categoría solicitada.</p>

                <button
                    type="button"
                    className="category-detail-back"
                    onClick={() => navigate("/categories")}
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

                <form
                    className="category-detail-form"
                    onSubmit={handleSubmit}
                >

                    {/* ID de categoría */}
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
                            disabled={isViewMode}
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
                            maxLength={500}
                            disabled={isViewMode}
                            onChange={(e) => setDescription(e.target.value)}
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
                            disabled={isViewMode}
                            onChange={(e) =>
                                setStatus(e.target.value as CategoryStatus)
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
                            >
                                Confirmar
                            </button>
                        )}

                        <button
                            type="button"
                            className="category-detail-back"
                            onClick={() => navigate("/categories")}
                        >
                            Regresar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
