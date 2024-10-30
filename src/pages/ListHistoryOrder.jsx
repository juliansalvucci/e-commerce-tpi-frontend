import React, { useState, useContext } from "react";
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
import { BrandContext } from "../context/BrandContext";
import "../styles/List.css";

const ListHistoryOrder = () => {
  const navigate = useNavigate();
  /*
  const {
    brands,
    showDeleted,
    setShowDeleted,
    deleteBrand,
    restoreBrand,
    selectBrandForEdit,
  } = useContext(BrandContext); */

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Definición de las columnas de la tabla
  /*
  const columns = [
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "creationDateTime", label: "Fecha de Creación", minWidth: 170 },
    ...(showDeleted
      ? [{ id: "deleteDatetime", label: "Fecha de Borrado", minWidth: 170 }]
      : []),
    { id: "actions", label: "Acciones", minWidth: 170 },
  ];
  */

  //Definición de las columnas de la tabla
  const columns = [
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "last-name", label: "Apellido", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
  ];

  /*
  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
    setPage(0);
  };

  const filteredBrands = showDeleted
    ? brands.filter((brand) => brand.deleted) // Muestra solo las eliminadas
    : brands.filter((brand) => !brand.deleted); // Muestra solo las activas
*/
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /*
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
  */

  return (
    <Box className="background">
      <Container
        className="container"
        sx={{ width: "70%", display: "flex", justifyContent: "center" }}
      >
        <Box className="title-box">
          {/* Título depende de showDeleted */}
          <Typography variant="h3" className="title" align="center">
            Historial de Ordenes
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
              <Table stickyHeader aria-label="brand tabla">
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
                  {/* Mapea las categorías filtradas para mostrar los datos en filas */}
                  {brands
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((brand) => (
                      <TableRow hover tabIndex={-1} key={order.id}>
                        {/*Acá debo agregar el nombre, apellido y el email del usuario */}
                        
                        {/*
                        <TableCell align="center">{order.name}</TableCell>
                        <TableCell align="center">
                          {brand.creationDatetime}
                        </TableCell>
                        {showDeleted && (
                          <TableCell align="center">
                            {brand.deleteDatetime || "N/A"}
                          </TableCell>
                        )} */}
                        <TableCell align="center">
                          {!showDeleted ? (
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="center"
                            >
                              <ListDeleteButton
                                onClick={() => handleDelete(brand.id)}
                              />
                              <ListEditButton
                                onClick={() => handleEdit(brand)}
                              />
                            </Stack>
                          ) : (
                            <ListRestoreButton
                              onClick={() => handleRestore(brand.id)}
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
              rowsPerPageOptions={[5, 8, 10]}
              component="div"
              count={filteredBrands.length}
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
            <ListCreateButton label="Marca" tipoClase={"brand"} />
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

export default ListBrandPage;
