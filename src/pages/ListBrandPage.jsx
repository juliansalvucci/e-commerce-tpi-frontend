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
import { BrandContext } from "../context/BrandContext";

const ListBrandPage = () => {
  const navigate = useNavigate();
  const {
    brands,
    showDeleted,
    setShowDeleted,
    deleteBrand,
    restoreBrand,
    selectBrandForEdit,
  } = useContext(BrandContext);

  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updatePageSize = () => {
      const gridHeight = window.innerHeight - 200;
      const rowHeight = 40;
      const newPageSize = Math.floor(gridHeight / rowHeight);
      setPageSize(newPageSize);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [brands]);

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

  const handleEdit = (brand) => {
    Swal.fire({
      title: "Editar Marca",
      text: "¿Estás seguro que quieres editar esta marca?",
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
        selectBrandForEdit(brand);
        navigate(`/admin/brand/edit`);
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Borrar Marca",
      text: "¿Estás seguro que quieres borrar esta marca?",
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
        deleteBrand(id);
      }
    });
  };

  const handleRestore = (id) => {
    Swal.fire({
      title: "Restaurar Marca",
      text: "¿Estás seguro que quieres restaurar esta marca?",
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
        restoreBrand(id);
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
          ? "Listado de Marcas Eliminadas"
          : "Listado de Marcas Activas"}
      </Typography>
      <Box sx={{ height: "calc(100vh - 200px)" }}>  
        {loading || brands.length === 0 ? (
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
            rows={brands}
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
          <ListCreateButton label="Marca" tipoClase={"brand"} />
          <ListShowDeletedButton
            showDeleted={showDeleted}
            onClick={handleShowDeletedToggle}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ListBrandPage;
