import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Categoria,
    getCategorias,
    deleteCategoria,
} from "../../../services/categories.service";

import "./Categories.css";

export default function Categories() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    // Cargar categorías desde el backend
    const cargarCategorias = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getCategorias();

            setCategories(Array.isArray(data) ? data : []);
        } catch (err: unknown) {
            console.error("Error al cargar categorías:", err);

            setError(
                "No se pudieron cargar las categorías. Verifica la conexión."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    // Filtrar categorías
    const filteredCategories = categories.filter((category) => {
        const matchesName = category.categoria_nombre
            .toLowerCase()
            .includes(search.toLowerCase().trim());

        const matchesStatus =
            status === "" || category.categoria_estado === status;

        return matchesName && matchesStatus;
    });

    // Paginación
    const totalPages = Math.ceil(
        filteredCategories.length / itemsPerPage
    );

    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Abrir formulario de nueva categoría
    const handleAdd = () => {
        navigate("/admin/categories/detail?mode=INS");
    };

    // Ver categoría
    const handleView = (category: Categoria) => {
        navigate(
            `/admin/categories/detail?mode=DSP&categoria_id=${category.categoria_id}`
        );
    };

    // Editar categoría
    const handleEdit = (category: Categoria) => {
        navigate(
            `/admin/categories/detail?mode=UPD&categoria_id=${category.categoria_id}`
        );
    };

    // Eliminar categoría
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "¿Estás seguro de que deseas eliminar esta categoría?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteCategoria(id);

            alert("Categoría eliminada correctamente.");

            await cargarCategorias();

            setCurrentPage(1);
        } catch (err: unknown) {
            console.error("Error al eliminar categoría:", err);

            setError(
                "No se pudo eliminar la categoría. Puede tener productos asociados."
            );
        }
    };

    return (
        <div className="categories-page">

            <h1>Categorías</h1>

            {/* Mensaje de error */}
            {error && (
                <div className="categories-error" role="alert">
                    {error}
                </div>
            )}

            {/* Filtros */}
            <section className="categories-filters">

                <div className="categories-filter-fields">

                    <label htmlFor="buscarCategoria">
                        Buscar
                    </label>

                    <input
                        type="text"
                        id="buscarCategoria"
                        placeholder="Buscar categoría..."
                        value={search}
                        autoComplete="off"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />

                    <label htmlFor="status">
                        Estado
                    </label>

                    <select
                        id="status"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Todos</option>
                        <option value="ACT">Activo</option>
                        <option value="INA">Inactivo</option>
                    </select>

                </div>

                <button
                    type="button"
                    className="categories-filter-button"
                    onClick={() => setCurrentPage(1)}
                >
                    Filtrar
                </button>

            </section>

            {/* Nueva categoría */}
            <button
                type="button"
                className="categories-add-button"
                onClick={handleAdd}
            >
                + Nueva Categoría
            </button>

            {/* Tabla */}
            <section className="categories-table-container">

                {loading ? (
                    <p className="categories-empty">
                        Cargando categorías...
                    </p>
                ) : (

                    <table className="categories-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Fecha Creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {paginatedCategories.length > 0 ? (

                                paginatedCategories.map((category) => (

                                    <tr key={category.categoria_id}>

                                        <td>{category.categoria_id}</td>

                                        <td>{category.categoria_nombre}</td>

                                        <td>
                                            {category.categoria_descripcion || "—"}
                                        </td>

                                        <td>
                                            <span
                                                className={`categories-status ${category.categoria_estado === "ACT"
                                                    ? "categories-status-active"
                                                    : "categories-status-inactive"
                                                    }`}
                                            >
                                                {category.categoria_estado === "ACT"
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>
                                        </td>

                                        <td>
                                            {category.categoria_fecha_creacion
                                                ? new Date(
                                                    category.categoria_fecha_creacion
                                                ).toLocaleDateString()
                                                : "—"}
                                        </td>

                                        <td>
                                            <div className="categories-actions">

                                                <button
                                                    type="button"
                                                    className="categories-action-button categories-action-view"
                                                    onClick={() => handleView(category)}
                                                >
                                                    Ver
                                                </button>

                                                <button
                                                    type="button"
                                                    className="categories-action-button categories-action-edit"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="categories-action-button categories-action-delete"
                                                    onClick={() =>
                                                        handleDelete(category.categoria_id)
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
                                    <td colSpan={6} className="categories-empty">
                                        No hay categorías registradas.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                )}

            </section>

            {/* Paginación */}
            {!loading && totalPages > 1 && (

                <div className="categories-pagination">

                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((page) => page - 1)
                        }
                    >
                        Anterior
                    </button>

                    <span>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((page) => page + 1)
                        }
                    >
                        Siguiente
                    </button>

                </div>

            )}

            <hr className="categories-divider" />

            <a href="/" className="categories-back-button">
                Regresar
            </a>

        </div>
    );
}