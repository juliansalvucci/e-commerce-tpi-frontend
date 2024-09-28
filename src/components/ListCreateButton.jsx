import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//import { useNavigate } from "react-router-dom";

const ListCreateButton = ({ label }) => {
  //const navigate = useNavigate();

  const handleClick = () => {
    console.log("Crear Categoría");
    //navigate("/create-category"); // Cambia la ruta según tu configuración
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#bed0dd",
        color: "black",
        "&:hover": {
          backgroundColor: "grey",
        },
      }}
      startIcon={<AddIcon />}
      onClick={handleClick}
    >
      Crear {label}
    </Button>
  );
};

export default ListCreateButton;
