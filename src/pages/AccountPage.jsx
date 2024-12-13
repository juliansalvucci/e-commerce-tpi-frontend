import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const AccountPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.includes("/admin");

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Opciones para mostrar según la ruta
  const options = [
    {
      title: "Listado de Pedidos",
      description: "Visualiza tus pedidos realizados",
      path: "/orders",
      visible: location.pathname.includes("/admin") ? false : true,
    },
    {
      title: "Seguridad",
      description: "Edita información sobre tu cuenta",
      path:
        isAdmin && location.pathname.includes("/admin")
          ? "/admin/account/edit"
          : "/account/edit",
      visible: true,
    },
    {
      title: "Reportes",
      description: "Accede a reportes propios",
      path:
        isAdmin && location.pathname.includes("/admin")
          ? "/admin/account/reports"
          : "/account/reports",
      visible: true,
    },
    {
      title: "Ayuda",
      description: "Contacta al servicio de atención al cliente",
      path: "/account",
      visible: location.pathname.includes("/admin") ? false : true,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "Poppins", color: "#233349" }}
      >
        Mi Cuenta
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {options
          .filter((option) => option.visible)
          .map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.title}>
              <Card>
                <CardActionArea
                  onClick={() =>
                    option.path !== "#" && handleNavigate(option.path)
                  }
                  disabled={option.path === "#"} // Deshabilitar si no tiene funcionalidad
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontFamily: "Poppins", color: "#233349" }}
                    >
                      {option.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "Poppins", color: "#555" }}
                    >
                      {option.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default AccountPage;
