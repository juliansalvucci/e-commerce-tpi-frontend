import React from "react";
import { Button } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ListShowDeletedButton = ({ showDeleted, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "black",
        color: "white",
        "&:hover": {
          backgroundColor: "grey",
        },
      }}
      startIcon={showDeleted ? <VisibilityIcon /> : <VisibilityOffIcon />}
      onClick={onClick}
    >
      {showDeleted ? "No mostrar eliminadas" : "Mostrar eliminadas"}
    </Button>
  );
};

export default ListShowDeletedButton;
