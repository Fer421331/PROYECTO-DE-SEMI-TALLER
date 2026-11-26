import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

type RegisterForm = {
    nombre: string;
    username: string;
    email: string;
    telefono: string;
    password: string;
    confirmarPassword: string;
};

const initialForm: RegisterForm = {
    nombre: '',
    username: '',
    email: '',
    telefono: '',
    password: '',
    confirmarPassword: '',
};

export default function Register() {
    const [form, setForm] = useState<RegisterForm>(initialForm);
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const actualizarCampo = (campo: keyof RegisterForm, valor: string) => {
        setForm((actual) => ({ ...actual, [campo]: valor }));
        setError('');
        setMensaje('');
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        if (!form.nombre.trim() || !form.username.trim() || !form.email.trim() ||
            !form.password || !form.confirmarPassword) {
            setError('Completa todos los campos obligatorios.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError('Ingresa un correo electrónico válido.');
            return;
        }

        if (form.password.length < 8 || !/[A-Z]/.test(form.password) ||
            !/[0-9]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
            setError('La contraseña debe tener 8 caracteres, una mayúscula, un número y un carácter especial.');
            return;
        }

        if (form.password !== form.confirmarPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // El backend actual no expone un endpoint público de registro.
        // Se valida el formulario sin simular que la cuenta fue creada.
        setMensaje('Formulario validado. La creación de la cuenta debe conectarse al servicio de registro del backend.');
    };

    return (
        <main className="register-page">
            <header className="register-header">
                <Link to="/" className="register-brand" aria-label="Lácteos Axúme, inicio">
                    <span className="register-brand-mark">LA</span>
                    <span><strong>Lácteos Axúme</strong><small>Calidad que nace de lo natural</small></span>
                </Link>
                <span className="register-header-note">Tradición artesanal en cada producto</span>
            </header>

            <section className="register-content">
                <aside className="register-story">
                    <span className="register-kicker">Únete a nuestra familia</span>
                    <h1>Lo natural sabe mejor <em>cuando se comparte.</em></h1>
                    <p>Crea tu cuenta para descubrir nuestros productos artesanales y tener tus compras organizadas en un solo lugar.</p>
                    <div className="register-benefits">
                        <div><span>01</span><p><strong>Productos artesanales</strong><small>Elaborados con cuidado y tradición.</small></p></div>
                        <div><span>02</span><p><strong>Compra sencilla</strong><small>Consulta tu pedido en cada etapa.</small></p></div>
                        <div><span>03</span><p><strong>Tu información organizada</strong><small>Datos de cuenta y entrega en un solo lugar.</small></p></div>
                    </div>
                    <div className="register-decoration" aria-hidden="true"><span>AXÚME</span></div>
                </aside>

                <section className="register-card">
                    <div className="register-card-heading">
                        <span className="register-step">CREA TU CUENTA</span>
                        <h2>Regístrate</h2>
                        <p>Completa tus datos para comenzar.</p>
                    </div>

                    <form className="register-form" onSubmit={handleSubmit} noValidate>
                        <div className="register-field">
                            <label htmlFor="reg-nombre">Nombre completo <b>*</b></label>
                            <input id="reg-nombre" value={form.nombre} onChange={(e) => actualizarCampo('nombre', e.target.value)} placeholder="Tu nombre y apellido" autoComplete="name" />
                        </div>
                        <div className="register-field">
                            <label htmlFor="reg-username">Nombre de usuario <b>*</b></label>
                            <input id="reg-username" value={form.username} onChange={(e) => actualizarCampo('username', e.target.value)} placeholder="Elige un nombre de usuario" autoComplete="username" />
                        </div>
                        <div className="register-field">
                            <label htmlFor="reg-email">Correo electrónico <b>*</b></label>
                            <input id="reg-email" type="email" value={form.email} onChange={(e) => actualizarCampo('email', e.target.value)} placeholder="correo@ejemplo.com" autoComplete="email" />
                        </div>
                        <div className="register-field">
                            <label htmlFor="reg-telefono">Teléfono <span>(opcional)</span></label>
                            <input id="reg-telefono" type="tel" value={form.telefono} onChange={(e) => actualizarCampo('telefono', e.target.value)} placeholder="Tu número de contacto" autoComplete="tel" />
                        </div>
                        <div className="register-field">
                            <label htmlFor="reg-password">Contraseña <b>*</b></label>
                            <div className="register-password">
                                <input id="reg-password" type={mostrarPassword ? 'text' : 'password'} value={form.password} onChange={(e) => actualizarCampo('password', e.target.value)} placeholder="Crea una contraseña segura" autoComplete="new-password" />
                                <button type="button" onClick={() => setMostrarPassword(!mostrarPassword)}>{mostrarPassword ? 'Ocultar' : 'Mostrar'}</button>
                            </div>
                        </div>
                        <div className="register-field">
                            <label htmlFor="reg-confirmar">Confirmar contraseña <b>*</b></label>
                            <div className="register-password">
                                <input id="reg-confirmar" type={mostrarConfirmacion ? 'text' : 'password'} value={form.confirmarPassword} onChange={(e) => actualizarCampo('confirmarPassword', e.target.value)} placeholder="Repite tu contraseña" autoComplete="new-password" />
                                <button type="button" onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}>{mostrarConfirmacion ? 'Ocultar' : 'Mostrar'}</button>
                            </div>
                        </div>

                        {error && <div className="register-alert register-alert-error" role="alert">{error}</div>}
                        {mensaje && <div className="register-alert register-alert-info" role="status">{mensaje}</div>}

                        <button className="register-submit" type="submit">CREAR MI CUENTA <span>→</span></button>
                        <p className="register-login">¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link></p>
                        <small className="register-legal">Al continuar, tus datos se utilizarán para gestionar tu cuenta y tus pedidos.</small>
                    </form>
                </section>
            </section>

            <footer className="register-footer">© 2026 Lácteos Axúme. Todos los derechos reservados.</footer>
        </main>
    );
}