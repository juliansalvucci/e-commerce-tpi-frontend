import React, { useContext, useState } from "react";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import DatePickerComponent from "../components/DatePickerComponent";
import { UserContext } from "../context/UserContext";
import { registerSchema, adminSchema } from "../schemas";

const ABMAdminPage = () => {
  const { createUser, editUser, selectedUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!selectedUser) {
        await createUser({
          firstName: values.nombre.trim(), // trim(): Quitar espacios al final (y al principio),
          lastName: values.apellido.trim(),
          dateBirth: values.fechaNacimiento,
          email: values.email.trim(),
          password: values.password,
          admin: true,
        });
        resetForm(); // (VER) No va aca. Si hay error, no quiero que se resetee
      } else {
        await editUser(
          selectedUser.id,
          {
            firstName: values.nombre.trim(), // trim(): Quitar espacios al final (y al principio),
            lastName: values.apellido.trim(),
            dateBirth: values.fechaNacimiento,
          },
          values.email
        );
      }
    } catch (error) {
      console.error("Error al crear o editar usuario:", error); // Por ahora mostramos el error por consola por comodidad
    } finally {
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#233349",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        color="white"
        gutterBottom
        sx={{ fontFamily: "Poppins" }}
      >
        {selectedUser ? "Editar Administrador" : "Crear Administrador"}
        <Typography
          variant="overline"
          align="center"
          color="white"
          gutterBottom
          sx={{ display: "block", fontFamily: "Poppins" }}
        >
          {selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : ""}
        </Typography>
      </Typography>
      <Box
        sx={{
          backgroundColor: "#283b54",
          borderRadius: "20px",
          padding: 3,
          width: "50%",
        }}
      >
        <Formik
          initialValues={{
            nombre: selectedUser?.firstName || "",
            apellido: selectedUser?.lastName || "",
            fechaNacimiento: selectedUser?.dateBirth || null,
            email: selectedUser?.email || "",
            password: "",
          }}
          validationSchema={selectedUser ? adminSchema : registerSchema}
          validateOnChange={true}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <ABMInputComponent
                  label="Nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingrese el nombre"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <ABMInputComponent
                  label="Apellido"
                  name="apellido"
                  type="text"
                  placeholder="Ingrese el apellido"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <DatePickerComponent
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <ABMInputComponent
                  label="Correo Electrónico"
                  name="email"
                  type="text"
                  placeholder="Ingrese el email"
                  disabled={selectedUser ? true : false}
                />
              </Box>
              {selectedUser === null && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
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
              )}
              <ABMActionButton
                is={isSubmitting}
                accion={selectedUser ? "Guardar" : "Crear"}
                tipoClase="Administrador"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ABMAdminPage;
