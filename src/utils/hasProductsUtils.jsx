import axios from "axios";

// Función que consulta la API para verificar si una marca, categoría o subcategoría tiene productos
const hasProducts = async (tipoClase, name) => {
  try {
    const response = await axios.get(`http://localhost:8080/product`);
    const products = response.data;
    if (tipoClase === "category") {
      const hasCategoryProducts = products.some(
        (product) => product.category === name
      );
      return hasCategoryProducts;
    } else if (tipoClase === "subcategory") {
      const hasSubCategoryProducts = products.some(
        (product) => product.subCategory === name
      );
      return hasSubCategoryProducts;
    } else if (tipoClase === "brand") {
      const hasBrandProducts = products.some(
        (product) => product.brand === name
      );
      return hasBrandProducts;
    } else {
      throw new Error(
        "Tipo de clase no válido. Debe ser 'brand', 'category' o 'subcategory'."
      );
    }
  } catch (error) {
    console.error("Error al consultar la API:", error);
    return false; // En caso de error, asumimos que no tiene productos
  }
};

export default hasProducts;
