import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import ListCreateButton from "../components/ListCreateButton";
import ListDataGrid from "../components/ListDataGrid";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import { UserContext } from "../context/UserContext";

const ListAdminPage = () => {
  const navigate = useNavigate();
  const {
    users,
    showDeleted,
    setShowDeleted,
    deleteUser,
    restoreUser,
    selectUserForEdit,
  } = useContext(UserContext);

  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    firstName: true,
    lastName: true,
    dateBirth: true,
    email: true,
    creationDatetime: true,
    updateDateTime: true,
  });
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const updatePageSize = () => {
      const gridHeight = window.innerHeight - 200;
      const rowHeight = 52;
      const newPageSize = Math.floor(gridHeight / rowHeight);
      setPageSize(newPageSize);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => {
    // Simular carga de página
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [users]);

  useEffect(() => {
    // Filtra los usuarios con rol ADMIN
    const admins = users.filter((user) => user.role === "ADMIN");
    setFilteredUsers(admins);
  }, [users]);

  useEffect(() => {
    // Ajusta la visibilidad de columnas en función de 'showDeleted'
    setColumnVisibilityModel((prev) => ({
      ...prev,
      dateBirth: !showDeleted,
      updateDateTime: !showDeleted,
      deleteDateTime: showDeleted,
    }));
  }, [showDeleted]);

  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
  };

  // Definición de las columnas de la tabla
  const columns = [
    {
      field: "firstName",
      headerName: "Nombre",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Apellido",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dateBirth",
      headerName: "Fecha de Nacimiento",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Correo Electrónico",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "creationDatetime",
      headerName: "Fecha de Creación",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updateDateTime",
      headerName: "Fecha de Modificación",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "deleteDateTime",
      headerName: "Fecha de Eliminación",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={1} justifyContent="center">
          {!showDeleted ? (
            <>
              <ListEditButton onClick={() => handleEdit(params.row)} />
              <ListDeleteButton onClick={() => handleDelete(params.row.id)} />
            </>
          ) : (
            <ListRestoreButton onClick={() => handleRestore(params.row.id)} />
          )}
        </Stack>
      ),
    },
  ].filter(Boolean); //Asegura que no hay columnas undefined (showDeleted=false entonces no se muestra la columna 'deleteDatetime')

  const handleEdit = (admin) => {
    Swal.fire({
      title: "Editar Administrador",
      text: "¿Estás seguro que quieres editar este administrador?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      customClass: {
        popup: "swal-question-popup",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        selectUserForEdit(admin);
        navigate(`/admin/user/edit`);
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Borrar Administrador",
      text: "¿Estas seguro que quieres borrar este administrador?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      customClass: {
        popup: "swal-question-popup",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
  };

  const handleRestore = (id) => {
    Swal.fire({
      title: "Restaurar Administrador",
      text: "¿Estas seguro que quieres restaurar este administrador?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      customClass: {
        popup: "swal-question-popup",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        restoreUser(id);
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#233349",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        color="white"
        gutterBottom
        sx={{ fontFamily: "Poppins" }}
      >
        {showDeleted
          ? "Listado de Administradores Eliminados"
          : "Listado de Administradores Activos"}
      </Typography>
      <Box sx={{ height: "calc(100vh - 200px)" }}>
        {loading || filteredUsers.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ListDataGrid
            rows={filteredUsers}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
            disableColumnMenu={true}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            disableSelectionOnClick
            slots={{ footer: GridToolbar }}
          />
        )}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <ListCreateButton label="Administrador" tipoClase={"user"} />
          <ListShowDeletedButton
            showDeleted={showDeleted}
            onClick={handleShowDeletedToggle}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ListAdminPage;
