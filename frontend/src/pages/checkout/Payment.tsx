import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Payment.css';

type Preview = { direccion?: { receptor?: string; telefono?: string; departamento?: string; ciudad?: string; detalle?: string; referencia?: string }; productos?: Array<{ id: number | string; nombre: string; precio: number; cantidad: number }>; subtotal?: number };

function readPreview(): Preview | null {
    try { const value = sessionStorage.getItem('axume_checkout_preview'); return value ? JSON.parse(value) as Preview : null; }
    catch { return null; }
}
const money = (value: number) => `L ${value.toFixed(2)}`;

function Payment() {
    const navigate = useNavigate();
    const [preview] = useState<Preview | null>(readPreview);
    const [metodo, setMetodo] = useState('paypal');
    const [aviso, setAviso] = useState('');

    const subtotal = Number(preview?.subtotal ?? 0);
    const continuar = () => {
        if (!preview || !preview.productos?.length) { setAviso('No encontramos un pedido pendiente. Regresa al checkout y completa tus datos.'); return; }
        // Esta pantalla es visual: no procesa pagos ni crea ventas sin integración de backend.
        setAviso('La selección quedó lista. Para procesar el pago real debe conectarse el método de pago con el backend.');
    };

    return (
        <main className="ax-payment-page">
            <header className="ax-payment-header"><Link to="/" className="ax-payment-brand"><span>LA</span><strong>Lácteos Axúme<small>Calidad que nace de lo natural</small></strong></Link><Link to="/checkout" className="ax-payment-back">← Volver a entrega</Link></header>
            <div className="ax-payment-wrap">
                <div className="ax-payment-heading"><span>CASI TERMINAMOS</span><h1>Método de pago</h1><p>Selecciona cómo deseas realizar el pago de tu pedido.</p></div>
                <div className="ax-checkout-steps"><div className="done"><b>✓</b><span>Entrega</span></div><i /><div className="active"><b>2</b><span>Pago</span></div><i /><div><b>3</b><span>Confirmación</span></div></div>
                <div className="ax-payment-grid">
                    <section className="ax-payment-panel">
                        <div className="ax-payment-section-title"><span>01</span><div><h2>Elige tu método</h2><p>Selecciona una opción disponible.</p></div></div>
                        <label className={`ax-payment-option ${metodo === 'paypal' ? 'selected' : ''}`}><input type="radio" name="metodo" value="paypal" checked={metodo === 'paypal'} onChange={() => setMetodo('paypal')} /><span className="ax-payment-radio" /><span className="ax-payment-option-icon paypal">P</span><span className="ax-payment-option-copy"><strong>PayPal</strong><small>Pago electrónico mediante PayPal.</small></span><span className="ax-payment-tag">En línea</span></label>
                        <label className={`ax-payment-option ${metodo === 'contraentrega' ? 'selected' : ''}`}><input type="radio" name="metodo" value="contraentrega" checked={metodo === 'contraentrega'} onChange={() => setMetodo('contraentrega')} /><span className="ax-payment-radio" /><span className="ax-payment-option-icon cash">L</span><span className="ax-payment-option-copy"><strong>Pago al recibir</strong><small>Consulta disponibilidad de esta modalidad.</small></span><span className="ax-payment-tag">Entrega</span></label>
                        <div className="ax-payment-security"><span>✓</span><p><strong>Compra protegida</strong><small>El pago real se habilitará al conectar el proveedor correspondiente.</small></p></div>
                    </section>
                    <aside className="ax-payment-summary">
                        <span className="ax-payment-summary-kicker">RESUMEN DEL PEDIDO</span><h2>Tu compra</h2>
                        <div className="ax-payment-summary-line"><span>Artículos</span><strong>{preview?.productos?.length ?? 0}</strong></div>
                        <div className="ax-payment-summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                        <div className="ax-payment-summary-line"><span>Entrega</span><strong>Por confirmar</strong></div>
                        <div className="ax-payment-total"><span>Total estimado</span><strong>{money(subtotal)}</strong></div>
                        {preview?.direccion && <div className="ax-payment-address"><b>Enviar a</b><p>{preview.direccion.receptor}<br />{preview.direccion.ciudad}, {preview.direccion.departamento}<br />{preview.direccion.detalle}</p></div>}
                        {aviso && <div className="ax-payment-alert" role="status">{aviso}</div>}
                        <button className="ax-payment-confirm" onClick={continuar}>CONTINUAR <span>→</span></button>
                        <button className="ax-payment-return" onClick={() => navigate('/checkout')}>Modificar dirección</button>
                    </aside>
                </div>
            </div>
            <footer className="ax-payment-footer">© 2026 Lácteos Axúme · Hecho con tradición.</footer>
        </main>
    );
}
export default Payment;
