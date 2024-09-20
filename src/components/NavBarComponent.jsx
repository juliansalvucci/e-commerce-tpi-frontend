import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { CartPopup } from "./CartPopup"; // Importar el componente del popup

export const NavBarComponent = () => {
  const { shoppingList } = useContext(CartContext); // Obtener la lista de productos del carrito desde el contexto
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Estado para controlar si el popup está visible o no

  // Función para alternar la visibilidad del popup
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible); // Cambia el estado de visible a no visible y viceversa
  };

  // Función para cerrar el popup si está abierto
  const closePopup = () => {
    if (isPopupVisible) {
      setIsPopupVisible(false); // Establece el estado en falso, lo que cierra el popup
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Al hacer clic en el logo, se cierra el popup */}
        <NavLink to="/" className="navbar-brand" onClick={closePopup}>
          MegaStore
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            {/* Opción de productos, cierra el popup al hacer click */}
            <NavLink
              to="/"
              className="nav-link"
              aria-current="page"
              onClick={closePopup}
            >
              Productos
            </NavLink>
          </div>
          <div className="navbar-nav">
            {/* Opción del carrito, cierra el popup al hacer click */}
            <NavLink
              to="/carrito"
              className="nav-link"
              aria-current="page"
              onClick={closePopup}
            >
              Carrito
            </NavLink>
          </div>
        </div>
        {/* Icono del carrito de compras, al hacer click muestra/oculta el popup */}
        <NavLink
          to="/login"
          className="nav-link"
          aria-current="page"
          onClick={closePopup}
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="nav-link"
          aria-current="page"
          onClick={closePopup}
        >
          Registrarse
        </NavLink>
        <button className="cart-icon btn" onClick={togglePopup}>
          <Badge badgeContent={shoppingList.length} color="primary">
            <ShoppingCart />
          </Badge>
        </button>
        {/* Popup que muestra los productos del carrito, visible según el estado */}
        <CartPopup isVisible={isPopupVisible} onClose={togglePopup} />
      </div>
    </nav>
  );
};
