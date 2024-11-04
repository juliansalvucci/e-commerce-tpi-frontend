import React from "react";
import { Box, Typography } from "@mui/material";

const InConstructionComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#233349",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src="https://i.pinimg.com/originals/c9/9c/98/c99c98936a66370a09589509ca274001.gif"
        alt="Jesus gif"
        sx={{ width: "20%", height: "40%" }}
      />
      <Typography
        variant="h4"
        sx={{
          marginTop: 2,
          fontWeight: "bold",
          animation: "colorChange 2s infinite",
        }}
      >
        En construcción
      </Typography>
      <style>
        {`
          @keyframes colorChange {
            0% { color: #FF5733; }
            25% { color: #33FF57; }
            50% { color: #3357FF; }
            75% { color: #F333FF; }
            100% { color: #FF5733; }
          }
        `}
      </style>
    </Box>
  );
};

export default InConstructionComponent;
