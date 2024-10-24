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
import ListShowImage from "../components/ListShowImage";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";
import { SubCategoryContext } from "../context/SubCategoryContext";

const ListProductPage = () => {
  const navigate = useNavigate();
  const {
    products,
    showDeleted,
    setShowDeleted,
    deleteProduct,
    restoreProduct,
    formatProductForEdit,
    selectProductForEdit,
  } = useContext(ProductContext);
  const { brands } = useContext(BrandContext);
  const { categories } = useContext(CategoryContext);
  const { subCategories } = useContext(SubCategoryContext);

  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true,
    brand: true,
    category: false,
    subCategory: true,
    price: true,
    stock: true,
    stockMin: false,
    description: false,
    color: false,
    size: false,
    creationDatetime: true,
    updateDatetime: false,
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
  }, [products]);

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
      field: "brand",
      headerName: "Marca",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "subCategory",
      headerName: "Subcategoría",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const formattedPrice =
          params.value % 1 === 0 // Para ver si tiene decimales
            ? params.value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            : params.value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              });
        return <span>{formattedPrice}</span>;
      },
    },
    {
      field: "stock",
      headerName: "Stock Disp.",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "stockMin",
      headerName: "Stock Min.",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "size",
      headerName: "Tamaño",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value || "N/A",
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
          <ListShowImage imageURL={params.row.imageURL} />
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

  const handleEdit = (product) => {
    Swal.fire({
      title: "Editar Producto",
      text: "¿Estás seguro que quieres editar este producto?",
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
        const formattedProduct = formatProductForEdit(
          product,
          categories,
          subCategories,
          brands
        );
        if (formattedProduct) {
          selectProductForEdit(formattedProduct);
          navigate(`/admin/product/edit`);
        }
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Borrar Producto",
      text: "¿Estas seguro que quieres borrar este producto?",
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
        deleteProduct(id);
      }
    });
  };

  const handleRestore = (id) => {
    Swal.fire({
      title: "Restaurar Producto",
      text: "¿Estas seguro que quieres restaurar este producto?",
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
        restoreProduct(id);
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
          ? "Listado de Productos Eliminados"
          : "Listado de Productos Activos"}
      </Typography>
      <Box sx={{ height: "calc(100vh - 200px)" }}>
        {loading || products.length === 0 ? (
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
            rows={products}
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
          <ListCreateButton label="Producto" tipoClase={"product"} />
          <ListShowDeletedButton
            showDeleted={showDeleted}
            onClick={handleShowDeletedToggle}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ListProductPage;
