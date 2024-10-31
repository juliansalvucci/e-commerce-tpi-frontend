import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ListCreateStockEntry = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#283b54",
        color: "white",
        "&:hover": {
          backgroundColor: "#bed0dd",
          color: "black",
        },
      }}
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      Crear Entrada de Stock
    </Button>
  );
};

export default ListCreateStockEntry;
