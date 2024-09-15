import React from "react";
import { useEffect } from "react";
import { useField, useFormikContext } from "formik";

const formatPrice = (value) => {
  if (!value) return "";
  const number = value.replace(/\D/g, ""); // Elimina cualquier caracter que no sea número
  return "$" + new Intl.NumberFormat().format(number); // Formatea el número con comas
};

const ABMInputComponent = ({ label, ...props }) => {
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
    <>
      <label>{label}</label>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};
export default ABMInputComponent;
