import React, { useContext, useState } from "react";
import {
  Box,
  InputAdornment,
  FormControl,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";
import { SubCategoryContext } from "../context/SubCategoryContext";
import { productSchema } from "../schemas";

const ABMProductPage = () => {
  const { createProduct, editProduct, selectedProduct } =
    useContext(ProductContext);
  const { brands } = useContext(BrandContext);
  const { categories, findCategoryById } = useContext(CategoryContext);
  const { subCategories } = useContext(SubCategoryContext);

  const [selectedCategoryP, setselectedCategoryP] = useState("");
  const [filteredSubCategories, setFilteredSC] = useState(subCategories);

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!selectedProduct) {
        await createProduct({
          name: values.nombre.trim(), // trim(): Quitar espacios al final (y al principio)
          description: values.descripcion.trim(),
          price: values.precio,
          stock: values.stock,
          stockMin: values.stockMin,
          imageURL: values.imagen,
          color: values.color,
          size: values.tamaño,
          brandId: values.marca,
          subCategoryId: values.subcategoria,
        });
        resetForm(); // (VER) No va aca. Si hay error, no quiero que se resetee
      } else {
        await editProduct(selectedProduct.id, {
          name: values.nombre,
          description: values.descripcion,
          price: values.precio,
          stock: values.stock,
          stockMin: values.stockMin,
          imageURL: values.imagen,
          color: values.color,
          size: values.tamaño,
          brandId: values.marca,
          subCategoryId: values.subcategoria,
        });
      }
    } catch (error) {
      console.error("Error al crear o editar producto:", error); // Por ahora mostramos el error por consola por comodidad
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#233349",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        color="white"
        gutterBottom
        sx={{ fontFamily: "Poppins" }}
      >
        {selectedProduct ? "Editar Producto" : "Crear Producto"}
        <Typography
          variant="overline"
          align="center"
          color="white"
          gutterBottom
          sx={{ display: "block", fontFamily: "Poppins" }}
        >
          {selectedProduct ? `${selectedProduct.name}` : ""}
        </Typography>
      </Typography>
      <Box
        sx={{
          backgroundColor: "#283b54",
          borderRadius: "20px",
          padding: 3,
          width: "90%",
        }}
      >
        <Formik
          initialValues={{
            nombre: selectedProduct?.name || "",
            color: selectedProduct?.color || "",
            tamaño: selectedProduct?.size || "",
            marca: selectedProduct?.brandId || "",
            categoría: selectedProduct?.categoryId || "",
            subcategoria: selectedProduct?.subCategoryId || "",
            precio: selectedProduct?.price || "",
            stock: selectedProduct?.stock || "",
            stockMin: selectedProduct?.stockMin || "",
            descripcion: selectedProduct?.description || "",
            imagen: selectedProduct?.imageURL || "",
          }}
          validationSchema={productSchema}
          validateOnChange={true}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                <ABMInputComponent
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingrese el nombre"
                />
                <ABMInputComponent
                  label="Color"
                  name="color"
                  type="text"
                  placeholder="Ingrese el color"
                />
                <ABMInputComponent
                  label="Tamaño"
                  name="tamaño"
                  type="text"
                  placeholder="Ingrese el tamaño"
                />
              </Stack>
              <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                <ABMSelectComponent
                  fullWidth
                  label="Marca"
                  id="marca"
                  name="marca"
                  options={brands.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  }))}
                />
                <ABMSelectComponent
                  label="Categoría"
                  id="categoria"
                  name="categoría"
                  options={categories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                  onChange={(event) => {
                    const categoryId = event.target.value;
                    const categoryName = findCategoryById(categoryId);
                    setFieldValue("categoría", categoryId);
                    setselectedCategoryP(categoryId);
                    setFieldValue("subcategoria", "");
                    setFilteredSC(
                      subCategories.filter(
                        (subCat) => subCat.category === categoryName
                      )
                    );
                  }}
                />
                <ABMSelectComponent
                  label="Subcategoría"
                  id="subcategoria"
                  name="subcategoria"
                  options={filteredSubCategories.map((subCat) => ({
                    value: subCat.id,
                    label: subCat.name,
                  }))}
                  disabled={selectedProduct ? false : !selectedCategoryP}
                />
              </Stack>
              <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <ABMInputComponent
                    fullWidth
                    label="Precio"
                    name="precio"
                    type="number"
                    step="100.0"
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
                  label="Alerta de Stock"
                  name="stockMin"
                  type="number"
                  placeholder="Ingresar el stock mínimo de alerta"
                />
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <ABMInputComponent
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  type="text"
                  placeholder="Ingrese la descripción"
                  multiline
                  maxRows={2}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <ABMInputComponent
                  fullWidth
                  label="Imagen"
                  name="imagen"
                  type="text"
                  placeholder="Ingrese la URL de la imagen"
                />
              </Box>
              <ABMActionButton
                is={isSubmitting}
                accion={selectedProduct ? "Guardar" : "Crear"}
                tipoClase="Producto"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ABMProductPage;
