import React, { useState } from "react";
import { Avatar, CircularProgress, IconButton, Menu, MenuItem, Typography } from "@mui/material";
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
        Swal.fire({
          icon: "success",
          title: "Exito!",
          text: `Se ha cerrado la sesión de ${user.email}`,
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
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

  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

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
        <MenuItem disabled>
          <Typography variant="body1">{user.email}</Typography>
        </MenuItem>
        {user.role === "ADMIN" && !location.pathname.includes("/admin") && (
          <MenuItem onClick={handleDashboard}>Ir a Dashboard</MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>Actualizar información</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default AvatarComponent;