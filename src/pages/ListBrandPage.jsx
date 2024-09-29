import React, { useState, useEffect, useContext } from "react";
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
import axios from "axios";
import Swal from "sweetalert2";
import ListCreateButton from "../components/ListCreateButton";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import { BrandContext } from "../context/BrandContext";
import "../styles/List.css";
import formatDateTime from "../utils/formatDateTimeUtils";

const ListBrandPage = () => {
  const navigate = useNavigate();
  const { selectBrandForEdit } = useContext(BrandContext); // Obtener el setter del contexto
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [showDeleted, setShowDeleted] = useState(false);

  const columns = [
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "creationDateTime", label: "Fecha de Creación", minWidth: 170 },
    ...(showDeleted
      ? [{ id: "deleteDatetime", label: "Fecha de Borrado", minWidth: 170 }]
      : []),
    { id: "actions", label: "Acciones", minWidth: 170 },
  ];

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        showDeleted
          ? "http://localhost:8080/brand/deleted"
          : "http://localhost:8080/brand"
      );
      const updatedBrands = response.data.map((brand) => ({
        ...brand,
        deleted: brand.deleted === true,
        creationDatetime: formatDateTime(brand.creationDatetime),
        deleteDatetime: brand.deleteDatetime
          ? formatDateTime(brand.deleteDatetime)
          : null,
      }));
      setBrands(updatedBrands);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [showDeleted]);

  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
    setPage(0);
  };

  const filteredBrands = showDeleted
    ? brands.filter((brand) => brand.deleted)
    : brands.filter((brand) => !brand.deleted);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        selectBrandForEdit(brand); // Actualiza el contexto con la marca seleccionada
        navigate(`/admin/brand/edit`);
      }
    });
  };

  const deleteBrand = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/brand/${id}`);
      fetchBrands();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La marca no puede ser eliminada",
          text: "La marca tiene productos asociados.",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al borrar marca:", error);
      }
    }
  };

  const handleDelete = async (id) => {
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

  const recoverBrand = async (id) => {
    try {
      await axios.post(`http://localhost:8080/brand/recover/${id}`);
      fetchBrands();
    } catch (error) {
      console.error("Error restaurando marca:", error);
    }
  };

  const handleRestore = async (id) => {
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
        recoverBrand(id);
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
              ? "Listado de Marcas Eliminadas"
              : "Listado de Marcas Activas"}
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
                  {brands
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((brand) => (
                      <TableRow hover tabIndex={-1} key={brand.id}>
                        <TableCell align="center">{brand.name}</TableCell>
                        <TableCell align="center">
                          {brand.creationDatetime}
                        </TableCell>
                        {showDeleted && (
                          <TableCell align="center">
                            {brand.deleteDatetime || "N/A"}
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
              rowsPerPageOptions={[3, 5, 10]}
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
            <ListCreateButton label="Marca" />
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
