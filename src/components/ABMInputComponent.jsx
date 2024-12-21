import React from "react";
import { useLocation } from "react-router-dom";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

const ABMInputComponent = ({ label, fullWidth, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const location = useLocation();

  // Determinar el estilo según la ruta actual
  const isAdminRoute = location.pathname.startsWith("/admin/");
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";

  const styles = isLoginOrRegister
    ? {
        variant: "outlined",
      }
    : {
        variant: isAdminRoute ? "filled" : "outlined",
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
      label={label}
      id={label}
      {...field}
      {...props}
      {...styles}
      placeholder={placeholder}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ""}
      style={{
        width: "100%",
        maxWidth: fullWidth ? "" : isAdminRoute ? "400px" : "",
        backgroundColor: isAdminRoute ? "transparent" : "initial",
      }}
    />
  );
};

export default ABMInputComponent;
