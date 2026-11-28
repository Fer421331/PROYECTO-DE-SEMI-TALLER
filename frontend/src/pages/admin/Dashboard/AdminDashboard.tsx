import "./AdminDashboard.css";

export default function AdminDashboard() {
    return (
        <div className="admin-dashboard">

            <h1>Dashboard Administrativo</h1>
            <section className="dashboard-stats">

                <div className="dashboard-stat-card">
                    <h3>Productos</h3>
                    <div>0</div>
                </div>

                <div className="dashboard-stat-card">
                    <h3>Categorías</h3>
                    <div>0</div>
                </div>

                <div className="dashboard-stat-card">
                    <h3>Usuarios</h3>
                    <div>0</div>
                </div>

                <div className="dashboard-stat-card">
                    <h3>Ventas</h3>
                    <div>0</div>
                </div>

            </section>

            <section>

                <h2>Últimos Productos Registrados</h2>

                <div className="dashboard-table-container">
                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan={4} className="dashboard-empty">
                                    No hay productos registrados.
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </section>

            <section>

                <h2>Últimas Ventas Registradas</h2>

                <div className="dashboard-table-container">
                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan={5} className="dashboard-empty">
                                    No hay ventas registradas.
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </section>

            <section>

                <h2>Productos con Stock Bajo</h2>

                <div className="dashboard-table-container">
                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Stock</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan={2} className="dashboard-empty">
                                    No hay productos con stock bajo.
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </section>

            <hr />

            <br/>

            <a href="/" className="dashboard-back">
                Regresar
            </a>

        </div>
    );
}
