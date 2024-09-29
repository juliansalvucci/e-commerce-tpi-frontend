import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import { brandSchema } from "../schemas";
import "../styles/ABM.css";
import { BrandContext } from "../context/BrandContext";
import isUnique from "../utils/isUniqueUtils";

const ABMBrandPage = () => {
  const { createBrand, editBrand, selectedBrand, selectBrandForEdit } =
    useContext(BrandContext);

  // Función que se ejecutará al enviar el form
  const onSubmit = async (
    values,
    { resetForm, setSubmitting, setFieldError }
  ) => {
    try {
      if (!selectedBrand) {
        const isUniqueResult = await isUnique("brand", values.nombre);
        if (!isUniqueResult) {
          setFieldError("nombre", "Ya existe una marca con ese nombre");
          setSubmitting(false);
          return;
        }
        await createBrand({ name: values.nombre });
      } else {
        await editBrand(selectedBrand.id, { name: values.nombre });
      }
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al crear o editar la marca",
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
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
