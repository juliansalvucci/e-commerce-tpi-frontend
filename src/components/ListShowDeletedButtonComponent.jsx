import React from "react";
import { Button } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ListShowDeletedButtonComponent = ({ showDeleted, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "black",   // Color de fondo negro
        color: "white",             // Texto en blanco
        "&:hover": {
          backgroundColor: "grey",  // Color al pasar el mouse (hover)
        },
      }}
      startIcon={showDeleted ? <VisibilityIcon /> : <VisibilityOffIcon />}
      onClick={onClick}
    >
      {showDeleted ? "No mostrar eliminadas" : "Mostrar eliminadas"}
    </Button>
  );
};

export default ListShowDeletedButtonComponent;
