import React from "react";
import { useLocation } from "react-router-dom";
import { useField, useFormikContext } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import dayjs from "dayjs";
import { backdropClasses } from "@mui/material";

const DatePickerComponent = ({ label, fullWidth, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const location = useLocation();

  // Determinar el estilo según la ruta actual
  const isAdminRoute = location.pathname.startsWith("/admin/");
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";

  const styles = isLoginOrRegister
    ? { variant: "outlined" }
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

  const handleDateChange = (value) => {
    const formattedValue = value ? value.format("YYYY-MM-DD") : ""; // LocalDate format
    setFieldValue(field.name, formattedValue);
  };

  const handleManualInput = (event) => {
    const inputValue = event.target.value;
    const parsedDate = dayjs(inputValue, "DD/MM/YYYY", true);
    if (parsedDate.isValid()) {
      setFieldValue(field.name, parsedDate.format("YYYY-MM-DD")); // Format for backend
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        {...props}
        label={label}
        value={field.value ? dayjs(field.value) : null}
        onChange={handleDateChange}
        onBlur={handleManualInput}
        format="DD/MM/YYYY"
        views={["day", "month", "year"]}
        maxDate={dayjs()}
        yearsOrder="desc"
        slotProps={{
          textField: {
            fullWidth: fullWidth || false,
            variant: styles.variant,
            error: meta.touched && Boolean(meta.error),
            helperText: meta.touched && meta.error ? meta.error : "",
            InputProps: styles.InputProps,
            InputLabelProps: styles.InputLabelProps,
          },
          previousIconButton: { disabled: true },
          nextIconButton: { disabled: true },
          openPickerIcon: { style: { color: "white" } },
        }}
        sx={{
          maxWidth: isAdminRoute ? "400px" : "1500px",
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
