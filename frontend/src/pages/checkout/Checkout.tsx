import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

type CartItem = { id?: number | string; nombre?: string; producto_nombre?: string; precio?: number; producto_precio?: number; cantidad?: number; imagen?: string; producto_imagen?: string };

function readCart(): CartItem[] {
    try {
        const raw = localStorage.getItem('carrito') || localStorage.getItem('cart');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.productos) ? parsed.productos : []);
    } catch { return []; }
}

const money = (value: number) => `L ${value.toFixed(2)}`;

function Checkout() {
    const navigate = useNavigate();
    const [items] = useState<CartItem[]>(readCart);
    const [direccion, setDireccion] = useState({ receptor: '', telefono: '', departamento: '', ciudad: '', detalle: '', referencia: '' });
    const [error, setError] = useState('');

    const productos = useMemo(() => items.map((item, index) => ({
        id: item.id ?? index,
        nombre: item.nombre ?? item.producto_nombre ?? 'Producto artesanal',
        precio: Number(item.precio ?? item.producto_precio ?? 0),
        cantidad: Math.max(1, Number(item.cantidad ?? 1)),
        imagen: item.imagen ?? item.producto_imagen ?? '',
    })), [items]);
    const subtotal = productos.reduce((total, item) => total + item.precio * item.cantidad, 0);

    const continuar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (!productos.length) { setError('Agrega productos al carrito antes de continuar.'); return; }
        if (!direccion.receptor.trim() || !direccion.telefono.trim() || !direccion.departamento || !direccion.ciudad || !direccion.detalle.trim()) {
            setError('Completa los datos obligatorios de entrega.');
            return;
        }
        sessionStorage.setItem('axume_checkout_preview', JSON.stringify({ direccion, productos, subtotal }));
        navigate('/checkout/payment');
    };

    return (
        <main className="ax-checkout-page">
            <header className="ax-checkout-header">
                <Link to="/" className="ax-checkout-brand"><span>LA</span><strong>Lácteos Axúme<small>Calidad que nace de lo natural</small></strong></Link>
                <Link to="/cart" className="ax-checkout-back">← Volver al carrito</Link>
            </header>
            <div className="ax-checkout-wrap">
                <div className="ax-checkout-heading"><span>FINALIZA TU PEDIDO</span><h1>Confirmar compra</h1><p>Revisa tus productos y dinos dónde quieres recibirlos.</p></div>
                <div className="ax-checkout-steps"><div className="active"><b>1</b><span>Entrega</span></div><i /><div><b>2</b><span>Pago</span></div><i /><div><b>3</b><span>Confirmación</span></div></div>

                <form className="ax-checkout-grid" onSubmit={continuar}>
                    <section className="ax-checkout-main">
                        <div className="ax-panel">
                            <div className="ax-panel-title"><span className="ax-panel-icon">01</span><div><h2>Dirección de entrega</h2><p>Indica quién recibirá tu pedido.</p></div></div>
                            <div className="ax-form-grid">
                                <label>Nombre de quien recibe *<input value={direccion.receptor} onChange={e => setDireccion({ ...direccion, receptor: e.target.value })} placeholder="Nombre completo" /></label>
                                <label>Teléfono de contacto *<input type="tel" value={direccion.telefono} onChange={e => setDireccion({ ...direccion, telefono: e.target.value })} placeholder="Número de teléfono" /></label>
                                <label>Departamento *<select value={direccion.departamento} onChange={e => setDireccion({ ...direccion, departamento: e.target.value, ciudad: '' })}><option value="">Selecciona un departamento</option>{['Francisco Morazán', 'Cortés', 'Atlántida', 'Comayagua', 'Yoro', 'Choluteca', 'El Paraíso', 'La Paz', 'Olancho', 'Copán', 'Santa Bárbara', 'Lempira', 'Intibucá', 'Ocotepeque', 'Valle', 'Gracias a Dios', 'Islas de la Bahía'].map(x => <option key={x}>{x}</option>)}</select></label>
                                <label>Ciudad o municipio *<input value={direccion.ciudad} onChange={e => setDireccion({ ...direccion, ciudad: e.target.value })} placeholder="Ciudad o municipio" /></label>
                                <label className="wide">Dirección exacta *<textarea rows={3} value={direccion.detalle} onChange={e => setDireccion({ ...direccion, detalle: e.target.value })} placeholder="Colonia, calle, número de casa o punto de referencia cercano" /></label>
                                <label className="wide">Referencia adicional <input value={direccion.referencia} onChange={e => setDireccion({ ...direccion, referencia: e.target.value })} placeholder="Indicaciones para encontrar tu domicilio (opcional)" /></label>
                            </div>
                        </div>
                        <div className="ax-panel ax-products-panel">
                            <div className="ax-panel-title"><span className="ax-panel-icon">02</span><div><h2>Productos de tu pedido</h2><p>{productos.length} {productos.length === 1 ? 'producto' : 'productos'} en tu compra.</p></div></div>
                            {productos.length ? <div className="ax-order-items">{productos.map(item => <div className="ax-order-item" key={item.id}><div className="ax-order-thumb">{item.imagen ? <img src={item.imagen} alt={item.nombre} /> : <span>LA</span>}</div><div className="ax-order-info"><strong>{item.nombre}</strong><small>Cantidad: {item.cantidad}</small></div><b>{money(item.precio * item.cantidad)}</b></div>)}</div> : <div className="ax-empty-cart"><span>🧺</span><strong>Tu carrito está vacío</strong><p>Agrega productos para preparar tu pedido.</p><Link to="/cart">Ir al carrito</Link></div>}
                        </div>
                    </section>

                    <aside className="ax-summary">
                        <span className="ax-summary-label">RESUMEN</span><h2>Tu pedido</h2>
                        <div className="ax-summary-line"><span>Productos</span><strong>{productos.length}</strong></div>
                        <div className="ax-summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                        <div className="ax-summary-line"><span>Entrega</span><strong>Por confirmar</strong></div>
                        <div className="ax-summary-total"><span>Total estimado</span><strong>{money(subtotal)}</strong></div>
                        <p className="ax-summary-note">El costo de entrega, si aplica, se confirmará según la cobertura disponible.</p>
                        {error && <div className="ax-checkout-error" role="alert">{error}</div>}
                        <button className="ax-primary-btn" type="submit" disabled={!productos.length}>CONTINUAR AL PAGO <span>→</span></button>
                        <div className="ax-safe-note">✓ Tus datos se utilizarán para gestionar la entrega de tu pedido.</div>
                    </aside>
                </form>
            </div>
            <footer className="ax-checkout-footer">© 2026 Lácteos Axúme · Hecho con tradición.</footer>
        </main>
    );
}
export default Checkout;
