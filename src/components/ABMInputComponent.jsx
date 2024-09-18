import React from "react";
import { useEffect } from "react";
import { useField, useFormikContext } from "formik";

const formatPrice = (value) => {
  if (!value) return "";
  const number = value.replace(/\D/g, ""); // Elimina cualquier caracter que no sea número
  return "$" + new Intl.NumberFormat().format(number); // Formatea el número con comas
};

const ABMInputComponent = ({ label, id, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const { values } = useFormikContext();

  useEffect(() => {
    if (props.type === "text" && props.name === "precio") {
      const formattedPrice = formatPrice(values[props.name]);
      if (formattedPrice !== values[props.name]) {
        setValue(formattedPrice); // Actualiza el valor formateado en el input
      }
    }
  }, [values[props.name], props.name, setValue]);

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        className={meta.touched && meta.error ? "input-error" : ""}
        {...field}
        {...props}
        id={id} // Esto corrige: The label's for attribute refers to a form field by its name, not its id. This might prevent the browser from correctly autofilling the form and accessibility tools from working correctly.         To fix this issue, refer to form fields by their id attribute.
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default ABMInputComponent;
