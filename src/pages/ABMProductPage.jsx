import React, { useState, useEffect } from "react";
import { Box, Stack, FormControl, InputAdornment } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import { productSchema } from "../schemas";
import "../styles/ABM.css";
import isUnique from "../utils/isUniqueUtils";

// Función que se ejecutará al enviar el form
const onSubmit = async (
  values,
  { resetForm, setSubmitting, setFieldError }
) => {
  try {
    const isUniqueResult = await isUnique("product", values.nombre);
    if (!isUniqueResult) {
      setFieldError("nombre", "Ya existe un producto con ese nombre");
      setSubmitting(false);
      return;
    }
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
    //console.log("Respuesta del servidor:", response.data);
    const productDetails = `
      <ul>
        <p><strong>Nombre:</strong> ${response.data.name}</p>
        <p><strong>Marca:</strong> ${response.data.brand}</p>
        <p><strong>Subcategoria:</strong> ${response.data.subCategory}</p>
        <p><strong>Precio:</strong> ${response.data.price}</p>
        <p><strong>Stock:</strong> ${response.data.stock}</p>
        <p><strong>Stock Min.:</strong> ${response.data.stockMin}</p>
        <p><strong>Descripción:</strong> ${response.data.description}</p>
      </ul>
    `;
    Swal.fire({
      icon: "success",
      title: "Exito!",
      text: `El producto ${response.data.name} fue creado con éxito!`,
      html: productDetails,
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
      title: "Hubo un error al crear el producto",
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

const ABMProductPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // useEffect para obtener subcategorías y marcas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subCategoriesResponse, brandsResponse] = await Promise.all([
          axios.get("http://localhost:8080/subcategory"),
          axios.get("http://localhost:8080/brand"),
        ]);
        setSubCategories(subCategoriesResponse.data);
        setBrands(brandsResponse.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <Box className="background" sx={{}}>
      <Box className="container abm-product-page">
        {/* Typography queda muy feo aca, mejor HTML*/}
        <h1 className="title">Creá un Producto</h1>
        <Formik
          initialValues={{
            nombre: "",
            marca: "",
            subcategoria: "",
            precio: "",
            stock: "",
            stockMin: "",
            descripcion: "",
            imagen: "",
          }}
          validationSchema={productSchema}
          validateOnChange={true}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                <ABMInputComponent
                  label="Nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingrese el nombre"
                />
                <ABMSelectComponent
                  label="Marca"
                  id="marca"
                  name="marca"
                  options={brands.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  }))}
                />
                <ABMSelectComponent
                  label="Subcategoría"
                  id="subcategoria"
                  name="subcategoria"
                  options={subCategories.map((subCat) => ({
                    value: subCat.id,
                    label: subCat.name,
                  }))}
                />
              </Stack>
              <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <ABMInputComponent
                    label="Precio"
                    name="precio"
                    type="number"
                    step="0.01" // Permito decimales
                    placeholder="Ingrese el precio"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <ABMInputComponent
                  label="Stock"
                  name="stock"
                  type="number"
                  placeholder="Ingrese el stock disponible"
                />
                <ABMInputComponent
                  label="Stock Mínimo"
                  name="stockMin"
                  type="number"
                  placeholder="Ingrese el stock mínimo"
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <ABMInputComponent
                  label="Descripción"
                  name="descripcion"
                  type="text"
                  placeholder="Ingrese la descripción"
                  multiline
                  maxRows={2}
                />
                <ABMInputComponent
                  label="Imagen"
                  name="imagen"
                  type="text"
                  placeholder="Ingrese la URL de la imagen"
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
      </Box>
    </Box>
  );
};

export default ABMProductPage;
