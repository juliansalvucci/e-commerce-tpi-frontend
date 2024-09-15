import { Form, Formik } from "formik";
import { productSchema } from "../schemas";
import ABMInputComponent from "../components/ABMInputComponent";
import ABMSelectComponent from "../components/ABMSelectComponent";
import ABMBackButtonComponent from "../components/ABMBackButtonComponent";

const onSubmit = async (values, actions) => {
  /*console.log(values);
    console.log(actions);*/
  /*Aca iría la llamada a la API para crear el producto*/
  console.log("Creando Producto...");
  actions.resetForm();
};

const ABMProductPage = () => {
  return (
    <div className="background">
      <ABMBackButtonComponent />
      <div className="container abm-product-page">
        <h1 className="title">
          Creá un Producto
          <Formik
            initialValues={{ nombre: "", descripcion: "", precio: "", marca: "", subcategoria: "" }}
            validationSchema={productSchema}
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
                <ABMInputComponent
                  label="PRECIO"
                  name="precio"
                  type="text"
                  placeholder="Ingrese el precio"
                />
                <ABMSelectComponent
                  label="MARCA"
                  name="marca"
                  placeholder="Seleccione una Marca"
                >
                  <option value="">Seleccione una Marca</option>
                  {/*Aca iría la llamada a la API para traer las Marcas (creo)*/}
                  <option value="1">Samsung</option>
                  <option value="2">Apple</option>
                </ABMSelectComponent>
                <ABMSelectComponent
                  label="SUBCATEGORIA"
                  name="subcategoria"
                  placeholder="Seleccione una Subcategoría"
                >
                  <option value="">Seleccione una Subcategoría</option>
                  {/*Aca iría la llamada a la API para traer las Subcategorías (creo)*/}
                  <option value="1">SC1</option>
                  <option value="2">SC2</option>
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
export default ABMProductPage;
