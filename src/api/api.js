// api.js
import axios from 'axios';

// Crea una instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:8080', // Reemplaza con la URL base de tu API
});

// Agrega un interceptor para incluir el token en cada petición
api.interceptors.request.use(
  (config) => {
    // Verifica si la ruta requiere un token
    const isAuthRoute = config.url.includes('/auth/signin');

    if (!isAuthRoute) {
      // Obtén el token desde el almacenamiento local o desde el estado de tu aplicación
      const token = localStorage.getItem('token');

      if (token) {
        // Incluye el token en los encabezados de la petición
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
