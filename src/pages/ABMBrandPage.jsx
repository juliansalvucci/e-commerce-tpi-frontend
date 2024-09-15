import React from "react";
import { useFormik } from "formik";
import { marcaSchema } from "../schemas";
import "../styles/ABM.css";
import ABMBackButtonComponent from "../components/ABMBackButtonComponent";

const onSubmit = async (actions) => {
  //Aca iría la llamada a la API para crear una marca
  actions.resetForm();
};

const ABMMarcaPage = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setTouched,
  } = useFormik({
    initialValues: {
      nombre: "",
    },
    validationSchema: marcaSchema,
    onSubmit,
  });

  //console.log(errors);

  return (
    //Formulario de creación de marca
    <div className="background">
      <ABMBackButtonComponent />
      <div className="container abm-brand-page">
        <h1 className="title">
          Creá una marca
          <form onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor="nombre">NOMBRE</label>
            <input
              id="nombre"
              value={values.nombre}
              type="text"
              placeholder="Ingrese el nombre"
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.nombre && touched.nombre ? "input-error" : ""
              } //Para que aparezca el error
              onFocus={() =>
                touched.nombre && setTouched({ ...touched, nombre: false })
              } //Para que se limpie el error
            />
            {errors.nombre && touched.nombre && (
              <p className="error">{errors.nombre}</p>
            )}
            <button className="btn-crear" disabled={isSubmitting} type="submit">
              Crear
            </button>
          </form>
        </h1>
      </div>
    </div>
  );
};

export default ABMMarcaPage;
