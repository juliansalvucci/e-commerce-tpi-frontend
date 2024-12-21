import {
  Box,
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
import { parse, format } from "date-fns";

const ListHistoryOrder = () => {
  const {
    orders,
    loading,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useContext(OrderHistoryContext);

  const renderProducts = (products) => (
    <Table size="small" sx={{ backgroundColor: "white" }}>
      <TableHead sx={{ backgroundColor: "#233349", color: "white" }}>
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
            Precio
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
              $
              {product.unitPrice.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </TableCell>
            <TableCell align="center" sx={{ color: "#283b54" }}>
              {product.amount}
            </TableCell>
            <TableCell align="center" sx={{ color: "#283b54" }}>
              $
              {product.subTotal.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Box
      sx={{
        
        backgroundSize: "cover", // Para cubrir todo el contenedor
        backgroundPosition: "center", // Centra la imagen
        minHeight: "100vh",
        p: 6,
      }}
    >
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
              sx={{ backgroundColor: "white", borderRadius: "15px" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "#233349",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.0rem",
                        p: "10px",
                      }}
                    >
                      Detalle de los pedidos
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "#233349",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.0rem",
                        p: "10px",
                      }}
                    >
                      Fecha
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "#233349",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.0rem",
                        p: "10px",
                      }}
                    >
                      Subtotal
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "#233349",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.0rem",
                        p: "10px",
                      }}
                    >
                      Descuento
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "#233349",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.0rem",
                        p: "10px",
                      }}
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .filter(
                      (order) =>
                        order.orderDetails && order.orderDetails.length > 0
                    ) // POR AHORA: Filtrar pedidos vacíos (hasta arreglar)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => {
                      // Calcular el subtotal del pedido
                      const orderSubtotal = order.orderDetails.reduce(
                        (acc, product) => acc + product.subTotal,
                        0
                      );

                      return (
                        <TableRow key={order.id}>
                          <TableCell align="center" sx={{ color: "#283b54" }}>
                            {renderProducts(order.orderDetails)}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#283b54" }}>
                            {format(
                              parse(
                                order.creationDatetime,
                                "dd/MM/yyyy : HH:mm:ss",
                                new Date()
                              ),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#283b54" }}>
                            $
                            {orderSubtotal.toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#283b54" }}>
                            {order.discount}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#283b54" }}>
                            $
                            {order.total.toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box>
              <TablePagination
                component="div"
                count={orders.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="Filas por página"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                }
                sx={{
                  color: "black", 
                  "& .MuiTablePagination-toolbar": {
                    color: "black", 
                  },
                  "& .MuiTablePagination-actions button": {
                    color: "black", // Colorea los botones de navegación
                  },
                  "& .MuiSelect-icon": {
                    color: "black", // Cambia el color del ícono desplegable
                  },
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ListHistoryOrder;
