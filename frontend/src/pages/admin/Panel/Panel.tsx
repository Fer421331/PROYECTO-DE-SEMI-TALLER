import "./Panel.css";

export default function Panel() {

    const menu = [
        {
            titulo: "Dashboards",
            descripcion: "Visualiza indicadores, estadísticas y el resumen general del negocio.",
            icono: "📊"
        },
        {
            titulo: "Categorías",
            descripcion: "Administra las categorías de productos lácteos.",
            icono: "📁"
        },
        {
            titulo: "Productos",
            descripcion: "Gestiona los productos, precios, costos e inventario.",
            icono: "🥛"
        },
        {
            titulo: "Usuarios",
            descripcion: "Administra los usuarios registrados en el sistema.",
            icono: "👥"
        },
        {
            titulo: "Roles",
            descripcion: "Gestiona los roles y permisos de los usuarios.",
            icono: "🛡️"
        },
        {
            titulo: "Funciones",
            descripcion: "Administra las funciones disponibles del sistema.",
            icono: "⚙️"
        },
        {
            titulo: "Funciones Roles",
            descripcion: "Asigna y administra las funciones correspondientes a cada rol.",
            icono: "🔐"
        },
        {
            titulo: "Rutas Entrega",
            descripcion: "Gestiona las rutas y destinos de entrega de productos.",
            icono: "🚚"
        },
        {
            titulo: "Bitácora",
            descripcion: "Consulta el registro de actividades realizadas en el sistema.",
            icono: "📋"
        },
        {
            titulo: "Historial",
            descripcion: "Consulta el historial de operaciones y movimientos.",
            icono: "📜"
        },
        {
            titulo: "Ventas",
            descripcion: "Consulta y administra las ventas realizadas.",
            icono: "💰"
        },
        {
            titulo: "Perfil",
            descripcion: "Consulta y administra la información de tu perfil.",
            icono: "👤"
        }
    ];

    return (
        <div className="panel-page">

            <div className="panel-header">
                <h1>Panel de Administración</h1>

                <p>
                    Bienvenido al sistema de gestión de productos lácteos.
                    Selecciona un módulo para comenzar.
                </p>
            </div>

            <section className="panel-card">

                <div className="panel-category-grid">

                    {menu.map((item, index) => (

                        <article className="panel-category-card" key={index}>

                            <div className="panel-icon">
                                {item.icono}
                            </div>

                            <h2>
                                {item.titulo}
                            </h2>

                            <p>
                                {item.descripcion}
                            </p>

                            <a href="#" className="panel-btn">
                                Ingresar
                                <span> →</span>
                            </a>

                        </article>

                    ))}

                </div>

            </section>

        </div>
    );
}
