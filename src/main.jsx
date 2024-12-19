import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CarritoApp } from "./CarritoApp";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
        <CarritoApp />
      </UserProvider>
    </StrictMode>
  </BrowserRouter>
);
