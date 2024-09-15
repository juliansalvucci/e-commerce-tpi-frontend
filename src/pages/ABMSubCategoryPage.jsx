import { Form, Formik } from "formik";
import { subCategorySchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import ABMBackButtonComponent from "../components/ABMBackButtonComponent";

const onSubmit = async (values, actions) => {
  /*console.log(values);
    console.log(actions);*/
  /*Aca iría la llamada a la API para crear la subcategoría*/
  console.log("Creando SubCategoría...");
  actions.resetForm();
};

const ABMSubCategoryPage = () => {
  return (
    <div className="background">
      <ABMBackButtonComponent />
      <div className="container abm-subcategory-page">
        <h1 className="title">
          Creá una SubCategoría
          <Formik
            initialValues={{ nombre: "", descripcion: "", categoria: "" }}
            validationSchema={subCategorySchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ABMInputComponent
                  label="NOMBRE"
                  name="nombre"
                  type="text"
                  placeholder="Ingrese el nombre"
                />
                <ABMInputComponent
                  label="DESCRIPCIÓN"
                  name="descripcion"
                  type="text"
                  placeholder="Ingrese la descripción"
                />
                <ABMSelectComponent
                  label="CATEGORÍA"
                  name="categoria"
                  placeholder="Seleccione una Categoría"
                >
                  <option value="">Seleccione una Categoría</option>
                  <option value="1">Smartphones</option>
                  <option value="2">TVs</option>
                </ABMSelectComponent>
                <button
                  className="btn-crear"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Crear
                </button>
              </Form>
            )}
          </Formik>
        </h1>
      </div>
    </div>
  );
};
export default ABMSubCategoryPage;
