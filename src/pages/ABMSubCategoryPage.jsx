import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import ABMActionButton from "../components/ABMActionButton";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import { CategoryContext } from "../context/CategoryContext";
import { SubCategoryContext } from "../context/SubCategoryContext";
import { subCategorySchema } from "../schemas";
import "../styles/ABM.css";

const ABMSubCategoryPage = () => {
  const { createSubCategory, editSubCategory, selectedSubCategory } =
    useContext(SubCategoryContext);

  const { categories } = useContext(CategoryContext);

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!selectedSubCategory) {
        await createSubCategory({
          name: values.nombre,
          categoryId: values.categoria,
        });
        resetForm(); // (VER) No va aca. Si hay error, no quiero que se resetee
      } else {
        await editSubCategory(selectedSubCategory.id, {
          name: values.nombre,
          categoryId: values.categoria,
        });
      }
    } catch (error) {
      console.error("Error al crear o editar subcategoría:", error); // Por ahora mostramos el error por consola por comodidad
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="background" sx={{}}>
      <Box className="container abm-subcategory-page">
        {/*Typography queda muy feo aca, mejor HTML*/}
        <h2 className="title">
          {selectedSubCategory
            ? "Editar Subcategoría"
            : "Creá una Subcategoría"}
          <p className="subtitle">
            {selectedSubCategory ? `${selectedSubCategory.name}` : ""}
          </p>
        </h2>
        <Formik
          initialValues={{
            nombre: selectedSubCategory?.name || "",
            categoria: selectedSubCategory?.categoryId || "",
          }}
          validationSchema={subCategorySchema}
          validateOnChange={true}
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
                  }))}
                />
              </Box>
              <ABMActionButton
                is={isSubmitting}
                accion={selectedSubCategory ? "Guardar" : "Crear"}
                tipoClase="Subcategoría"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ABMSubCategoryPage;
