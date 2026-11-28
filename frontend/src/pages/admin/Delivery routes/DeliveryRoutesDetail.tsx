
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";

import {
  actualizarRutaEntrega,
  crearRutaEntrega,
  obtenerRutaEntrega,
  type RutaEntrega
} from "../../../services/admin.service";

import "./DeliveryRoutesDetail.css";

export default function DeliveryRoutesDetail() {
  const { id } = useParams<{ id: string }>();

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const soloLectura = params.get("modo") === "ver";
  const esNueva = !id;

  const [ruta, setRuta] = useState<Partial<RutaEntrega>>({
    origen: "",
    destino: "",
    distancia_km: "",
    duracion_min: 0,
    estado: "ACT"
  });

  const [cargando, setCargando] = useState(!esNueva);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Cargar información de la ruta
  useEffect(() => {
    if (!id) return;

    const idNumerico = Number(id);

    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
      setError("El identificador de la ruta no es válido.");
      setCargando(false);
      return;
    }

    let activo = true;

    const cargarRuta = async () => {
      setCargando(true);
      setError("");

      try {
        const resultado = await obtenerRutaEntrega(idNumerico);

        if (activo) {
          setRuta(resultado);
        }
      } catch (e) {
        if (activo) {
          setError(
            e instanceof Error
              ? e.message
              : "No se pudo cargar la ruta."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    void cargarRuta();

    return () => {
      activo = false;
    };
  }, [id]);

  // Controlar cambios en los campos
  const cambiar = (
    campo: keyof RutaEntrega,
    valor: string | number
  ) => {
    setRuta(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // Guardar ruta
  const guardar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (soloLectura || guardando) return;

    setError("");

    const distancia = Number(ruta.distancia_km);
    const duracion = Number(ruta.duracion_min);

    if (
      !ruta.origen?.trim() ||
      !ruta.destino?.trim() ||
      !Number.isFinite(distancia) ||
      distancia < 0 ||
      !Number.isInteger(duracion) ||
      duracion < 1
    ) {
      setError(
        "Completa origen, destino, distancia y duración con valores válidos."
      );
      return;
    }

    setGuardando(true);

    try {
      const datos = {
        origen: ruta.origen.trim(),
        destino: ruta.destino.trim(),
        distancia_km: distancia,
        duracion_min: duracion,
        estado: ruta.estado ?? "ACT"
      };

      if (esNueva) {
        await crearRutaEntrega(datos);
      } else {
        await actualizarRutaEntrega(Number(id), datos);
      }

      navigate("/admin/delivery-routes");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "No se pudo guardar la ruta."
      );
    } finally {
      setGuardando(false);
    }
  };

  // Estado de carga
  if (cargando) {
    return (
      <div className="delivery-detail-page">
        <p>Cargando ruta…</p>
      </div>
    );
  }

  return (
    <div className="delivery-detail-page">

      <div className="delivery-detail-header">
        <h1>
          {esNueva
            ? "Nueva Ruta de Entrega"
            : soloLectura
              ? "Detalle de la Ruta de Entrega"
              : "Editar Ruta de Entrega"}
        </h1>

        <p>
          Consulta y administra la información de los recorridos
          utilizados para la distribución de productos lácteos.
        </p>
      </div>

      <div className="delivery-detail-card">

        <form
          className="delivery-detail-form"
          onSubmit={guardar}
        >

          <h2 className="delivery-detail-section-title">
            Información de la ruta
          </h2>

          <div className="delivery-detail-grid">

            {/* ID */}
            <div className="delivery-detail-group">
              <label htmlFor="idRuta">
                ID de la ruta
              </label>

              <input
                id="idRuta"
                type="text"
                value={ruta.id_ruta ?? "Se asignará automáticamente"}
                readOnly
              />
            </div>

            {/* Estado */}
            <div className="delivery-detail-group">
              <label htmlFor="estadoRuta">
                Estado
              </label>

              <select
                id="estadoRuta"
                value={ruta.estado ?? "ACT"}
                disabled={soloLectura}
                onChange={e =>
                  cambiar("estado", e.target.value)
                }
              >
                <option value="ACT">Activo</option>
                <option value="INA">Inactivo</option>
              </select>
            </div>

            {/* Origen */}
            <div className="delivery-detail-group">
              <label htmlFor="origen">
                Origen
              </label>

              <input
                id="origen"
                type="text"
                value={ruta.origen ?? ""}
                readOnly={soloLectura}
                onChange={e =>
                  cambiar("origen", e.target.value)
                }
                placeholder="Ingrese el lugar de origen"
                maxLength={100}
                required
              />
            </div>

            {/* Destino */}
            <div className="delivery-detail-group">
              <label htmlFor="destino">
                Destino
              </label>

              <input
                id="destino"
                type="text"
                value={ruta.destino ?? ""}
                readOnly={soloLectura}
                onChange={e =>
                  cambiar("destino", e.target.value)
                }
                placeholder="Ingrese el lugar de destino"
                maxLength={100}
                required
              />
            </div>

          </div>

          <h2 className="delivery-detail-section-title">
            Información del recorrido
          </h2>

          <div className="delivery-detail-grid">

            {/* Distancia */}
            <div className="delivery-detail-group">
              <label htmlFor="distancia">
                Distancia (Km)
              </label>

              <input
                id="distancia"
                type="number"
                min="0"
                step="0.01"
                value={ruta.distancia_km ?? ""}
                readOnly={soloLectura}
                onChange={e =>
                  cambiar("distancia_km", e.target.value)
                }
                placeholder="Ej. 85.50"
                required
              />
            </div>

            {/* Duración */}
            <div className="delivery-detail-group">
              <label htmlFor="duracion">
                Duración estimada (Min)
              </label>

              <input
                id="duracion"
                type="number"
                min="1"
                step="1"
                value={ruta.duracion_min ?? ""}
                readOnly={soloLectura}
                onChange={e =>
                  cambiar("duracion_min", Number(e.target.value))
                }
                placeholder="Ej. 90"
                required
              />
            </div>

          </div>

          <div className="delivery-detail-notice">
            <p>
              La información de esta ruta permitirá organizar
              las entregas de productos lácteos y estimar los
              tiempos de distribución.
            </p>
          </div>

          {/* Errores */}
          {error && (
            <p role="alert" className="delivery-error">
              {error}
            </p>
          )}

          {/* Botones */}
          <div className="delivery-detail-buttons">

            {!soloLectura && (
              <button
                type="submit"
                className="delivery-detail-submit"
                disabled={guardando}
              >
                {guardando
                  ? "Guardando…"
                  : esNueva
                    ? "Registrar Ruta"
                    : "Guardar Cambios"}
              </button>
            )}

            <button
              type="button"
              className="delivery-detail-back"
              onClick={() =>
                navigate("/admin/delivery-routes")
              }
            >
              Regresar
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
