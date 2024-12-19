import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SecurityIcon from "@mui/icons-material/Security";
import { UserContext } from "../context/UserContext";

const AccountPage = () => {
  const { loggedUser, selectUserForEdit } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.includes("/admin");

  const handleNavigate = (path) => {
    if (path.includes("/edit")) {
      selectUserForEdit(loggedUser);
    }
    navigate(path);
  };

  // Opciones para mostrar según la ruta
  const options = [
    {
      title: "Listado de Pedidos",
      description: "Visualiza tus pedidos realizados",
      path: "/account/orders",
      icon: <ReceiptIcon sx={{ color: isAdmin ? "white" : "#283b54" }} />,
      visible: location.pathname.includes("/admin") ? false : true,
    },
    {
      title: "Seguridad",
      description: "Edita información sobre tu cuenta",
      path:
        isAdmin && location.pathname.includes("/admin")
          ? "/admin/account/edit"
          : "/account/edit",
      icon: <SecurityIcon sx={{ color: isAdmin ? "white" : "#283b54" }} />,
      visible: true,
    },
    {
      title: "Ayuda",
      description: "Contacta al servicio de atención al cliente",
      path: "#",
      icon: <HelpIcon sx={{ color: isAdmin ? "white" : "#283b54" }} />,
      visible: location.pathname.includes("/admin") ? false : true,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: isAdmin ? "#233349" : "#f5f5f5",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "Poppins", color: isAdmin ? "white" : "#233349" }}
      >
        Mi Cuenta
      </Typography>
      <Divider sx={{ mb: 3, borderColor: "#233349" }} />
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
                  disabled={option.path === "#"} // Desactivar el enlace si el path es "#"
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {option.icon}
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontFamily: "Poppins", color: "#233349" }}
                      >
                        {option.title}
                      </Typography>
                    </Stack>
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
