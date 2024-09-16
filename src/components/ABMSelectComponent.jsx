import React from "react";
import { useField } from "formik";

const ABMSelectComponent = ({ label, id, options, ...props }) => {
  const [field, meta] = useField(props); // useField para manejar el campo con Formik

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        {...field}
        {...props} // Pasa las propiedades adicionales al select
        id={id} // Esto corrige: The label's for attribute refers to a form field by its name, not its id. This might prevent the browser from correctly autofilling the form and accessibility tools from working correctly.
        className={meta.touched && meta.error ? "input-error" : ""}
      >
        <option value="">Seleccione una opción</option>{" "}
        {/* Opción por defecto */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default ABMSelectComponent;
