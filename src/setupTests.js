// Añade comparadores como toBeInTheDocument() a expect
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// En Node 25+ el localStorage propio de Node tapa al de jsdom y queda undefined.
// Si falta, creamos uno sencillo en memoria para las pruebas.
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key),
      clear: () => store.clear(),
    },
  });
}

afterEach(() => {
  // Desmonta los componentes y borra los datos guardados entre pruebas
  cleanup();
  localStorage.clear();
});
