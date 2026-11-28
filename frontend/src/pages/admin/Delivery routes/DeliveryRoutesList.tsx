
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  eliminarRutaEntrega,
  obtenerRutasEntrega,
  type RutaEntrega
} from "../../../services/admin.service";
import "./DeliveryRoutesList.css";

export default function DeliveryRoutesList() {
  const navigate = useNavigate();

  const [rutas, setRutas] = useState<RutaEntrega[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  // Obtener rutas de entrega
  const cargar = async () => {
    setCargando(true);
    setError("");

    try {
      const resultado = await obtenerRutasEntrega();
      setRutas(resultado);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "No se pudieron cargar las rutas."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargar();
  }, []);

  // Filtrar rutas
  const filtradas = useMemo(() => {
    return rutas.filter((r) => {
      const texto = `${r.id_ruta} ${r.origen} ${r.destino}`
        .toLowerCase();

      const coincideBusqueda = texto.includes(
        busqueda.trim().toLowerCase()
      );

      const coincideEstado =
        !estado || r.estado.trim() === estado;

      return coincideBusqueda && coincideEstado;
    });
  }, [rutas, busqueda, estado]);

  // Eliminar ruta
  const eliminar = async (id: number) => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar la ruta ${id}?`
    );

    if (!confirmar) return;

    setError("");

    try {
      await eliminarRutaEntrega(id);
      await cargar();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "No se pudo eliminar la ruta."
      );
    }
  };

  return (
    <div className="delivery-routes-page">

      <div className="delivery-routes-header">
        <h1>Rutas de Entrega</h1>
        <p>
          Administra los recorridos y destinos utilizados
          para la distribución de productos lácteos.
        </p>
      </div>

      <div className="delivery-routes-card">

        {/* Filtros */}
        <div className="delivery-routes-filters">

          <div className="delivery-filter-group">
            <label htmlFor="buscarRuta">
              Buscar ruta
            </label>

            <input
              type="text"
              id="buscarRuta"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por ID, origen o destino..."
            />
          </div>

          <div className="delivery-filter-group">
            <label htmlFor="estadoRuta">
              Estado
            </label>

            <select
              id="estadoRuta"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="ACT">Activo</option>
              <option value="INA">Inactivo</option>
            </select>
          </div>

          <button
            type="button"
            className="delivery-filter-button"
            onClick={() => void cargar()}
            disabled={cargando}
          >
            Filtrar
          </button>

        </div>

        {/* Acciones */}
        <div className="delivery-routes-actions">
          <button
            type="button"
            className="delivery-add-button"
            onClick={() =>
              navigate("/admin/delivery-routes/new")
            }
          >
            + Nueva Ruta
          </button>
        </div>

        {/* Errores */}
        {error && (
          <p role="alert" className="delivery-error">
            {error}
          </p>
        )}

        {/* Tabla */}
        <div className="delivery-routes-table-wrapper">

          <table className="delivery-routes-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Distancia (Km)</th>
                <th>Duración (Min)</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {cargando ? (
                <tr>
                  <td colSpan={7}>
                    Cargando rutas…
                  </td>
                </tr>
              ) : filtradas.length > 0 ? (

                filtradas.map((r) => (
                  <tr key={r.id_ruta}>

                    <td>{r.id_ruta}</td>

                    <td>{r.origen}</td>

                    <td>{r.destino}</td>

                    <td>
                      {Number(r.distancia_km).toFixed(2)} km
                    </td>

                    <td>
                      {r.duracion_min} min
                    </td>

                    <td>
                      <span
                        className={`delivery-status ${r.estado.trim() === "ACT"
                            ? "delivery-status-active"
                            : "delivery-status-inactive"
                          }`}
                      >
                        {r.estado.trim() === "ACT"
                          ? "Activo"
                          : "Inactivo"}
                      </span>
                    </td>

                    <td>
                      <div className="delivery-row-actions">

                        {/* Ver */}
                        <button
                          type="button"
                          className="delivery-view-button"
                          onClick={() =>
                            navigate(
                              `/admin/delivery-routes/${r.id_ruta}?modo=ver`
                            )
                          }
                        >
                          Ver
                        </button>

                        {/* Editar */}
                        <button
                          type="button"
                          className="delivery-edit-button"
                          onClick={() =>
                            navigate(
                              `/admin/delivery-routes/${r.id_ruta}`
                            )
                          }
                        >
                          Editar
                        </button>

                        {/* Eliminar */}
                        <button
                          type="button"
                          className="delivery-delete-button"
                          onClick={() =>
                            void eliminar(r.id_ruta)
                          }
                        >
                          Eliminar
                        </button>

                      </div>
                    </td>

                  </tr>
                ))

              ) : (

                <tr>
                  <td colSpan={7}>
                    No hay rutas registradas.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Regresar */}
        <div className="delivery-routes-footer">
          <button
            type="button"
            className="delivery-back-button"
            onClick={() => navigate("/admin/panel")}
          >
            Regresar
          </button>
        </div>

      </div>
    </div>
  );
}
