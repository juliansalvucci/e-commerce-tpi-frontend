import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";
import ListCreateButton from "../components/ListCreateButton";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import "../styles/List.css";
import formatDateTime from "../utils/formatDateTimeUtils";

const ListProductPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [showDeleted, setShowDeleted] = useState(false);
  const [openRows, setOpenRows] = useState({}); // Estado para manejar filas colapsables

  const columns = [
    { id: "name", label: "Nombre", minWidth: 60 },
    { id: "brand", label: "Marca", minWidth: 60 },
    { id: "subcategory", label: "Subcategoria", minWidth: 60 },
    { id: "price", label: "Precio", minWidth: 60 },
    { id: "stock", label: "Stock Disp.", minWidth: 60 },
    { id: "stockMin", label: "Stock Min.", minWidth: 60 },
    { id: "actions", label: "Acciones", minWidth: 60 },
  ];

  const columnsInside = [
    { id: "description", label: "Descripción", minWidth: 60 },
    { id: "creationDateTime", label: "Fecha de Creación", minWidth: 60 },
    ...(showDeleted
      ? [{ id: "deleteDatetime", label: "Fecha de Borrado", minWidth: 60 }]
      : []),
  ];

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        showDeleted
          ? "http://localhost:8080/product/deleted"
          : "http://localhost:8080/product"
      );
      const updatedProducts = response.data.map((product) => ({
        ...product,
        deleted: product.deleted === true,
        creationDatetime: formatDateTime(product.creationDatetime),
        deleteDatetime: product.deleteDatetime
          ? formatDateTime(product.deleteDatetime)
          : null,
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [showDeleted]);

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

  const handleEdit = async (id) => {
    console.log("Edit product with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/producto/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const recoverProduct = async (id) => {
    try {
      await axios.post(`http://localhost:8080/product/recover/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error restoring item:", error);
    }
  };

  const handleRestore = async (id) => {
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
        recoverProduct(id);
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
        sx={{ width: "70%", display: "flex", justifyContent: "center" }}
      >
        <Box className="title-box">
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
              width: "90%",
              overflow: "hidden",
              mt: 2,
              textAlign: "center",
            }}
          >
            <TableContainer sx={{ maxHeight: 440, width: "100%" }}>
              <Table stickyHeader aria-label="producto tabla">
                <TableHead>
                  <TableRow>
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
                  {filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => (
                      <React.Fragment key={product.id}>
                        <TableRow
                          hover
                          tabIndex={-1}
                          onClick={() => handleRowToggle(product.id)}
                        >
                          <TableCell align="center">{product.name}</TableCell>
                          <TableCell align="center">{product.brand}</TableCell>
                          <TableCell align="center">
                            {product.subcategory}
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
                                  onClick={() => handleEdit(product.id)}
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
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                >
                                  Detalles
                                </Typography>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      {columnsInside.map((column) => (
                                        <TableCell
                                          key={column.id}
                                          align="center"
                                        >
                                          {column.label}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell align="center">
                                        {product.description}
                                      </TableCell>
                                      <TableCell align="center">
                                        {product.creationDatetime}
                                      </TableCell>
                                      {showDeleted && (
                                        <TableCell align="center">
                                          {product.deleteDatetime || "N/A"}
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
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
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
            <ListCreateButton label="Producto" />
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
