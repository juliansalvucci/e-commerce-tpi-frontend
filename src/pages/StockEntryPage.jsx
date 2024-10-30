import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Stack, TextField, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import ListApplyFilters from "../components/ListApplyFilters";
import ListCreateStockEntry from "../components/ListCreateStockEntry";
import ListDataGrid from "../components/ListDataGrid";
import ListFilters from "../components/ListFilters";
import ListStockPopup from "../components/ListStockPopup";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";
import { SubCategoryContext } from "../context/SubCategoryContext";

const StockEntryPage = () => {
  const { products } = useContext(ProductContext);
  const { brands, findBrandById } = useContext(BrandContext);
  const { categories, findCategoryById } = useContext(CategoryContext);
  const { subCategories, findSubCategoryById } = useContext(SubCategoryContext);

  const [selectedCategoryP, setselectedCategoryP] = useState("");
  const [filteredSubCategories, setFilteredSC] = useState(subCategories);
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [lowStockFilter, setLowStockFilter] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true,
    brand: false,
    category: false,
    subCategory: false,
    price: false,
    stock: true,
    stockMin: true,
    description: false,
    color: true,
    size: false,
    creationDatetime: false,
    updateDatetime: false,
    deleteDatetime: false,
  });

  const styles = {
    variant: "filled",
    InputProps: {
      style: {
        borderColor: "#d7c4ab",
        color: "white",
      },
    },
    InputLabelProps: {
      style: {
        color: "#d1d1d1",
      },
    },
  };

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

  // Maneja la aplicación de filtros
  const handleApplyFilters = () => {
    const isAnyFilterApplied =
      brandFilter || categoryFilter || subCategoryFilter || lowStockFilter;

    if (!isAnyFilterApplied) {
      setFilteredProducts([]);
      setselectedCategoryP("");
      return;
    }

    const filtered = products.filter((product) => {
      return (
        (!brandFilter || product.brand === findBrandById(brandFilter)) &&
        (!categoryFilter ||
          product.category === findCategoryById(categoryFilter)) &&
        (!subCategoryFilter ||
          product.subCategory === findSubCategoryById(subCategoryFilter)) &&
        (!lowStockFilter || product.stock <= product.stockMin)
      );
    });

    setFilteredProducts(filtered);
  };

  // Actualiza las subcategorías cuando se selecciona una categoría
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const categoryName = findCategoryById(categoryId);
    setCategoryFilter(categoryId);
    setselectedCategoryP(categoryId);
    setSubCategoryFilter("");
    setFilteredSC(
      subCategories.filter((subCat) => subCat.category === categoryName)
    );
  };

  const handleRowSelection = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const handleCreateStockEntryClick = () => {
    if (selectedRows.length > 0) {
    setDialogOpen(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "No has seleccionado productos",
        text: "Por favor, selecciona al menos un producto para crear una entrada de stock",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
      field: "color",
      headerName: "Color",
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
      field: "category",
      headerName: "Categoría",
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
          params.value % 1 === 0
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
      description: "Stock Disponible",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { stock, stockMin } = params.row;
        let color = "#283b54";

        if (stock <= stockMin) {
          color = "red";
        }

        return <span style={{ color }}>{stock}</span>;
      },
    },
    {
      field: "stockMin",
      headerName: "Stock Min.",
      flex: 1,
      description: "Alerta de Stock Min.",
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
      headerName: "Fecha de Modificación",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "deleteDatetime",
      headerName: "Fecha de Eliminación",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ].filter(Boolean);

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
        {"Entrada de Stock"}
      </Typography>

      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          select
          label="Marcas"
          id="marca"
          name="marca"
          {...styles}
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "transparent",
          }}
        >
          {brands.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Categoría"
          id="categoria"
          name="categoria"
          {...styles}
          value={categoryFilter}
          onChange={handleCategoryChange}
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "transparent",
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Subcategoría"
          id="subcategoria"
          name="subcategoria"
          {...styles}
          value={subCategoryFilter}
          onChange={(e) => setSubCategoryFilter(e.target.value)}
          disabled={!selectedCategoryP}
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "transparent",
          }}
        >
          {filteredSubCategories.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <ListApplyFilters onClick={handleApplyFilters} />
      </Stack>

      <Box sx={{ height: "calc(100vh - 300px)" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 0,
            borderRadius: "0 0 15px 15px",
            backgroundColor: "#283b54",
          }}
        >
          <ListDataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
            disableColumnMenu={true}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            checkboxSelection
            disableSelectionOnClick
            onRowSelectionModelChange={handleRowSelection}
            slots={{ footer: ListFilters }}
            slotProps={{
              footer: {
                lowStockFilter,
                setLowStockFilter,
                brandFilter,
                setBrandFilter,
                categoryFilter,
                setCategoryFilter,
                subCategoryFilter,
                setSubCategoryFilter,
              },
            }}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <ListCreateStockEntry onClick={handleCreateStockEntryClick} />
        </Stack>
      </Box>
      <ListStockPopup
        open={dialogOpen}
        onClose={handleDialogClose}
        selectedRows={filteredProducts.filter((row) =>
          selectedRows.includes(row.id)
        )}
      />
    </Box>
  );
};

export default StockEntryPage;
