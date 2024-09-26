import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { productSchema } from "../schemas";
import { Stack, Box } from "@mui/material";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import ABMBackButton from "../components/ABMBackButton";
import axios from "axios";
import "../styles/ABM.css";

// Función que se ejecutará al enviar el form
const onSubmit = async (values, { resetForm, setSubmitting }) => {
  try {
    const response = await axios.post("http://localhost:8080/product", {
      name: values.nombre,
      description: values.descripcion,
      price: values.precio,
      stock: values.stock,
      stockMin: values.stockMin,
      imageURL: values.imagen,
      brandId: values.marca,
      subCategoryId: values.subcategoria,
    });
    console.log("Respuesta del servidor:", response.data);
    alert(`SubCategoria creada con éxito: ${response.data.name}`);
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

const ABMProductPage = () => {
  const [subCategories, setSubCategories] = useState([]); // Estado para las subcategorías
  // useEffect para obtener las subcategorías
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/subcategory");
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error al obtener las subcategorías:", error);
      }
    };
    fetchSubCategories();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const [brands, setBrands] = useState([]); // Estado para las marcas
  // useEffect para obtener las marcas
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:8080/brand");
        setBrands(response.data);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };
    fetchBrands();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="background">
      <ABMBackButton />
      <div className="container abm-product-page">
        <h1 className="title">Creá un Producto</h1>
        <Formik
          initialValues={{
            nombre: "",
            descripcion: "",
            precio: "",
            stock: "",
            stockMin: "",
            imagen: "",
            marca: "",
            subcategoria: "",
          }}
          validationSchema={productSchema}
          validateOnBlur={true} // Solo valida al perder foco
          validateOnChange={false} // Deshabilitar validación en cada cambio
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={2} direction="row">
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
                <ABMInputComponent
                  label="PRECIO"
                  id="precio"
                  name="precio"
                  type="number"
                  step="0.01" // Permito decimales
                  placeholder="Ingrese el precio"
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <ABMInputComponent
                  label="STOCK"
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Ingrese el stock disponible"
                />
                <ABMInputComponent
                  label="STOCK MÍNIMO"
                  id="stockMin"
                  name="stockMin"
                  type="number"
                  placeholder="Ingrese el stock mínimo"
                />
                <ABMInputComponent
                  label="IMAGEN"
                  id="imagen"
                  name="imagen"
                  type="text"
                  placeholder="Ingrese la URL de la imagen"
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <ABMSelectComponent
                  label="MARCA"
                  id="marca"
                  name="marca"
                  options={brands.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  }))}
                />
                <ABMSelectComponent
                  label="SUBCATEGORÍA"
                  id="subcategoria"
                  name="subcategoria"
                  options={subCategories.map((subCat) => ({
                    value: subCat.id,
                    label: subCat.name,
                  }))}
                />
              </Stack>
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

export default ABMProductPage;
