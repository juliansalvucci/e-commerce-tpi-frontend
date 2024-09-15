import { Form, Formik } from "formik";
import { categorySchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMBackButtonComponent from "../components/ABMBackButtonComponent";

const onSubmit = async (values, actions) => {
  /*console.log(values);
    console.log(actions);*/
  /*Aca iría la llamada a la API para crear la categoría*/
  console.log("Creando Categoría...");
  actions.resetForm();
};

const ABMCategoryPage = () => {
  return (
    <div className="background">
      <ABMBackButtonComponent />
      <div className="container abm-category-page">
        <h1 className="title">
          Creá una Categoría
          <Formik
            initialValues={{ nombre: "", descripcion: "" }}
            validationSchema={categorySchema}
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
export default ABMCategoryPage;
