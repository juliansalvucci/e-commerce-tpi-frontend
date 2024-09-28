import { Button } from "@mui/material";
const ABMCreateBotton = ({is, accion, tipoClase}) => {
  return (
    <Button
      variant="contained"
      type="submit"
      disabled={is}
      sx={{
        display: "block",
        margin: "20px auto",
        padding: "8px 8px",
        backgroundColor: "#bed0dd",
        color: "black",
        border: "none",
        borderRadius: "2px",
        width: "100%",
        fontSize: "16px",
        fontFamily: "Poppins",
        fontWeight: "500",
        maxWidth: "250px",
        "&:hover": {
          backgroundColor: "grey",
        },
      }}
    >
      {accion} {tipoClase} 
    </Button>
  );
};

export default ABMCreateBotton;
