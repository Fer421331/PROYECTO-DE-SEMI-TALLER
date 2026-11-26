import { useState } from "react";
import "./Categories.css";

interface Category {
    id: number;
    name: string;
    description: string;
    status: "ACT" | "INA";
    createdAt: string;
}

const initialCategories: Category[] = [
    {
        id: 1,
        name: "Leche",
        description: "Leche entera, descremada y deslactosada",
        status: "ACT",
        createdAt: "2026-01-15",
    },
    {
        id: 2,
        name: "Quesos",
        description: "Quesos frescos, semisecos y maduros",
        status: "ACT",
        createdAt: "2026-01-18",
    },
    {
        id: 3,
        name: "Yogures",
        description: "Yogures naturales, griegos y saborizados",
        status: "ACT",
        createdAt: "2026-02-02",
    },
    {
        id: 4,
        name: "Mantequillas",
        description: "Mantequilla y productos derivados de la crema",
        status: "ACT",
        createdAt: "2026-02-10",
    },
    {
        id: 5,
        name: "Cremas",
        description: "Crema de leche y crema ácida",
        status: "INA",
        createdAt: "2026-02-15",
    },
];

export default function Categories() {
    const [categories, setCategories] = useState(initialCategories);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    // Filtrar categorías
    const filteredCategories = categories.filter((category) => {
        const matchesName = category.name
            .toLowerCase()
            .includes(search.toLowerCase().trim());

        const matchesStatus =
            status === "" || category.status === status;

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

    // Eliminar categoría de prueba
    const handleDelete = (id: number) => {
        const confirmed = window.confirm(
            "¿Estás seguro de eliminar esta categoría?"
        );

        if (confirmed) {
            setCategories((previous) =>
                previous.filter((category) => category.id !== id)
            );

            setCurrentPage(1);
        }
    };

    // Acciones de prueba
    const handleView = (category: Category) => {
        alert(
            `Categoría: ${category.name}\nDescripción: ${category.description}`
        );
    };

    const handleEdit = (category: Category) => {
        alert(`Editar categoría: ${category.name}`);
    };

    // Nueva categoría de prueba
    const handleAdd = () => {
        const name = window.prompt("Nombre de la categoría:");

        if (!name || !name.trim()) return;

        const newCategory: Category = {
            id: Math.max(0, ...categories.map((item) => item.id)) + 1,
            name: name.trim(),
            description: "Nueva categoría",
            status: "ACT",
            createdAt: new Date().toISOString().split("T")[0],
        };

        setCategories((previous) => [
            ...previous,
            newCategory,
        ]);

        setSearch("");
        setStatus("");
        setCurrentPage(1);
    };

    return (
        <div className="categories-page">

            <h1>Categorías</h1>

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

                                <tr key={category.id}>

                                    <td>{category.id}</td>

                                    <td>{category.name}</td>

                                    <td>{category.description}</td>

                                    <td>
                                        <span
                                            className={`categories-status ${category.status === "ACT"
                                                ? "categories-status-active"
                                                : "categories-status-inactive"
                                                }`}
                                        >
                                            {category.status === "ACT"
                                                ? "Activo"
                                                : "Inactivo"}
                                        </span>
                                    </td>

                                    <td>{category.createdAt}</td>

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
                                                onClick={() => handleDelete(category.id)}
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

            </section>

            {/* Paginación */}
            {totalPages > 1 && (
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

            {/* Regresar */}
            <a href="/" className="categories-back-button">
                Regresar
            </a>

        </div>
    );
}
