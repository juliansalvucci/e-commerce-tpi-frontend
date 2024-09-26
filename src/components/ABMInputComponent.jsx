import React from "react";
import { useField } from "formik";

const ABMInputComponent = ({ label, id, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        className={meta.touched && meta.error ? "input-error" : ""}
        {...field}
        {...props}
        id={id} // Esto corrige: The label's for attribute refers to a form field by its name, 
        // not its id. This might prevent the browser from correctly autofilling the form and 
        // accessibility tools from working correctly. To fix this issue, refer to form fields
        // by their id attribute.
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default ABMInputComponent;
