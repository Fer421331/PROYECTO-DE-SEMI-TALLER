
import "./History.css";

export default function History() {
    const compras = [
        {
            id: "VNT-001",
            fecha: "15/11/2026",
            estado: "Aprobada",
            total: 245.00,
            productos: [
                {
                    nombre: "Leche Entera",
                    precio: 35.00,
                    cantidad: 2,
                    subtotal: 70.00
                },
                {
                    nombre: "Queso Mozzarella",
                    precio: 175.00,
                    cantidad: 1,
                    subtotal: 175.00
                }
            ]
        },
        {
            id: "VNT-002",
            fecha: "18/11/2026",
            estado: "Pendiente",
            total: 120.00,
            productos: [
                {
                    nombre: "Yogur Natural",
                    precio: 60.00,
                    cantidad: 2,
                    subtotal: 120.00
                }
            ]
        },
        {
            id: "VNT-003",
            fecha: "20/11/2026",
            estado: "Aprobada",
            total: 190.00,
            productos: [
                {
                    nombre: "Mantequilla",
                    precio: 95.00,
                    cantidad: 2,
                    subtotal: 190.00
                }
            ]
        }
    ];

    return (
        <section className="history-container">

            <h1>Historial de Compras</h1>

            <hr />

            {compras.length === 0 ? (
                <div className="history-empty">
                    No existen compras registradas.
                </div>
            ) : (
                <>
                    <div className="history-search">
                        <label htmlFor="buscarHistorial">
                            Buscar
                        </label>

                        <input
                            type="text"
                            id="buscarHistorial"
                            placeholder="Buscar compra..."
                            autoComplete="off"
                            onChange={(e) => {
                                const texto = e.target.value.toLowerCase();
                                const elementos = document.querySelectorAll(
                                    ".historial-item"
                                );

                                elementos.forEach((elemento) => {
                                    const contenido =
                                        elemento.textContent?.toLowerCase() || "";

                                    (elemento as HTMLElement).style.display =
                                        contenido.includes(texto) ? "" : "none";
                                });
                            }}
                        />
                    </div>

                    <hr />

                    {compras.map((compra) => (
                        <div
                            className="history-card historial-item"
                            key={compra.id}
                        >
                            <div className="history-card-header">

                                <div>
                                    <strong>Compra #{compra.id}</strong>

                                    <p>Fecha: {compra.fecha}</p>

                                    <p>
                                        Estado:
                                        <span className={`history-status ${compra.estado === "Aprobada"
                                                ? "approved"
                                                : "pending"
                                            }`}>
                                            {compra.estado}
                                        </span>
                                    </p>
                                </div>

                                <h3>
                                    Total: L {compra.total.toFixed(2)}
                                </h3>

                            </div>

                            <div className="history-card-body">

                                <h3>Productos adquiridos</h3>

                                <div className="history-table-container">

                                    <table className="history-table">

                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {compra.productos.map((producto, index) => (
                                                <tr key={index}>
                                                    <td>{producto.nombre}</td>

                                                    <td>
                                                        L {producto.precio.toFixed(2)}
                                                    </td>

                                                    <td>{producto.cantidad}</td>

                                                    <td>
                                                        L {producto.subtotal.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>
                    ))}
                </>
            )}

            <hr />

            <a href="/" className="history-back">
                Regresar
            </a>

        </section>
    );
}
