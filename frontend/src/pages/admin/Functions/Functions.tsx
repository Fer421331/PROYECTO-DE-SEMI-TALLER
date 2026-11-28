import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Funcion,
    getFunciones,
    deleteFuncion,
} from "../../../services/functions.service";

import "./Functions.css";

export default function Functions() {
    const navigate = useNavigate();

    const [funciones, setFunciones] = useState<Funcion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [buscar, setBuscar] = useState("");
    const [estado, setEstado] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    // Cargar funciones desde el backend
    const cargarFunciones = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getFunciones();

            setFunciones(Array.isArray(data) ? data : []);

        } catch (err: unknown) {
            console.error("Error al cargar funciones:", err);

            setError(
                "No se pudieron cargar las funciones. Verifica la conexión con el servidor."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarFunciones();
    }, []);

    // Filtrar funciones
    const funcionesFiltradas = funciones.filter((funcion) => {
        const busqueda = buscar.toLowerCase().trim();

        const coincideBusqueda =
            funcion.fncod.toLowerCase().includes(busqueda) ||
            funcion.fndsc.toLowerCase().includes(busqueda) ||
            funcion.fntyp.toLowerCase().includes(busqueda);

        const coincideEstado =
            estado === "" || funcion.fnest === estado;

        return coincideBusqueda && coincideEstado;
    });

    // Paginación
    const totalPages = Math.ceil(
        funcionesFiltradas.length / itemsPerPage
    );

    const funcionesPaginadas = funcionesFiltradas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Crear función
    const handleAdd = () => {
        navigate("/admin/functions/detail?mode=INS");
    };

    // Consultar función
    const handleView = (funcion: Funcion) => {
        navigate(
            `/admin/functions/detail?mode=DSP&fncod=${encodeURIComponent(funcion.fncod)}`
        );
    };

    // Editar función
    const handleEdit = (funcion: Funcion) => {
        navigate(
            `/admin/functions/detail?mode=UPD&fncod=${encodeURIComponent(funcion.fncod)}`
        );
    };

    // Eliminar función
    const handleDelete = async (fncod: string) => {
        const confirmed = window.confirm(
            `¿Estás seguro de que deseas eliminar la función ${fncod}?`
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteFuncion(fncod);

            alert("Función eliminada correctamente.");

            await cargarFunciones();

            setCurrentPage(1);

        } catch (err: unknown) {
            console.error("Error al eliminar función:", err);

            setError(
                "No se pudo eliminar la función. Puede tener roles asociados."
            );
        }
    };

    // Limpiar filtros
    const limpiarFiltros = () => {
        setBuscar("");
        setEstado("");
        setCurrentPage(1);
    };

    return (
        <div className="functions-page">

            {/* ENCABEZADO */}
            <div className="functions-header">

                <div>
                    <h1>Funciones</h1>

                    <p>
                        Administra las funciones y permisos disponibles
                        dentro del sistema.
                    </p>
                </div>

                <div className="functions-header-icon">
                    <span>Configuración</span>
                </div>

            </div>

            {/* MENSAJE DE ERROR */}
            {error && (
                <div className="functions-error" role="alert">
                    {error}
                </div>
            )}

            {/* FILTROS */}
            <div className="functions-card">

                <h2 className="functions-section-title">
                    Filtrar funciones
                </h2>

                <div className="functions-filters">

                    <div className="functions-filter-group">

                        <label htmlFor="buscarFuncion">
                            Descripción
                        </label>

                        <div className="functions-search-input">

                            <input
                                type="text"
                                id="buscarFuncion"
                                placeholder="Buscar por código, descripción o tipo..."
                                value={buscar}
                                autoComplete="off"
                                onChange={(e) => {
                                    setBuscar(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />

                        </div>

                    </div>

                    <div className="functions-filter-group">

                        <label htmlFor="estadoFuncion">
                            Estado
                        </label>

                        <select
                            id="estadoFuncion"
                            value={estado}
                            onChange={(e) => {
                                setEstado(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Todos</option>
                            <option value="ACT">Activo</option>
                            <option value="INA">Inactivo</option>
                        </select>

                    </div>

                    <div className="functions-filter-buttons">

                        <button
                            type="button"
                            className="functions-clear-button"
                            onClick={limpiarFiltros}
                        >
                            Limpiar
                        </button>

                    </div>

                </div>

            </div>

            {/* TABLA */}
            <div className="functions-table-card">

                <div className="functions-table-header">

                    <div>
                        <h2>Listado de funciones</h2>

                        <p>
                            Consulta y administra las funciones del sistema.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="functions-create-button"
                        onClick={handleAdd}
                    >
                        Crear función
                    </button>

                </div>

                <div className="functions-table-container">

                    {loading ? (

                        <div className="functions-empty">
                            Cargando funciones...
                        </div>

                    ) : (

                        <table className="functions-table">

                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Tipo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                {funcionesPaginadas.length > 0 ? (

                                    funcionesPaginadas.map((funcion) => (

                                        <tr key={funcion.fncod}>

                                            <td>
                                                <span className="functions-code">
                                                    {funcion.fncod}
                                                </span>
                                            </td>

                                            <td>
                                                <strong className="functions-description">
                                                    {funcion.fndsc}
                                                </strong>
                                            </td>

                                            <td>
                                                <span className="functions-type">
                                                    {funcion.fntyp}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        funcion.fnest === "ACT"
                                                            ? "functions-status functions-status-active"
                                                            : "functions-status functions-status-inactive"
                                                    }
                                                >
                                                    {funcion.fnest === "ACT"
                                                        ? "Activo"
                                                        : funcion.fnest === "INA"
                                                            ? "Inactivo"
                                                            : funcion.fnest}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="functions-actions">

                                                    <button
                                                        type="button"
                                                        className="functions-action-view"
                                                        title="Ver función"
                                                        onClick={() => handleView(funcion)}
                                                    >
                                                        Ver
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="functions-action-edit"
                                                        title="Editar función"
                                                        onClick={() => handleEdit(funcion)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="functions-action-delete"
                                                        title="Eliminar función"
                                                        onClick={() => handleDelete(funcion.fncod)}
                                                    >
                                                        Eliminar
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan={5}>
                                            <div className="functions-empty">

                                                <strong>
                                                    No se encontraron funciones
                                                </strong>

                                                <p>
                                                    Intenta modificar los filtros
                                                    de búsqueda.
                                                </p>

                                            </div>
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    )}

                </div>

                {/* PAGINACIÓN */}
                {!loading && totalPages > 1 && (

                    <div className="functions-pagination">

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

                <div className="functions-table-footer">
                    <span>
                        Mostrando {funcionesFiltradas.length} de {funciones.length} funciones
                    </span>
                </div>

            </div>

            {/* REGRESAR */}
            <div className="functions-footer">

                <button
                    type="button"
                    className="functions-back-button"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    Regresar
                </button>

            </div>

        </div>
    );
}