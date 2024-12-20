import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeAdminPage = () => {
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    // Obtener la URL firmada desde el backend
    axios
      .get("http://localhost:8080/metabase/dashboard-url")
      .then((response) => {
        setIframeUrl(response.data.iframeUrl);
      })
      .catch((error) => {
        console.error("Error al obtener la URL del dashboard", error);
      });
  }, []);

  return (
    <div>
      <h2>Dashboard de Metabase</h2>
      {iframeUrl ? (
        <iframe
          src={iframeUrl}
          title="Metabase Dashboard"
          style={{ border: "none", width: "100%", height: "600px" }}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default HomeAdminPage;
