import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

const ListStockPopup = ({ open, onClose, selectedRows }) => {
  const [quantities, setQuantities] = useState(
    selectedRows.reduce((acc, row) => ({ ...acc, [row.id]: 0 }), {})
  );

  const handleQuantityChange = (event, productId) => {
    setQuantities({
      ...quantities,
      [productId]: event.target.value,
    });
  };

  const handleConfirm = async () => {
    const stockEntryDetails = selectedRows.map((row) => ({
      productId: row.id,
      quantity: Number(quantities[row.id]),
    }));

    try {
      const response = await axios.post("http://localhost:8080/stock-entry", {
        stockEntryDetails,
      });
      if (response.status === 200) {
        alert("Stock actualizado exitosamente.");
      }
      onClose();
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      alert("Hubo un error al actualizar el stock. Intenta nuevamente.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ backgroundBlendMode: "darken" }}>
      <Typography
        variant="h4"
        align="center"
        color="#283b54"
        gutterBottom
        sx={{ m: 2, fontFamily: "Poppins" }}
      >
        {"Agregar Entrada de Stock"}
      </Typography>

      <DialogContent dividers>
        <Stack spacing={2}>
          {selectedRows.map((row) => (
            <Stack key={row.id} direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1" style={{ minWidth: "150px" }}>
                {row.name}
              </Typography>
              <TextField
                label="Cantidad"
                type="number"
                variant="outlined"
                value={quantities[row.id]}
                onChange={(event) => handleQuantityChange(event, row.id)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListStockPopup;
