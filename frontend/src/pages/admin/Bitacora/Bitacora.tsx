import { useState } from "react";
import "./Bitacora.css";

export default function Bitacora() {

    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [buscar, setBuscar] = useState("");

    const registros = [
        {
            id: 1,
            fecha: "20/11/2026 09:30 AM",
            usuario: "admin",
            modulo: "Productos",
            accion: "Crear producto",
            observacion: "Se registró un nuevo producto: Leche entera pasteurizada."
        },
        {
            id: 2,
            fecha: "20/11/2026 10:15 AM",
            usuario: "vendedor01",
            modulo: "Ventas",
            accion: "Registrar venta",
            observacion: "Se registró una venta por L 265.00."
        },
        {
            id: 3,
            fecha: "20/11/2026 11:20 AM",
            usuario: "admin",
            modulo: "Usuarios",
            accion: "Actualizar usuario",
            observacion: "Se actualizaron los datos de un usuario."
        },
        {
            id: 4,
            fecha: "19/11/2026 02:45 PM",
            usuario: "admin",
            modulo: "Inventario",
            accion: "Actualizar stock",
            observacion: "Se modificó el inventario de queso fresco."
        },
        {
            id: 5,
            fecha: "19/11/2026 04:10 PM",
            usuario: "cliente01",
            modulo: "Direcciones",
            accion: "Registrar dirección",
            observacion: "Se agregó una nueva dirección de entrega."
        },
        {
            id: 6,
            fecha: "18/11/2026 08:50 AM",
            usuario: "admin",
            modulo: "Seguridad",
            accion: "Inicio de sesión",
            observacion: "El usuario inició sesión correctamente."
        }
    ];

    const registrosFiltrados = registros.filter((registro) => {

        const contenido = `
            ${registro.fecha}
            ${registro.usuario}
            ${registro.modulo}
            ${registro.accion}
            ${registro.observacion}
        `.toLowerCase();

        const coincideBusqueda = contenido.includes(
            buscar.toLowerCase().trim()
        );

        const fechaRegistro = registro.fecha.substring(6, 10) +
            "-" +
            registro.fecha.substring(3, 5) +
            "-" +
            registro.fecha.substring(0, 2);

        const coincideDesde = !fechaDesde || fechaRegistro >= fechaDesde;
        const coincideHasta = !fechaHasta || fechaRegistro <= fechaHasta;

        return coincideBusqueda && coincideDesde && coincideHasta;

    });

    const limpiarFiltros = () => {
        setFechaDesde("");
        setFechaHasta("");
        setBuscar("");
    };

    return (
        <div className="bitacora-page">

            {/* ENCABEZADO */}

            <div className="bitacora-header">

                <div>
                    <h1>Bitácora</h1>

                    <p>
                        Consulta el historial de actividades y acciones
                        realizadas dentro del sistema.
                    </p>
                </div>

                <div className="bitacora-header-icon">
                    <span>📋</span>
                </div>

            </div>

            {/* FILTROS POR FECHA */}

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

            {/* BUSCADOR */}

            <div className="bitacora-search-card">

                <div className="bitacora-search-group">

                    <label htmlFor="buscarBitacora">
                        Buscar registros
                    </label>

                    <div className="bitacora-search-input">

                        <span>🔎</span>

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

            {/* TABLA */}

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

                            {registrosFiltrados.map((registro) => (

                                <tr key={registro.id}>

                                    <td className="bitacora-date">
                                        {registro.fecha}
                                    </td>

                                    <td>
                                        <div className="bitacora-user">
                                            <span className="bitacora-user-icon">
                                                👤
                                            </span>

                                            <strong>
                                                {registro.usuario}
                                            </strong>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="bitacora-module">
                                            {registro.modulo}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="bitacora-action">
                                            {registro.accion}
                                        </span>
                                    </td>

                                    <td className="bitacora-observation">
                                        {registro.observacion}
                                    </td>

                                </tr>

                            ))}

                            {registrosFiltrados.length === 0 && (

                                <tr>
                                    <td colSpan={5}>
                                        <div className="bitacora-empty">
                                            <span>📭</span>

                                            <strong>
                                                No se encontraron registros
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

                </div>

            </div>

            {/* FOOTER */}

            <div className="bitacora-footer">

                <button type="button" className="bitacora-back">
                    Regresar
                </button>

            </div>

        </div>
    );
}
