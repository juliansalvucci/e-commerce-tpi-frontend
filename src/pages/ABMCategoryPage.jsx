import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import { CategoryContext } from "../context/CategoryContext";
import { categorySchema } from "../schemas";
import "../styles/ABM.css";

const ABMCategoryPage = () => {
  const { createCategory, editCategory, selectedCategory } =
    useContext(CategoryContext);

  // Función que se ejecutará al enviar el form
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!selectedCategory) {
        await createCategory({ name: values.nombre });
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
    <Box className="background" sx={{ padding: 2 }}>
      <Box className="container abm-category-page">
        {/*Typography queda muy feo aca, mejor HTML*/}
        <h2 className="title">
          {selectedCategory ? "Editar Categoría" : "Creá una Categoría"}
          <p className="subtitle">
            {selectedCategory ? `${selectedCategory.name}` : ""}
          </p>
        </h2>
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
              <ABMInputComponent
                label="Nombre"
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre"
              />
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
