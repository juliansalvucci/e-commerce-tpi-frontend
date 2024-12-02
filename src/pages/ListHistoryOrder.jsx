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
import backgroundImage from "../assets/home-completo.png";

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
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
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
                        backgroundColor: "#283b54",
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "1.8rem",
                        p: "18px",
                      }}
                    >
                      Lista de Pedidos
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
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell
                          sx={{
                            textAlign: "center", // Centra horizontalmente
                            verticalAlign: "middle", // Centra verticalmente
                            fontSize: "15px", // Opcional: ajustar tamaño de texto
                          }}
                        >
                          {renderProducts(order.orderDetails)}
                          <strong>Total:</strong> ${order.total.toFixed(2)}
                          <br />
                        </TableCell>
                      </TableRow>
                    ))}
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
                  color: "white", // Cambia el color del texto a blanco
                  "& .MuiTablePagination-toolbar": {
                    color: "white", // Asegura que los textos internos sean blancos
                  },
                  "& .MuiTablePagination-actions button": {
                    color: "white", // Colorea los botones de navegación
                  },
                  "& .MuiSelect-icon": {
                    color: "white", // Cambia el color del ícono desplegable
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
