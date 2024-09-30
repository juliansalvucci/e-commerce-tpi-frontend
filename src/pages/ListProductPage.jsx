import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Stack,
  Typography,
  Box,
  Collapse,
  IconButton,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import Swal from "sweetalert2";
import ListCreateButton from "../components/ListCreateButton";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";
import { SubCategoryContext } from "../context/SubCategoryContext";
import "../styles/List.css";

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [openRows, setOpenRows] = useState({}); // Maneja Collapse

  // Definición de las columnas de la tabla
  const columns = [
    { id: "expand", label: "", minWidth: 30 }, // Columna de Collapse
    { id: "name", label: "Nombre", minWidth: 80 },
    { id: "brand", label: "Marca", minWidth: 80 },
    { id: "subCategory", label: "Subcategoria", minWidth: 80 },
    { id: "price", label: "Precio", minWidth: 80 },
    { id: "stock", label: "Stock Disp.", minWidth: 80 },
    { id: "stockMin", label: "Stock Min.", minWidth: 80 },
    { id: "actions", label: "Acciones", minWidth: 80 },
  ];

  // Definición de las columnas dentro del Collapse
  const columnsInside = [
    { id: "description", label: "Descripción", minWidth: 80 },
    { id: "creationDateTime", label: "Fecha de Creación", minWidth: 80 },
    ...(showDeleted
      ? [{ id: "deleteDatetime", label: "Fecha de Borrado", minWidth: 80 }]
      : []),
  ];

  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
    setPage(0);
  };

  const filteredProducts = showDeleted
    ? products.filter((product) => product.deleted)
    : products.filter((product) => !product.deleted);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleRowToggle = (id) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id],
    }));
  };

  return (
    <Box className="background">
      <Container
        className="container"
        sx={{ width: "80%", display: "flex", justifyContent: "center" }}
      >
        <Box className="title-box">
          {/* Título depende de showDeleted */}
          <Typography variant="h3" className="title" align="center">
            {showDeleted
              ? "Listado de Productos Eliminadas"
              : "Listado de Productos Activas"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              mt: 2,
              textAlign: "center",
            }}
          >
            <TableContainer sx={{ maxHeight: 440, width: "100%" }}>
              <Table stickyHeader aria-label="producto tabla">
                <TableHead>
                  <TableRow>
                    {/* Mapea las columnas para crear las celdas del encabezado */}
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          minWidth: column.minWidth,
                        }}
                        align="center"
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mapea los productos */}
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => (
                      <React.Fragment key={product.id}>
                        <TableRow hover tabIndex={-1}>
                          <TableCell align="center">
                            <IconButton
                              onClick={() => handleRowToggle(product.id)}
                            >
                              {openRows[product.id] ? (
                                <KeyboardArrowUp />
                              ) : (
                                <KeyboardArrowDown />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">{product.name}</TableCell>
                          <TableCell align="center">{product.brand}</TableCell>
                          <TableCell align="center">
                            {product.subCategory}
                          </TableCell>
                          <TableCell align="center">{product.price}</TableCell>
                          <TableCell align="center">{product.stock}</TableCell>
                          <TableCell align="center">
                            {product.stockMin}
                          </TableCell>
                          <TableCell align="center">
                            {!showDeleted ? (
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                              >
                                <ListDeleteButton
                                  onClick={() => handleDelete(product.id)}
                                />
                                <ListEditButton
                                  onClick={() => handleEdit(product)}
                                />
                              </Stack>
                            ) : (
                              <ListRestoreButton
                                onClick={() => handleRestore(product.id)}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={columns.length}>
                            <Collapse
                              in={openRows[product.id]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box margin={1}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      {/* Mapea los atributos restantes */}
                                      {columnsInside.map((column) => (
                                        <TableCell
                                          key={column.id}
                                          sx={{
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            minWidth: column.minWidth,
                                          }}
                                          align="center"
                                        >
                                          {column.label}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow hover tabIndex={-1}>
                                      <TableCell align="center">
                                        {product.description}
                                      </TableCell>
                                      <TableCell align="center">
                                        {product.creationDatetime}
                                      </TableCell>
                                      {showDeleted && (
                                        <TableCell align="center">
                                          {product.deleteDatetime}
                                        </TableCell>
                                      )}
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Paginación de la tabla */}
            <TablePagination
              rowsPerPageOptions={[5, 8, 10, 25, 100]}
              component="div"
              count={filteredProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Stack direction="row" spacing={2}>
            <ListCreateButton label="Producto" tipoClase={"product"} />
            <ListShowDeletedButton
              showDeleted={showDeleted}
              onClick={handleShowDeletedToggle}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ListProductPage;
