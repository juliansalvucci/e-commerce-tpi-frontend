import React from "react";
import { Formik, Form } from "formik";
import { categorySchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMBackButton from "../s/ABMBackButton";
//import axios from "axios";
import "../styles/ABM.css";

// Función que se ejecutará al enviar el form
const onSubmit = async (values, { resetForm }) => {
  /*
  try {
    const response = await axios.post(
      "http://localhost:8080/category",
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

const ABMCategoryPage = () => {
  return (
    <div className="background">
      <ABMBackButton />
      <div className="container abm-category-page">
        <h1 className="title">Creá una Categoría</h1>
        <Formik
          initialValues={{ nombre: "", descripcion: "" }} // Valores iniciales del formulario
          validationSchema={categorySchema} // Esquema de validación
          onSubmit={onSubmit} // Función al enviar el formulario
        >
          {({ isSubmitting }) => (
            <Form>
              <ABMInput
                label="NOMBRE"
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre"
              />
              <ABMInput
                label="DESCRIPCIÓN"
                id="descripcion"
                name="descripcion"
                type="text"
                placeholder="Ingrese la descripción"
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

export default ABMCategoryPage;
