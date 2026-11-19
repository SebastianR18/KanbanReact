import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Simula un navegador (document, window, localStorage) dentro de Node
    environment: 'jsdom',
    // Permite usar describe/it/expect sin importarlos en cada archivo
    globals: true,
    // Se ejecuta antes de cada archivo de pruebas
    setupFiles: './src/setupTests.js',
  },
});
