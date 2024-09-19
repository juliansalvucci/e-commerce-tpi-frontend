import React from "react";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
//import { useNavigate } from "react-router-dom";

const ListUpdateButtonComponent = () => {
  //const navigate = useNavigate();

  const handleClick = () => {
    console.log("Actualizar lista");
  };

  return (
    <Button
      variant="contained"
      color="default"
      startIcon={<RefreshIcon />}
      onClick={handleClick}
    >
      Actualizar Lista
    </Button>
  );
};

export default ListUpdateButtonComponent;
