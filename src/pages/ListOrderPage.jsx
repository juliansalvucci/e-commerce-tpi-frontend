import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import ListApplyFilters from "../components/ListApplyFilters";
import ListDataGrid from "../components/ListDataGrid";
import ListOrderFilters from "../components/ListOrderFilters";
import ListShowOrderDetailsButton from "../components/ListShowOrderDetails";
import { OrderHistoryContext } from "../context/OrderHistoryContext";
import { UserContext } from "../context/UserContext";
import useTextfieldTheme from "../utils/useTextfieldTheme";

const ListOrderPage = () => {
  const { todayIncome, setTodayIncome, fetchOrdersByEmail } =
    useContext(OrderHistoryContext);
  const { fetchClients } = useContext(UserContext);

  const styles = useTextfieldTheme();

  const [selectedEmail, setSelectedEmail] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [todayFilter, setTodayFilter] = useState(false);
  const [lastWeekFilter, setLWFilter] = useState(false);
  const [lastMonthFilter, setLMFilter] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    userEmail: true,
    creationDatetime: true,
    total: true,
    discount: true,
  });

  useEffect(() => {
    const updatePageSize = () => {
      const gridHeight = window.innerHeight - 200;
      const rowHeight = 52;
      const newPageSize = Math.floor(gridHeight / rowHeight);
      setPageSize(newPageSize);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  // Maneja la aplicación de filtros
  const handleApplyFilters = async () => {
    const isAnyFilterApplied =
      selectedEmail || todayFilter || lastWeekFilter || lastMonthFilter;

    if (!isAnyFilterApplied) {
      setFilteredOrders([]);
      setTodayIncome(0);
      return;
    }

    const filtered =
      (await fetchOrdersByEmail(selectedEmail, todayFilter)) || [];
    setFilteredOrders(filtered);
  };

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      const emails = await fetchClients();
      setLoading(false);

      setOptions([...emails]);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleIncomeValue = () => {
    const orders = filteredOrders || [];
    const value =
      todayIncome || orders.reduce((sum, order) => sum + order.total, 0);
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    });
  };

  // Definición de las columnas de la tabla
  const columns = [
    {
      field: "id",
      headerName: "Nº Pedido",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userEmail",
      headerName: "Cliente",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "creationDatetime",
      headerName: "Fecha",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      headerName: "Total de Pedido",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const formattedPrice =
          params.value % 1 === 0 // Para ver si tiene decimales
            ? params.value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              })
            : params.value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              });
        return <span>{formattedPrice}</span>;
      },
    },
    {
      field: "discount",
      headerName: "Descuento",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={1} justifyContent="center">
          <ListShowOrderDetailsButton
            onClick={() => handleShowOrderDetails(params.row.id)}
            order={params.row}
          />
        </Stack>
      ),
    },
  ].filter(Boolean); // Asegura que no hay columnas undefined

  return (
    <Box
      sx={{
        backgroundColor: "#233349",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        color="white"
        gutterBottom
        sx={{ fontFamily: "Poppins" }}
      >
        Listado de Pedidos
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Autocomplete
          autoHighlight
          fullWidth
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          options={options}
          loading={loading}
          value={selectedEmail} // Representa el valor seleccionado
          onChange={(e, value) => setSelectedEmail(value || "")}
          inputValue={inputValue} // Representa el texto que esta escribiendo el usuario
          onInputChange={(e, value) => setInputValue(value)}
          slotProps={{
            popupIndicator: {
              sx: { color: "white" },
            },
            clearIndicator: {
              sx: { color: "white" },
            },
            listbox: {
              sx: { backgroundColor: "#233349", color: "white" },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar por Email"
              variant="filled"
              fullWidth
              {...styles}
              style={{ width: "100%", backgroundColor: "transparent" }}
              slotProps={{
                input: {
                  style: { color: "white" },
                  ...params.InputProps,
                },
              }}
            />
          )}
        />
        <TextField
          id="filled-read-only-input"
          label={todayIncome ? "Ganancias de hoy" : "Total del Cliente"}
          variant="filled"
          value={handleIncomeValue()}
          {...styles}
          style={{ width: "50%", backgroundColor: "transparent" }}
          slotProps={{
            input: {
              style: { color: "white" },
            },
          }}
        />

        <ListApplyFilters onClick={handleApplyFilters} />
      </Stack>
      <Box sx={{ height: "calc(100vh - 200px)" }}>
        <ListDataGrid
          rows={filteredOrders}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          disableColumnMenu={true}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          disableSelectionOnClick
          slots={{ footer: ListOrderFilters }}
          slotProps={{
            footer: {
              todayFilter,
              setTodayFilter,
              lastWeekFilter,
              setLWFilter,
              lastMonthFilter,
              setLMFilter,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ListOrderPage;
