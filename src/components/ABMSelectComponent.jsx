import React from "react";
import { useField } from "formik";
import { MenuItem, TextField } from "@mui/material";
import useTextfieldTheme from "../utils/useTextfieldTheme";

const ABMSelectComponent = ({ label, options, fullWidth, ...props }) => {
  const [field, meta] = useField(props); // useField para manejar el campo con Formik

  const styles = useTextfieldTheme();

  return (
    <TextField
      select
      label={label}
      id={label}
      {...field}
      {...props}
      {...styles}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ""}
      style={{
        width: "100%",
        maxWidth: fullWidth ? "" : "400px",
        backgroundColor: "transparent",
      }}
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
