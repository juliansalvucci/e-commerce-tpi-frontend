import React, { useState } from "react";
import {
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AvatarComponent = ({ user, userName, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccount = () => {
    handleMenuClose();
    navigate("/account");
  };

  const handleOrders = () => {
    handleMenuClose();
    navigate("/orders");
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate("/login");
  };

  const handleRegister = () => {
    handleMenuClose();
    navigate("/register");
  };

  const handleLogout = () => {
    handleMenuClose();
    Swal.fire({
      title: "Cerrar Sesión",
      text: "¿Estás seguro que quieres cerrar sesión?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      customClass: {
        popup: "swal-question-popup",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
        navigate("/");
      }
    });
  };

  const handleDashboard = () => {
    handleMenuClose();
    Swal.fire({
      title: "Ir a Dashboard Administrativo",
      text: "¿Estás seguro que quieres ir a Dashboard de Administración?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      customClass: {
        popup: "swal-question-popup",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin");
      }
    });
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Avatar>{user.firstName[0]}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {[
          <MenuItem key="username" disabled>
            <Typography variant="body1">{userName}</Typography>
          </MenuItem>,
          user.role === "ADMIN" && !location.pathname.includes("/admin") && (
            <MenuItem key="dashboard" onClick={handleDashboard}>
              Ir a Dashboard
            </MenuItem>
          ),
          user.role === "GUEST" && (
            <MenuItem key="login" onClick={handleLogin}>
              Iniciar Sesión
            </MenuItem>
          ),
          user.role === "GUEST" && (
            <MenuItem key="register" onClick={handleRegister}>
              Registrarse
            </MenuItem>
          ),
          (user.role === "USER" || user.role === "ADMIN") && (
            <MenuItem key="account" onClick={handleAccount}>
              Cuenta
            </MenuItem>
          ),
          (user.role === "USER" || user.role === "ADMIN") &&
            !location.pathname.includes("/admin") && (
              <MenuItem key="orders" onClick={handleOrders}>
                Listado de Pedidos
              </MenuItem>
            ),
          (user.role === "USER" || user.role === "ADMIN") && (
            <MenuItem key="logout" onClick={handleLogout}>
              Cerrar sesión
            </MenuItem>
          ),
        ].filter(Boolean)}
      </Menu>
    </>
  );
};

export default AvatarComponent;
