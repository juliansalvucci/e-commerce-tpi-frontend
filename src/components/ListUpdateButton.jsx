import React from "react";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
//import { useNavigate } from "react-router-dom";

const ListUpdateButton = () => {
  //const navigate = useNavigate();

  const handleClick = () => {
    console.log("Actualizar lista");
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "black", // Color de fondo negro
        color: "white", // Texto en blanco
        "&:hover": {
          backgroundColor: "grey", // Color al pasar el mouse (hover)
        },
      }}
      startIcon={<RefreshIcon />}
      onClick={handleClick}
    >
      Actualizar Lista
    </Button>
  );
};

export default ListUpdateButton;
