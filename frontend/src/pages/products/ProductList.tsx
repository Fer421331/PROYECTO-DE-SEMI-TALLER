
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";
import {
    obtenerProductos,
    type ProductoBackend,
} from "../../services/products.service";

interface Product {
    id: number;
    sku: string;
    name: string;
    category: string;
    cost: number;
    price: number;
    stock: number;
    web: "ACT" | "INA";
    status: "ACT" | "INA";
    image: string;
}

export default function ProductList() {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Obtener productos desde el backend
    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setLoading(true);
                setError("");

                const data: ProductoBackend[] = await obtenerProductos();

                const productosAdaptados: Product[] = data.map((producto) => ({
                    id: producto.producto_id,
                    sku: producto.producto_sku,
                    name: producto.producto_nombre,
                    category: `Categoría ${producto.categoria_id}`,
                    cost: Number(producto.producto_costo),
                    price: Number(producto.producto_precio),
                    stock: producto.producto_stock,
                    web: producto.producto_activo.trim() === "ACT" ? "ACT" : "INA",
                    status: producto.producto_estado.trim() === "ACT" ? "ACT" : "INA",
                    image: "🥛",
                }));

                setProducts(productosAdaptados);

            } catch (err: unknown) {
                console.error("Error al cargar productos:", err);

                if (axios.isAxiosError(err)) {
                    if (
                        err.response?.status === 401 ||
                        err.response?.status === 403
                    ) {
                        setError(
                            "Tu sesión no es válida o no tienes autorización."
                        );
                    } else {
                        setError(
                            err.response?.data?.error?.message?.value ||
                            "No se pudieron cargar los productos."
                        );
                    }
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error inesperado.");
                }

            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, []);

    // Búsqueda de productos
    const filteredProducts = products.filter((product) => {
        const searchText = search.toLowerCase().trim();

        return (
            product.name.toLowerCase().includes(searchText) ||
            product.sku.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText)
        );
    });

    // Nuevo producto
    const handleAdd = () => {
        navigate("/admin/productos/detalle?accion=nuevo");
    };

    // Ver producto
    const handleView = (product: Product) => {
        navigate(
            `/admin/productos/detalle?id=${product.id}&accion=ver`
        );
    };

    // Editar producto
    const handleEdit = (product: Product) => {
        navigate(
            `/admin/productos/detalle?id=${product.id}&accion=editar`
        );
    };

    // Desactivar producto
    const handleDeactivate = (product: Product) => {
        navigate(
            `/admin/productos/detalle?id=${product.id}&accion=desactivar`
        );
    };

    return (
        <section className="productos-admin">

            {/* Encabezado */}
            <div className="productos-header">

                <div>
                    <span className="productos-subtitle">
                        AXUME ADMIN PANEL
                    </span>

                    <h1>Administración de Productos</h1>

                    <p>
                        Gestiona el catálogo, inventario, precios y
                        disponibilidad de los productos lácteos.
                    </p>
                </div>

                <button
                    type="button"
                    className="productos-btn-nuevo"
                    onClick={handleAdd}
                >
                    <span className="producto-btn-icon">+</span>
                    Nuevo Producto
                </button>

            </div>

            {/* Panel de productos */}
            <div className="productos-panel">

                <div className="productos-panel-header">

                    <div>
                        <h2>Catálogo de productos</h2>
                        <span>Productos registrados en el sistema</span>
                    </div>

                    {/* Buscador */}
                    <div className="productos-search">

                        <span>⌕</span>

                        <input
                            type="text"
                            id="buscarProducto"
                            placeholder="Buscar producto..."
                            autoComplete="off"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </div>

                {/* Tabla */}
                <div className="table-responsive">

                    <table className="productos-table" id="tablaProductos">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imagen</th>
                                <th>SKU</th>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Costo</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Web</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td colSpan={11} className="productos-empty">
                                        Cargando productos...
                                    </td>
                                </tr>

                            ) : error ? (

                                <tr>
                                    <td colSpan={11} className="productos-empty">
                                        {error}
                                    </td>
                                </tr>

                            ) : filteredProducts.length > 0 ? (

                                filteredProducts.map((product) => (

                                    <tr key={product.id}>

                                        <td>
                                            <span className="producto-id">
                                                #{product.id}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="producto-avatar">
                                                {product.image}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="producto-sku">
                                                {product.sku}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="producto-nombre">
                                                <div>
                                                    <strong>{product.name}</strong>
                                                    <small>Producto lácteo</small>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{product.category}</td>

                                        <td>
                                            <span className="producto-costo">
                                                L {product.cost.toFixed(2)}
                                            </span>
                                        </td>

                                        <td>
                                            <strong className="producto-precio">
                                                L {product.price.toFixed(2)}
                                            </strong>
                                        </td>

                                        <td>
                                            <span className="producto-stock">
                                                {product.stock} unidades
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`producto-estado ${product.web === "ACT"
                                                        ? "producto-estado-web"
                                                        : "producto-estado-oculto"
                                                    }`}
                                            >
                                                {product.web === "ACT"
                                                    ? "Publicado"
                                                    : "Oculto"}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`producto-estado ${product.status === "ACT"
                                                        ? ""
                                                        : "producto-estado-inactivo"
                                                    }`}
                                            >
                                                {product.status === "ACT"
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="producto-acciones">

                                                <button
                                                    type="button"
                                                    className="producto-btn-accion producto-btn-ver"
                                                    onClick={() => handleView(product)}
                                                >
                                                    Ver
                                                </button>

                                                <button
                                                    type="button"
                                                    className="producto-btn-accion producto-btn-editar"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    Editar
                                                </button>

                                                {product.status === "ACT" && (
                                                    <button
                                                        type="button"
                                                        className="producto-btn-accion producto-btn-desactivar"
                                                        onClick={() => handleDeactivate(product)}
                                                    >
                                                        Desactivar
                                                    </button>
                                                )}

                                            </div>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan={11} className="productos-empty">
                                        No se encontraron productos.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Pie del panel */}
                <div className="productos-footer">

                    <span>
                        Mostrando {filteredProducts.length} de {products.length} productos
                    </span>

                </div>

            </div>

            <br />

            <hr className="categories-divider" />

            <br />

            <a href="/" className="productos-back">
                Regresar
            </a>

        </section>
    );
}
