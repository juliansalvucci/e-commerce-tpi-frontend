import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";
import api from "../api/api";
import useFormatDateTime from "../utils/useFormatDateTime";

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [userName, setUsername] = useState();
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (token && userData) {
      setLoggedUser(userData);
      setUsername(userData.email);
    }
  }, [], [location.pathname]);

  // Función para obtener todas las marcas
  const fetchUsers = async () => {
    try {
      const response = await api.get(showDeleted ? "/user/deleted" : "/user");
      const updatedUsers = response.data.map((user) => ({
        ...user,
        deleted: user.deleted === true,
        creationDatetime: useFormatDateTime(user.creationDatetime),
        updateDateTime: user.updateDateTime
          ? useFormatDateTime(user.updateDateTime)
          : "N/A",
        deleteDateTime: user.deleteDateTime
          ? useFormatDateTime(user.deleteDateTime)
          : null,
      }));
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error (fetch users):", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/user/list") {
      fetchUsers();
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchUsers();
  }, [showDeleted]);

  const loginUser = async (user) => {
    try {
      const response = await api.post("/auth/signin", user);
      const { firstName, lastName, email, role, token } = response.data;
      const userData = { firstName, lastName, email, role }; // El token lo pasamos aparte
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userData", JSON.stringify(userData));
      setLoggedUser(userData);
      setUsername(userData.email);
      redirectUser(role);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "El usuario no pudo loguearse",
          text: error.response.data.email,
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al loguear usuario:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    setLoggedUser(null);
    setUsername(null);
  };

  const createUser = async (newUser) => {
    const URL =
      location.pathname === "/admin/user/create"
        ? "/auth/admin"
        : "/auth/signup";
    try {
      const response = await api.post(URL, newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El usuario ${response.data.firstName} fue creado con éxito!`,
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
          text: error.response.data.email,
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
  const editUser = async (id, updatedUser, userEmail) => {
    // Deuda Técnica: Aca también tendriamos que poder hacer "Actualizar datos personales" para CLIENT/USER
    try {
      if (
        updatedUser.firstName === selectedUser?.firstName &&
        updatedUser.lastName === selectedUser?.lastName &&
        updatedUser.dateBirth === selectedUser?.dateBirth
      ) {
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
      const response = await api.put(`/user/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === userEmail ? { ...user, ...response.data } : user
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
      selectUserForEdit(null);
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
    // Deuda Técnica: Acá tendría que poder borrarse una cuenta CLIENT/USER también
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
      await fetchUsers();
      //const restoredUser = users.find((user) => user.id === id);
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

  const redirectUser = (role) => {
    if (role == "USER") {
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `Sesión iniciada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
      navigate("/");
    } else {
      Swal.fire({
        title: "Elige destino",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ir a Dashboard",
        cancelButtonText: "Ir a Home Page",
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-optionLogin-button",
          cancelButton: "swal-optionLogin-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/");
        }
      });
    }
  };

  const selectUserForEdit = (user) => {
    setSelectedUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loggedUser,
        showDeleted,
        selectedUser,
        fetchUsers,
        loginUser,
        logoutUser,
        createUser,
        editUser,
        deleteUser,
        restoreUser,
        setShowDeleted,
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
