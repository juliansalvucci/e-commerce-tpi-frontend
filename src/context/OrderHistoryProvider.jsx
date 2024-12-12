import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { OrderHistoryContext } from "./OrderHistoryContext";
import { UserContext } from "./UserContext";
import api from "../api/api";
import useFormatDateTime from "../utils/useFormatDateTime";

const OrderHistoryProvider = ({ children }) => {
  const { loggedUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [todayIncome, setTodayIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (location.pathname === "/orders") {
      fetchOrders();
    }
  }, [location.pathname]);

  const fetchOrders = async () => {
    const email = loggedUser?.email;
    if (!email) return;
    setLoading(true);
    try {
      const response = await api.get(`/orders/${email}`);
      if (response.data.length === 0) {
        Swal.fire({
          icon: "warning",
          text: "No se han realizado pedidos.",
        });
      }
      const updatedOrders = response.data.map((order) => ({
        ...order,
        creationDatetime: useFormatDateTime(order.creationDatetime),
      }));
      setOrders(updatedOrders);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "No se pudieron cargar los pedidos.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchOrdersByEmail = async (email, isToday) => {
    const today = new Date();
    const todayDate = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    )
      .toISOString()
      .split("T")[0];
    //console.log(todayDate);
    const URL = isToday ? `/reports/${todayDate}` : `/orders/${email}`;
    try {
      const response = await api.get(URL);
      setTodayIncome(response.data.incomeOfDay);
      const ordersArray = isToday ? response.data.orders : response.data;
      //console.log("OrdersArray es: ", ordersArray);
      const updatedOrders = ordersArray.map((order) => ({
        ...order,
        creationDatetime: useFormatDateTime(order.creationDatetime),
      }));
      //console.log("updatedOrders es:", updatedOrders);
      const filtered = email
        ? updatedOrders.filter((order) => order.userEmail === email)
        : updatedOrders;
      //console.log(filtered);
      return filtered;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const message = isToday
          ? error.response.data.date
          : `No se encontraron pedidos del usuario ${email}`;
        Swal.fire({
          icon: "error",
          title: "No se encontraron pedidos",
          text: message,
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al obtener los pedidos", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  return (
    <OrderHistoryContext.Provider
      value={{
        orders,
        todayIncome,
        loading,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        setTodayIncome,
        fetchOrdersByEmail,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
};

export default OrderHistoryProvider;
