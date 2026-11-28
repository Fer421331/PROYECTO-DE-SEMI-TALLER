import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
    Rol,
    Funcion,
    FuncionRol,
    getRoles,
    getFunciones,
    getFuncionesRoles,
    createFuncionRol,
    updateFuncionRol,
} from "../../../services/functionroles.service";

import "./FunctionsRolesDetail.css";

export default function FunctionsRolesDetail() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const rolescod = searchParams.get("rolescod") || "";

    const [rol, setRol] = useState<Rol | null>(null);

    const [funciones, setFunciones] = useState<Funcion[]>([]);
    const [asignaciones, setAsignaciones] = useState<FuncionRol[]>([]);

    const [buscarAsignadas, setBuscarAsignadas] = useState("");
    const [buscarDisponibles, setBuscarDisponibles] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Cargar información
    const cargarInformacion = useCallback(async () => {

        try {

            setLoading(true);
            setError("");

            const [
                rolesData,
                funcionesData,
                asignacionesData
            ] = await Promise.all([

                getRoles(),
                getFunciones(),
                getFuncionesRoles(),

            ]);

            const rolEncontrado = rolesData.find(
                (item) => item.rolescod === rolescod
            );

            if (!rolEncontrado) {

                setRol(null);

                setError("No se encontró el rol seleccionado.");

                return;

            }

            setRol(rolEncontrado);

            setFunciones(funcionesData);

            setAsignaciones(
                asignacionesData.filter(
                    (item) => item.rolescod === rolescod
                )
            );

        } catch (error) {

            console.error(
                "Error al cargar funciones del rol:",
                error
            );

            setError(
                "No se pudo cargar la información. Verifica la conexión."
            );

        } finally {

            setLoading(false);

        }

    }, [rolescod]);

    useEffect(() => {

        if (rolescod.trim()) {

            cargarInformacion();

        } else {

            setLoading(false);
            setError("El código del rol no es válido.");

        }

    }, [rolescod, cargarInformacion]);

    // Funciones asignadas activas
    const funcionesAsignadas = funciones.filter((funcion) => {

        const asignacion = asignaciones.find(
            (item) => item.fncod === funcion.fncod
        );

        return (
            asignacion?.fnrolest === "ACT"
        );

    });

    // Funciones disponibles
    const funcionesDisponibles = funciones.filter((funcion) => {

        if (funcion.fnest !== "ACT") {
            return false;
        }

        const asignacion = asignaciones.find(
            (item) => item.fncod === funcion.fncod
        );

        return (
            !asignacion ||
            asignacion.fnrolest === "INA"
        );

    });

    // Filtrar funciones asignadas
    const asignadasFiltradas = funcionesAsignadas.filter((funcion) =>

        `${funcion.fncod} ${funcion.fndsc}`
            .toLowerCase()
            .includes(buscarAsignadas.toLowerCase().trim())

    );

    // Filtrar funciones disponibles
    const disponiblesFiltradas = funcionesDisponibles.filter((funcion) =>

        `${funcion.fncod} ${funcion.fndsc}`
            .toLowerCase()
            .includes(buscarDisponibles.toLowerCase().trim())

    );

    // Asignar función
    const asignarFuncion = async (funcion: Funcion) => {

        try {

            setSaving(true);
            setError("");

            const asignacionExistente = asignaciones.find(
                (item) => item.fncod === funcion.fncod
            );

            if (asignacionExistente) {

                // Reactivar asignación existente
                await updateFuncionRol(
                    rolescod,
                    funcion.fncod,
                    {
                        fnrolest: "ACT",
                        fnexp: null,
                    }
                );

            } else {

                // Crear nueva asignación
                await createFuncionRol({

                    rolescod,
                    fncod: funcion.fncod,
                    fnrolest: "ACT",
                    fnexp: null,

                });

            }

            await cargarInformacion();

        } catch (error) {

            console.error("Error al asignar función:", error);

            setError(
                "No se pudo asignar la función. Intenta nuevamente."
            );

        } finally {

            setSaving(false);

        }

    };

    // Inactivar función
    const inactivarFuncion = async (funcion: Funcion) => {

        const confirmado = window.confirm(
            `¿Deseas quitar la función "${funcion.fndsc}" de este rol?`
        );

        if (!confirmado) return;

        try {

            setSaving(true);
            setError("");

            await updateFuncionRol(
                rolescod,
                funcion.fncod,
                {
                    fnrolest: "INA",
                }
            );

            await cargarInformacion();

        } catch (error) {

            console.error("Error al inactivar función:", error);

            setError(
                "No se pudo quitar la función. Intenta nuevamente."
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <div className="functions-roles-detail-page">
                <h1>Cargando información del rol...</h1>
            </div>
        );

    }

    if (!rol) {

        return (

            <div className="functions-roles-detail-page">

                <h1>Administración de funciones</h1>

                <div className="functions-roles-error">
                    {error || "No se encontró el rol."}
                </div>

                <button
                    type="button"
                    className="functions-btn-back"
                    onClick={() => navigate("/admin/functions-roles")}
                >
                    ← Regresar
                </button>

            </div>

        );

    }

    return (

        <div className="functions-roles-detail-page">

            {/* ENCABEZADO */}

            <div className="functions-roles-detail-header">

                <h1>Administración de funciones del rol</h1>

                <h2>{rol.rolesdsc}</h2>

                <p>
                    Código del rol: {rol.rolescod}
                </p>

            </div>

            {/* ERROR */}

            {error && (

                <div className="functions-roles-error" role="alert">
                    {error}
                </div>

            )}

            {/* CONTADORES */}

            <div className="functions-roles-summary">

                <div className="functions-roles-summary-card">

                    <div className="functions-roles-summary-icon active-icon">
                        ✓
                    </div>

                    <div>
                        <strong>{funcionesAsignadas.length}</strong>
                        <span>Funciones asignadas</span>
                    </div>

                </div>

                <div className="functions-roles-summary-card">

                    <div className="functions-roles-summary-icon">
                        +
                    </div>

                    <div>
                        <strong>{funcionesDisponibles.length}</strong>
                        <span>Funciones disponibles</span>
                    </div>

                </div>

            </div>

            {/* ADMINISTRACIÓN */}

            <div className="functions-roles-detail-card">

                <div className="functions-roles-container">

                    {/* FUNCIONES ASIGNADAS */}

                    <div className="functions-column">

                        <h3>Funciones asignadas</h3>

                        <p>
                            Funciones que actualmente pertenecen a este rol.
                        </p>

                        <div className="functions-search">

                            <label htmlFor="buscarAsignadas">
                                Buscar función
                            </label>

                            <input
                                type="text"
                                id="buscarAsignadas"
                                placeholder="Buscar función..."
                                autoComplete="off"
                                value={buscarAsignadas}
                                onChange={(e) =>
                                    setBuscarAsignadas(e.target.value)
                                }
                            />

                        </div>

                        <div className="functions-table-wrapper">

                            <table>

                                <thead>
                                    <tr>
                                        <th>Función</th>
                                        <th>Código</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {asignadasFiltradas.length > 0 ? (

                                        asignadasFiltradas.map((funcion) => (

                                            <tr key={funcion.fncod}>

                                                <td>
                                                    {funcion.fndsc}
                                                </td>

                                                <td>
                                                    {funcion.fncod}
                                                </td>

                                                <td>

                                                    <button
                                                        type="button"
                                                        className="functions-btn-remove"
                                                        disabled={saving}
                                                        onClick={() =>
                                                            inactivarFuncion(funcion)
                                                        }
                                                    >
                                                        Quitar
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="functions-roles-empty"
                                            >
                                                No hay funciones asignadas.
                                            </td>
                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* FUNCIONES DISPONIBLES */}

                    <div className="functions-column">

                        <h3>Funciones disponibles</h3>

                        <p>
                            Funciones que puedes asignar a este rol.
                        </p>

                        <div className="functions-search">

                            <label htmlFor="buscarDisponibles">
                                Buscar función
                            </label>

                            <input
                                type="text"
                                id="buscarDisponibles"
                                placeholder="Buscar función..."
                                autoComplete="off"
                                value={buscarDisponibles}
                                onChange={(e) =>
                                    setBuscarDisponibles(e.target.value)
                                }
                            />

                        </div>

                        <div className="functions-table-wrapper">

                            <table>

                                <thead>
                                    <tr>
                                        <th>Función</th>
                                        <th>Código</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {disponiblesFiltradas.length > 0 ? (

                                        disponiblesFiltradas.map((funcion) => (

                                            <tr key={funcion.fncod}>

                                                <td>
                                                    {funcion.fndsc}
                                                </td>

                                                <td>
                                                    {funcion.fncod}
                                                </td>

                                                <td>

                                                    <button
                                                        type="button"
                                                        className="functions-btn-add"
                                                        disabled={saving}
                                                        onClick={() =>
                                                            asignarFuncion(funcion)
                                                        }
                                                    >
                                                        + Asignar
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="functions-roles-empty"
                                            >
                                                No hay funciones disponibles.
                                            </td>
                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                {/* REGRESAR */}

                <div className="functions-detail-buttons">

                    <button
                        type="button"
                        className="functions-btn-back"
                        disabled={saving}
                        onClick={() =>
                            navigate("/admin/functions-roles")
                        }
                    >
                        ← Regresar
                    </button>

                </div>

            </div>

        </div>

    );

}
