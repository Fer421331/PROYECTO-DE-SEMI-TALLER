import { useEffect, useMemo, useState } from "react";
import "./Bitacora.css";
import {
    obtenerBitacora,
    type BitacoraRegistro,
} from "../../../services/bitacora.service";

const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);

    if (Number.isNaN(date.getTime())) return fecha;

    return new Intl.DateTimeFormat("es-HN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);
};

const fechaParaFiltro = (fecha: string) => {
    const date = new Date(fecha);

    if (Number.isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export default function Bitacora() {
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [buscar, setBuscar] = useState("");
    const [registros, setRegistros] = useState<BitacoraRegistro[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let activo = true;

        const cargarBitacora = async () => {
            try {
                setCargando(true);
                setError("");

                const data = await obtenerBitacora();

                if (activo) {
                    setRegistros(data);
                }
            } catch (err: unknown) {
                if (!activo) return;

                console.error("Error al cargar la bitácora:", err);
                setError(
                    "No fue posible cargar los registros. Verifica tu sesión y que el servidor esté disponible."
                );
            } finally {
                if (activo) setCargando(false);
            }
        };

        cargarBitacora();

        return () => {
            activo = false;
        };
    }, []);

    const registrosFiltrados = useMemo(() => {
        const termino = buscar.trim().toLowerCase();

        return registros.filter((registro) => {
            const contenido = [
                registro.bitacoracod,
                registro.bitcorafch,
                registro.bitprograma,
                registro.bitdescripcion,
                registro.bitobservacion ?? "",
                registro.bittipo,
                registro.bitusuario,
            ].join(" ").toLowerCase();

            const fechaRegistro = fechaParaFiltro(registro.bitcorafch);

            const coincideBusqueda =
                !termino || contenido.includes(termino);

            const coincideDesde =
                !fechaDesde || (!!fechaRegistro && fechaRegistro >= fechaDesde);

            const coincideHasta =
                !fechaHasta || (!!fechaRegistro && fechaRegistro <= fechaHasta);

            return coincideBusqueda && coincideDesde && coincideHasta;
        });
    }, [registros, buscar, fechaDesde, fechaHasta]);

    const limpiarFiltros = () => {
        setFechaDesde("");
        setFechaHasta("");
        setBuscar("");
    };

    return (
        <div className="bitacora-page">
            <div className="bitacora-header">
                <div>
                    <h1>Bitácora</h1>
                    <p>
                        Consulta el historial de actividades y acciones
                        realizadas dentro del sistema.
                    </p>
                </div>
            </div>

            <div className="bitacora-card">
                <h2 className="bitacora-section-title">
                    Filtrar por fecha
                </h2>

                <div className="bitacora-filters">
                    <div className="bitacora-filter-group">
                        <label>Desde</label>
                        <input
                            type="date"
                            value={fechaDesde}
                            max={fechaHasta || undefined}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                    </div>

                    <div className="bitacora-filter-group">
                        <label>Hasta</label>
                        <input
                            type="date"
                            value={fechaHasta}
                            min={fechaDesde || undefined}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </div>

                    <div className="bitacora-filter-buttons">
                        <button type="button" className="bitacora-filter-button">
                            Filtrar
                        </button>
                        <button
                            type="button"
                            className="bitacora-clear-button"
                            onClick={limpiarFiltros}
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>

            <div className="bitacora-search-card">
                <div className="bitacora-search-group">
                    <label htmlFor="buscarBitacora">
                        Buscar registros
                    </label>
                    <div className="bitacora-search-input">
                        <input
                            type="text"
                            id="buscarBitacora"
                            placeholder="Buscar por usuario, módulo, acción..."
                            value={buscar}
                            onChange={(e) => setBuscar(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bitacora-results">
                    <strong>{registrosFiltrados.length}</strong>
                    <span>Registros encontrados</span>
                </div>
            </div>

            <div className="bitacora-table-card">
                <div className="bitacora-table-container">
                    <table className="bitacora-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Usuario</th>
                                <th>Módulo</th>
                                <th>Acción</th>
                                <th>Observación</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cargando && (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="bitacora-empty">
                                            <strong>Cargando registros...</strong>
                                            <p>Consultando la información del sistema.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {!cargando && error && (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="bitacora-empty">
                                            <span>⚠️</span>
                                            <strong>No se pudo cargar la bitácora</strong>
                                            <p>{error}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {!cargando && !error && registrosFiltrados.map((registro) => (
                                <tr key={registro.bitacoracod}>
                                    <td className="bitacora-date">
                                        {formatearFecha(registro.bitcorafch)}
                                    </td>

                                    <td>
                                        <div className="bitacora-user">
                                            <span className="bitacora-user-icon">👤</span>
                                            <strong>{registro.bitusuario}</strong>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="bitacora-module">
                                            {registro.bitprograma}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="bitacora-action">
                                            {registro.bitdescripcion}
                                        </span>
                                    </td>

                                    <td className="bitacora-observation">
                                        {registro.bitobservacion || "Sin observación"}
                                    </td>
                                </tr>
                            ))}

                            {!cargando && !error && registrosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="bitacora-empty">
                                            <span>📭</span>
                                            <strong>No se encontraron registros</strong>
                                            <p>
                                                Intenta modificar los filtros de búsqueda.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bitacora-footer">
                <button
                    type="button"
                    className="bitacora-back"
                    onClick={() => window.history.back()}
                >
                    Regresar
                </button>
            </div>
        </div>
    );
}
