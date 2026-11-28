import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section footer-brand">
                    <h2>Lácteos Axúme</h2>
                    <p>
                        Productos lácteos de calidad para compartir
                        frescura y sabor en cada momento.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Enlaces rápidos</h3>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/catalog">Catálogo</a></li>
                        <li><a href="/favorites">Favoritos</a></li>
                        <li><a href="/cart">Carrito</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contáctanos</h3>
                    <ul>
                        <li>Teléfono: +504 0000-0000</li>
                        <li>Correo: info@lacteosaxume.com</li>
                        <li>Honduras</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Redes sociales</h3>
                    <div className="footer-social">
                        <a href="#" aria-label="Facebook">Facebook</a>
                        <a href="#" aria-label="Instagram">Instagram</a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} Lácteos Axúme.
                    Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;