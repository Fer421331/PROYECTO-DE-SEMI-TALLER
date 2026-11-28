import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    obtenerVentasAdmin,
    type VentaAdmin
} from "../../../services/admin.service";
import "./SalesList.css";

const estadoTexto = (s: string) =>
({
    PEN: "Pendiente",
    PAG: "Pagada",
    CAN: "Cancelada",
    ENT: "Entregada"
}[s?.trim()] ?? s ?? "Sin estado");

const estadoClase = (s: string) =>
    s?.trim() === "PAG" || s?.trim() === "ENT"
        ? "sales-status-approved"
        : s?.trim() === "CAN"
            ? "sales-status-cancelled"
            : "sales-status-pending";

export default function SalesList() {
    const navigate = useNavigate();

    const [ventas, setVentas] = useState<VentaAdmin[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [estado, setEstado] = useState("");

    const [aplicada, setAplicada] = useState({
        q: "",
        estado: ""
    });

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    // Cargar ventas
    const cargarVentas = async () => {
        setCargando(true);
        setError("");

        try {
            const resultado = await obtenerVentasAdmin();
            setVentas(resultado);
        } catch (e) {
            setError(
                e instanceof Error
                    ? e.message
                    : "No se pudieron cargar las ventas."
            );
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        void cargarVentas();
    }, []);

    // Aplicar filtros
    const filtrar = () => {
        setAplicada({
            q: busqueda.trim(),
            estado
        });
    };

    // Filtrar y ordenar ventas
    const filtradas = useMemo(() => {
        return ventas
            .filter(v => {
                const texto =
                    `${v.venta_id} ${v.usercod} ${v.venta_fecha}`
                        .toLowerCase();

                const coincideBusqueda = texto.includes(
                    aplicada.q.toLowerCase()
                );

                const coincideEstado =
                    !aplicada.estado ||
                    v.venta_estado?.trim() === aplicada.estado;

                return coincideBusqueda && coincideEstado;
            })
            .sort(
                (a, b) =>
                    new Date(b.venta_fecha).getTime() -
                    new Date(a.venta_fecha).getTime()
            );
    }, [ventas, aplicada]);

    // Formatear fecha
    const fecha = (f: string) =>
        f
            ? new Intl.DateTimeFormat("es-HN").format(new Date(f))
            : "—";

    return (
        <div className="sales-page">

            <div className="sales-header">
                <h1>Ventas</h1>
                <p>
                    Administra y consulta las ventas realizadas
                    en la tienda de productos lácteos.
                </p>
            </div>

            {/* Filtros */}
            <div className="sales-filters">

                <div className="sales-filter-group">
                    <label htmlFor="buscarVenta">
                        Buscar venta
                    </label>

                    <input
                        id="buscarVenta"
                        type="text"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                filtrar();
                            }
                        }}
                        placeholder="Buscar por ID, usuario o fecha..."
                        autoComplete="off"
                    />
                </div>

                <div className="sales-filter-group">
                    <label htmlFor="estadoVenta">
                        Estado
                    </label>

                    <select
                        id="estadoVenta"
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                    >
                        <option value="">Todos los estados</option>
                        <option value="PAG">Pagada</option>
                        <option value="PEN">Pendiente</option>
                        <option value="CAN">Cancelada</option>
                        <option value="ENT">Entregada</option>
                    </select>
                </div>

                <div className="sales-filter-button">
                    <button
                        type="button"
                        onClick={filtrar}
                        disabled={cargando}
                    >
                        Filtrar
                    </button>
                </div>

            </div>

            {/* Error */}
            {error && (
                <p role="alert" className="sales-error">
                    {error}
                </p>
            )}

            {/* Tabla */}
            <div className="sales-card">

                <div className="sales-table-container">

                    <table className="sales-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuario (código)</th>
                                <th>Fecha</th>
                                <th>Método de pago (ID)</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {cargando ? (
                                <tr>
                                    <td colSpan={7}>
                                        Cargando ventas…
                                    </td>
                                </tr>
                            ) : filtradas.length > 0 ? (

                                filtradas.map(v => (
                                    <tr key={v.venta_id}>

                                        <td>
                                            #{v.venta_id}
                                        </td>

                                        <td>
                                            <strong>{v.usercod}</strong>
                                        </td>

                                        <td>
                                            {fecha(v.venta_fecha)}
                                        </td>

                                        <td>
                                            {v.metodo_pago_id}
                                        </td>

                                        <td className="sales-total">
                                            L {Number(v.venta_total).toFixed(2)}
                                        </td>

                                        <td>
                                            <span
                                                className={`sales-status ${estadoClase(v.venta_estado)}`}
                                            >
                                                {estadoTexto(v.venta_estado)}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="sales-view"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/sales/${v.venta_id}`
                                                    )
                                                }
                                            >
                                                Ver detalle
                                            </button>
                                        </td>

                                    </tr>
                                ))

                            ) : (

                                <tr>
                                    <td colSpan={7}>
                                        No hay ventas que coincidan
                                        con la búsqueda.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="sales-pagination">
                    <span>
                        {filtradas.length} venta(s)
                    </span>
                </div>

            </div>

            {/* Regresar */}
            <div className="sales-footer">
                <button
                    type="button"
                    className="sales-back"
                    onClick={() => navigate("/admin/panel")}
                >
                    Regresar
                </button>
            </div>

        </div>
    );
}
