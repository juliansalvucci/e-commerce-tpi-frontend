import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CarritoApp } from "./CarritoApp";
import { BrowserRouter } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { UserProvider } from "./context/UserProvider";
import { LoginPage } from "./pages/LoginPage";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <CarritoApp />
      <UserProvider>
        <RegisterPage />
        <LoginPage/>
      </UserProvider>
    </StrictMode>
    ,
  </BrowserRouter>
);
