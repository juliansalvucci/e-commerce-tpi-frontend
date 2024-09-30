import { useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const HomeAdminPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Para centrar verticalmente
        gap: 2, // Espaciado entre los elementos
        fontFamily: "Poppins",
      }}
    >
      <Typography
        variant="h1"
        component="div"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 5 }}
      >
        {"¡Bienvenido,  Admin!"}
      </Typography>
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          backgroundColor: "#C2E1FF",
          borderRadius: "20px",
          padding: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            endIcon={<ExpandMoreIcon />}
            onClick={handleClick}
            sx={{
              backgroundColor: "#00203D",
              borderRadius: "80px",
              padding: "16px 24px",
              fontSize: "24px",
              fontWeight: "bold",
              width: "300px",
              fontFamily: "Poppins",
            }}
          >
            Administración
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <NavLink to="/marcas" style={{ textDecoration: "none" }}>
              <MenuItem>Marca</MenuItem>
            </NavLink>
            <NavLink>
              <MenuItem>Categoría</MenuItem>
            </NavLink>
            <NavLink>
              <MenuItem>Subcategoría</MenuItem>
            </NavLink>
            <NavLink>
              <MenuItem>Subcategoría</MenuItem>
            </NavLink>
            <NavLink>
              <MenuItem>Producto</MenuItem>
            </NavLink>
            <NavLink>
              <MenuItem>Descuento</MenuItem>
            </NavLink>
          </Menu>
          <Button
            variant="contained"
            startIcon={<DescriptionIcon />}
            sx={{
              backgroundColor: "#00203D",
              borderRadius: "80px",
              padding: "16px 24px",
              fontSize: "24px",
              fontWeight: "bold",
              width: "300px",
              fontFamily: "Poppins",
            }}
          >
            Reportes
          </Button>
          <Button
            variant="contained"
            startIcon={<InventoryIcon />}
            sx={{
              backgroundColor: "#00203D",
              borderRadius: "80px",
              padding: "16px 24px",
              fontSize: "24px",
              fontWeight: "bold",
              width: "300px",
              fontFamily: "Poppins",
            }}
          >
            Stock
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeAdminPage;
