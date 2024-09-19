import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//import { useNavigate } from "react-router-dom";

const ListCreateButtonComponent = () => {
  //const navigate = useNavigate();

  const handleClick = () => {
    console.log("Crear Categoría");
    //navigate("/create-category"); // Cambia la ruta según tu configuración
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleClick}
    >
      Crear Categoría
    </Button>
  );
};

export default ListCreateButtonComponent;
