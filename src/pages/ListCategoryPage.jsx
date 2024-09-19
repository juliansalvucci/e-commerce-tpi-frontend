import React, { useState } from "react";
import { Container, Stack, Box, Pagination, Typography } from "@mui/material";
import ListCategoryAccordion from "../components/ListCategoryAccordion";
import ListDeleteButton from "../components/ListDeleteButton";
import ListEditButton from "../components/ListEditButton";
import ListRestoreButton from "../components/ListRestoreButton";
import ListCreateButton from "../components/ListCreateButton";
import ListShowDeletedButton from "../components/ListShowDeletedButton";
import ListUpdateButton from "../components/ListUpdateButton";
import "../styles/List.css";

const ListCategoryPage = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Categoria 1",
      creationDateTime: "2024-08-10",
      description: "Descripcion",
      deleted: false,
    },
    {
      id: 2,
      name: "Categoria 2",
      creationDateTime: "2024-08-12",
      deleteDatetime: "2024-09-01",
      description: "Descripcion",
      deleted: true,
    },
    {
      id: 3,
      name: "Categoria 3",
      creationDateTime: "2024-08-15",
      description: "Descripcion",
      deleted: false,
    },
    {
      id: 4,
      name: "Categoria 4",
      creationDateTime: "2024-08-18",
      description: "Descripcion",
      deleted: false,
    },
    {
      id: 5,
      name: "Categoria 5",
      creationDateTime: "2024-08-20",
      description: "Descripcion",
      deleted: false,
    },
    {
      id: 6,
      name: "Categoria 6",
      creationDateTime: "2024-08-22",
      deleteDatetime: "2023-09-02",
      description: "Descripcion",
      deleted: true,
    },
    {
      id: 7,
      name: "Categoria 7",
      creationDateTime: "2024-08-25",
      description: "Descripcion",
      deleted: false,
    },
  ]);

  const [expandedAccordions, setExpandedAccordions] = useState(
    categories.map((category) => category.id)
  );
  const [page, setPage] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);
  const itemsPerPage = 3;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleShowDeletedToggle = () => {
    setShowDeleted(!showDeleted);
    setPage(1);
  };

  const toggleAccordion = (id) => {
    if (expandedAccordions.includes(id)) {
      setExpandedAccordions(
        expandedAccordions.filter((accordionId) => accordionId !== id)
      );
    } else {
      setExpandedAccordions([...expandedAccordions, id]);
    }
  };

  const filteredCategories = showDeleted
    ? categories.filter((category) => category.deleted)
    : categories.filter((category) => !category.deleted);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  return (
    <Box className="background">
      <Container className="container">
        <Box className="title-box">
          <Typography variant="h3" className="title">
            {showDeleted
              ? "Listado de Categorías Eliminadas"
              : "Listado de Categorías Activas"}
          </Typography>
        </Box>

        <Box className="category-list">
          {currentCategories.map((category) => (
            <div key={category.id} className="category-item">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <ListCategoryAccordion
                  category={category}
                  expanded={expandedAccordions.includes(category.id)}
                  onToggle={() => toggleAccordion(category.id)}
                  disableGutters
                />

                <Stack
                  direction={
                    expandedAccordions.includes(category.id) ? "column" : "row"
                  }
                  spacing={1}
                  className="category-buttons button-container"
                >
                  {!category.deleted ? (
                    <>
                      <ListDeleteButton
                        onClick={() => handleDelete(category.id)}
                      />
                      <ListEditButton
                        onClick={() => handleEdit(category.id)}
                      />
                    </>
                  ) : (
                    <ListRestoreButton
                      onClick={() => handleRestore(category.id)}
                      className="restore-button"
                    />
                  )}
                </Stack>
              </Stack>
            </div>
          ))}
        </Box>
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
            <ListUpdateButton />
          </Stack>

          <Pagination
            count={Math.ceil(filteredCategories.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default ListCategoryPage;
