import React from "react";
import { Stack, Checkbox, FormControlLabel } from "@mui/material";

const ListOrderFilters = ({
  todayFilter,
  setTodayFilter,
  lastWeekFilter,
  setLWFilter,
  lastMonthFilter,
  setLMFilter,
}) => {
  const style = {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Stack direction="row" spacing={1} style={style}>
      <FormControlLabel
        style={style}
        control={
          <Checkbox
            style={style}
            checked={todayFilter}
            onChange={(e) => setTodayFilter(e.target.checked)}
          />
        }
        label="Diario"
      />
      <FormControlLabel
        style={style}
        control={
          <Checkbox
            style={style}
            checked={!!lastWeekFilter}
            onChange={(e) => setLWFilter(e.target.checked)}
          />
        }
        label="Semanal"
        disabled // DT: Deshabilitado hasta que se agregue la funcionalidad
      />
      <FormControlLabel
        style={style}
        control={
          <Checkbox
            style={style}
            checked={!!lastMonthFilter}
            onChange={(e) => setLMFilter(e.target.checked)}
          />
        }
        label="Mensual"
        disabled // DT: Deshabilitado hasta que se agregue la funcionalidad
      />
    </Stack>
  );
};

export default ListOrderFilters;
