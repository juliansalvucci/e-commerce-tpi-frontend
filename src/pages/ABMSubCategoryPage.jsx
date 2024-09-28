import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import { subCategorySchema } from "../schemas";
import "../styles/ABM.css";
import isUnique from "../utils/isUniqueUtils";

// Función que se ejecutará al enviar el form
const onSubmit = async (
  values,
  { resetForm, setSubmitting, setFieldError }
) => {
  try {
    const isUniqueResult = await isUnique("subcategory", values.nombre);
    if (!isUniqueResult) {
      setFieldError("nombre", "Ya existe una marca con ese nombre");
      setSubmitting(false);
      return;
    }
    const response = await axios.post("http://localhost:8080/subcategory", {
      name: values.nombre,
      categoryId: values.categoria,
    });
    //console.log("Respuesta del servidor:", response.data);
    const subCategoryDetails = `
      <ul>
        <p><strong>Nombre:</strong> ${response.data.name}</p>
        <p><strong>Categoría:</strong> ${response.data.category}</p>
      </ul>
    `;
    Swal.fire({
      icon: "success",
      title: "Exito!",
      text: `El producto ${response.data.name} fue creado con éxito!`,
      html: subCategoryDetails,
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
      title: "Hubo un error al crear la subcategoria",
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

const ABMSubCategoryPage = () => {
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  useEffect(() => {
    // useEffect para obtener las categorías desde la API
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories(); // Llamada a la API cuando el componente se monta
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <Box className="background" sx={{}}>
      <Box className="container abm-subcategory-page">
        <h2 className="title">Creá una SubCategoría</h2>
        <Formik
          initialValues={{ nombre: "", categoria: "" }}
          validationSchema={subCategorySchema}
          validateOnBlur={true} // Solo valida al perder foco
          validateOnChange={false} // Deshabilitar validación en cada cambio
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
                <ABMInputComponent
                  label="Nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingrese el nombre"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <ABMSelectComponent
                  label="Categoría"
                  name="categoria"
                  options={categories.map((cat) => ({
                    value: cat.id, // Usamos el ID de la categoría como valor
                    label: cat.name, // Usamos el nombre de la categoría como label
                  }))} // Pasamos las categorías que vienen del estado
                />
              </Box>
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

export default ABMSubCategoryPage;
