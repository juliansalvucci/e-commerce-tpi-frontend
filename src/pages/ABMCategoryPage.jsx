import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import { categorySchema } from "../schemas";
import "../styles/ABM.css";
import isUnique from "../utils/isUniqueUtils";

// Función que se ejecutará al enviar el form
const onSubmit = async (
  values,
  { resetForm, setSubmitting, setFieldError }
) => {
  try {
    const isUniqueResult = await isUnique("category", values.nombre);
    if (!isUniqueResult) {
      setFieldError("nombre", "Ya existe una categoría con ese nombre");
      setSubmitting(false);
      return;
    }
    const response = await axios.post("http://localhost:8080/category", {
      name: values.nombre,
    });
    //console.log("Respuesta del servidor:", response.data);
    Swal.fire({
      icon: "success",
      title: "Exito!",
      text: `La categoria ${response.data.name} fue creada con éxito!`,
      customClass: {
        popup: "swal-success-popup",
        confirmButton: "swal-ok-button",
      },
    });
    resetForm();
  } catch (error) {
    //console.error("Error en el registro:", error);
    Swal.fire({
      icon: "error",
      title: "Hubo un error al crear la categoria",
      customClass: {
        popup: "swal-success-popup",
        confirmButton: "swal-ok-button",
      },
    });
  } finally {
    setSubmitting(false);
  }
  /*
  console.log("Formulario enviado con valores:", values);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  resetForm();
  alert("Formulario enviado");
  */
};

const ABMCategoryPage = () => {
  return (
    <Box className="background" sx={{ padding: 2 }}>
      <Box className="container abm-category-page">
        {/* Typography queda muy feo aca, mejor HTML*/}
        <h2 className="title">Creá una Categoría</h2>
        <Formik
          initialValues={{ nombre: "" }}
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
                accion="Crear"
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
