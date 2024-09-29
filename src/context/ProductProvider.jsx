import React, { useState, useEffect } from "react"; // Asegúrate de importar React y los hooks
import { ProductContext } from "./ProductContext";
import Swal from "sweetalert2";
import axios from "axios";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product");
      const updatedProducts = response.data.map((product) => ({
        ...product,
        imageURL: product.imageURL
          ? product.imageURL
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTksvTrc5jnygex4Lc_TVY0JLsNq_k1E9WSUA&s",
      }));
      setProducts(updatedProducts); 
      //console.log(products)
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
