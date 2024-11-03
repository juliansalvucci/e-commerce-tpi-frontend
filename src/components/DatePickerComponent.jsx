import React from "react";
import { useLocation } from "react-router-dom";
import { useField, useFormikContext } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es"; // Asegúrate de importar el idioma español para dayjs
import dayjs from "dayjs";

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
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        {...props}
        label={label}
        value={field.value ? dayjs(field.value) : null}
        onChange={(value) => setFieldValue(field.name, value ? value.format("DD/MM/YYYY") : "")}
        format="DD/MM/YYYY"
        views={['day', 'month', 'year']}
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
          previousIconButton: { // Deshabilitados para evitar error al cambiar de mes
            disabled: true,
          },
          nextIconButton: {
            disabled: true,
          }
        }}
        sx={{
          maxWidth: isAdminRoute ? "400px" : "1500px",
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;

