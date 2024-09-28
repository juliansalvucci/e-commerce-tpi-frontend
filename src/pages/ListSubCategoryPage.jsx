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
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import ListCreateButton from "../components/ListCreateButton";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import "../styles/List.css";
import formatDateTime from "../utils/formatDateTimeUtils";
import hasProducts from "../utils/hasProductsUtils";

const ListCategoryPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(3); // Número de filas por página
  const [showDeleted, setShowDeleted] = useState(false); // Mostrar categorías eliminadas o activas

  // Definición de las columnas de la tabla
  const columns = [
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "category", label: "Categoría", minWidth: 170 },
    { id: "creationDateTime", label: "Fecha de Creación", minWidth: 170 },
    ...(showDeleted
      ? [{ id: "deleteDatetime", label: "Fecha de Borrado", minWidth: 170 }]
      : []),
    { id: "actions", label: "Acciones", minWidth: 170 },
  ];

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        showDeleted
          ? "http://localhost:8080/subcategory/deleted"
          : "http://localhost:8080/subcategory"
      );
      const updatedSubCategories = response.data.map((subCat) => ({
        ...subCat,
        deleted: subCat.deleted === true,
        creationDatetime: formatDateTime(subCat.creationDatetime),
        deleteDatetime: subCat.deleteDatetime
          ? formatDateTime(subCat.deleteDatetime)
          : null,
      }));
      setSubCategories(updatedSubCategories);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [showDeleted]);

  // Maneja el cambio entre mostrar subCategorías eliminadas y activas
  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
    setPage(0); // Resetea la página a la primera cuando se cambia la vista
  };

  // Filtra las categorías según el estado de "eliminadas" o "activas"
  const filteredSubCategories = showDeleted
    ? subCategories.filter((subCategory) => subCategory.deleted) // Muestra solo las eliminadas
    : subCategories.filter((subCategory) => !subCategory.deleted); // Muestra solo las activas

  // Cambia la página en la paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambia el número de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Resetea la página a la primera cuando cambia la cantidad de filas
  };

  const handleEdit = async (id) => {
    // Aca va la lógica de navegar hacia ABM Categoría con los datos del objeto
    console.log("Hola");
  };

  const deleteSubCategory = async (id, name) => {
    const hasProductsResult = await hasProducts("subcategory", name);
    if (hasProductsResult) {
      Swal.fire({
        icon: "error",
        title: "La subcategoría no puede ser eliminada",
        text: "La subcategoría tiene productos asociados.",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/subcategory/${id}`);
      fetchSubCategories();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDelete = async (id, name) => {
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
        deleteSubCategory(id, name);
      }
    });
  };

  const recoverSubCategory = async (id) => {
    try {
      await axios.post(`http://localhost:8080/subcategory/recover/${id}`);
      fetchSubCategories();
    } catch (error) {
      console.error("Error restoring item:", error);
    }
  };

  const handleRestore = async (id) => {
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
        recoverSubCategory(id);
      }
    });
  };

  return (
    <Box className="background">
      <Container
        className="container"
        sx={{ width: "70%", display: "flex", justifyContent: "center" }}
      >
        <Box className="title-box">
          {/* Título dinámico según el estado de "showDeleted" */}
          <Typography variant="h3" className="title" align="center">
            {showDeleted
              ? "Listado de SubCategorías Eliminadas"
              : "Listado de SubCategorías Activas"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // Asegura que el contenedor ocupe todo el ancho disponible
          }}
        >
          <Paper
            sx={{
              width: "93%",
              overflow: "hidden",
              mt: 2,
              textAlign: "center",
            }}
          >
            <TableContainer sx={{ maxHeight: 440, width: "100%" }}>
              <Table stickyHeader aria-label="categoría tabla">
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
                        align="center" // Centrar el texto del encabezado
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mapea las categorías filtradas para mostrar los datos en filas */}
                  {subCategories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Muestra las categorías de acuerdo a la paginación
                    .map((subCategory) => (
                      <TableRow hover tabIndex={-1} key={subCategory.id}>
                        <TableCell align="center">{subCategory.name}</TableCell>{" "}
                        <TableCell align="center">
                          {subCategory.category}
                        </TableCell>{" "}
                        <TableCell align="center">
                          {subCategory.creationDatetime}
                        </TableCell>{" "}
                        {showDeleted && (
                          <TableCell align="center">
                            {subCategory.deleteDatetime || "N/A"}{" "}
                          </TableCell>
                        )}
                        <TableCell align="center">
                          {!showDeleted ? (
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="center"
                            >
                              {" "}
                              {/* Centrar botones */}
                              <ListDeleteButton
                                onClick={() => handleDelete(subCategory.id, subCategory.name)}
                              />
                              <ListEditButton
                                onClick={() => handleEdit(subCategory.id)}
                              />
                            </Stack>
                          ) : (
                            // Botón para restaurar categoría eliminada
                            <ListRestoreButton
                              onClick={() => handleRestore(subCategory.id)}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Paginación de la tabla */}
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]} // Opciones de filas por página
              component="div"
              count={filteredSubCategories.length} // Cantidad total de categorías filtradas
              rowsPerPage={rowsPerPage} // Filas por página actual
              page={page} // Página actual
              onPageChange={handleChangePage} // Cambio de página
              onRowsPerPageChange={handleChangeRowsPerPage} // Cambio de cantidad de filas por página
            />
          </Paper>
        </Box>

        {/* Botón para alternar entre categorías eliminadas y activas */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Stack direction="row" spacing={2}>
            <ListCreateButton label="SubCategoría" />
            <ListShowDeletedButton
              showDeleted={showDeleted} // Estado actual
              onClick={handleShowDeletedToggle} // Alternar entre eliminadas y activas
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ListCategoryPage;
