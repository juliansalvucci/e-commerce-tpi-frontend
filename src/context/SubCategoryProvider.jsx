import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { SubCategoryContext } from "./SubCategoryContext";
import formatDateTime from "../utils/formatDateTimeUtils";

const SubCategoryProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subCategories, setSubCategories] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Función para obtener todas las subcategorías
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        showDeleted
          ? "http://localhost:8080/subcategory/deleted"
          : "http://localhost:8080/subcategory"
      );
      const updatedSubCategories = response.data.map((subcat) => ({
        ...subcat,
        deleted: subcat.deleted === true,
        creationDatetime: formatDateTime(subcat.creationDatetime),
        deleteDatetime: subcat.deleteDatetime
          ? formatDateTime(subcat.deleteDatetime)
          : null,
      }));
      setSubCategories(updatedSubCategories);
    } catch (error) {
      console.error("Error (fetch subcategorías):", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/subcategory/list") {
      fetchSubCategories();
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchSubCategories();
  }, [showDeleted]);

  // Función para crear una nueva categoría
  const createSubCategory = async (newSubCategory) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/subcategory",
        newSubCategory
      );
      setSubCategories((prevSubCategories) => [
        ...prevSubCategories,
        response.data,
      ]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La subcategoría ${response.data.name} fue creada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La subcategoría no pudo ser creada",
          text: "Ya existe una subcategoría con ese nombre",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al crear subcategoría:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para editar una subcategoría existente
  const editSubCategory = async (id, updatedSubCategory) => {
    try {
      console.log(selectedSubCategory.id);
      console.log(updatedSubCategory);
      if (
        updatedSubCategory.name === selectedSubCategory?.name &&
        updatedSubCategory.categoryId === selectedSubCategory?.categoryId
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se ha modificado la subcategoría",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
        return;
      }
      const prevSubCategory = selectedSubCategory.name;
      const response = await axios.put(
        `http://localhost:8080/subcategory/${id}`,
        updatedSubCategory
      );
      setSubCategories((prevSubCategories) =>
        prevSubCategories.map((subcat) =>
          subcat.id === id ? { ...subcat, ...response.data } : subcat
        )
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La subcategoría ${prevSubCategory} fue editada con éxito a ${response.data.name}!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
      selectSubCategoryForEdit(null);
      navigate("/admin/subcategory/list");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La subcategoría no pudo ser editada",
          text: "Ya existe una subcategoría con ese nombre",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al editar subcategoría:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para eliminar una subcategoría
  const deleteSubCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/subcategory/${id}`);
      setSubCategories((prevSubCategories) =>
        prevSubCategories.filter((subcat) => subcat.id !== id)
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La subcategoría fue eliminada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La subcategoría no pudo ser eliminada",
          text: "La subcategoría tiene productos asociados",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al eliminar subcategoría:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para restaurar una subcategoría eliminada
  const restoreSubCategory = async (id) => {
    try {
      await axios.post(`http://localhost:8080/subcategory/recover/${id}`);
      await fetchSubCategories();
      const restoredSubCategory = subCategories.find(
        (subcategory) => subcategory.id === id
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La subcategoría ${restoredSubCategory?.name} fue recuperada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      console.error("Error al restaurar subcategoría:", error);
    }
  };

  // Función para formatear la subcategoría a editar
  const formatSubCategoryForEdit = (subCategory, categories) => {
    const matchedCategory = categories.find(
      (cat) => cat.name === subCategory.category
    );
    return {
      id: subCategory.id,
      name: subCategory.name,
      categoryId: matchedCategory ? matchedCategory.id : null,
    };
  };

  // Función para manejar la selección de una categoría para editar
  const selectSubCategoryForEdit = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  return (
    <SubCategoryContext.Provider
      value={{
        subCategories,
        showDeleted,
        selectedSubCategory,
        fetchSubCategories,
        createSubCategory,
        editSubCategory,
        deleteSubCategory,
        restoreSubCategory,
        setShowDeleted,
        formatSubCategoryForEdit,
        selectSubCategoryForEdit,
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};

export default SubCategoryProvider;
