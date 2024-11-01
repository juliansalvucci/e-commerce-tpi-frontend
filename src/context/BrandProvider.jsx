import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { BrandContext } from "./BrandContext";
import api from "../api/api";
import useFormatDateTime from "../utils/useFormatDateTime";

const BrandProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [brands, setBrands] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Función para obtener todas las marcas
  const fetchBrands = async () => {
    try {
      const response = await api.get(showDeleted ? "/brand/deleted" : "/brand");
      const updatedBrands = response.data.map((brand) => ({
        ...brand,
        deleted: brand.deleted === true,
        creationDatetime: useFormatDateTime(brand.creationDatetime),
        updateDatetime: brand.updateDatetime
          ? useFormatDateTime(brand.updateDatetime)
          : "N/A",
        deleteDatetime: brand.deleteDatetime
          ? useFormatDateTime(brand.deleteDatetime)
          : null,
      }));
      setBrands(updatedBrands);
    } catch (error) {
      console.error("Error (fetch marca):", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/brand/list") {
      fetchBrands();
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchBrands();
  }, [showDeleted]);

  // Función para crear una nueva marca
  const createBrand = async (newBrand) => {
    try {
      const response = await api.post("/brand", newBrand);
      setBrands((prevBrands) => [...prevBrands, response.data]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La marca ${response.data.name} fue creada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La marca no pudo ser creada",
          text: error.response.data.name,
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al crear marca:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para editar una marca existente
  const editBrand = async (id, updatedBrand) => {
    try {
      if (updatedBrand.name === selectedBrand?.name) {
        // el ? es para que no de error si no hay marca seleccionada
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se ha modificado el nombre de la marca",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
        return;
      }
      const prevBrand = selectedBrand.name;
      const response = await api.put(`/brand/${id}`, updatedBrand);
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.id === id ? { ...brand, ...response.data } : brand
        )
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La marca ${prevBrand} fue editada con éxito a ${response.data.name}!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
      selectBrandForEdit(null);
      navigate("/admin/brand/list");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La marca no pudo ser editada",
          text: error.response.data.name,
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al editar marca:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para eliminar una marca
  const deleteBrand = async (id) => {
    try {
      await api.delete(`/brand/${id}`);
      setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La marca fue eliminada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "La marca no pudo ser eliminada",
          text: error.response.data.id,
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al eliminar marca:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para restaurar una marca eliminada
  const restoreBrand = async (id) => {
    try {
      await api.post(`/brand/recover/${id}`);
      await fetchBrands();
      const restoredBrand = brands.find((brand) => brand.id === id);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `La marca ${restoredBrand.name} fue recuperada con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      console.error("Error al restaurar marca:", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  // Función para manejar la selección de una marca para editar
  const selectBrandForEdit = (brand) => {
    setSelectedBrand(brand);
  };

  // Función para encontrar una marca por su ID
  const findBrandById = (brandId) => {
    const brand = brands.find((brand) => brand.id === brandId);
    return brand ? brand.name : "";
  };

  return (
    <BrandContext.Provider
      value={{
        brands,
        showDeleted,
        selectedBrand,
        fetchBrands,
        createBrand,
        editBrand,
        deleteBrand,
        restoreBrand,
        setShowDeleted,
        selectBrandForEdit,
        findBrandById,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export default BrandProvider;
