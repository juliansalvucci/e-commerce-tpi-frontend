import React from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DatePickerComponent = ({ label, fullWidth, ...props }) => {
  const { setFieldValue } = useFormikContext(); // Obtener la función para actualizar el valor del campo en Formik
  const [field, meta] = useField(props); // useField permite obtener el valor y el error asociado al campo

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label={label}
      value={field.value || null} // El valor del campo de fecha
      onChange={(value) => setFieldValue(field.name, value)} // Actualizar el valor en Formik cuando cambia el DatePicker
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          fullWidth={fullWidth}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error ? meta.error : ""}
        />
      )}
      {...props}
    />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
