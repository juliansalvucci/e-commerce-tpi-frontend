import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";

const ReportClientsPage = () => {
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    // Obtener la URL del dashboard de clientes desde el backend
    axios
      .get("http://localhost:8080/metabase/dashboard-clients-url")
      .then((response) => {
        setIframeUrl(response.data.iframeUrl); // Guardar la URL del iframe
      })
      .catch((error) => {
        console.error(
          "Error al obtener la URL del dashboard de clientes",
          error
        );
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#233349",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        color="white"
        sx={{
          fontFamily: "Poppins",
        }}
      >
        Reporte de Clientes
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#233349",
        }}
      >
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            title="Dashboard de Clientes"
            style={{ width: "100%", height: "600px", border: "none" }}
          />
        ) : (
          <Stack direction="column" spacing={2}>
            <CircularProgress size={80} thickness={6} sx={{ color: "white" }} />
            <Typography
              variant="h5"
              component="p"
              sx={{
                position: "absolute",
                color: "white",
                ml: 2,
                mt: 1,
              }}
            >
              Cargando reporte...
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default ReportClientsPage;
