import { useState } from "react";
import "./ProductList.css";

interface Product {
    id: number;
    sku: string;
    name: string;
    category: string;
    brand: string;
    presentation: string;
    cost: number;
    price: number;
    stock: number;
    web: "ACT" | "INA";
    status: "ACT" | "INA";
    image: string;
}

const initialProducts: Product[] = [
    {
        id: 1,
        sku: "LAC-001",
        name: "Leche Entera",
        category: "Leche",
        brand: "Sula",
        presentation: "1 Litro",
        cost: 28.00,
        price: 35.00,
        stock: 120,
        web: "ACT",
        status: "ACT",
        image: "🥛",
    },
    {
        id: 2,
        sku: "LAC-002",
        name: "Queso Fresco",
        category: "Quesos",
        brand: "Leyde",
        presentation: "500 g",
        cost: 75.00,
        price: 95.00,
        stock: 45,
        web: "ACT",
        status: "ACT",
        image: "🧀",
    },
    {
        id: 3,
        sku: "LAC-003",
        name: "Yogur Natural",
        category: "Yogures",
        brand: "Sula",
        presentation: "1 Litro",
        cost: 42.00,
        price: 55.00,
        stock: 60,
        web: "ACT",
        status: "ACT",
        image: "🥛",
    },
    {
        id: 4,
        sku: "LAC-004",
        name: "Mantequilla",
        category: "Mantequillas",
        brand: "Leyde",
        presentation: "250 g",
        cost: 48.00,
        price: 62.00,
        stock: 30,
        web: "INA",
        status: "ACT",
        image: "🧈",
    },
    {
        id: 5,
        sku: "LAC-005",
        name: "Crema de Leche",
        category: "Cremas",
        brand: "Sula",
        presentation: "500 ml",
        cost: 35.00,
        price: 48.00,
        stock: 0,
        web: "INA",
        status: "INA",
        image: "🥛",
    },
];

export default function ProductList() {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");

    // Búsqueda de productos
    const filteredProducts = products.filter((product) => {
        const searchText = search.toLowerCase().trim();

        return (
            product.name.toLowerCase().includes(searchText) ||
            product.sku.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.brand.toLowerCase().includes(searchText)
        );
    });

    // Nuevo producto
    const handleAdd = () => {
        alert("Aquí se abrirá el formulario de nuevo producto.");
    };

    // Ver producto
    const handleView = (product: Product) => {
        alert(
            `Producto: ${product.name}\n` +
            `SKU: ${product.sku}\n` +
            `Categoría: ${product.category}\n` +
            `Marca: ${product.brand}\n` +
            `Presentación: ${product.presentation}\n` +
            `Precio: L ${product.price.toFixed(2)}`
        );
    };

    // Editar producto
    const handleEdit = (product: Product) => {
        alert(`Aquí se abrirá la edición de: ${product.name}`);
    };

    // Desactivar producto
    const handleDeactivate = (product: Product) => {
        const confirmed = window.confirm(
            `¿Deseas desactivar el producto "${product.name}"?`
        );

        if (!confirmed) return;

        setProducts((previous) =>
            previous.map((item) =>
                item.id === product.id
                    ? { ...item, status: "INA", web: "INA" }
                    : item
            )
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
                                <th>Marca</th>
                                <th>Presentación</th>
                                <th>Costo</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Web</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredProducts.length > 0 ? (

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

                                        <td>{product.brand}</td>

                                        <td>
                                            <span className="producto-presentacion">
                                                {product.presentation}
                                            </span>
                                        </td>

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
                                    <td colSpan={13} className="productos-empty">
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

            <hr className="categories-divider" />

            <a href="/" className="categories-back-button">
                Regresar
            </a>

        </section>
    );
}
