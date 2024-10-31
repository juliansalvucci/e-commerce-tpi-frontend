import React from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const DatePickerComponent = ({ label, fullWidth, ...props }) => {
  const { setFieldValue } = useFormikContext(); // Obtener la función para actualizar el valor del campo en Formik
  const [field, meta] = useField(props); // useField permite obtener el valor y el error asociado al campo

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        label={label}
        value={field.value || null}
        onChange={(value) => setFieldValue(field.name, value)} // Actualizar el valor en Formik cuando cambia el DatePicker
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error ? meta.error : ""}
        sx={{
          maxWidth: "1500px", // Ajuste del ancho similar al ABMInputComponent
          "& .MuiInputBase-root": {
            backgroundColor: "white",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
