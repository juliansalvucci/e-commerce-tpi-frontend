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
} from "@mui/material";
import Swal from "sweetalert2";
import ListCreateButton from "../components/ListCreateButton";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import { CategoryContext } from "../context/CategoryContext";
import { SubCategoryContext } from "../context/SubCategoryContext";
import "../styles/List.css";

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

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

  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
    setPage(0);
  };

  const filteredSubCategories = showDeleted
    ? subCategories.filter((subCategory) => subCategory.deleted) // Muestra solo las eliminadas
    : subCategories.filter((subCategory) => !subCategory.deleted); // Muestra solo las activas

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    <Box className="background">
      <Container
        className="container"
        sx={{ width: "70%", display: "flex", justifyContent: "center" }}
      >
        <Box className="title-box">
          {/* Título depende de showDeleted */}
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
            width: "100%",
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
                        align="center"
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mapea las subcategorías */}
                  {subCategories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((subCategory) => (
                      <TableRow hover tabIndex={-1} key={subCategory.id}>
                        <TableCell align="center">{subCategory.name}</TableCell>
                        <TableCell align="center">
                          {subCategory.category}
                        </TableCell>
                        <TableCell align="center">
                          {subCategory.creationDatetime}
                        </TableCell>
                        {showDeleted && (
                          <TableCell align="center">
                            {subCategory.deleteDatetime || "N/A"}
                          </TableCell>
                        )}
                        <TableCell align="center">
                          {!showDeleted ? (
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="center"
                            >
                              <ListDeleteButton
                                onClick={() => handleDelete(subCategory.id)}
                              />
                              <ListEditButton
                                onClick={() => handleEdit(subCategory)}
                              />
                            </Stack>
                          ) : (
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
              rowsPerPageOptions={[3, 5, 10]}
              component="div"
              count={filteredSubCategories.length}
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
            <ListCreateButton label="SubCategoría" />
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

export default ListSubCategoryPage;
