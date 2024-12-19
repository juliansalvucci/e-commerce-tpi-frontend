import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";

const ListShowOrderDetails = ({ order }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderProducts = (products) => (
    <Table size="small" sx={{ backgroundColor: "white" }}>
      <TableHead sx={{ backgroundColor: "#283b54", color: "white" }}>
        <TableRow>
          <TableCell align="center" sx={{ color: "white" }}>
            Productos
          </TableCell>
          <TableCell align="center" sx={{ color: "white" }}>
            Precio Unitario
          </TableCell>
          <TableCell align="center" sx={{ color: "white" }}>
            Cantidad
          </TableCell>
          <TableCell align="center" sx={{ color: "white" }}>
            Subtotal
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={index}>
            <TableCell align="center" sx={{ color: "#283b54" }}>
              {product.productName}
            </TableCell>
            <TableCell align="center" sx={{ color: "#283b54" }}>
              ${product.unitPrice.toFixed(2)}
            </TableCell>
            <TableCell align="center" sx={{ color: "#283b54" }}>
              {product.amount}
            </TableCell>
            <TableCell align="center" sx={{ color: "#283b54" }}>
              ${product.subTotal.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Tooltip title={"Ver Detalle"}>
        <span>
          <IconButton onClick={handleOpen} sx={{ color: "#283b54" }}>
            <ViewListIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
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
          {"Detalle de Pedido"}
        </Typography>

        <DialogContent dividers sx={{ width: "100%", height: "100%" }}>
          <Stack spacing={2} alignItems="center">
            {order && renderProducts(order.orderDetails)}
            <Typography variant="h6" align="center">
              <strong>Total (con descuentos aplicados):</strong> $
              {order?.total.toFixed(2)}
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListShowOrderDetails;
