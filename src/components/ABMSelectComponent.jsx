import React from "react";
import { useField } from "formik";
import { MenuItem, TextField } from "@mui/material";

const ABMSelectComponent = ({ label, options, fullWidth, ...props }) => {
  const [field, meta] = useField(props); // useField para manejar el campo con Formik

  const styles = {
    variant: "filled",
    InputProps: {
      style: {
        borderColor: meta.touched && meta.error ? "red" : "#d7c4ab",
        color: "white",
      },
    },
    InputLabelProps: {
      style: {
        color: meta.touched && meta.error ? "red" : "#d1d1d1",
      },
    },
  };

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
