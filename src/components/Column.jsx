import { useState } from 'react';
import TaskCard from './TaskCard.jsx';

export default function Column({ status, tasks, onAdd, onEdit, onDelete, onChangeStatus }) {
  const [isOver, setIsOver] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData('text/plain');
    if (id) onChangeStatus(id, status.id);
  }

  return (
    <section
      className={`column column-${status.id} ${isOver ? 'is-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsOver(false);
      }}
      onDrop={handleDrop}
    >
      <header className="column-header">
        <h2>{status.label}</h2>
        <span className="count">{tasks.length}</span>
      </header>

      <div className="column-body">
        {tasks.length === 0 && <p className="empty">Sin tareas</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
            onChangeStatus={(newStatus) => onChangeStatus(task.id, newStatus)}
          />
        ))}
      </div>

      <button className="btn btn-ghost add-btn" onClick={onAdd}>
        + Añadir tarea
      </button>
    </section>
  );
}
