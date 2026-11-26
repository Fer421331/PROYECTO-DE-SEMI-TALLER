import './ResetPassword.css';

export default function ResetPassword() {
    return (
        <main className="ax-reset-page">
            <header className="ax-reset-header">
                <a href="/" className="ax-reset-brand"><span>LA</span><strong>Lácteos Axúme<small>Calidad que nace de lo natural</small></strong></a>
                <a href="/">← Volver al inicio de sesión</a>
            </header>
            <section className="ax-reset-layout">
                <aside className="ax-reset-intro">
                    <span className="ax-reset-eyebrow">ÚLTIMO PASO</span>
                    <h1>Una nueva contraseña, <em>un nuevo comienzo.</em></h1>
                    <p>Ya casi está listo. Crea una contraseña nueva para proteger tu cuenta y seguir disfrutando de Lácteos Axúme.</p>
                    <div className="ax-reset-tip">
                        <span>✓</span>
                        <p><strong>Consejo de seguridad</strong><small>Utiliza una contraseña que puedas recordar y que otras personas no puedan adivinar fácilmente.</small></p>
                    </div>
                </aside>
                <section className="ax-reset-card">
                    <div className="ax-reset-icon">✦</div>
                    <span className="ax-reset-kicker">PASO 3 DE 3</span>
                    <h2>Crear nueva contraseña</h2>
                    <p className="ax-reset-description">Ingresa tu nueva contraseña y confírmala para finalizar la recuperación.</p>
                    <form className="ax-reset-form">
                        <label htmlFor="new-password">Nueva contraseña</label>
                        <input id="new-password" type="password" placeholder="Escribe tu nueva contraseña" />
                        <label htmlFor="confirm-password">Confirmar contraseña</label>
                        <input id="confirm-password" type="password" placeholder="Repite la nueva contraseña" />
                        <div className="ax-reset-requirements">
                            <strong>Recomendaciones para tu contraseña</strong>
                            <span>• Al menos 8 caracteres</span>
                            <span>• Combina letras y números</span>
                            <span>• Evita datos personales fáciles de adivinar</span>
                        </div>
                        <button type="button">GUARDAR NUEVA CONTRASEÑA <span>→</span></button>
                    </form>
                </section>
            </section>
            <footer className="ax-reset-footer">© 2026 Lácteos Axúme · Hecho con tradición.</footer>
        </main>
    );
}