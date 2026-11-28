import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        Lácteos <span>Axúme</span>
        <p>Calidad que nace <span>de lo natural</span></p>
      </Link>

      <nav className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/catalog">Catálogo</Link>
        <Link to="/favorites">Favoritos</Link>
      </nav>

      <div className="navbar-actions">
        <Link to="/carrito" className="navbar-cart">
          Carrito
        </Link>
        <Link to="/login" className="navbar-login">
          Iniciar sesión
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
