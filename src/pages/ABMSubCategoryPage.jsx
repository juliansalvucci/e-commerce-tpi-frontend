import React from "react";
import { Formik, Form } from "formik";
import { subCategorySchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import ABMBackButton from "../components/ABMBackButton";
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

const ABMSubCategoryPage = () => {
  /*
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  // useEffect para obtener las categorías desde la API
  useEffect(() => {
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
  */
  // Por ahora, dummy data
  const categoryOptions = [
    { value: "1", label: "Computación" }, // Cuando haga el fetch, value será el id de categoría, label el nombre
    { value: "2", label: "Celulares y Accesorios" },
  ];

  return (
    <div className="background">
      <ABMBackButton />
      <div className="container abm-subcategory-page">
        <h1 className="title">Creá una SubCategoría</h1>
        <Formik
          initialValues={{ nombre: "", descripcion: "", categoria: "" }} // Valores iniciales del formulario
          validationSchema={subCategorySchema} // Esquema de validación
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
              <ABMSelectComponent
                label="CATEGORÍA"
                id="categoria"
                name="categoria"
                options={categoryOptions}
                /*options={categories.map((cat) => ({
                    //value: cat.id, // Usamos el ID de la categoría como valor
                    //label: cat.name, // Usamos el nombre de la categoría como label
                  }))}*/ // Pasamos las categorías que vienen del estado
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

export default ABMSubCategoryPage;
