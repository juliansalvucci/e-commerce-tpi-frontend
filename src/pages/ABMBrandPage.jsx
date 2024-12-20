import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import { BrandContext } from "../context/BrandContext";
import { brandSchema } from "../schemas";

const ABMBrandPage = () => {
  const { createBrand, editBrand, selectedBrand } = useContext(BrandContext);

  // Función que se ejecutará al enviar el form
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!selectedBrand) {
        await createBrand({ name: values.nombre.trim() }, resetForm); // trim(): Quitar espacios al final (y al principio)
      } else {
        await editBrand(selectedBrand.id, { name: values.nombre });
      }
    } catch (error) {
      console.error("Error al crear o editar marca:", error); // Por ahora mostramos el error por consola por comodidad
    } finally {
      setSubmitting(false);
    }
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
        {selectedBrand ? "Editar Marca" : "Crear Marca"}
        <Typography
          variant="overline"
          align="center"
          color="white"
          gutterBottom
          sx={{ display: "block", fontFamily: "Poppins" }}
        >
          {selectedBrand ? `${selectedBrand.name}` : ""}
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
          initialValues={{ nombre: selectedBrand ? selectedBrand.name : "" }}
          validationSchema={brandSchema}
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
                }}
              >
                <ABMInputComponent
                  label="Nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingrese el nombre"
                />
              </Box>
              <ABMActionButton
                is={isSubmitting}
                accion={selectedBrand ? "Guardar" : "Crear"}
                tipoClase="Marca"
                ancho="100%"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ABMBrandPage;
