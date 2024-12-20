import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportSalesPage = () => {
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    // Obtener la URL del dashboard desde el backend
    axios
      .get("http://localhost:8080/metabase/dashboard-sales-url")
      .then((response) => {
        setIframeUrl(response.data.iframeUrl); // Guardar la URL del iframe
      })
      .catch((error) => {
        console.error("Error al obtener la URL del dashboard", error);
      });
  }, []);

  return (
    <div>
      <h2>Reporte de Ventas</h2>
      {iframeUrl ? (
        <iframe
          src={iframeUrl}
          title="Dashboard de Ventas"
          style={{ width: "100%", height: "600px", border: "none" }}
        />
      ) : (
        <p>Cargando dashboard...</p>
      )}
    </div>
  );
};

export default ReportSalesPage;

