import React from "react";
import { Formik, Form } from "formik";
import { brandSchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMBackButton from "../components/ABMBackButton";
import axios from "axios";
import "../styles/ABM.css";

// Función que se ejecutará al enviar el form
const onSubmit = async (values, { resetForm, setSubmitting }) => {
  try {
    const response = await axios.post("http://localhost:8080/brand", {
      name: values.nombre,
    });
    console.log("Respuesta del servidor:", response.data);
    alert(`Marca creada con éxito: ${response.data.name}`);
    resetForm();
  } catch (error) {
    console.error("Error en el registro:", error);
    alert("Hubo un error al crear la marca.");
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
    <div className="background">
      <ABMBackButton />
      <div className="container abm-brand-page">
        <h1 className="title">Creá una Marca</h1>
        <Formik
          initialValues={{ nombre: "" }}
          validationSchema={brandSchema}
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
