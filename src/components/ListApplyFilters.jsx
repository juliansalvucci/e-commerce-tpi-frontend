import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ListApplyFilters = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#283b54",
        width: "100%",
        maxWidth: "200px",
        color: "white",
        "&:hover": {
          backgroundColor: "#bed0dd",
          color: "black",
        },
      }}
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      Aplicar Filtros
    </Button>
  );
};

export default ListApplyFilters;
