
import "./Panel.css";
import { Link } from "react-router-dom";

export default function Panel() {

    const menu = [
        {
            titulo: "Dashboards",
            descripcion: "Visualiza indicadores, estadísticas y el resumen general del negocio.",
            ruta: "/admin/dashboard"
        },
        {
            titulo: "Categorías",
            descripcion: "Administra las categorías de productos lácteos.",
            ruta: "/admin/categories"
        },
        {
            titulo: "Productos",
            descripcion: "Gestiona los productos, precios, costos e inventario.",
            ruta: "/admin/productos"
        },
        {
            titulo: "Usuarios",
            descripcion: "Administra los usuarios registrados en el sistema.",
            ruta: "/admin/users"
        },
        {
            titulo: "Roles",
            descripcion: "Gestiona los roles y permisos de los usuarios.",
            ruta: "/admin/roles"
        },
        {
            titulo: "Funciones",
            descripcion: "Administra las funciones disponibles del sistema.",
            ruta: "/admin/functions"
        },
        {
            titulo: "Funciones Roles",
            descripcion: "Asigna y administra las funciones correspondientes a cada rol.",
            ruta: "/admin/functions-roles"
        },
        {
            titulo: "Rutas Entrega",
            descripcion: "Gestiona las rutas y destinos de entrega de productos.",
            ruta: "/admin/delivery-routes"
        },
        {
            titulo: "Bitácora",
            descripcion: "Consulta el registro de actividades realizadas en el sistema.",
            ruta: "/admin/bitacora"
        },
        {
            titulo: "Historial",
            descripcion: "Consulta el historial de operaciones y movimientos.",
            ruta: "/history"
        },
        {
            titulo: "Ventas",
            descripcion: "Consulta y administra las ventas realizadas.",
            ruta: "/admin/sales"
        },
        {
            titulo: "Perfil",
            descripcion: "Consulta y administra la información de tu perfil.",
            ruta: "/profile"
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

                            <h2>
                                {item.titulo}
                            </h2>

                            <p>
                                {item.descripcion}
                            </p>

                            <Link to={item.ruta} className="panel-btn">
                                Ingresar
                            </Link>

                        </article>

                    ))}

                </div>

            </section>

        </div>
    );
}
