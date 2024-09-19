import React from "react";
import { Formik, Form } from "formik";
import { brandSchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMBackButton from "../components/ABMBackButton";
//import axios from "axios";
import "../styles/ABM.css";

// Función que se ejecutará al enviar el form
const onSubmit = async (values, { resetForm }) => {
  /*
  try {
    const response = await axios.post(
      "http://localhost:8080/brand",
      values
    );
    console.log("Respuesta del servidor:", response.data);
    // Aca íria la lógica de mostrar un mensaje de exito
  } catch (error) {
    console.error("Error en el registro:", error);
    // Aca íria la lógica de mostrar el error
  } finally {
    setSubmitting(false);
  }
  */
  console.log("Formulario enviado con valores:", values);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  resetForm();
  alert("Formulario enviado");
};

const ABMBrandPage = () => {
  return (
    <div className="background">
      <ABMBackButton />
      <div className="container abm-brand-page">
        <h1 className="title">Creá una Marca</h1>
        <Formik
          initialValues={{ nombre: "" }} // Valores iniciales del formulario
          validationSchema={brandSchema} // Esquema de validación
          onSubmit={onSubmit} // Función al enviar el formulario
        >
          {({ isSubmitting }) => (
            <Form>
              <ABMInputComponent
                label="NOMBRE"
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre de la marca"
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
      </div>
    </div>
  );
};

export default ABMBrandPage;
