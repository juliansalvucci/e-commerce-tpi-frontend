import React from "react";
import { useField } from "formik";
import { MenuItem, TextField } from "@mui/material";

const ABMSelectComponent = ({ label, options, ...props }) => {
  const [field, meta] = useField(props); // useField para manejar el campo con Formik

  return (
    <TextField
      fullWidth
      select
      label={label}
      id={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ""}
      variant="outlined"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ABMSelectComponent;
