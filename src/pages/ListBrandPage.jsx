import React, { useState, useEffect } from "react";
import { Container, Stack, Box, Pagination, Typography } from "@mui/material";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListCreateButton from "../components/ListCreateButton";
import ListUpdateButton from "../components/ListUpdateButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import axios from "axios";
import "../styles/List.css";

const ListBrandPage = () => {
  const [items, setItems] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        showDeleted
          ? "http://localhost:8080/brand/deleted"
          : "http://localhost:8080/brand"
      );
      const updatedItems = response.data.map((item) => ({
        ...item,
        deleted: item.deleted === true,
      }));
      setItems(updatedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [showDeleted]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/brand/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.post(`http://localhost:8080/brand/recover/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error restoring item:", error);
    }
  };

  const handleShowDeletedToggle = () => {
    setShowDeleted((prev) => !prev);
    setPage(1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <Box className="background">
      <Container className="container">
        <Box className="title-box">
          <Typography variant="h3" className="title">
            {showDeleted ? "Listado de Marcas Eliminadas" : "Listado de Marcas"}
          </Typography>
        </Box>

        <Box className="item-list">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div key={item.id} className="item">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    style={{
                      textDecoration: item.deleted ? "line-through" : "none",
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    className="item-buttons button-container"
                  >
                    {showDeleted ? (
                      <ListRestoreButton
                        onClick={() => handleRestore(item.id)}
                      />
                    ) : (
                      <>
                        <ListEditButton onClick={() => handleEdit(item.id)} />
                        <ListDeleteButton
                          onClick={() => handleDelete(item.id)}
                        />
                      </>
                    )}
                  </Stack>
                </Stack>
              </div>
            ))
          ) : (
            <Typography variant="body1">No hay items para mostrar.</Typography>
          )}
        </Box>

        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={2}>
              <ListCreateButton />
              <ListShowDeletedButton
                showDeleted={showDeleted}
                onClick={handleShowDeletedToggle}
              />
              <ListUpdateButton onClick={fetchItems} />
            </Stack>

            <Pagination
              count={Math.ceil(items.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ListBrandPage;
