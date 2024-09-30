import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import fondo from "../assets/fondo.png";
import logo from "../assets/logo.png";
import ABMInputComponent from "../components/ABMInputComponent";
import { useUser } from "../context/UserProvider.jsx";
import { loginSchema } from "../schemas";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para controlar la visibilidad de la contraseña
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "space-between",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 3,
        backgroundColor: "#f5f5f5",
        m: 1,
        border: "1px solid #ccc",
      }}
    >
      {/* Imagen en el lado izquierdo */}
      <Box
        component="img"
        src={fondo}
        alt="Imagen de bienvenida"
        sx={{
          width: "120vh",
          height: "90vh",
        }}
      />

      <Box
        sx={{
          width: "120vw",
          height: "90vh",

          padding: 3,
          paddingBottom: 10,
          backgroundColor: "white",
        }}
      >
        {/* Contenedor para centrar la imagen */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            component="img"
            src={logo} // Reemplaza con la ruta de tu imagen
            alt="Imagen de bienvenida"
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              boxShadow: 5,
              mt: 4,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        </Box>

        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={login}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <ABMInputComponent
                  label="Correo Electrónico"
                  name="email"
                  type="text"
                />
              </Box>

              <Box mb={2}>
                <ABMInputComponent
                  label="Contraseña"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Iniciar Sesión
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
