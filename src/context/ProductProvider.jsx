import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ProductContext } from "./ProductContext";
import formatDateTime from "../utils/formatDateTimeUtils";

export const ProductProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        showDeleted
          ? "http://localhost:8080/product/deleted"
          : "http://localhost:8080/product"
      );
      const updatedProducts = response.data.map((product) => ({
        ...product,
        imageURL: product.imageURL
          ? product.imageURL
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTksvTrc5jnygex4Lc_TVY0JLsNq_k1E9WSUA&s",
        deleted: product.deleted === true,
        creationDatetime: formatDateTime(product.creationDatetime),
        deleteDatetime: product.deleteDatetime
          ? formatDateTime(product.deleteDatetime)
          : null,
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error (fetch productos):", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/product/list") {
      fetchProducts();
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchProducts();
  }, [showDeleted]);

  // Función para crear un nuevo producto
  const createProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/product",
        newProduct
      );
      setProducts((prevProducts) => [...prevProducts, response.data]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El producto ${response.data.name} fue creado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "El producto no pudo ser creado",
          text: "Ya existe un producto con ese nombre",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al crear producto:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  // Función para editar un producto existente
  const editProduct = async (id, updatedProduct) => {
    try {
      if (
        updatedProduct.name === selectedProduct?.name &&
        updatedProduct.description === selectedProduct?.description &&
        updatedProduct.price === selectedProduct?.price &&
        updatedProduct.stock === selectedProduct?.stock &&
        updatedProduct.stockMin === selectedProduct?.stockMin &&
        updatedProduct.imageURL === selectedProduct?.imageURL &&
        updatedProduct.color === selectedProduct?.color &&
        updatedProduct.size === selectedProduct?.size &&
        updatedProduct.brandId === selectedProduct?.brandId &&
        updatedProduct.subCategoryId === selectedProduct?.subCategoryId
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se ha modificado el producto",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
        return;
      }
      const prevProduct = selectedProduct.name;
      const response = await axios.put(
        `http://localhost:8080/product/${id}`,
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...response.data } : product
        )
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El producto ${prevProduct} fue editado con éxito a ${response.data.name}!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
      selectProductForEdit(null);
      navigate("/admin/product/list");
    } catch (error) {
      console.error("Error al editar producto:", error); // Por ahora mostramos el error por consola por comodidad
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/product/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El producto fue eliminado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "El producto no pudo ser eliminado",
          text: error.response.data.stock,
          //text: "No puedes eliminar un producto con stock"
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

  // Función para restaurar un producto eliminado
  const restoreProduct = async (id) => {
    try {
      await axios.post(`http://localhost:8080/product/recover/${id}`);
      await fetchProducts();
      const restoredProduct = products.find((product) => product.id === id);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El producto ${restoredProduct?.name} fue recuperado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      console.error("Error al restaurar producto:", error);
    }
  };

  // Función para formatear el producto a editar
  const formatProductForEdit = (product, categories, subCategories, brands) => {
    const matchedSubCategory = subCategories.find(
      (subcat) => subcat.name === product.subCategory
    );
    //console.log(matchedSubCategory);
    const matchedBrand = brands.find((brand) => brand.name === product.brand);
    //console.log(matchedBrand);
    const matchedCategory = categories.find(
      (category) => category.name === matchedSubCategory.category
    );
    //console.log(matchedCategory);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      stockMin: product.stockMin,
      imageURL: product.imageURL,
      color: product.color,
      size: product.size,
      brandId: matchedBrand ? matchedBrand.id : null,
      subCategoryId: matchedSubCategory ? matchedSubCategory.id : null,
      categoryId: matchedCategory ? matchedCategory.id : null,
    };
  };

  // Función para manejar la selección de un producto para editar
  const selectProductForEdit = (product) => {
    setSelectedProduct(product);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        showDeleted,
        selectedProduct,
        fetchProducts,
        createProduct,
        editProduct,
        deleteProduct,
        restoreProduct,
        setShowDeleted,
        formatProductForEdit,
        selectProductForEdit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
