import React from "react";
import { Button } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ListShowDeletedButtonComponent = ({ showDeleted, onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={showDeleted ? <VisibilityIcon /> : <VisibilityOffIcon />}
      onClick={onClick}
    >
      {showDeleted ? "No mostrar eliminadas" : "Mostrar eliminadas"}
    </Button>
  );
};

export default ListShowDeletedButtonComponent;
