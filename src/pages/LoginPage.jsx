import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import fondo from "../assets/fondo.png";
import logo from "../assets/logo.png";

import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../context/UserProvider";

export const LoginPage = () => {
  const { login } = useUser();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

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
          boxShadow: 3,
        }}
      >
        {/* Contenedor para centrar la imagen */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Centra horizontalmente
            alignItems: "center", // Centra verticalmente
            mb: 4, // Margen inferior para separación
          }}
        >
          <Box
            component="img"
            src={logo} // Reemplaza con la ruta de tu imagen
            alt="Imagen de bienvenida"
            sx={{
              width: "100px", // Ajusta el tamaño según sea necesario
              height: "100px", // Cambia a "auto" para mantener la proporción
              borderRadius: "50px",
              boxShadow: 5,
              mt: 4, // Margen superior para separación
            }}
          />
        </Box>

        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={login}
        >
          {({
            isSubmitting,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form>
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                />
              </Box>

              <Box mb={2}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  variant="outlined"
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
