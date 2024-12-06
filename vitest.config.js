import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Configura el entorno DOM para pruebas de React
    setupFiles: './setupTests.js', // Configura tu archivo de inicialización si es necesario
  },
});
