import { Button } from "@mui/material";
import React from "react";

const ABMActionButton = ({ is, accion, tipoClase }) => {
  return (
    <Button
      variant="contained"
      type="submit"
      disabled={is}
      sx={{
        display: "block",
        margin: "20px auto",
        padding: "8px 8px",
        backgroundColor: "#283b54",
        color: "white",
        border: "none",
        borderRadius: "2px",
        width: "100%",
        fontSize: "16px",
        fontFamily: "Poppins",
        fontWeight: "500",
        maxWidth: "400px",
        "&:hover": {
          backgroundColor: "#bed0dd",
          color: "black",
        },
      }}
    >
      {accion} {tipoClase}
    </Button>
  );
};

export default ABMActionButton;
