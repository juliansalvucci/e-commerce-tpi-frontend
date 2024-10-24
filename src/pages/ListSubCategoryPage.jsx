import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import ListCreateButton from "../components/ListCreateButton";
import ListDataGrid from "../components/ListDataGrid";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import { CategoryContext } from "../context/CategoryContext";
import { SubCategoryContext } from "../context/SubCategoryContext";

const ListSubCategoryPage = () => {
  const navigate = useNavigate();
  const {
    subCategories,
    showDeleted,
    setShowDeleted,
    deleteSubCategory,
    restoreSubCategory,
    formatSubCategoryForEdit,
    selectSubCategoryForEdit,
  } = useContext(SubCategoryContext);
  const { categories } = useContext(CategoryContext);

  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [subCategories]);

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
      field: "category",
      headerName: "Categoría",
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
      headerName: "Fecha de Actualización",
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
              <ListDeleteButton onClick={() => handleDelete(params.row.id)} />
              <ListEditButton onClick={() => handleEdit(params.row)} />
            </>
          ) : (
            <ListRestoreButton onClick={() => handleRestore(params.row.id)} />
          )}
        </Stack>
      ),
    },
  ].filter(Boolean);

  const handleEdit = (subcat) => {
    Swal.fire({
      title: "Editar Subcategoría",
      text: "¿Estás seguro que quieres editar esta subcategoría?",
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
        const formattedSubCategory = formatSubCategoryForEdit(
          subcat,
          categories
        );
        if (formattedSubCategory) {
          selectSubCategoryForEdit(formattedSubCategory);
          navigate(`/admin/subcategory/edit`);
        }
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Borrar Subcategoría",
      text: "¿Estas seguro que quieres borrar esta subcategoría?",
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
        deleteSubCategory(id);
      }
    });
  };

  const handleRestore = (id) => {
    Swal.fire({
      title: "Restaurar Subcategoría",
      text: "¿Estas seguro que quieres restaurar esta subcategoría?",
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
        restoreSubCategory(id);
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
          ? "Listado de Subcategorías Eliminadas"
          : "Listado de Subcategorías Activas"}
      </Typography>
      <Box sx={{ height: "calc(100vh - 200px)" }}>
        {loading || subCategories.length === 0 ? (
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
            rows={subCategories}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
            disableSelectionOnClick
          />
        )}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <ListCreateButton label="Subcategoría" tipoClase={"subcategory"} />
          <ListShowDeletedButton
            showDeleted={showDeleted}
            onClick={handleShowDeletedToggle}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ListSubCategoryPage;
