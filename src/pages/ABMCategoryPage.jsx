import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import { CategoryContext } from "../context/CategoryContext";
import { categorySchema } from "../schemas";

const ABMCategoryPage = () => {
  const { createCategory, editCategory, selectedCategory } =
    useContext(CategoryContext);

  // Función que se ejecutará al enviar el form
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!selectedCategory) {
        await createCategory({ name: values.nombre.trim() }); // trim(): Quitar espacios al final (y al principio)
        resetForm();
      } else {
        await editCategory(selectedCategory.id, { name: values.nombre });
      }
    } catch (error) {
      console.error("Error al crear o editar categoría:", error); // Por ahora mostramos el error por consola por comodidad
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
        {selectedCategory ? "Editar Categoría" : "Crear Categoría"}
        <Typography
          variant="overline"
          align="center"
          color="white"
          gutterBottom
          sx={{ display: "block", fontFamily: "Poppins" }}
        >
          {selectedCategory ? `${selectedCategory.name}` : ""}
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
            nombre: selectedCategory ? selectedCategory.name : "",
          }}
          validationSchema={categorySchema}
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
                accion={selectedCategory ? "Guardar" : "Crear"}
                tipoClase="Categoría"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ABMCategoryPage;
