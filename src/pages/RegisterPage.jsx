import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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
import "../styles/ABM.css";


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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
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
                className="btn-crear"
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
