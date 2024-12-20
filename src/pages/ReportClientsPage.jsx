import React, { useEffect, useState } from "react";
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
        console.error("Error al obtener la URL del dashboard de clientes", error);
      });
  }, []);

  return (
    <div>
      <h2>Reporte de Clientes</h2>
      {iframeUrl ? (
        <iframe
          src={iframeUrl}
          title="Dashboard de Clientes"
          style={{ width: "100%", height: "600px", border: "none" }}
        />
      ) : (
        <p>Cargando dashboard...</p>
      )}
    </div>
  );
};

export default ReportClientsPage;
