import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import api from "../../services/api";
import "./ProductDetail.css";

interface Producto {
    producto_id: number;
    categoria_id: number;
    marca_id: number;
    producto_sku: string;
    producto_nombre: string;
    producto_slug: string;
    producto_descripcion: string | null;
    producto_costo: number | string;
    producto_precio: number | string;
    producto_stock: number;
    producto_activo: string;
    producto_estado: string;
}

type Accion = "nuevo" | "ver" | "editar" | "desactivar";

export default function ProductDetail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");
    const accion = (searchParams.get("accion") || "ver") as Accion;

    // Identificar la acción seleccionada
    const esNuevo = accion === "nuevo";
    const esLectura = accion === "ver";
    const esEditar = accion === "editar";
    const esDesactivar = accion === "desactivar";

    // Producto inicial vacío
    const productoInicial: Producto = {
        producto_id: 0,
        categoria_id: 0,
        marca_id: 0,
        producto_sku: "",
        producto_nombre: "",
        producto_slug: "",
        producto_descripcion: "",
        producto_costo: 0,
        producto_precio: 0,
        producto_stock: 0,
        producto_activo: "ACT",
        producto_estado: "ACT",
    };

    const [producto, setProducto] = useState<Producto | null>(
        esNuevo ? productoInicial : null
    );

    const [loading, setLoading] = useState(!esNuevo);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    // Obtener producto desde el backend
    useEffect(() => {
        const obtenerProducto = async () => {

            // Si es nuevo, no consultamos el backend
            if (esNuevo) {
                setProducto(productoInicial);
                setLoading(false);
                return;
            }

            if (!id || !/^[1-9]\d*$/.test(id)) {
                setError("El ID del producto no es válido.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await api.get("/productos/one", {
                    params: { id },
                });

                const data = response.data.success.data;

                setProducto(data);

            } catch (err: unknown) {
                console.error("Error al obtener producto:", err);

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data?.error?.message?.value ||
                        "No se pudo obtener el producto."
                    );
                } else {
                    setError("Ocurrió un error al obtener el producto.");
                }

            } finally {
                setLoading(false);
            }
        };

        obtenerProducto();
    }, [id, esNuevo]);

    // Actualizar campos
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (!producto) return;

        const { name, value } = e.target;

        setProducto((prev) =>
            prev ? { ...prev, [name]: value } : prev
        );
    };

    // Guardar cambios
    const handleGuardar = async () => {
        if (!producto || !id) return;

        try {
            setGuardando(true);
            setError("");

            await api.put(
                "/productos/update",
                {
                    categoria_id: Number(producto.categoria_id),
                    marca_id: Number(producto.marca_id),
                    producto_sku: producto.producto_sku,
                    producto_nombre: producto.producto_nombre,
                    producto_slug: producto.producto_slug,
                    producto_descripcion: producto.producto_descripcion,
                    producto_costo: Number(producto.producto_costo),
                    producto_precio: Number(producto.producto_precio),
                    producto_stock: Number(producto.producto_stock),
                    producto_activo: producto.producto_activo,
                    producto_estado: producto.producto_estado,
                },
                {
                    params: { id },
                }
            );

            alert("Producto actualizado correctamente.");

            navigate("/admin/productos");

        } catch (err: unknown) {
            console.error("Error al actualizar producto:", err);

            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.error?.message?.value ||
                    "No se pudo actualizar el producto."
                );
            } else {
                setError("Ocurrió un error al actualizar el producto.");
            }

        } finally {
            setGuardando(false);
        }
    };

    // Desactivar producto
    const handleDesactivar = async () => {
        if (!producto || !id) return;

        const confirmado = window.confirm(
            `¿Deseas desactivar el producto "${producto.producto_nombre}"?`
        );

        if (!confirmado) return;

        try {
            setGuardando(true);
            setError("");

            await api.put(
                "/productos/update",
                {
                    producto_estado: "INA",
                    producto_activo: "INA",
                },
                {
                    params: { id },
                }
            );

            alert("Producto desactivado correctamente.");

            navigate("/admin/productos");

        } catch (err: unknown) {
            console.error("Error al desactivar producto:", err);

            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.error?.message?.value ||
                    "No se pudo desactivar el producto."
                );
            } else {
                setError("Ocurrió un error al desactivar el producto.");
            }

        } finally {
            setGuardando(false);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <h1>Cargando producto...</h1>
            </div>
        );
    }

    if (error && !producto) {
        return (
            <div className="product-detail-page">
                <h1>Error</h1>
                <p>{error}</p>

                <button
                    type="button"
                    className="product-detail-back"
                    onClick={() => navigate("/admin/productos")}
                >
                    Regresar
                </button>
            </div>
        );
    }

    if (!producto) return null;

    const deshabilitado = esLectura || esDesactivar;

    return (
        <div className="product-detail-page">

            {/* Encabezado dinámico */}
            <h1>
                {esNuevo
                    ? "Nuevo Producto"
                    : esLectura
                        ? "Detalle del producto"
                        : esDesactivar
                            ? "Desactivar producto"
                            : "Editar producto"}
            </h1>

            <div className="product-detail-card">

                <form
                    className="product-detail-form"
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (esDesactivar) {
                            handleDesactivar();
                        } else if (esEditar) {
                            handleGuardar();
                        } else if (esNuevo) {
                            alert("Falta conectar el endpoint para registrar productos.");
                        }
                    }}
                >

                    {/* Mensajes de error */}
                    {error && (
                        <p className="product-detail-error">
                            {error}
                        </p>
                    )}

                    {/* INFORMACIÓN GENERAL */}
                    <h2 className="product-detail-section-title">
                        Información general
                    </h2>

                    <div className="product-detail-grid">

                        <div className="product-detail-group">
                            <label>ID del producto</label>

                            <input
                                type="text"
                                value={esNuevo ? "Se asignará automáticamente" : producto.producto_id}
                                readOnly
                            />
                        </div>

                        <div className="product-detail-group">
                            <label>SKU</label>

                            <input
                                type="text"
                                name="producto_sku"
                                value={producto.producto_sku}
                                maxLength={40}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                                required
                            />
                        </div>

                        <div className="product-detail-group product-detail-full">
                            <label>Nombre</label>

                            <input
                                type="text"
                                name="producto_nombre"
                                value={producto.producto_nombre}
                                maxLength={150}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                                required
                            />
                        </div>

                        <div className="product-detail-group">
                            <label>Categoría (ID)</label>

                            <input
                                type="number"
                                name="categoria_id"
                                min="1"
                                value={producto.categoria_id}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                                required
                            />
                        </div>

                        <div className="product-detail-group">
                            <label>Marca (ID)</label>

                            <input
                                type="number"
                                name="marca_id"
                                min="1"
                                value={producto.marca_id}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                                required
                            />
                        </div>

                        <div className="product-detail-group product-detail-full">
                            <label>Slug</label>

                            <input
                                type="text"
                                name="producto_slug"
                                value={producto.producto_slug}
                                maxLength={180}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                                required
                            />
                        </div>

                    </div>

                    {/* DESCRIPCIÓN */}
                    <h2 className="product-detail-section-title">
                        Descripción
                    </h2>

                    <div className="product-detail-grid">

                        <div className="product-detail-group product-detail-full">
                            <label>Descripción del producto</label>

                            <textarea
                                name="producto_descripcion"
                                rows={5}
                                value={producto.producto_descripcion || ""}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                            />
                        </div>

                    </div>

                    {/* INFORMACIÓN COMERCIAL */}
                    <h2 className="product-detail-section-title">
                        Información comercial
                    </h2>

                    <div className="product-detail-grid">

                        <div className="product-detail-group">
                            <label>Costo (L)</label>

                            <input
                                type="number"
                                name="producto_costo"
                                min="0"
                                step="0.01"
                                value={producto.producto_costo}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                                required
                            />
                        </div>

                        <div className="product-detail-group">
                            <label>Precio de venta (L)</label>

                            <input
                                type="number"
                                name="producto_precio"
                                min="0"
                                step="0.01"
                                value={producto.producto_precio}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                                required
                            />
                        </div>

                        <div className="product-detail-group">
                            <label>Stock</label>

                            <input
                                type="number"
                                name="producto_stock"
                                min="0"
                                step="1"
                                value={producto.producto_stock}
                                onChange={handleChange}
                                readOnly={deshabilitado}
                                required
                            />
                        </div>

                    </div>

                    {/* PUBLICACIÓN Y ESTADO */}
                    <h2 className="product-detail-section-title">
                        Publicación y estado
                    </h2>

                    <div className="product-detail-grid">

                        <div className="product-detail-group">
                            <label>Visible en el catálogo web</label>

                            <select
                                name="producto_activo"
                                value={producto.producto_activo.trim()}
                                onChange={handleChange}
                                disabled={deshabilitado}
                            >
                                <option value="ACT">Publicado</option>
                                <option value="INA">Oculto</option>
                            </select>
                        </div>

                        <div className="product-detail-group">
                            <label>Estado</label>

                            <select
                                name="producto_estado"
                                value={producto.producto_estado.trim()}
                                onChange={handleChange}
                                disabled={deshabilitado}
                            >
                                <option value="ACT">Activo</option>
                                <option value="INA">Inactivo</option>
                            </select>
                        </div>

                    </div>

                    {/* BOTONES */}
                    <div className="product-detail-buttons">

                        {!esLectura && (
                            <button
                                type="submit"
                                className="product-detail-submit"
                                disabled={guardando}
                            >
                                {guardando
                                    ? "Procesando..."
                                    : esNuevo
                                        ? "Registrar producto"
                                        : esDesactivar
                                            ? "Confirmar desactivación"
                                            : "Guardar cambios"}
                            </button>
                        )}

                        <button
                            type="button"
                            className="product-detail-back"
                            onClick={() => navigate("/admin/productos")}
                            disabled={guardando}
                        >
                            Regresar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};