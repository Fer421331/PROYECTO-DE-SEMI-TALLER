import { FormEvent, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const usuario = username.trim();

    if (!usuario) {
      setError("El nombre de usuario es obligatorio.");
      return;
    }

    if (!password) {
      setError("La contraseña es obligatoria.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);

    try {
      await login(usuario, password);
      setSuccess("Inicio de sesión exitoso.");
      navigate("/", { replace: true });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión.",
      );
    } finally {
      setCargando(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
    setError("");
    setSuccess("");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setError("");
    setSuccess("");
  };

  return (
    <div className="login-page">
      {/*<header className="login-header-bar">
       <div className="brand">
          <div className="brand-icon">LA</div>
          <div>
            <h1>Lácteos Axúme</h1>
            <span>Calidad que nace de lo natural</span>
          </div>
        </div>
      </header>*/}

      <main className="login-main">
        <div className="login-layout">
          <section className="login-intro">
            <span className="login-eyebrow">Bienvenido a Axúme</span>
            <h2>
              El sabor de lo natural, <span>cerca de ti.</span>
            </h2>
            <p>
              Accede a tu cuenta y descubre nuestros productos lácteos,
              preparados para acompañar cada momento.
            </p>
            <div className="login-accent" />
          </section>

          <section className="login-card">
            <div className="login-title">
              <h3>Iniciar sesión</h3>
              <p>Ingresa tus credenciales para continuar.</p>
            </div>

            <form onSubmit={handleLogin} className="login-form" noValidate>
              <div className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  value={username}
                  onChange={handleUsernameChange}
                  autoComplete="username"
                  disabled={cargando}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="password-container">
                  <input
                    id="password"
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    disabled={cargando}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    aria-label={
                      mostrarPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    {mostrarPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <div className="forgot-password">
                <button
                  type="button"
                  onClick={() =>
                    setError(
                      "La recuperación de contraseña no está disponible en este momento.",
                    )
                  }
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error && (
                <div className="message error-message" role="alert">
                  <span aria-hidden="true">!</span>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="message success-message" role="status">
                  <span aria-hidden="true">✓</span>
                  <span>{success}</span>
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={cargando}
              >
                {cargando ? "VERIFICANDO..." : "INGRESAR A MI CUENTA"}
              </button>
            </form>
          </section>
        </div>
      </main>

      <footer className="login-footer">
        © 2026 Lácteos Axúme. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Login;
