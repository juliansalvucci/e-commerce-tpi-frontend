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
  const [loggedUser, setLoggedUser] = useState({
    firstName: "",
    lastName: "",
    email: "Invitado",
    role: "GUEST",
  });
  const [userName, setUsername] = useState();
  const [showDeleted, setShowDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (token && userData) {
      setLoggedUser(userData);
      setUsername(userData.email.split("@")[0]);
    } else {
      setLoggedUser({
        firstName: "",
        lastName: "",
        email: "Invitado",
        role: "GUEST",
      });
      setUsername("Invitado");
    }
    setIsLoading(false); // Datos cargados
  }, [location.pathname]);

  // Función para obtener todos los usuarios
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

  const fetchClients = async () => {
    await fetchUsers();
    return users.map((user) => user.email);
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
      const { firstName, lastName, email, role, birthDate, token } =
        response.data;
      setUsername(email.split("@")[0]);
      const userData = {
        firstName,
        lastName,
        email,
        role,
        dateBirth: birthDate,
      }; // El token lo pasamos aparte
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userData", JSON.stringify(userData));
      setLoggedUser(userData);
      redirectUser(role);
    } catch (error) {
      //En caso de que el usuario no esté registrado, se le proporcionará la opción de hacerlo
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        if (error.response.status === 404) {
          Swal.fire({
            title: `<h5><strong>${error.response.data.email}</strong></h5>`,
            text: "¿Desea registrarse?",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            customClass: {
              popup: "swal-question-popup",
              confirmButton: "swal-confirm-button",
              cancelButton: "swal-cancel-button",
            },
          }).then(async (result) => {
            if (result.isConfirmed) {
              navigate("/register");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: error.response.data.password,
            text: "Ingrese nuevamente su contraseña",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal-error-popup",
              confirmButton: "swal-ok-button",
            },
          });
        }
      } else {
        console.error("Error al loguear usuario:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    setLoggedUser({
      firstName: "",
      lastName: "",
      email: "Invitado",
      role: "GUEST",
    });
    setUsername("Invitado");
  };

  const createUser = async (newUser) => {
    try {
      const response = await api.post("/auth/signup", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El usuario ${response.data.firstName} fue creado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      }).then(() => {
        navigate("/");
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

  // Función para editar un usuario existente
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
      const path =
        location.pathname === "/admin/user/edit"
          ? "/admin/user/list"
          : location.pathname === "/admin/account/edit"
          ? "/admin/account"
          : "/account/";
      navigate(path);
      if (path === "/admin/account" || path === "/account") {
        updateLoggedUser(updatedUser);
      }
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

  // Función para eliminar un usuario
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

  // Función para restaurar un usuario eliminado
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
      }).then(() => {
        navigate("/", { replace: true });
        window.location.reload();
      });
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

  // Función para encontrar un usuario por su email
  const findUserByEmail = (email) => {
    const user = users.find((user) => user.email === email);
    return user.id;
  };

  // Función para actualizar el usuario logueado luego de editar sus datos
  const updateLoggedUser = (updatedUser) => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    userData.firstName = updatedUser.firstName;
    userData.lastName = updatedUser.lastName;
    userData.dateBirth = updatedUser.dateBirth;
    sessionStorage.setItem("userData", JSON.stringify(userData));
    setLoggedUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loggedUser,
        userName,
        showDeleted,
        isLoading,
        selectedUser,
        fetchUsers,
        fetchClients,
        loginUser,
        logoutUser,
        createUser,
        editUser,
        deleteUser,
        restoreUser,
        setShowDeleted,
        selectUserForEdit,
        findUserByEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
