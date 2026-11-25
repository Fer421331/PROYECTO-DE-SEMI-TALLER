import "./Profile.css";

export default function Profile() {
    return (
        <div className="profile-page">

            <div className="profile-header">
                <h1>Mi Perfil</h1>
                <p>Administra tu información personal y tu cuenta.</p>
            </div>

            {/* INFORMACIÓN PERSONAL */}

            <section className="profile-card">

                <div className="profile-card-header">
                    <div className="profile-icon">👤</div>

                    <div>
                        <h2>Información personal</h2>
                        <p>Actualiza tus datos personales.</p>
                    </div>
                </div>

                <form className="profile-form">

                    <div className="profile-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            name="username"
                            defaultValue="Usuario"
                            placeholder="Ingrese su nombre"
                        />
                    </div>

                    <div className="profile-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="useremail"
                            defaultValue="usuario@correo.com"
                            placeholder="Ingrese su correo"
                        />
                    </div>

                    <div className="profile-actions">
                        <button type="button" className="profile-btn primary">
                            Guardar cambios
                        </button>
                    </div>

                </form>

            </section>

            {/* RESUMEN */}

            <section className="profile-summary">

                <div className="profile-section-title">
                    <h2>Resumen de mi cuenta</h2>
                    <p>Consulta tu actividad en nuestra tienda.</p>
                </div>

                <div className="profile-summary-grid">

                    <div className="summary-card purchases">
                        <div className="summary-icon">🛒</div>
                        <div>
                            <h3>Compras</h3>
                            <span>12</span>
                            <p>Compras realizadas</p>
                        </div>
                    </div>

                    <div className="summary-card favorites">
                        <div className="summary-icon">❤️</div>
                        <div>
                            <h3>Favoritos</h3>
                            <span>8</span>
                            <p>Productos guardados</p>
                        </div>
                    </div>

                    <div className="summary-card cart">
                        <div className="summary-icon">🥛</div>
                        <div>
                            <h3>Carrito</h3>
                            <span>3</span>
                            <p>Productos pendientes</p>
                        </div>
                    </div>

                </div>

            </section>

            {/* CAMBIAR CONTRASEÑA */}

            <section className="profile-card password-card">

                <div className="profile-card-header">
                    <div className="profile-icon">🔒</div>

                    <div>
                        <h2>Cambiar contraseña</h2>
                        <p>
                            Mantén tu cuenta segura actualizando
                            tu contraseña periódicamente.
                        </p>
                    </div>
                </div>

                <form className="profile-form">

                    <div className="profile-group">
                        <label>Contraseña actual</label>
                        <input
                            type="password"
                            name="passwordActual"
                            placeholder="Ingrese su contraseña actual"
                            required
                        />
                    </div>

                    <div className="profile-group">
                        <label>Nueva contraseña</label>
                        <input
                            type="password"
                            name="passwordNueva"
                            placeholder="Ingrese su nueva contraseña"
                            required
                        />
                    </div>

                    <div className="profile-group">
                        <label>Confirmar nueva contraseña</label>
                        <input
                            type="password"
                            name="passwordConfirmar"
                            placeholder="Confirme su nueva contraseña"
                            required
                        />
                    </div>

                    <div className="profile-actions">
                        <button type="button" className="profile-btn primary">
                            Cambiar contraseña
                        </button>
                    </div>

                </form>

            </section>

            {/* REGRESAR */}

            <div className="profile-footer">
                <a href="/" className="profile-btn back">
                    ← Ir al Inicio
                </a>
            </div>

        </div>
    );
}
