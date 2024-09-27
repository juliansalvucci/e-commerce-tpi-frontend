import React, { useState } from "react";
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
import ListDeleteButton from "../components/ListDeleteButton"; // Componente para eliminar una categoría
import ListEditButton from "../components/ListEditButton"; // Componente para editar una categoría
import ListRestoreButton from "../components/ListRestoreButton"; // Componente para restaurar una categoría eliminada
import ListShowDeletedButton from "../components/ListShowDeletedButton"; // Botón para alternar entre categorías activas y eliminadas
import "../styles/List.css"; // Estilos personalizados
import ListCreateButton from "../components/ListCreateButton";
import ListUpdateButton from "../components/ListUpdateButton";

// Definición de las columnas de la tabla
const columns = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "creationDateTime", label: "Fecha de Creación", minWidth: 170 },
  { id: "actions", label: "Acciones", minWidth: 170 },
];

const ListCategoryPage = () => {
  // Estado inicial de las categorías
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Categoria 1",
      creationDateTime: "2024-08-10",
      deleted: false,
    },
    {
      id: 2,
      name: "Categoria 2",
      creationDateTime: "2024-08-12",
      deleteDatetime: "2024-09-01",
      deleted: true, // Categoría eliminada
    },
    {
      id: 3,
      name: "Categoria 3",
      creationDateTime: "2024-08-15",
      deleted: false,
    },
    {
      id: 4,
      name: "Categoria 4",
      creationDateTime: "2024-08-18",
      deleted: false,
    },
    {
      id: 5,
      name: "Categoria 5",
      creationDateTime: "2024-08-20",
      deleted: false,
    },
    {
      id: 6,
      name: "Categoria 6",
      creationDateTime: "2024-08-22",
      deleteDatetime: "2023-09-02",
      deleted: true, // Categoría eliminada
    },
    {
      id: 7,
      name: "Categoria 7",
      creationDateTime: "2024-08-25",
      deleted: false,
    },
  ]);

  // Estado de la paginación
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(3); // Número de filas por página
  const [showDeleted, setShowDeleted] = useState(false); // Mostrar categorías eliminadas o activas

  // Maneja el cambio entre mostrar categorías eliminadas y activas
  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
    setPage(0); // Resetea la página a la primera cuando se cambia la vista
  };

  // Filtra las categorías según el estado de "eliminadas" o "activas"
  const filteredCategories = showDeleted
    ? categories.filter((category) => category.deleted) // Muestra solo las eliminadas
    : categories.filter((category) => !category.deleted); // Muestra solo las activas

  // Cambia la página en la paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambia el número de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Resetea la página a la primera cuando cambia la cantidad de filas
  };

  return (
    <Box className="background">
      <Container className="container" sx={{ width: '70%' }}>
        <Box className="title-box">
          {/* Título dinámico según el estado de "showDeleted" */}
          <Typography variant="h3" className="title">
            {showDeleted
              ? "Listado de Categorías Eliminadas"
              : "Listado de Categorías Activas"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper sx={{ width: "80%", overflow: "hidden", mt: 2 }}>
            <TableContainer sx={{ maxHeight: 440, width : "120%" }}>
              <Table stickyHeader aria-label="categoría tabla">
                <TableHead>
                  <TableRow>
                    {/* Mapea las columnas para crear las celdas del encabezado */}
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mapea las categorías filtradas para mostrar los datos en filas */}
                  {filteredCategories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Muestra las categorías de acuerdo a la paginación
                    .map((category) => (
                      <TableRow hover tabIndex={-1} key={category.id}>
                        {/* Nombre de la categoría */}
                        <TableCell>{category.name}</TableCell>
                        {/* Fecha de creación */}
                        <TableCell>{category.creationDateTime}</TableCell>
                        {/* Acciones según si la categoría está eliminada o no */}
                        <TableCell>
                          {!category.deleted ? (
                            <Stack direction="row" spacing={1}>
                              {/* Botón para eliminar categoría */}
                              <ListDeleteButton
                                onClick={() =>
                                  console.log(`Eliminar ${category.id}`)
                                }
                              />
                              {/* Botón para editar categoría */}
                              <ListEditButton
                                onClick={() =>
                                  console.log(`Editar ${category.id}`)
                                }
                              />
                            </Stack>
                          ) : (
                            // Botón para restaurar categoría eliminada
                            <ListRestoreButton
                              onClick={() =>
                                console.log(`Restaurar ${category.id}`)
                              }
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
              count={filteredCategories.length} // Cantidad total de categorías filtradas
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
            <ListCreateButton />
            <ListShowDeletedButton
              showDeleted={showDeleted} // Estado actual
              onClick={handleShowDeletedToggle} // Alternar entre eliminadas y activas
            />
            <ListUpdateButton />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ListCategoryPage;
