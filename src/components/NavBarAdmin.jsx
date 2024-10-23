import { useLocation, NavLink } from "react-router-dom";
import { Box, IconButton, Breadcrumbs, Typography, Link } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const NavBarAdmin = () => {
  const location = useLocation();

  // Lógica para Breadcrumbs basada en la ruta actual
  const breadcrumbsMap = {
    "/admin": ["Principal", "Dashboard"],
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
        <IconButton>
          <NotificationsOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <HomeOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBarAdmin;
