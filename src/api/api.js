// api.js
import axios from "axios";

// Crea una instancia de Axios
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Agrega un interceptor para incluir el token en cada petición
api.interceptors.request.use(
  (config) => {
    // Verifica si la ruta requiere un token
    const isAuthRoute = config.url.includes("/auth/signin");
    const isRegisterRoute = config.url.includes("/auth/signup");
    const isProductListRoute = config.url.includes("/product");
    const isUserListRouter = config.url.includes("/user");

    if (
      !isAuthRoute &&
      !isRegisterRoute &&
      !isProductListRoute &&
      !isUserListRouter
    ) {
      const token = localStorage.getItem("token"); // Token del local storage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Incluye el token en los encabezados de la petición
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
