import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";
import api from "../api/api";
import useFormatDateTime from "../utils/useFormatDateTime";

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState();
  const [email, setEmail] = useState();
  const [userName, setUsername] = useState();
  const [users, setUsers] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const register = async (values, { setSubmitting }) => {
    try {
      // Llamada POST al backend usando Axios
      const response = await api.post("/auth/signup", {
        firstName: values.nombre,
        lastName: values.apellido,
        email: values.email,
        dateBirth: values.dateBirth,
        password: values.password,
      });
      localStorage.setItem("token", response.data.token);
      setEmail(response.data.email);
      setRole(response.data.role);
      setUsername(response.data.firstName + " " + response.data.lastName);
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
      const response = await api.post("/auth/signin", {
        email: values.email,
        password: values.password,
      });
      //console.log("Respuesta del servidor:", response.data);
      localStorage.setItem("token", response.data.token);
      setEmail(response.data.email);
      setRole(response.data.role);
      setUsername(response.data.firstName + " " + response.data.lastName);

      redirect(response.data.role);
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

  const selectUserForEdit = (user) => {
    setSelectedUser(user);
  };

  // Función para obtener todas las marcas
  const fetchUsers = async () => {
    try {
      const response = await api.get(showDeleted ? "/user/deleted" : "/user");
      const updatedUsers = response.data.map((user) => ({
        //NO TIENE FECHA DE CREACIÓN
        ...user,
        deleted: user.deleted === true,
        creationDatetime: useFormatDateTime(user.creationDatetime),
        updateDatetime: user.updateDatetime
          ? useFormatDateTime(user.updateDatetime)
          : "N/A",
        deleteDatetime: user.deleteDatetime
          ? useFormatDateTime(user.deleteDatetime)
          : null,
      }));
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error (fetch usuario):", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  const createAdminUser = async (newUser) => {
    try {
      const response = await api.post("/user", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El usuario fue creado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "El usuario no puede ser creado",
          text: "TO-DO",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al crear usuario:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para editar una marca existente
  const editUser = async (id, updatedUser) => {
    try {
      if (updatedUser.email === selectedUser?.email) {
        //VALIDO POR EMAIL PERO CAMBIALA DEPENDIENDO DE LO QUE USES
        // el ? es para que no de error si no hay marca seleccionada
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se han modificado los datos del usuario",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
        return;
      }
      const prevUser = selectedUser.name;
      const response = await api.put(`/user/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, ...response.data } : user
        )
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El usuario fue editado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
      selectuserForEdit(null);
      navigate("/admin/user/list");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "El usuario no puede ser editado",
          text: "TO-DO",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al editar usuario:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para eliminar una marca
  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El usuario fue eliminado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "El usuario no puede ser eliminado",
          text: "TO-DO",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al eliminar usuario:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para restaurar una marca eliminada
  const restoreUser = async (id) => {
    try {
      await api.post(`/user/recover/${id}`);
      await fetchusers();
      const restoredUser = users.find((user) => user.email === id);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El usuario fue recuperado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      console.error("Error al restaurar usuario:", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  const redirect = (role) => {
    if (role == "CLIENT") {
      console.log("rutacliente");
    }
    if (role == "ADMIN") {
      console.log("rutasadmin");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (location.pathname === "/admin/users/list") {
      //VER
      fetchUsers();
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchUsers();
  }, [showDeleted]);

  return (
    <UserContext.Provider
      value={{
        setShowDeleted,
        register,
        login,
        logout,
        role,
        email,
        userName,
        createAdminUser,
        fetchUsers,
        deleteUser,
        editUser,
        restoreUser,
        selectUserForEdit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
