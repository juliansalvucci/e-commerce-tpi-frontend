import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import { CategoryContext } from "../context/CategoryContext";
import { SubCategoryContext } from "../context/SubCategoryContext";
import { subCategorySchema } from "../schemas";

const ABMSubCategoryPage = () => {
  const { createSubCategory, editSubCategory, selectedSubCategory } =
    useContext(SubCategoryContext);
  const { categories } = useContext(CategoryContext);

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!selectedSubCategory) {
        await createSubCategory(
          {
            name: values.nombre.trim(), // trim(): Quitar espacios al final (y al principio)
            categoryId: values.categoria,
          },
          resetForm
        );
      } else {
        await editSubCategory(selectedSubCategory.id, {
          name: values.nombre,
          categoryId: values.categoria,
        });
      }
    } catch (error) {
      console.error("Error al crear o editar subcategoría:", error); // Por ahora mostramos el error por consola por comodidad
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
        {selectedSubCategory ? "Editar Subcategoría" : "Crear Subcategoría"}
        <Typography
          variant="overline"
          align="center"
          color="white"
          gutterBottom
          sx={{ display: "block", fontFamily: "Poppins" }}
        >
          {selectedSubCategory ? `${selectedSubCategory.name}` : ""}
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
            nombre: selectedSubCategory?.name || "",
            categoria: selectedSubCategory?.categoryId || "",
          }}
          validationSchema={subCategorySchema}
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
                <ABMSelectComponent
                  label="Categoría"
                  name="categoria"
                  options={categories.map((cat) => ({
                    value: cat.id, // Usamos el ID de la categoría como valor
                    label: cat.name, // Usamos el nombre de la categoría como label
                  }))}
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
                  label="Nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingrese el nombre"
                />
              </Box>
              <ABMActionButton
                is={isSubmitting}
                accion={selectedSubCategory ? "Guardar" : "Crear"}
                tipoClase="Subcategoría"
                ancho="100%"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ABMSubCategoryPage;
