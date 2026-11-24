import "./Cart.css";

export default function Cart() {

    return (
        <div className="cart-page">

            <h1>Mi Carrito</h1>

            <div className="cart-card">

                {/* MENSAJES */}

                {/* CARRITO CON PRODUCTOS */}

                <div className="cart-content">

                    <div className="cart-table-container">

                        <table className="cart-table">

                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>

                                    <td>
                                        <div className="cart-product">

                                            <div className="cart-product-image">
                                                🥛
                                            </div>

                                            <div className="cart-product-info">
                                                <strong>Leche entera pasteurizada</strong>
                                                <span>Leches</span>
                                                <small>Presentación: Botella 1 litro</small>
                                            </div>

                                        </div>
                                    </td>

                                    <td>
                                        <span className="cart-price">L 35.00</span>
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            defaultValue="2"
                                            className="cart-quantity"
                                        />
                                    </td>

                                    <td>
                                        <strong className="cart-subtotal">
                                            L 70.00
                                        </strong>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="cart-remove"
                                        >
                                            Eliminar
                                        </button>
                                    </td>

                                </tr>

                                <tr>

                                    <td>
                                        <div className="cart-product">

                                            <div className="cart-product-image">
                                                🧀
                                            </div>

                                            <div className="cart-product-info">
                                                <strong>Queso fresco</strong>
                                                <span>Quesos</span>
                                                <small>Presentación: Libra</small>
                                            </div>

                                        </div>
                                    </td>

                                    <td>
                                        <span className="cart-price">L 85.00</span>
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            defaultValue="1"
                                            className="cart-quantity"
                                        />
                                    </td>

                                    <td>
                                        <strong className="cart-subtotal">
                                            L 85.00
                                        </strong>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="cart-remove"
                                        >
                                            Eliminar
                                        </button>
                                    </td>

                                </tr>

                                <tr>

                                    <td>
                                        <div className="cart-product">

                                            <div className="cart-product-image">
                                                🥣
                                            </div>

                                            <div className="cart-product-info">
                                                <strong>Yogur natural</strong>
                                                <span>Yogures</span>
                                                <small>Presentación: Envase 500 ml</small>
                                            </div>

                                        </div>
                                    </td>

                                    <td>
                                        <span className="cart-price">L 55.00</span>
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            defaultValue="2"
                                            className="cart-quantity"
                                        />
                                    </td>

                                    <td>
                                        <strong className="cart-subtotal">
                                            L 110.00
                                        </strong>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="cart-remove"
                                        >
                                            Eliminar
                                        </button>
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                    {/* ACCIONES Y TOTAL */}

                    <div className="cart-bottom">

                        <div className="cart-actions">

                            <button
                                type="button"
                                className="cart-continue"
                            >
                                Seguir comprando
                            </button>

                            <button
                                type="button"
                                className="cart-clear"
                            >
                                Vaciar carrito
                            </button>

                        </div>

                        <div className="cart-summary">

                            <span>Total del pedido</span>

                            <h2>L 265.00</h2>

                            <button
                                type="button"
                                className="cart-update"
                            >
                                Actualizar carrito
                            </button>

                            <button
                                type="button"
                                className="cart-checkout"
                            >
                                Proceder al pago
                            </button>

                        </div>

                    </div>

                </div>

                {/* CARRITO VACÍO - REFERENCIA VISUAL */}

                {/*
                <div className="cart-empty">

                    <div className="cart-empty-icon">
                        🛒
                    </div>

                    <h2>Tu carrito está vacío</h2>

                    <p>
                        Todavía no has agregado productos a tu carrito.
                        Explora nuestro catálogo de productos lácteos.
                    </p>

                    <button type="button" className="cart-continue">
                        Continuar comprando
                    </button>

                </div>
                */}

            </div>

            <div className="cart-footer">
                <button type="button" className="cart-back">
                    Regresar
                </button>
            </div>

        </div>
    );
}
