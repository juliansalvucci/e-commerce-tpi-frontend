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
import { CategoryContext } from "../context/CategoryContext";

const ListCategoryPage = () => {
  const navigate = useNavigate();
  const {
    categories,
    showDeleted,
    setShowDeleted,
    deleteCategory,
    restoreCategory,
    selectCategoryForEdit,
  } = useContext(CategoryContext);

  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true,
    creationDatetime: true,
    updateDatetime: true,
  });

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

  useEffect(() => { // Simular carga de página
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [categories]);

  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
  };

  // Definición de las columnas de la tabla
  const columns = [
    {
      field: "name",
      headerName: "Nombre",
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
      field: "updateDatetime",
      headerName: "Fecha de Modificación",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value || "N/A",
    },
    showDeleted && {
      field: "deleteDatetime",
      headerName: "Fecha de Borrado",
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

  const handleEdit = (cat) => {
    Swal.fire({
      title: "Editar Categoría",
      text: "¿Estás seguro que quieres editar esta categoría?",
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
        selectCategoryForEdit(cat);
        navigate(`/admin/category/edit`);
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Borrar Categoría",
      text: "¿Estás seguro que quieres borrar esta categoría?",
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
        deleteCategory(id);
      }
    });
  };

  const handleRestore = (id) => {
    Swal.fire({
      title: "Restaurar Categoría",
      text: "¿Estas seguro que quieres restaurar esta categoría?",
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
        restoreCategory(id);
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
          ? "Listado de Categorías Eliminadas"
          : "Listado de Categorías Activas"}
      </Typography>
      <Box sx={{ height: "calc(100vh - 200px)" }}>
        {loading || categories.length === 0 ? (
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
            rows={categories}
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
          <ListCreateButton label="Categoría" tipoClase={"category"} />
          <ListShowDeletedButton
            showDeleted={showDeleted}
            onClick={handleShowDeletedToggle}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ListCategoryPage;
