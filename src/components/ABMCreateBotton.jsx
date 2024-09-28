import { Button } from "@mui/material";
const ABMCreateBotton = () => {
  return (
    <Button
      variant="contained"
      sx={{
        display: "block",
        margin: "20px auto",
        padding: "8px 8px",
        backgroundColor: "#bed0dd",
        color: "black",
        border: "none",
        borderRadius: "50px",
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
      Crear
    </Button>
  );
};

export default ABMCreateBotton;
