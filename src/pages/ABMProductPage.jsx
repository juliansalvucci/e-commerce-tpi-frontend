import React from "react";
import { Formik, Form } from "formik";
import { productSchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import ABMBackButton from "../s/ABMBackButton";
//import axios from "axios";
import "../styles/ABM.css";

// Función que se ejecutará al enviar el form
const onSubmit = async (values, { resetForm }) => {
  /*
  try {
    const response = await axios.post(
      "http://localhost:8080/subcategory",
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

const ABMProductPage = () => {
  /*
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
  }, []); // Solo se ejecuta una vez cuando el e se monta

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
  }, []); // Solo se ejecuta una vez cuando el e se monta
  */

  // Por ahora, dummy data
  const brandOptions = [
    { value: "1", label: "Samsung" }, // Cuando haga el fetch, value será el id de categoría, label el nombre
    { value: "2", label: "Apple" },
  ];
  const subCategoryOptions = [
    { value: "1", label: "Celulares" }, // Cuando haga el fetch, value será el id de categoría, label el nombre
    { value: "2", label: "Accesorios de Celular" },
  ];

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
            marca: "",
            subcategoria: "",
          }} // Valores iniciales del formulario
          validationSchema={productSchema} // Esquema de validación
          onSubmit={onSubmit} // Función al enviar el formulario
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
              <ABMInputComponent
                label="PRECIO"
                id="precio"
                name="precio"
                type="text"
                placeholder="Ingrese el precio"
              />
              <ABMSelectComponent
                label="MARCA"
                id="marca"
                name="marca"
                options={brandOptions} // Esta linea se va cuando lo de abajo se testee
                /*options={brands.map((brand) => ({
                    //value: brand.id, // Usamos el ID de la marca como valor
                    //label: brand.name, // Usamos el nombre de la marca como label
                  }))}*/ // Pasamos las marcas que vienen del estado
              />
              <ABMSelectComponent
                label="SUBCATEGORÍA"
                id="subcategoria"
                name="subcategoria"
                options={subCategoryOptions} // Esta linea se va cuando lo de abajo se testee
                /*options={subCategories.map((subCat) => ({
                    //value: subCat.id, // Usamos el ID de la subcategoría como valor
                    //label: subCat.name, // Usamos el nombre de la subcategoría como label
                  }))}*/ // Pasamos las subcategorías que vienen del estado
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

export default ABMProductPage;
