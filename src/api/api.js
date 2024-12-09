import axios from "axios";

// Crea una instancia de Axios
const api = axios.create({
  baseURL: "/api",
});

// Define una función para verificar si un endpoint requiere JWT
const requiereJWT = (method, url) => {
  const rutasRequierenJWT = [
    // User
    { method: "GET", url: "/user" },
    { method: "PUT", url: "/user" },
    { method: "DELETE", url: "/user" },
    { method: "POST", url: "/user/recover" },

    // Subcategory
    { method: "PUT", url: "/subcategory" },
    { method: "DELETE", url: "/subcategory" },
    { method: "POST", url: "/subcategory" },
    { method: "POST", url: "/subcategory/recover" },

    // Product
    { method: "PUT", url: "/product" },
    { method: "DELETE", url: "/product" },
    { method: "POST", url: "/product" },
    { method: "POST", url: "/product/recover" },
    { method: "PATCH", url: "/product/update-stock" },

    // Category
    { method: "PUT", url: "/category" },
    { method: "DELETE", url: "/category" },
    { method: "POST", url: "/category" },
    { method: "POST", url: "/category/recover" },

    // Brand
    { method: "PUT", url: "/brand" },
    { method: "DELETE", url: "/brand" },
    { method: "POST", url: "/brand" },
    { method: "POST", url: "/brand/recover" },

    // Stock-Entry
    { method: "POST", url: "/stock-entry" },

    // Orders
    { method: "POST", url: "/orders" },
  ];

  // Verificar si el método y la URL coinciden con alguna de las rutas que requieren JWT
  return rutasRequierenJWT.some(
    (ruta) => ruta.method === method && ruta.url === url
  );
};

// Agrega un interceptor para incluir el token en cada petición
api.interceptors.request.use(
  (config) => {
    // Si el endpoint requiere JWT, añade el token
    if (requiereJWT(config.method.toUpperCase(), config.url)) {
      const token = sessionStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Incluye el token en los headers
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
