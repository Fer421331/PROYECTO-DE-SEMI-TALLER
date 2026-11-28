import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './PurchaseConfirmation.css';

type Preview = { direccion?: { receptor?: string; telefono?: string; departamento?: string; ciudad?: string; detalle?: string; referencia?: string }; productos?: Array<{ id: number | string; nombre: string; precio: number; cantidad: number }>; subtotal?: number };

function readPreview(): Preview | null {
    try { const value = sessionStorage.getItem('axume_checkout_preview'); return value ? JSON.parse(value) as Preview : null; }
    catch { return null; }
}
const money = (value: number) => `L ${value.toFixed(2)}`;

function PurchaseConfirmation() {
    const [preview] = useState<Preview | null>(readPreview);
    const referencia = useMemo(() => {
        try { return sessionStorage.getItem('axume_order_reference') || 'Pendiente de generar'; }
        catch { return 'Pendiente de generar'; }
    }, []);
    const productos = preview?.productos ?? [];
    const total = Number(preview?.subtotal ?? 0);

    return (
        <main className="ax-confirm-page">
            <header className="ax-confirm-header"><Link to="/" className="ax-confirm-brand"><span>LA</span><strong>Lácteos Axúme<small>Calidad que nace de lo natural</small></strong></Link></header>
            <section className="ax-confirm-wrap">
                <div className="ax-confirm-card">
                    <div className="ax-confirm-symbol">✓</div>
                    <span className="ax-confirm-kicker">RESUMEN DE TU PEDIDO</span>
                    <h1>¡Gracias por elegir Axúme!</h1>
                    <p className="ax-confirm-lead">Esta es la pantalla de confirmación de tu compra. El estado real del pago y la venta se mostrará cuando el proceso esté conectado al backend.</p>
                    <div className="ax-confirm-reference"><span>Referencia de pedido</span><strong>{referencia}</strong></div>
                    <div className="ax-confirm-columns">
                        <section className="ax-confirm-section"><h2>Dirección de entrega</h2>{preview?.direccion ? <p><strong>{preview.direccion.receptor}</strong><br />{preview.direccion.telefono}<br />{preview.direccion.ciudad}, {preview.direccion.departamento}<br />{preview.direccion.detalle}{preview.direccion.referencia && <><br />Referencia: {preview.direccion.referencia}</>}</p> : <p>Los datos de entrega aparecerán aquí al completar el checkout.</p>}</section>
                        <section className="ax-confirm-section"><h2>Productos de tu pedido</h2>{productos.length ? <div className="ax-confirm-items">{productos.map(item => <div className="ax-confirm-item" key={item.id}><span>{item.nombre} <small>× {item.cantidad}</small></span><strong>{money(item.precio * item.cantidad)}</strong></div>)}</div> : <p>No hay productos de compra para mostrar.</p>}</section>
                    </div>
                    <div className="ax-confirm-total"><span>Total estimado</span><strong>{money(total)}</strong></div>
                    <div className="ax-confirm-notice">La interfaz está preparada; esta vista no representa una transacción aprobada ni genera una venta por sí sola.</div>
                    <div className="ax-confirm-actions"><Link to="/" className="ax-confirm-primary">VOLVER AL INICIO</Link><Link to="/products" className="ax-confirm-secondary">SEGUIR COMPRANDO</Link></div>
                </div>
                <p className="ax-confirm-help">¿Necesitas ayuda con tu pedido? Comunícate con el equipo de Lácteos Axúme.</p>
            </section>
            <footer className="ax-confirm-footer">© 2026 Lácteos Axúme · Hecho con tradición.</footer>
        </main>
    );
}
export default PurchaseConfirmation;
