# Tablero Kanban (React)

Aplicación Kanban estilo Jira hecha con React + Vite.

## Funcionalidades

- Crear, editar y eliminar tareas (título, descripción, prioridad y estado).
- Tres columnas: **Pendiente**, **En progreso** y **Completado**.
- Cambiar el estado de una tarea con el selector de la tarjeta o arrastrándola a otra columna.
- Las tareas se guardan en `localStorage`, así que persisten al recargar.

## Uso

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (por defecto http://localhost:5173).

## Pruebas

```bash
npm test          # ejecuta las pruebas una vez
npm run test:watch  # las vuelve a ejecutar al guardar cambios
```

## Integración continua

`.github/workflows/ci.yml` ejecuta en GitHub Actions, en cada `push` y `pull_request` hacia `main`:
instalación de dependencias (`npm ci`), pruebas (`npm test`) y build de producción (`npm run build`).

## Estructura

```
src/
  App.jsx               Estado de las tareas y lógica CRUD
  constants.js          Estados y prioridades
  components/
    Column.jsx          Columna del tablero (zona de arrastre)
    TaskCard.jsx        Tarjeta de tarea
    TaskModal.jsx       Formulario para crear/editar
  styles.css
```
