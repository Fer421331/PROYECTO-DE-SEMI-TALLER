import "./Home.css";

export default function Home() {
    const categorias = [
        { icon: "🥛", nombre: "Leche" },
        { icon: "🧀", nombre: "Quesos" },
        { icon: "🧈", nombre: "Mantequilla" },
        { icon: "🍦", nombre: "Yogures" },
        { icon: "🥣", nombre: "Cremas" },
        { icon: "🍶", nombre: "Otros lácteos" }
    ];

    const ventajas = [
        {
            icon: "🚚",
            titulo: "Entrega a domicilio",
            descripcion: "Recibe tus productos lácteos directamente en tu hogar."
        },
        {
            icon: "🥛",
            titulo: "Productos frescos",
            descripcion: "Productos seleccionados para garantizar su calidad."
        },
        {
            icon: "💰",
            titulo: "Precios accesibles",
            descripcion: "Encuentra productos de calidad a excelentes precios."
        },
        {
            icon: "⭐",
            titulo: "Calidad garantizada",
            descripcion: "Trabajamos para ofrecerte lo mejor en cada compra."
        }
    ];

    const productos = [
        {
            nombre: "Leche Entera",
            categoria: "Leche",
            precio: "35.00",
            imagen: "🥛"
        },
        {
            nombre: "Queso Mozzarella",
            categoria: "Quesos",
            precio: "95.00",
            imagen: "🧀"
        },
        {
            nombre: "Yogur Natural",
            categoria: "Yogures",
            precio: "45.00",
            imagen: "🍶"
        },
        {
            nombre: "Mantequilla",
            categoria: "Mantequilla",
            precio: "65.00",
            imagen: "🧈"
        }
    ];

    return (
        <div className="home-page">

            <section className="hero-home">
                <div className="hero-overlay">

                    <span className="hero-tag">
                        🥛 Calidad y frescura para tu hogar
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

                        <a href="/login" className="home-btn secondary">
                            Iniciar sesión
                        </a>
                    </div>

                </div>

                <div className="hero-image">
                    <span>🥛</span>
                    <span>🧀</span>
                    <span>🧈</span>
                </div>
            </section>

            <section className="home-section categories-home">

                <div className="home-section-header">
                    <span>EXPLORA NUESTRA VARIEDAD</span>
                    <h2>Nuestras categorías</h2>
                    <p>
                        Encuentra tus productos lácteos favoritos.
                    </p>
                </div>

                <div className="category-grid">

                    {categorias.map((categoria, index) => (
                        <article className="category-card" key={index}>
                            <div className="category-icon">
                                {categoria.icon}
                            </div>

                            <h3>{categoria.nombre}</h3>

                            <a href="/catalog">
                                Ver productos →
                            </a>
                        </article>
                    ))}

                </div>

            </section>

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
                            <div className="advantage-icon">
                                {ventaja.icon}
                            </div>

                            <h3>{ventaja.titulo}</h3>

                            <p>{ventaja.descripcion}</p>
                        </article>
                    ))}

                </div>

            </section>

            <section className="home-section catalog-home">

                <div className="home-section-header">
                    <span>LO MEJOR PARA TI</span>
                    <h2>Productos destacados</h2>
                    <p>
                        Conoce algunos de nuestros productos favoritos.
                    </p>
                </div>

                <div className="product-grid">

                    {productos.map((producto, index) => (
                        <article className="product-card" key={index}>

                            <div className="product-image">
                                <span>{producto.imagen}</span>
                            </div>

                            <div className="product-info">

                                <span className="product-category">
                                    {producto.categoria}
                                </span>

                                <h3>{producto.nombre}</h3>

                                <div className="product-price">
                                    L. {producto.precio}
                                </div>

                                <a href="/catalog" className="product-button">
                                    Ver catálogo
                                </a>

                            </div>

                        </article>
                    ))}

                </div>

                <div className="catalog-footer">
                    <a href="/catalog" className="home-btn primary">
                        Ver todos los productos
                    </a>
                </div>

            </section>

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
