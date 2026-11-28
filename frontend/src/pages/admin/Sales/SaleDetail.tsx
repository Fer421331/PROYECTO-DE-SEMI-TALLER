import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    obtenerDetallesVentasAdmin,
    obtenerVentaAdmin,
    type VentaAdmin,
    type VentaDetalleAdmin
} from "../../../services/admin.service";

import "./SaleDetail.css";

const estadoTexto = (s: string) =>
({
    PEN: "Pendiente",
    PAG: "Pagada",
    CAN: "Cancelada",
    ENT: "Entregada"
}[s?.trim()] ?? s ?? "Sin estado");

const estadoClase = (s: string) =>
    s?.trim() === "PAG" || s?.trim() === "ENT"
        ? "sale-detail-status-approved"
        : s?.trim() === "CAN"
            ? "sale-detail-status-cancelled"
            : "sale-detail-status-pending";

export default function SaleDetail() {
    const { venta_id } = useParams<{ venta_id: string }>();
    const navigate = useNavigate();

    const [venta, setVenta] = useState<VentaAdmin | null>(null);
    const [detalles, setDetalles] = useState<VentaDetalleAdmin[]>([]);

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    // Cargar información de la venta
    useEffect(() => {
        let activo = true;

        const cargar = async () => {
            setCargando(true);
            setError("");

            const id = Number(venta_id);

            if (!Number.isInteger(id) || id <= 0) {
                setError("El identificador de la venta no es válido.");
                setCargando(false);
                return;
            }

            try {
                const [v, d] = await Promise.all([
                    obtenerVentaAdmin(id),
                    obtenerDetallesVentasAdmin()
                ]);

                if (activo) {
                    setVenta(v);

                    setDetalles(
                        d.filter(
                            x => Number(x.venta_id) === id
                        )
                    );
                }
            } catch (e) {
                if (activo) {
                    setError(
                        e instanceof Error
                            ? e.message
                            : "No se pudo cargar el detalle de la venta."
                    );
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        void cargar();

        return () => {
            activo = false;
        };
    }, [venta_id]);

    // Formatear fecha
    const fecha = venta?.venta_fecha
        ? new Intl.DateTimeFormat("es-HN", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(new Date(venta.venta_fecha))
        : "—";

    if (cargando) {
        return (
            <div className="sale-detail-page">
                <p>Cargando venta…</p>
            </div>
        );
    }

    return (
        <div className="sale-detail-page">

            <div className="sale-detail-header">
                <h1>
                    Detalle de Venta #{venta?.venta_id ?? venta_id}
                </h1>

                <p>
                    Consulta la información completa de esta venta
                    y los productos adquiridos.
                </p>
            </div>

            {/* Error */}
            {error && (
                <p role="alert" className="sale-detail-error">
                    {error}
                </p>
            )}

            {venta && (
                <div className="sale-detail-card">

                    {/* Información de la venta */}
                    <h2 className="sale-detail-section-title">
                        Información de la venta
                    </h2>

                    <div className="sale-detail-info-grid">

                        <div className="sale-detail-info-item">
                            <span>Usuario (código)</span>
                            <strong>{venta.usercod}</strong>
                        </div>

                        <div className="sale-detail-info-item">
                            <span>Fecha</span>
                            <strong>{fecha}</strong>
                        </div>

                        <div className="sale-detail-info-item">
                            <span>Método de pago (ID)</span>
                            <strong>{venta.metodo_pago_id}</strong>
                        </div>

                        <div className="sale-detail-info-item">
                            <span>Dirección (ID)</span>
                            <strong>{venta.direccion_id}</strong>
                        </div>

                        <div className="sale-detail-info-item">
                            <span>Estado</span>

                            <strong>
                                <span
                                    className={`sale-detail-status ${estadoClase(venta.venta_estado)}`}
                                >
                                    {estadoTexto(venta.venta_estado)}
                                </span>
                            </strong>
                        </div>

                        <div className="sale-detail-info-item sale-detail-full">
                            <span>Total de la venta</span>

                            <strong className="sale-detail-total">
                                L {Number(venta.venta_total).toFixed(2)}
                            </strong>
                        </div>

                        {venta.venta_observaciones && (
                            <div className="sale-detail-info-item sale-detail-full">
                                <span>Observaciones</span>

                                <strong>
                                    {venta.venta_observaciones}
                                </strong>
                            </div>
                        )}

                    </div>

                    {/* Productos vendidos */}
                    <h2 className="sale-detail-section-title">
                        Productos vendidos
                    </h2>

                    <div className="sale-detail-table-container">

                        <table className="sale-detail-table">

                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio unitario</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>

                                {detalles.length > 0 ? (

                                    detalles.map(d => (
                                        <tr key={d.detalle_venta_id}>

                                            <td>
                                                <strong>
                                                    {d.producto_nombre}
                                                </strong>

                                                <span className="sale-detail-product-category">
                                                    Código: {d.producto_id}
                                                </span>
                                            </td>

                                            <td>
                                                L {Number(d.precio_unitario).toFixed(2)}
                                            </td>

                                            <td>
                                                {d.cantidad}
                                            </td>

                                            <td className="sale-detail-table-total">
                                                L {Number(d.subtotal).toFixed(2)}
                                            </td>

                                        </tr>
                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan={4}>
                                            No hay detalles de productos
                                            para esta venta.
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Resumen */}
                    <div className="sale-detail-summary">
                        <span>Total de la venta</span>

                        <strong>
                            L {Number(venta.venta_total).toFixed(2)}
                        </strong>
                    </div>

                    {/* Botones */}
                    <div className="sale-detail-buttons">
                        <button
                            type="button"
                            className="sale-detail-back"
                            onClick={() => navigate("/admin/sales")}
                        >
                            Regresar
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}
