import { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [cargando, setCargando] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        // ==============================
        // VALIDACIONES DEL FORMULARIO
        // ==============================

        const correo = useremail.trim();

        if (!correo) {
            setError('El correo electrónico es obligatorio.');
            return;
        }

        if (!password) {
            setError('La contraseña es obligatoria.');
            return;
        }

        const correoValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

        if (!correoValido) {
            setError('Ingrese un correo electrónico válido.');
            return;
        }

        if (password.length < 6) {
            setError(
                'La contraseña debe tener al menos 6 caracteres.'
            );
            return;
        }

        // ==============================
        // CONEXIÓN CON EL BACKEND
        // ==============================

        setCargando(true);

        try {
            const respuesta = await axios.post(
                'http://localhost:3000/api/auth/login',
                {
                    useremail: correo,
                    password: password
                },
                {
                    timeout: 8000
                }
            );

            // Guardar sesión
            localStorage.setItem(
                'token',
                respuesta.data.token
            );

            localStorage.setItem(
                'usuario',
                JSON.stringify(respuesta.data.usuario)
            );

            setSuccess('Inicio de sesión exitoso.');

            console.log(
                'Usuario autenticado:',
                respuesta.data.usuario
            );

        } catch (error) {

            if (error.code === 'ECONNABORTED') {
                setError(
                    'El servidor tardó demasiado en responder.'
                );

            } else if (error.response) {

                const mensaje =
                    error.response.data?.mensaje;

                setError(
                    mensaje ||
                    'No se pudo iniciar sesión.'
                );

            } else {

                setError(
                    'No se pudo conectar con el servidor.'
                );
            }

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-page">

            <header className="login-header-bar">
                <div className="brand">
                    <div className="brand-icon">
                        LA
                    </div>

                    <div>
                        <h1>Lácteos Axúme</h1>
                        <span>E-commerce</span>
                    </div>
                </div>
            </header>


            <main className="login-main">

                <section className="login-card">

                    <div className="login-title">
                        <h2>Iniciar sesión</h2>

                        <p>
                            Ingresa tus datos para acceder
                            a tu cuenta.
                        </p>
                    </div>


                    <form
                        onSubmit={handleLogin}
                        className="login-form"
                        noValidate
                    >

                        <div className="form-group">

                            <label htmlFor="useremail">
                                Correo electrónico
                            </label>

                            <input
                                id="useremail"
                                type="email"
                                placeholder="Ingrese su correo"
                                value={useremail}
                                onChange={(e) => {
                                    setUseremail(e.target.value);
                                    setError('');
                                    setSuccess('');
                                }}
                                autoComplete="email"
                                disabled={cargando}
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="password">
                                Contraseña
                            </label>

                            <div className="password-container">

                                <input
                                    id="password"
                                    type={
                                        mostrarPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                        setSuccess('');
                                    }}
                                    autoComplete="current-password"
                                    disabled={cargando}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setMostrarPassword(
                                            !mostrarPassword
                                        )
                                    }
                                    tabIndex="-1"
                                    aria-label={
                                        mostrarPassword
                                            ? 'Ocultar contraseña'
                                            : 'Mostrar contraseña'
                                    }
                                >
                                    {mostrarPassword ? 'Ocultar' : 'Ver'}
                                </button>

                            </div>

                        </div>


                        <div className="forgot-password">
                            <button
                                type="button"
                                onClick={() =>
                                    setError(
                                        'La recuperación de contraseña estará disponible próximamente.'
                                    )
                                }
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>


                        {error && (
                            <div className="message error-message">
                                <span>⚠</span>
                                <span>{error}</span>
                            </div>
                        )}


                        {success && (
                            <div className="message success-message">
                                <span>✓</span>
                                <span>{success}</span>
                            </div>
                        )}


                        <button
                            type="submit"
                            className="login-button"
                            disabled={cargando}
                        >
                            {cargando
                                ? 'Verificando...'
                                : 'INGRESAR'}
                        </button>

                    </form>

                </section>

            </main>


            <footer className="login-footer">
                © 2026 Lácteos Axúme. Todos los derechos reservados.
            </footer>

        </div>
    );
}

export default Login;