import { OrderHistoryContext } from "./OrderHistoryContext";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../api/api";
import { UserContext } from "./UserContext";

const OrderHistoryProvider = ({ children }) => {
  const { email } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!email) return;
      setLoading(true);
      try {
        const response = await api.get(`/orders/${email}`);
        if (response.data.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se han realizado pedidos.",
          });
        }
        setOrders(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los pedidos.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <OrderHistoryContext.Provider
      value={{
        orders,
        loading,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
};

export default OrderHistoryProvider;
