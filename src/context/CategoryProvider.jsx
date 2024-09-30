import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CategoryContext } from "./CategoryContext";
import formatDateTime from "../utils/formatDateTimeUtils";

const CategoryProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Función para obtener todas las categorías
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        showDeleted
          ? "http://localhost:8080/category/deleted"
          : "http://localhost:8080/category"
      );
      const updatedCategories = response.data.map((cat) => ({
        ...cat,
        deleted: cat.deleted === true,
        creationDatetime: formatDateTime(cat.creationDatetime),
        deleteDatetime: cat.deleteDatetime
          ? formatDateTime(cat.deleteDatetime)
          : null,
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error (fetch categorías):", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/category/list") {
      fetchCategories();
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchCategories();
  }, [showDeleted]);

  // Función para crear una nueva categoría
  const createCategory = async (newCategory) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/category",
        newCategory
      );
      setCategories((prevCategories) => [...prevCategories, response.data]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La categoría ${response.data.name} fue creada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La categoría no pudo ser creada",
          text: "Ya existe una categoría con ese nombre",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al crear categoría:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para editar una categoría existente
  const editCategory = async (id, updatedCategory) => {
    try {
      if (updatedCategory.name === selectedCategory?.name) {
        // el ? es para que no de error si no hay categoría seleccionada
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se ha modificado el nombre de la categoría",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
        return;
      }
      const prevCategory = selectedCategory.name;
      const response = await axios.put(
        `http://localhost:8080/category/${id}`,
        updatedCategory
      );
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === id ? { ...cat, ...response.data } : cat
        )
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La categoría ${prevCategory} fue editada con éxito a ${response.data.name}!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
      selectCategoryForEdit(null);
      navigate("/admin/category/list");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La categoría no pudo ser editada",
          text: "Ya existe una categoría con ese nombre",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al editar categoría:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para eliminar una categoría
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/category/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La categoría fue eliminada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La categoría no pudo ser eliminada",
          text: "La categoría tiene subcategorías asociadas.",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al eliminar categoría:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para restaurar una categoría eliminada
  const restoreCategory = async (id) => {
    try {
      await axios.post(`http://localhost:8080/category/recover/${id}`);
      await fetchCategories();
      const restoredCategory = categories.find(
        (category) => category.id === id
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La categoría ${restoredCategory.name} fue recuperada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      console.error("Error al restaurar categoría:", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  // Función para manejar la selección de una categoría para editar
  const selectCategoryForEdit = (category) => {
    setSelectedCategory(category);
  };

  const findCategoryById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  }

  const findCategoryByName = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.id : "";
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        showDeleted,
        selectedCategory,
        fetchCategories,
        createCategory,
        editCategory,
        deleteCategory,
        restoreCategory,
        setShowDeleted,
        selectCategoryForEdit,
        findCategoryById,
        findCategoryByName,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
