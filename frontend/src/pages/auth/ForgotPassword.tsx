import './ForgotPassword.css';

export default function ForgotPassword() {
    return (
        <main className="ax-recovery-page">
            <header className="ax-recovery-header">
                <a href="/" className="ax-recovery-brand"><span>LA</span><strong>Lácteos Axúme<small>Calidad que nace de lo natural</small></strong></a>
                <a href="/">← Volver al inicio de sesión</a>
            </header>
            <section className="ax-recovery-layout">
                <aside className="ax-recovery-intro">
                    <span className="ax-recovery-eyebrow">TE ACOMPAÑAMOS</span>
                    <h1>Recupera el acceso a <em>tu cuenta.</em></h1>
                    <p>No te preocupes. Te guiaremos paso a paso para que puedas volver a disfrutar de tu experiencia en Lácteos Axúme.</p>
                    <div className="ax-recovery-note">
                        <span>✦</span>
                        <p><strong>Tu cuenta, siempre contigo.</strong><small>Solo necesitas acceso al correo electrónico que registraste.</small></p>
                    </div>
                </aside>
                <section className="ax-recovery-card">
                    <div className="ax-recovery-icon">✉</div>
                    <span className="ax-recovery-kicker">PASO 1 DE 3</span>
                    <h2>¿Olvidaste tu contraseña?</h2>
                    <p className="ax-recovery-description">Escribe el correo electrónico asociado a tu cuenta. Te enviaremos un código para verificar tu identidad.</p>
                    <form className="ax-recovery-form">
                        <label htmlFor="recovery-email">Correo electrónico</label>
                        <input id="recovery-email" type="email" placeholder="correo@ejemplo.com" />
                        <button type="button">ENVIAR CÓDIGO <span>→</span></button>
                    </form>
                    <p className="ax-recovery-footnote">¿Recordaste tu contraseña? <a href="/">Inicia sesión</a></p>
                </section>
            </section>
            <footer className="ax-recovery-footer">© 2026 Lácteos Axúme · Hecho con tradición.</footer>
        </main>
    );
}