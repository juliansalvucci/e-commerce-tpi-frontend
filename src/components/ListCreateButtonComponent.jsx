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
      sx={{
        backgroundColor: "black",   // Color de fondo negro
        color: "white",             // Texto en blanco
        "&:hover": {
          backgroundColor: "grey",  // Color al pasar el mouse (hover)
        },
      }}
      startIcon={<AddIcon />}
      onClick={handleClick}
    >
      Crear Categoría
    </Button>
  );
};

export default ListCreateButtonComponent;
