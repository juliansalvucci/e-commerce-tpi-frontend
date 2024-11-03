import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import React, { useContext } from "react";
import { OrderHistoryContext } from "../context/OrderHistoryContext";

const ListOrderHistory = () => {
  const {
    orders,
    loading,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useContext(OrderHistoryContext);

  const renderProducts = (products) => (
    <Table size="small" sx={{ backgroundColor: "#bcc4cf" }}>
      <TableHead>
        <TableRow>
          <TableCell align="center" sx={{ color: "#283b54" }}>
            Productos
          </TableCell>
          <TableCell align="center" sx={{ color: "#283b54" }}>
            Precio Unitario
          </TableCell>
          <TableCell align="center" sx={{ color: "#283b54" }}>
            Cantidad
          </TableCell>
          <TableCell align="center" sx={{ color: "#283b54" }}>
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
    <Box sx={{ backgroundColor: "#bcc4cf", minHeight: "100vh", p: 6 }}>
      <Typography
        variant="h4"
        align="center"
        color="#283b54"
        gutterBottom
        fontWeight="bold"
        mb={5}
      >
        Lista de Pedidos
      </Typography>
      <Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "#bcc4cf" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#283b54",
                        fontWeight: "bold",
                        fontSize: "1.0rem",
                      }}
                    >
                      Pedidos
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#283b54",
                        fontWeight: "bold",
                        fontSize: "1.0rem",
                      }}
                    >
                      Precio Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          {renderProducts(order.orderDetails)}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#283b54" }}>
                          ${order.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={orders.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página"
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ListOrderHistory;
