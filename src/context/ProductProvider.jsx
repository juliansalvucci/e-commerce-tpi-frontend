import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import Swal from "sweetalert2";
import axios from "axios";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.in/api/products");
      setProducts(response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema al cargar los productos",
      });
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Invoca la función al montar el componente
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
