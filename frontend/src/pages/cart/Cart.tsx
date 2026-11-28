import { useEffect, useMemo, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carrito,
  CarritoDetalle,
  DireccionUsuario,
  MetodoPago,
  checkoutCarrito,
  deleteDetalle,
  getCarritoActivoPorUsuario,
  getDetallesPorCarrito,
  getDireccionesPorUsuario,
  getMetodosPago,
  updateCantidadDetalle,
} from "./carrito.service";
import "./Cart.css";
import useAuth from "../../hooks/useAuth";

export default function CartCheckout() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const usercod = Number(user?.id ?? 0);

  const [carrito, setCarrito] = useState<Carrito | null>(null);
  const [detalles, setDetalles] = useState<CarritoDetalle[]>([]);
  const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([]);
  const [direcciones, setDirecciones] = useState<DireccionUsuario[]>([]);

  const [metodoPagoId, setMetodoPagoId] = useState<number | "">("");
  const [direccionId, setDireccionId] = useState<number | "">("");
  const [observaciones, setObservaciones] = useState("");

  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const numero = (v: string | number): number => Number(v) || 0;

  const total = useMemo(
    () => detalles.reduce((acc, d) => acc + numero(d.subtotal), 0),
    [detalles],
  );

  const cargar = async () => {
    if (!isAuthenticated || !usercod) {
      setLoading(false);
      setError("Debes iniciar sesión para ver tu carrito.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1) Carrito activo
      const c = await getCarritoActivoPorUsuario(usercod);
      setCarrito(c);
      if (c) {
        const ds = await getDetallesPorCarrito(c.carrito_id);
        setDetalles(ds);
      } else {
        setDetalles([]);
      }

      // 2) Métodos de pago
      const mps = await getMetodosPago();
      setMetodosPago(mps);
      if (mps.length > 0) {
        setMetodoPagoId((prev) => (prev === "" ? mps[0].metodo_pago_id : prev));
      }

      // 3) Direcciones reales del usuario
      const dirs = await getDireccionesPorUsuario(usercod);
      setDirecciones(dirs);
      if (dirs.length > 0) {
        setDireccionId((prev) => {
          if (prev !== "") return prev;
          const predeterminada = dirs.find((d) => d.direccion_predeterminada);
          return predeterminada
            ? predeterminada.direccion_id
            : dirs[0].direccion_id;
        });
      } else {
        setDireccionId("");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error al cargar el carrito",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usercod, isAuthenticated]);

  const handleCantidad = async (detalle: CarritoDetalle, nueva: number) => {
    if (!Number.isInteger(nueva) || nueva < 1) {
      setError("La cantidad debe ser un entero mayor o igual a 1.");
      return;
    }
    setError("");
    setSuccess("");
    setGuardando(true);
    try {
      const actualizado = await updateCantidadDetalle(
        detalle.detalle_id,
        nueva,
      );
      setDetalles((prev) =>
        prev.map((d) =>
          d.detalle_id === actualizado.detalle_id
            ? { ...d, ...actualizado }
            : d,
        ),
      );
      setSuccess("Cantidad actualizada correctamente.");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar la cantidad",
      );
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (detalle_id: number) => {
    if (!window.confirm("¿Eliminar este producto del carrito?")) return;
    setError("");
    setSuccess("");
    setGuardando(true);
    try {
      await deleteDetalle(detalle_id);
      setDetalles((prev) => prev.filter((d) => d.detalle_id !== detalle_id));
      setSuccess("Producto eliminado del carrito.");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error al eliminar el producto",
      );
    } finally {
      setGuardando(false);
    }
  };

  const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isAuthenticated || !usercod) {
      setError("Debes iniciar sesión para finalizar la compra.");
      return;
    }
    if (!carrito) {
      setError("No tienes un carrito activo.");
      return;
    }
    if (detalles.length === 0) {
      setError("El carrito está vacío.");
      return;
    }
    if (!direccionId) {
      setError(
        direcciones.length === 0
          ? "No tienes direcciones registradas. Agrega una para continuar."
          : "Selecciona una dirección de envío.",
      );
      return;
    }
    if (!metodoPagoId) {
      setError("Selecciona un método de pago.");
      return;
    }

    setGuardando(true);
    try {
      const { correoEnviado } = await checkoutCarrito({
        usercod,
        direccion_id: Number(direccionId),
        metodo_pago_id: Number(metodoPagoId),
        venta_observaciones: observaciones.trim() || undefined,
      });
      setSuccess(
        correoEnviado
          ? "Compra realizada correctamente. Se envió el comprobante por correo."
          : "Compra realizada correctamente.",
      );
      setObservaciones("");
      await cargar();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error al procesar la compra",
      );
    } finally {
      setGuardando(false);
    }
  };

  // ------------------ RENDER ------------------

  if (!isAuthenticated) {
    return (
      <div className="categories-page">
        <main className="categories-main">
          <div className="categories-container">
            <div className="categories-title">
              <h2>Carrito y Checkout</h2>
              <p>
                Inicia sesión para revisar tu carrito y finalizar tu compra.
              </p>
            </div>
            <div className="categories-card">
              <p className="empty-state">
                Necesitas iniciar sesión para acceder a tu carrito.
              </p>
              <div className="form-buttons">
                <button
                  type="button"
                  className="category-button"
                  onClick={() => navigate("/login")}
                >
                  IR AL LOGIN
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="categories-page">
      <main className="categories-main">
        <div className="categories-container">
          <div className="categories-title">
            <h2>Carrito y Checkout</h2>
            <p>Revisa tu carrito, ajusta cantidades y finaliza tu compra.</p>
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

          <div className="categories-layout">
            {/* CHECKOUT */}
            <section className="categories-card">
              <div className="card-title">
                <h3>Finalizar compra</h3>
                <p>Elige tu dirección, método de pago y confirma el pedido.</p>
              </div>

              <form onSubmit={handleCheckout} className="category-form">
                <div className="form-group">
                  <label htmlFor="direccion_id">Dirección de envío *</label>
                  <select
                    id="direccion_id"
                    value={direccionId}
                    onChange={(e) =>
                      setDireccionId(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    disabled={
                      guardando || loading || !carrito || detalles.length === 0
                    }
                  >
                    <option value="">Seleccione una dirección</option>
                    {direcciones.map((d) => (
                      <option key={d.direccion_id} value={d.direccion_id}>
                        {d.direccion_alias} — {d.direccion_ciudad}
                        {d.direccion_predeterminada ? " (Predeterminada)" : ""}
                      </option>
                    ))}
                  </select>
                  {!loading && direcciones.length === 0 && (
                    <span className="char-count" style={{ color: "#b71c1c" }}>
                      No tienes direcciones registradas.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="metodo_pago">Método de pago *</label>
                  <select
                    id="metodo_pago"
                    value={metodoPagoId}
                    onChange={(e) => setMetodoPagoId(Number(e.target.value))}
                    disabled={
                      guardando || loading || !carrito || detalles.length === 0
                    }
                  >
                    <option value="">Seleccione un método</option>
                    {metodosPago.map((m) => (
                      <option key={m.metodo_pago_id} value={m.metodo_pago_id}>
                        {m.metodo_nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="observaciones">Observaciones</label>
                  <textarea
                    id="observaciones"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Instrucciones especiales (opcional)..."
                    maxLength={500}
                    rows={3}
                    disabled={guardando}
                  />
                  <span className="char-count">{observaciones.length}/500</span>
                </div>

                <div className="form-group">
                  <label>Total</label>
                  <input
                    type="text"
                    readOnly
                    value={`L ${total.toFixed(2)}`}
                    aria-live="polite"
                  />
                </div>

                <div className="form-buttons">
                  <button
                    type="submit"
                    className="category-button"
                    disabled={
                      guardando ||
                      loading ||
                      !carrito ||
                      detalles.length === 0 ||
                      !direccionId ||
                      !metodoPagoId
                    }
                  >
                    {guardando ? "PROCESANDO..." : "REALIZAR CHECKOUT"}
                  </button>
                </div>
              </form>
            </section>

            {/* DETALLES */}
            <section className="categories-card table-card">
              <div className="card-title">
                <h3>Productos en el carrito</h3>
                <p>Ajusta cantidades o elimina productos antes de pagar.</p>
              </div>

              {loading ? (
                <p className="empty-state">Cargando carrito...</p>
              ) : !carrito ? (
                <p className="empty-state">No tienes un carrito activo.</p>
              ) : detalles.length === 0 ? (
                <p className="empty-state">Tu carrito está vacío.</p>
              ) : (
                <div className="table-responsive">
                  <table className="categories-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detalles.map((d) => (
                        <tr key={d.detalle_id}>
                          <td className="cell-name">
                            {d.producto?.producto_nombre ??
                              `Producto #${d.producto_id}`}
                            {d.producto?.producto_sku && (
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "var(--axume-muted)",
                                  fontWeight: 500,
                                }}
                              >
                                SKU: {d.producto.producto_sku}
                              </div>
                            )}
                          </td>
                          <td>L {numero(d.precio_unitario).toFixed(2)}</td>
                          <td>
                            <input
                              type="number"
                              min={1}
                              step={1}
                              value={d.cantidad}
                              disabled={guardando}
                              onChange={(e) =>
                                handleCantidad(d, Number(e.target.value))
                              }
                              style={{
                                width: 80,
                                padding: "6px 10px",
                                borderRadius: 8,
                                border: "1px solid var(--axume-border)",
                              }}
                              aria-label={`Cantidad de ${d.producto?.producto_nombre ?? d.producto_id}`}
                            />
                          </td>
                          <td>L {numero(d.subtotal).toFixed(2)}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                type="button"
                                onClick={() => handleEliminar(d.detalle_id)}
                                className="btn-delete"
                                disabled={guardando}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
