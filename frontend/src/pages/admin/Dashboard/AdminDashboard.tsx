
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  obtenerCategoriasAdmin,
  obtenerProductosAdmin,
  obtenerUsuariosAdmin,
  obtenerVentasAdmin,
  type ProductoAdmin,
  type VentaAdmin
} from "../../../services/admin.service";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [productos, setProductos] = useState<ProductoAdmin[]>([]);
  const [ventas, setVentas] = useState<VentaAdmin[]>([]);
  const [categorias, setCategorias] = useState(0);
  const [usuarios, setUsuarios] = useState(0);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    Promise.all([
      obtenerProductosAdmin(),
      obtenerCategoriasAdmin(),
      obtenerUsuariosAdmin(),
      obtenerVentasAdmin()
    ])
      .then(([p, c, u, v]) => {
        if (!activo) return;
        setProductos(p);
        setCategorias(c.length);
        setUsuarios(u.length);
        setVentas(v);
      })
      .catch((e: unknown) => {
        if (activo) {
          setError(e instanceof Error ? e.message : "No fue posible cargar el dashboard.");
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const ultimasVentas = useMemo(
    () => [...ventas].sort((a, b) => new Date(b.venta_fecha).getTime() - new Date(a.venta_fecha).getTime()).slice(0, 5),
    [ventas]
  );

  const ultimosProductos = useMemo(
    () => [...productos].slice(-5).reverse(),
    [productos]
  );

  const stockBajo = useMemo(
    () => productos.filter(p => Number(p.producto_stock) <= 5),
    [productos]
  );

  const fecha = (v: string) =>
    v ? new Intl.DateTimeFormat("es-HN").format(new Date(v)) : "—";

  const estado = (v: string) =>
    ({ PEN: "Pendiente", PAG: "Pagada", CAN: "Cancelada", ENT: "Entregada" }[v?.trim()] ?? v ?? "—");

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Administrativo</h1>

      {error && <p role="alert">{error}</p>}

      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <h3>Productos</h3>
          <div>{cargando ? "…" : productos.length}</div>
        </div>
        <div className="dashboard-stat-card">
          <h3>Categorías</h3>
          <div>{cargando ? "…" : categorias}</div>
        </div>
        <div className="dashboard-stat-card">
          <h3>Usuarios</h3>
          <div>{cargando ? "…" : usuarios}</div>
        </div>
        <div className="dashboard-stat-card">
          <h3>Ventas</h3>
          <div>{cargando ? "…" : ventas.length}</div>
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
              {ultimosProductos.length ? (
                ultimosProductos.map(p => (
                  <tr key={p.producto_id}>
                    <td>{p.producto_nombre}</td>
                    <td>{p.categoria_id ?? "—"}</td>
                    <td>L {Number(p.producto_precio).toFixed(2)}</td>
                    <td>{p.producto_stock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="dashboard-empty">
                    {cargando ? "Cargando…" : "No hay productos registrados."}
                  </td>
                </tr>
              )}
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
              {ultimasVentas.length ? (
                ultimasVentas.map(v => (
                  <tr key={v.venta_id}>
                    <td>#{v.venta_id}</td>
                    <td>{v.usercod}</td>
                    <td>{fecha(v.venta_fecha)}</td>
                    <td>L {Number(v.venta_total).toFixed(2)}</td>
                    <td>{estado(v.venta_estado)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="dashboard-empty">
                    {cargando ? "Cargando…" : "No hay ventas registradas."}
                  </td>
                </tr>
              )}
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
              {stockBajo.length ? (
                stockBajo.map(p => (
                  <tr key={p.producto_id}>
                    <td>{p.producto_nombre}</td>
                    <td>{p.producto_stock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="dashboard-empty">
                    {cargando ? "Cargando…" : "No hay productos con stock bajo."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <hr />
      <br />
      <Link to="/admin/panel" className="dashboard-back">Regresar</Link>
    </div>
  );
}
