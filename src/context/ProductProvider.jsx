import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import Swal from "sweetalert2";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.in/api/products");
      const data = await response.json();

      console.log("Productos recibidos:", data); // Revisa la estructura de la respuesta

      // Verifica si `data` es un array o un objeto
      if (Array.isArray(data)) {
        // Si `data` es directamente un array de productos
        setProducts(data);
      } else if (data.products) {
        // Si `data` es un objeto con `products` anidado
        setProducts(data.products);
      } else {
        throw new Error("La respuesta de la API no contiene productos");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Hubo un problema al cargar los productos'
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