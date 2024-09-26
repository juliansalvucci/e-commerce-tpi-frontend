import React from "react";
import { Formik, Form } from "formik";
import { categorySchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMBackButton from "../components/ABMBackButton";
import axios from "axios";
import "../styles/ABM.css";

// Función que se ejecutará al enviar el form
const onSubmit = async (values, { resetForm, setSubmitting }) => {
  try {
    const response = await axios.post("http://localhost:8080/category", {
      name: values.nombre,
      description: values.descripcion,
    });
    console.log("Respuesta del servidor:", response.data);
    alert(`Categoria creada con éxito: ${response.data.name}`);
    resetForm();
  } catch (error) {
    console.error("Error en el registro:", error);
    alert("Hubo un error al crear la categoria.");
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
    <div className="background">
      <ABMBackButton />
      <div className="container abm-category-page">
        <h1 className="title">Creá una Categoría</h1>
        <Formik
          initialValues={{ nombre: "", descripcion: "" }}
          validationSchema={categorySchema}
          validateOnBlur={true} // Solo valida al perder foco
          validateOnChange={false} // Deshabilitar validación en cada cambio
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <ABMInputComponent
                label="NOMBRE"
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre"
              />
              <ABMInputComponent
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
