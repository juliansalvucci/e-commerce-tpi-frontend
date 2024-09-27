import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import fondo2 from "../assets/fondo-register.png";
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
import { useUser } from "../context/UserProvider.jsx";


export const RegisterPage = () => {
  const { register } = useUser();
  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("El nombre es obligatorio"),
    lastName: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "space-between",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Imagen en el lado izquierdo */}
      <Box
        component="img"
        src={fondo2} // Reemplaza con la ruta de tu imagen
        alt="Imagen de bienvenida"
        sx={{
          width: "120vh", // Ajusta el tamaño según sea necesario
          height: "90vh",
        }}
      />
      
      <Box
        sx={{
          width: "120vh",
          height: "90vh",
          padding: 3,
          paddingBottom: 10,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
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
              mt: 2, // Margen superior para separación
            }}
          />
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Registro
        </Typography>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={register}
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
                  id="firstName"
                  name="firstName"
                  label="Nombre"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  variant="outlined"
                />
              </Box>

              <Box mb={2}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Apellido"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  variant="outlined"
                />
              </Box>

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
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
