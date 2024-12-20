import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  test: {
    testTimeout: 20000,
    globals: true, // Permite usar 'expect' y otros sin importarlos manualmente
    environment: 'jsdom', // Entorno necesario para pruebas con React
    setupFiles: './setupTests.js', // Archivo de configuración para las pruebas
    css: true
  },
  plugins: [react()],
  resolve: {
    alias: {
      buffer: "buffer", // Polyfill manual para Buffer
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
