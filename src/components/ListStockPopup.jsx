import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { ProductContext } from "../context/ProductContext";
import { stockEntrySchema } from "../schemas";

const ListStockPopup = ({ open, onClose, resetGrid, selectedRows }) => {
  const { selectedQuantities, updateStockQuantity, createStockEntry } =
    useContext(ProductContext);

  const handleQuantityChange = (event, productId) => {
    updateStockQuantity(productId, event.target.value);
  };

  const handleConfirm = async () => {
    try {
      await Promise.all(
        selectedRows.map((row) =>
          stockEntrySchema.validate({
            cantidad: selectedQuantities[row.id] || 0,
          })
        )
      );
      Swal.fire({
        title: "Registrar Entrada de Stock",
        text: "¿Estás seguro que quieres registrar esta entrada de stock?",
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
          createStockEntry(selectedRows);
          onClose();
          resetGrid();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear la entrada de stock",
        text: "La cantidad debe ser mayor o igual a 1",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    }
  };

  const handleClose = () => {
    Swal.fire({
      title: "Cancelar Entrada de Stock",
      text: "¿Estás seguro que quieres cancelar la entrada de stock?",
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
        onClose();
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ backgroundBlendMode: "darken", zIndex: 1 }}
    >
      <Typography
        variant="h4"
        align="center"
        color="#283b54"
        gutterBottom
        sx={{ m: 2, fontFamily: "Poppins" }}
      >
        {"Agregar Entrada de Stock"}
      </Typography>

      <DialogContent dividers sx={{ width: "100%", height: "100%" }}>
        <Stack spacing={2} alignItems="center">
          <Table>
            <TableHead sx={{ backgroundColor: "#283b54" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }} align="center">
                  Nombre
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Color
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Stock
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Cantidad
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Nuevo Stock
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRows.map((row) => {
                const currentStockColor =
                  row.stock <= row.stockMin ? "red" : "#283b54";
                const newStock =
                  parseInt(row.stock) +
                  parseInt(selectedQuantities[row.id] || 0);
                const newStockColor =
                  newStock <= row.stockMin ? "red" : "#283b54";
                return (
                  <TableRow key={row.id}>
                    <TableCell sx={{ color: "#283b54" }} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ color: "#283b54" }} align="center">
                      {row.color}
                    </TableCell>
                    <TableCell align="center" sx={{ color: currentStockColor }}>
                      {row.stock}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        label="Cantidad"
                        type="number"
                        variant="outlined"
                        value={selectedQuantities[row.id] || 0}
                        onChange={(event) =>
                          handleQuantityChange(event, row.id)
                        }
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ color: newStockColor }}>
                      {newStock}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Stack>
      </DialogContent>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ m: 2 }}
      >
        <DialogActions>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              backgroundColor: "#283b54",
              color: "white",
              "&:hover": {
                backgroundColor: "#bed0dd",
                color: "black",
              },
            }}
            startIcon={<AddIcon />}
          >
            Confirmar
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#283b54",
              color: "white",
              "&:hover": {
                backgroundColor: "#bed0dd",
                color: "black",
              },
            }}
            startIcon={<CloseIcon />}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default ListStockPopup;
