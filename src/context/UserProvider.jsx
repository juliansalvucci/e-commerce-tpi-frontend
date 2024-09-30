import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const register = async (values, { setSubmitting }) => {
    try {
      // Llamada POST al backend usando Axios
      const response = await axios.post("http://localhost:8080/auth/signup", {
        firstName: values.nombre,
        lastName: values.apellido,
        email: values.email,
        password: values.password,
      });
      console.log("Respuesta del servidor:", response.data);
      localStorage.setItem("token", response.data.token);
      Swal.fire({
        icon: "success",
        title: "Usuario registrado con éxito",
      });
      navigate("/");
    } catch (error) {
      console.error("Error en el registro:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema en el registro",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const login = async (values, { setSubmitting }) => {
    try {
      // Llamada POST al backend usando Axios
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email: values.email,
        password: values.password,
      });
      //console.log("Respuesta del servidor:", response.data);
      localStorage.setItem("token", response.data.token);
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
      });
      navigate("/");
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
