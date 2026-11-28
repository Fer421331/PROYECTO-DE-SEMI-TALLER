import { useEffect, useRef, useState } from "react";
import "./Home.css";
import { useAuth } from "../../hooks/useAuth";

import {
    getCategoriasHome,
    getProductosHome,
    type CategoriaHome,
    type ProductoHome
} from "./home.service";


export default function Home() {

    const [categorias, setCategorias] = useState<CategoriaHome[]>([]);
    const [productos, setProductos] = useState<ProductoHome[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const { estaLogueado } = useAuth();

    const carruselRef = useRef<HTMLDivElement>(null);

    // Mover el carrusel de productos
    const desplazar = (direccion: number) => {
        carruselRef.current?.scrollBy({
            left: direccion * 320,
            behavior: "smooth"
        });
    };


    useEffect(() => {

        const cargarDatos = async () => {

            try {

                const datosCategorias = await getCategoriasHome();
                const datosProductos = await getProductosHome();

                const categoriasActivas = datosCategorias.filter(
                    (categoria) => categoria.categoria_estado === "ACT"
                );

                setCategorias(categoriasActivas);

                const productosActivos = datosProductos.filter(
                    (producto) =>
                        producto.producto_activo === "ACT" &&
                        producto.producto_estado === "ACT" &&
                        producto.producto_stock > 0
                );

                const productosDestacados: ProductoHome[] = [];

                categoriasActivas.forEach((categoria) => {

                    const producto = productosActivos.find(
                        (item) => item.categoria_id === categoria.categoria_id
                    );

                    if (producto) {
                        productosDestacados.push(producto);
                    }

                });

                productosActivos.forEach((producto) => {

                    if (
                        productosDestacados.length < 10 &&
                        !productosDestacados.some(
                            (item) => item.producto_id === producto.producto_id
                        )
                    ) {
                        productosDestacados.push(producto);
                    }

                });

                setProductos(productosDestacados);

            } catch (error) {

                console.error("Error al cargar los datos:", error);
                setError("No se pudo cargar la información.");

            } finally {

                setCargando(false);

            }

        };

        cargarDatos();

    }, []);


    const ventajas = [
        {
            titulo: "Entrega a domicilio",
            descripcion: "Recibe tus productos lácteos directamente en tu hogar."
        },
        {
            titulo: "Productos frescos",
            descripcion: "Productos seleccionados para garantizar su calidad."
        },
        {
            titulo: "Precios accesibles",
            descripcion: "Encuentra productos de calidad a excelentes precios."
        },
        {
            titulo: "Calidad garantizada",
            descripcion: "Trabajamos para ofrecerte lo mejor en cada compra."
        }
    ];


    // Normalizar texto para comparar nombres
    const normalizarTexto = (texto: string) => {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    };


    // Obtener imagen según la categoría
    const obtenerIconoCategoria = (nombre: string) => {

        const categoria = normalizarTexto(nombre);

        if (categoria.includes("lacteo")) {
            return "/img/lacteos.jpg";
        }

        if (categoria.includes("panaderia")) {
            return "/img/panaderia.jpg";
        }

        if (categoria.includes("abarrote")) {
            return "/img/abarrotes.jpg";
        }

        return "";

    };


    // Verificar si la categoría tiene una imagen
    const esImagenCategoria = (nombre: string) => {

        const categoria = normalizarTexto(nombre);

        return (
            categoria.includes("lacteo") ||
            categoria.includes("panaderia") ||
            categoria.includes("abarrote")
        );

    };


    // Obtener imagen individual según el nombre del producto
    const obtenerImagenProducto = (nombre: string) => {

        const producto = normalizarTexto(nombre);

        if (producto.includes("aguacate")) {
            return "/img/aguacates.webp";
        }

        if (producto.includes("queso seco")) {
            return "/img/queso-seco.jpeg";
        }

        if (
            producto.includes("queso semi seco") ||
            producto.includes("queso semiseco")
        ) {
            return "/img/quesosemiseco.webp";
        }

        if (producto.includes("queso blanco")) {
            return "/img/queso-blanco.jpg";
        }

        if (producto.includes("tortilla")) {
            return "/img/tortillaarina.jpg";
        }

        return "";

    };


    return (
        <div className="home-page">

            {/* HERO */}

            <section className="hero-home">

                <div className="hero-overlay">

                    <span className="hero-tag">
                        Calidad y frescura para tu hogar
                    </span>

                    <h1>
                        El sabor de lo natural comienza aquí
                    </h1>

                    <p className="hero-subtitle">
                        Los mejores productos lácteos en un solo lugar.
                    </p>

                    <p className="hero-description">
                        Descubre nuestra variedad de leches, quesos,
                        yogures, mantequillas y mucho más.
                        Calidad y frescura en cada producto.
                    </p>

                    <div className="hero-buttons">

                        <a href="/catalog" className="home-btn primary">
                            Explorar catálogo
                        </a>

                        {!estaLogueado && (
                            <a href="/login" className="home-btn secondary">
                                Iniciar sesión
                            </a>
                        )}

                    </div>

                </div>

                <div className="hero-image">

                    <img
                        src="/img/logolacteos.png"
                        alt="Logo Lácteos Axúme"
                    />

                </div>

            </section>


            {/* CATEGORÍAS */}

            <section className="home-section categories-home">

                <div className="home-section-header">

                    <span>EXPLORA NUESTRA VARIEDAD</span>
                    <h2>Nuestras categorías</h2>

                    <p>
                        Encuentra tus productos favoritos, frescos y de calidad.
                    </p>

                </div>

                <div className="category-grid">

                    {cargando && (
                        <>
                            <div className="category-skeleton"></div>
                            <div className="category-skeleton"></div>
                            <div className="category-skeleton"></div>
                        </>
                    )}

                    {!cargando && categorias.map((categoria) => (

                        <a
                            href="/catalog"
                            className="category-card"
                            key={categoria.categoria_id}
                        >

                            <div className="category-media">

                                {esImagenCategoria(categoria.categoria_nombre) ? (

                                    <img
                                        src={obtenerIconoCategoria(categoria.categoria_nombre)}
                                        alt={categoria.categoria_nombre}
                                    />

                                ) : (

                                    <div className="category-placeholder"></div>

                                )}

                            </div>

                            <div className="category-overlay"></div>

                            <div className="category-content">

                                <h3>{categoria.categoria_nombre}</h3>

                                <span className="category-link">
                                    Ver productos
                                </span>

                            </div>

                        </a>

                    ))}

                    {!cargando && categorias.length === 0 && !error && (
                        <p>No hay categorías disponibles.</p>
                    )}

                </div>

            </section>


            {/* VENTAJAS */}

            <section className="home-section advantages-home">

                <div className="home-section-header">

                    <span>COMPROMETIDOS CONTIGO</span>
                    <h2>¿Por qué elegirnos?</h2>

                    <p>
                        Queremos llevar calidad y frescura hasta tu mesa.
                    </p>

                </div>

                <div className="advantages-grid">

                    {ventajas.map((ventaja, index) => (

                        <article className="advantage-card" key={index}>

                            <h3>{ventaja.titulo}</h3>
                            <p>{ventaja.descripcion}</p>

                        </article>

                    ))}

                </div>

            </section>


            {/* PRODUCTOS DESTACADOS CON SCROLL */}

            <section className="home-section catalog-home">

                <div className="home-section-header">

                    <span>LO MEJOR PARA TI</span>
                    <h2>Productos destacados</h2>

                    <p>
                        Conoce algunos de nuestros productos favoritos.
                    </p>

                </div>

                {error && <p>{error}</p>}

                <div className="product-carousel">

                    <button
                        type="button"
                        className="carousel-btn carousel-prev"
                        onClick={() => desplazar(-1)}
                        aria-label="Anterior"
                    >
                        &lt;
                    </button>

                    <div className="product-grid" ref={carruselRef}>

                        {cargando && <p>Cargando productos...</p>}

                        {!cargando && productos.map((producto) => {

                            const categoria = categorias.find(
                                (item) => item.categoria_id === producto.categoria_id
                            );

                            const imagenProducto = obtenerImagenProducto(
                                producto.producto_nombre
                            );

                            return (

                                <article
                                    className="product-card"
                                    key={producto.producto_id}
                                >

                                    <div className="product-image">

                                        {imagenProducto ? (

                                            <img
                                                src={imagenProducto}
                                                alt={producto.producto_nombre}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />

                                        ) : (

                                            <span>Sin imagen</span>

                                        )}

                                    </div>

                                    <div className="product-info">

                                        <span className="product-category">
                                            {categoria?.categoria_nombre || "Producto"}
                                        </span>

                                        <h3>{producto.producto_nombre}</h3>

                                        <div className="product-price">
                                            L. {Number(producto.producto_precio).toFixed(2)}
                                        </div>

                                        <a href="/catalog" className="product-button">
                                            Ver catálogo
                                        </a>

                                    </div>

                                </article>

                            );

                        })}

                        {!cargando && productos.length === 0 && !error && (
                            <p>No hay productos disponibles.</p>
                        )}

                    </div>

                    <button
                        type="button"
                        className="carousel-btn carousel-next"
                        onClick={() => desplazar(1)}
                        aria-label="Siguiente"
                    >
                        &gt;
                    </button>

                </div>

            </section>


            {/* LLAMADO A LA ACCIÓN */}

            <section className="home-cta">

                <h2>
                    La frescura que tu familia merece
                </h2>

                <p>
                    Encuentra todo lo que necesitas para disfrutar
                    de productos lácteos de calidad.
                </p>

                <a href="/catalog" className="home-btn">
                    Comprar ahora
                </a>

            </section>

        </div>
    );

}