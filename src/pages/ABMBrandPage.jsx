import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import ABMInputComponent from "../components/ABMInputComponent";
import { brandSchema } from "../schemas";
import "../styles/ABM.css";
import isUnique from "../utils/isUniqueUtils";

// Función que se ejecutará al enviar el form
const onSubmit = async (
  values,
  { resetForm, setSubmitting, setFieldError }
) => {
  try {
    const isUniqueResult = await isUnique("brand", values.nombre);
    if (!isUniqueResult) {
      setFieldError("nombre", "Ya existe una marca con ese nombre");
      setSubmitting(false);
      return;
    }
    const response = await axios.post("http://localhost:8080/brand", {
      name: values.nombre,
    });
    //console.log("Respuesta del servidor:", response.data);
    Swal.fire({
      icon: "success",
      title: "Exito!",
      text: `La marca ${response.data.name} fue creada con éxito!`,
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
      title: "Hubo un error al crear la marca",
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

const ABMBrandPage = () => {
  return (
    <Box className="background" sx={{ padding: 2 }}>
      <Box className="container abm-brand-page">
        {/* Typography queda muy feo aca, mejor HTML*/}
        <h2 className="title">Creá una Marca</h2>
        <Formik
          initialValues={{ nombre: "" }}
          validationSchema={brandSchema}
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
              <button
                className="btn-crear"
                type="submit"
                disabled={isSubmitting}
              >
                Crear
              </button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ABMBrandPage;
