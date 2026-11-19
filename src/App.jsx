import { useEffect, useState } from 'react';
import Column from './components/Column.jsx';
import TaskModal from './components/TaskModal.jsx';
import { STATUSES } from './constants.js';

const STORAGE_KEY = 'kanban-tareas';

const EXAMPLE_TASKS = [
  {
    id: crypto.randomUUID(),
    title: 'Diseñar la interfaz',
    description: 'Definir columnas y tarjetas del tablero.',
    priority: 'media',
    status: 'completado',
  },
  {
    id: crypto.randomUUID(),
    title: 'Implementar CRUD de tareas',
    description: 'Crear, editar y eliminar tareas.',
    priority: 'alta',
    status: 'en-progreso',
  },
  {
    id: crypto.randomUUID(),
    title: 'Escribir documentación',
    description: '',
    priority: 'baja',
    status: 'pendiente',
  },
];

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : EXAMPLE_TASKS;
  } catch {
    return EXAMPLE_TASKS;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  // null = modal cerrado; { task } = editar; { status } = crear en esa columna
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [tasks]);

  function saveTask(data) {
    if (data.id) {
      setTasks((prev) => prev.map((t) => (t.id === data.id ? data : t)));
    } else {
      setTasks((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
    }
    setModal(null);
  }

  function deleteTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task && window.confirm(`¿Eliminar la tarea "${task.title}"?`)) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  }

  function changeStatus(id, status) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tablero Kanban</h1>
        <input
          className="search"
          type="search"
          placeholder="Buscar tareas..."
          aria-label="Buscar tareas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setModal({ status: 'pendiente' })}>
          + Nueva tarea
        </button>
      </header>

      <main className="board">
        {STATUSES.map((status) => (
          <Column
            key={status.id}
            status={status}
            tasks={tasks.filter(
              (t) => t.status === status.id && t.title.toLowerCase().includes(query)
            )}
            onAdd={() => setModal({ status: status.id })}
            onEdit={(task) => setModal({ task })}
            onDelete={deleteTask}
            onChangeStatus={changeStatus}
          />
        ))}
      </main>

      {modal && (
        <TaskModal
          task={modal.task}
          defaultStatus={modal.status}
          onSave={saveTask}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
