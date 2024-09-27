import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

const ABMInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      label={label}
      id={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ""}
      variant="outlined"
    />
  );
};

export default ABMInputComponent;
