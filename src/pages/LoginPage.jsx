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
import { useUser } from "../context/UserProvider";
import "../styles/ABM.css";

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
                className="btn-crear"
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
