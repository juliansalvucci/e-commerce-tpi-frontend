import axios from "axios";

// Crea una instancia de Axios
const api = axios.create({
  baseURL: "https://e-commerce-tpi-backend-2.onrender.com/",
});

// Define una función para verificar si un endpoint requiere JWT
const requiereJWT = (method, url) => {
  const rutasNoRequierenJWT = [
    // Subcategory:
    { method: "GET", url: "/subcategory" },
    // Product:
    { method: "GET", url: "/product" },
    // Category:
    { method: "GET", url: "/category" },
    // Brand:
    { method: "GET", url: "/brand" },
  ];

  // Verificar si el método y la URL coinciden con alguna de las rutas que requieren JWT
  return rutasNoRequierenJWT.some(
    (ruta) =>
      ruta.method === method &&
      (typeof ruta.url === "string" ? ruta.url === url : ruta.url.test(url))
  );
};

// Agrega un interceptor para incluir el token en cada petición
api.interceptors.request.use(
  (config) => {
    //console.log(config.url);
    // Si el endpoint requiere JWT, añade el token
    if (!requiereJWT(config.method.toUpperCase(), config.url)) {
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
