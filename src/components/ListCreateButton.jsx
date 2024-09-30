import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ListCreateButton = ({ label, tipoClase }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/${tipoClase}/create`);
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
