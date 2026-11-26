import './VerifyRecoveryCode.css';

export default function VerifyRecoveryCode() {
    return (
        <main className="ax-code-page">
            <header className="ax-code-header">
                <a href="/" className="ax-code-brand"><span>LA</span><strong>Lácteos Axúme<small>Calidad que nace de lo natural</small></strong></a>
                <a href="/">← Volver al inicio de sesión</a>
            </header>
            <section className="ax-code-layout">
                <div className="ax-code-card">
                    <div className="ax-code-icon">✉</div>
                    <span className="ax-code-kicker">PASO 2 DE 3</span>
                    <h1>Verifica tu correo</h1>
                    <p className="ax-code-description">Hemos enviado un código de verificación a tu correo electrónico. Escríbelo a continuación para continuar.</p>
                    <div className="ax-code-email">✉ <strong>correo@ejemplo.com</strong></div>
                    <div className="ax-code-label">Código de verificación</div>
                    <div className="ax-code-inputs">
                        <input aria-label="Primer dígito" inputMode="numeric" maxLength={1} />
                        <input aria-label="Segundo dígito" inputMode="numeric" maxLength={1} />
                        <input aria-label="Tercer dígito" inputMode="numeric" maxLength={1} />
                        <input aria-label="Cuarto dígito" inputMode="numeric" maxLength={1} />
                        <input aria-label="Quinto dígito" inputMode="numeric" maxLength={1} />
                        <input aria-label="Sexto dígito" inputMode="numeric" maxLength={1} />
                    </div>
                    <button className="ax-code-submit" type="button">VERIFICAR CÓDIGO <span>→</span></button>
                    <p className="ax-code-resend">¿No recibiste el código? <a href="#">Solicitar uno nuevo</a></p>
                    <p className="ax-code-hint">Revisa también la carpeta de correo no deseado.</p>
                </div>
            </section>
            <footer className="ax-code-footer">© 2026 Lácteos Axúme · Hecho con tradición.</footer>
        </main>
    );
}