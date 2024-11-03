import React, { useContext, useState, useEffect } from "react";
import {
  Badge,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  InputBase,
  Box,
} from "@mui/material";
import { ShoppingCart, Search } from "@mui/icons-material";
import { CartContext } from "../context/CartContext";
import { CartPopup } from "./CartPopup"; // Componente del popup
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const navbarStyle = {
    backgroundColor: "#00203D",
  };

  const linkStyle = {
    color: "#C2E1FF",
    textDecoration: "none",
  };

  const [opacity, setOpacity] = useState(1);
  const { shoppingList } = useContext(CartContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200;
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    if (isPopupVisible) {
      setIsPopupVisible(false);
    }
  };

  return (
    <AppBar position="static" style={{ ...navbarStyle, opacity }}>
      <Toolbar>
        <Typography variant="h6" style={linkStyle}>
          <NavLink to="/" style={linkStyle} onClick={closePopup}>
            MegaStore
          </NavLink>
        </Typography>

        <Box display="flex" alignItems="center" marginLeft="20px" flexGrow={1}>
          <Box
            display="flex"
            alignItems="center"
            bgcolor="#FFFFFF"
            borderRadius="5px"
            flexGrow={1}
            boxShadow={2}
          >
            <InputBase
              placeholder="Buscar productos…"
              inputProps={{ "aria-label": "search" }}
              style={{ padding: "10px", width: "100%", color: "#00203D" }}
            />
            <IconButton
              type="submit"
              style={{ padding: "10px", color: "#00203D" }}
            >
              <Search />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" marginLeft="auto">
          <NavLink to="/login" style={linkStyle} onClick={closePopup}>
            <Button color="inherit">Login</Button>
          </NavLink>
          <NavLink to="/register" style={linkStyle} onClick={closePopup}>
            <Button color="inherit">Registrarse</Button>
          </NavLink>
          <NavLink to="/orders" style={linkStyle} onClick={closePopup}>
            <Button color="inherit">Lista de pedidos</Button>
          </NavLink>
          <NavLink to="/carrito" style={linkStyle}>
            <Button color="inherit" style={{ marginLeft: "10px" }}>
              Carrito
            </Button>
          </NavLink>
          <IconButton
            onClick={togglePopup}
            color="inherit"
            style={{ marginLeft: "20px" }}
          >
            <Badge badgeContent={shoppingList.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <CartPopup isVisible={isPopupVisible} onClose={togglePopup} />
        </Box>
      </Toolbar>

      <Box display="flex" justifyContent="center" p={1} bgcolor="#00203D">
        <Button color="inherit">Categorías</Button>
        <Button color="inherit">Notebooks</Button>
        <Button color="inherit">Smartphones</Button>
        <Button color="inherit">Promociones</Button>
        <Button color="inherit">Ayuda</Button>
      </Box>
    </AppBar>
  );
};

export default NavBar;
