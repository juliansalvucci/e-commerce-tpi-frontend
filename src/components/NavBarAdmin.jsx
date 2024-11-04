import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, Breadcrumbs, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Swal from "sweetalert2";
import AdminAvatarComponent from "./AvatarComponent";
import { UserContext } from "../context/UserContext";

const NavBarAdmin = () => {
  const { loggedUser, logoutUser } = useContext(UserContext);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Lógica para Breadcrumbs basada en la ruta actual
  const breadcrumbsMap = {
    "/admin": ["Principal", "Dashboard"],
    "/admin/user/create": ["Administración", "Administrador", "Crear"],
    "/admin/user/edit": ["Administración", "Administrador", "Editar"],
    "/admin/user/list": ["Administración", "Administrador", "Listado"],
    "/admin/brand/create": ["Administración", "Marca", "Crear"],
    "/admin/brand/edit": ["Administración", "Marca", "Editar"],
    "/admin/brand/list": ["Administración", "Marca", "Listado"],
    "/admin/category/create": ["Administración", "Categoría", "Crear"],
    "/admin/category/edit": ["Administración", "Categoría", "Editar"],
    "/admin/category/list": ["Administración", "Categoría", "Listado"],
    "/admin/product/create": ["Administración", "Producto", "Crear"],
    "/admin/product/edit": ["Administración", "Producto", "Editar"],
    "/admin/product/list": ["Administración", "Producto", "Listado"],
    "/admin/product/stock": ["Administración", "Producto", "Stock"],
    "/admin/subcategory/create": ["Administración", "Subcategoría", "Crear"],
    "/admin/subcategory/edit": ["Administración", "Subcategoría", "Editar"],
    "/admin/subcategory/list": ["Administración", "Subcategoría", "Listado"],
    "/admin/order/list": ["Administración", "Pedido", "Listado"],
    "/admin/report/clients": ["Reportes", "Clientes"],
    "/admin/report/sales": ["Reportes", "Ventas"],
    "/admin/report/stock": ["Reportes", "Stock"],
  };

  const breadcrumbs = breadcrumbsMap[location.pathname] || [""];

  const handleNavigateHome = () => {
    Swal.fire({
      title: "Ir a Home Page",
      text: "¿Estas seguro que quieres ir a Home Page?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      customClass: {
        popup: "swal-question-popup",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <Box display="flex" justifyContent="space-between">
      {/* Breadcrumbs */}
      <Box display="flex" alignItems="center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#d7c4ab", ml: 2 }}>
          {breadcrumbs.map((crumb, index) => (
            <Typography
              key={index}
              color={index === breadcrumbs.length - 1 ? "#d7c4ab" : "white"}
            >
              {crumb}
            </Typography>
          ))}
        </Breadcrumbs>
      </Box>

      {/* Iconos */}
      <Box display="flex">
      <AdminAvatarComponent user={loggedUser} onLogout={logoutUser} />
        <IconButton onClick={handleNavigateHome}>
          <HomeOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBarAdmin;
