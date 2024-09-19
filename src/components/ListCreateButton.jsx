import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//import { useNavigate } from "react-router-dom";

const ListCreateButton = () => {
  //const navigate = useNavigate();

  const handleClick = () => {
    console.log("Crear Categoría");
    //navigate("/create-category"); // Cambia la ruta según tu configuración
  };

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
      startIcon={<AddIcon />}
      onClick={handleClick}
    >
      Crear Categoría
    </Button>
  );
};

export default ListCreateButton;
