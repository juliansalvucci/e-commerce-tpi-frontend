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
import fondo2 from "../assets/fondo-register.png";
import logo from "../assets/logo.png";
import ABMInputComponent from "../components/ABMInputComponent";
import DatePickerComponent from "../components/DatePickerComponent";
import { useUser } from "../context/UserProvider.jsx";
import { registerSchema } from "../schemas";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useUser();
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
        border: "1px solid #ccc",
      }}
    >
      <Box
        component="img"
        src={fondo2}
        alt="Imagen de bienvenida"
        sx={{
          width: "120vh",
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
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Imagen de bienvenida"
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              boxShadow: 5,
              mt: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Registro
        </Typography>

        <Formik
          initialValues={{
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            dateBirth: null,
          }}
          validationSchema={registerSchema}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={register}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <ABMInputComponent label="Nombre" name="nombre" type="text" />
              </Box>
              <Box mb={2}>
                <ABMInputComponent
                  label="Apellido"
                  name="apellido"
                  type="text"
                />
              </Box>

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

              <Box mb={2}>
                <DatePickerComponent
                  label="Fecha de Nacimiento"
                  name="dateBirth"
                  fullWidth
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
