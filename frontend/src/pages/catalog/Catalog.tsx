import { useEffect, useState } from "react";
import "./Catalog.css";

import {
    getProductosCatalogo,
    getCategoriasCatalogo,
    getImagenesCatalogo,
    type CatalogProducto,
    type CatalogCategoria,
    type CatalogProductoImagen
} from "../../services/catalog.service";

interface ProductoCatalogo {
    id: number;
    sku: string;
    nombre: string;
    categoriaId: number;
    categoria: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
}

export default function Catalog() {

    const [productos, setProductos] = useState<ProductoCatalogo[]>([]);
    const [categorias, setCategorias] = useState<CatalogCategoria[]>([]);

    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("0");
    const [orden, setOrden] = useState("recientes");

    const [favoritos, setFavoritos] = useState<number[]>([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarCatalogo();
    }, []);

    // Cargar productos, categorías e imágenes
    const cargarCatalogo = async () => {

        try {

            setCargando(true);
            setError("");

            // Obtener productos
            console.log("Consultando productos...");

            const productosData: CatalogProducto[] =
                await getProductosCatalogo();

            console.log("PRODUCTOS:", productosData);

            if (!Array.isArray(productosData)) {
                throw new Error("La respuesta de productos no es un arreglo.");
            }

            // Obtener categorías
            let categoriasData: CatalogCategoria[] = [];

            try {

                categoriasData = await getCategoriasCatalogo();

                console.log("CATEGORÍAS:", categoriasData);

                if (!Array.isArray(categoriasData)) {
                    categoriasData = [];
                }

            } catch (error) {

                console.error("Error al consultar categorías:", error);

            }

            // Obtener imágenes
            let imagenesData: CatalogProductoImagen[] = [];

            try {

                imagenesData = await getImagenesCatalogo();

                console.log("IMÁGENES:", imagenesData);

                if (!Array.isArray(imagenesData)) {
                    imagenesData = [];
                }

            } catch (error) {

                console.error("Error al consultar imágenes:", error);

            }

            // Relacionar todos los productos con categorías e imágenes
            const productosCompletos: ProductoCatalogo[] =
                productosData.map((producto) => {

                    // Buscar categoría
                    const categoria = categoriasData.find(
                        (item) =>
                            Number(item.categoria_id) ===
                            Number(producto.categoria_id)
                    );

                    // Buscar imágenes del producto
                    const imagenesProducto = imagenesData
                        .filter(
                            (imagen) =>
                                Number(imagen.producto_id) ===
                                Number(producto.producto_id) &&
                                imagen.imagen_estado?.trim() === "ACT"
                        )
                        .sort((a, b) => {

                            if (
                                a.imagen_principal === b.imagen_principal
                            ) {
                                return a.imagen_orden - b.imagen_orden;
                            }

                            return a.imagen_principal ? -1 : 1;

                        });

                    return {
                        id: producto.producto_id,
                        sku: producto.producto_sku,
                        nombre: producto.producto_nombre,
                        categoriaId: producto.categoria_id,

                        categoria:
                            categoria?.categoria_nombre ??
                            "Sin categoría",

                        descripcion:
                            producto.producto_descripcion ?? "",

                        precio: Number(producto.producto_precio),
                        stock: Number(producto.producto_stock),

                        imagen:
                            imagenesProducto[0]?.imagen_ruta ?? ""
                    };

                });

            const categoriasUnicas = categoriasData.filter(
                (categoria, index, arreglo) =>
                    index === arreglo.findIndex(
                        (item) =>
                            item.categoria_id === categoria.categoria_id ||
                            item.categoria_nombre.trim().toLowerCase() ===
                            categoria.categoria_nombre.trim().toLowerCase()
                    )
            );

            setCategorias(categoriasUnicas);
            setProductos(productosCompletos);

            console.log(
                "TOTAL DE PRODUCTOS CARGADOS:",
                productosCompletos.length
            );

            console.log("PRODUCTOS DEL CATÁLOGO:", productosCompletos);

        } catch (error: any) {

            console.error("ERROR AL CARGAR CATÁLOGO:", error);
            console.error("URL:", error.config?.url);
            console.error("ESTADO HTTP:", error.response?.status);
            console.error("RESPUESTA:", error.response?.data);

            setError(
                error.response?.data?.message?.value ||
                error.response?.data?.message ||
                error.message ||
                "No se pudieron cargar los productos."
            );

        } finally {

            setCargando(false);

        }

    };

    // Buscar y filtrar productos
    const productosFiltrados = productos
        .filter((producto) => {

            const texto = busqueda.toLowerCase().trim();

            const coincideBusqueda =
                producto.nombre.toLowerCase().includes(texto) ||
                producto.sku.toLowerCase().includes(texto) ||
                producto.categoria.toLowerCase().includes(texto);

            const coincideCategoria =
                categoriaSeleccionada === "0" ||
                producto.categoriaId.toString() === categoriaSeleccionada;

            return coincideBusqueda && coincideCategoria;

        })
        .sort((a, b) => {

            switch (orden) {

                case "nombre_asc":
                    return a.nombre.localeCompare(b.nombre);

                case "nombre_desc":
                    return b.nombre.localeCompare(a.nombre);

                case "precio_asc":
                    return a.precio - b.precio;

                case "precio_desc":
                    return b.precio - a.precio;

                case "favoritos":
                    return Number(favoritos.includes(b.id)) -
                        Number(favoritos.includes(a.id));

                case "mas_populares":
                    return b.stock - a.stock;

                case "recientes":
                default:
                    return b.id - a.id;

            }

        });

    // Agregar o quitar favoritos
    const cambiarFavorito = (id: number) => {

        setFavoritos((actuales) =>
            actuales.includes(id)
                ? actuales.filter((favorito) => favorito !== id)
                : [...actuales, id]
        );

    };

    // Obtener ruta de imagen
    const obtenerRutaImagen = (ruta: string) => {

        if (!ruta) return "";

        if (
            ruta.startsWith("http://") ||
            ruta.startsWith("https://") ||
            ruta.startsWith("/")
        ) {
            return ruta;
        }

        return `/${ruta}`;

    };

    return (

        <div className="catalog-page">

            {/* ENCABEZADO */}

            <div className="catalog-header">

                <h1>Catálogo de Productos</h1>

                <p>
                    Descubre nuestra variedad de productos lácteos
                    frescos y de calidad.
                </p>

            </div>

            {/* FILTROS */}

            <div className="catalog-filters">

                <div className="catalog-filter-group">

                    <label>Buscar producto</label>

                    <input
                        type="text"
                        placeholder="Ej. Leche, queso, yogur..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                </div>

                <div className="catalog-filter-group">

                    <label>Categoría</label>

                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    >

                        <option value="0">Todas las categorías</option>

                        {categorias.map((categoria) => (

                            <option
                                key={categoria.categoria_id}
                                value={categoria.categoria_id}
                            >
                                {categoria.categoria_nombre}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="catalog-filter-group">

                    <label>Ordenar por</label>

                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                    >
                        <option value="recientes">Más recientes</option>
                        <option value="nombre_asc">Nombre A-Z</option>
                        <option value="nombre_desc">Nombre Z-A</option>
                        <option value="precio_asc">Precio menor a mayor</option>
                        <option value="precio_desc">Precio mayor a menor</option>
                        <option value="favoritos"> Favoritos</option>
                        <option value="mas_populares">Más populares</option>
                    </select>

                </div>

                <div className="catalog-filter-group catalog-filter-button">

                    <button
                        type="button"
                        onClick={() => setBusqueda(busqueda.trim())}
                    >
                        Buscar
                    </button>

                </div>

            </div>

            {/* CONTENIDO */}

            {cargando ? (

                <div className="catalog-empty">
                    <p>Cargando productos...</p>
                </div>

            ) : error ? (

                <div className="catalog-empty">

                    <p>Error al cargar el catálogo: {error}</p>

                    <button
                        type="button"
                        onClick={cargarCatalogo}
                    >
                        Volver a intentar
                    </button>

                </div>

            ) : productosFiltrados.length > 0 ? (

                <div className="catalog-product-grid">

                    {productosFiltrados.map((producto) => (

                        <div
                            className="catalog-product-card"
                            key={producto.id}
                        >

                            {/* IMAGEN */}

                            <div className="catalog-product-image">

                                {producto.imagen ? (

                                    <img
                                        src={obtenerRutaImagen(producto.imagen)}
                                        alt={producto.nombre}
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />

                                ) : (

                                    <span className="catalog-no-image">
                                        Sin imagen
                                    </span>

                                )}

                            </div>

                            {/* INFORMACIÓN */}

                            <div className="catalog-product-info">

                                <span className="catalog-category">
                                    {producto.categoria}
                                </span>

                                <h3>{producto.nombre}</h3>

                                <p>
                                    {producto.descripcion ||
                                        "Producto lácteo de calidad."}
                                </p>

                                <div className="catalog-product-price">
                                    L. {producto.precio.toFixed(2)}
                                </div>

                                <div className="catalog-product-stock">

                                    {producto.stock > 0
                                        ? `Disponible: ${producto.stock}`
                                        : "Agotado"}

                                </div>

                                {/* ACCIONES */}

                                <div className="catalog-product-actions">

                                    <button
                                        type="button"
                                        className="catalog-add-cart"
                                        disabled={producto.stock <= 0}
                                        onClick={() => {
                                            alert(
                                                `Agregaste ${producto.nombre} al carrito.`
                                            );
                                        }}
                                    >
                                        Agregar al carrito
                                    </button>

                                    <button
                                        type="button"
                                        className="catalog-add-favorite"
                                        onClick={() =>
                                            cambiarFavorito(producto.id)
                                        }
                                    >
                                        {favoritos.includes(producto.id)
                                            ? " En favoritos"
                                            : "Agregar a favorito"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="catalog-empty">

                    <h3>No se encontraron productos</h3>

                    <p>
                        Intenta cambiar los filtros de búsqueda.
                    </p>

                </div>

            )}

            {/* PIE DE PÁGINA */}

            <div className="catalog-footer">

                <p>
                    Lácteos Axúme - Productos frescos y de calidad.
                </p>

            </div>

        </div>

    );

}