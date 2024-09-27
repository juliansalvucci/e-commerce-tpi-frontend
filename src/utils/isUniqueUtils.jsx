import axios from "axios";

// Función que consulta la API para verificar si un nombre ya existe
const isUnique = async (tipoClase, nombre) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/${tipoClase}/name/${nombre}`
    );
    return response.data.exists === false; // Devuelve true si el nombre no existe
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return true; // El nombre no existe
    }
    console.error("Error al consultar la API:", error);
    return false; // En caso de otro error, asumimos que no es único
  }
};

export default isUnique;
