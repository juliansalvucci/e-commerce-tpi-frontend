import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import { BrandContext } from "../context/BrandContext";
import { brandSchema } from "../schemas";
import "../styles/ABM.css";

const ABMBrandPage = () => {
  const { createBrand, editBrand, selectedBrand } = useContext(BrandContext);

  // Función que se ejecutará al enviar el form
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!selectedBrand) {
        await createBrand({ name: values.nombre });
        resetForm(); // (VER) No va aca. Si hay error, no quiero que se resetee
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
    <Box className="background" sx={{ padding: 2 }}>
      <Box className="container abm-brand-page">
        <h2 className="title">
          {selectedBrand ? "Editar Marca" : "Creá una Marca"}
        </h2>
        <Formik
          initialValues={{ nombre: selectedBrand ? selectedBrand.name : "" }}
          validationSchema={brandSchema}
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
                accion={selectedBrand ? "Guardar" : "Crear"}
                tipoClase="Marca"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ABMBrandPage;
