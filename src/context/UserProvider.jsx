import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import Swal from "sweetalert2";

export const UserProvider = ({ children }) => {
  const register = async (values, { setSubmitting }) => {
    try {
      // Llamada POST al backend usando Axios
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        values
      );
      console.log("Respuesta del servidor:", response.data);
      localStorage.setItem("token", response.data.token);
      Swal.fire({
        icon: "success",
        title: "Usuario registrado con éxito",
      });

      // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error en el registro:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema en el registro",
      });
      // Aquí puedes manejar el error, como mostrar un mensaje de error
    } finally {
      setSubmitting(false);
    }
  };

  const login = async (values, { setSubmitting }) => {
    try {
      // Llamada POST al backend usando Axios
      const response = await axios.post(
        "http://localhost:8080/auth/signin",
        values
      );
      console.log("Respuesta del servidor:", response.data);
      localStorage.setItem("token", response.data.token);
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
      });

      // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error en el registro:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Verifique sus credenciales",
      });
      // Aquí puedes manejar el error, como mostrar un mensaje de error
    } finally {
      setSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
