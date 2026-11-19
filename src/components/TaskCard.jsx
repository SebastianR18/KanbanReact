import { PRIORITIES, STATUSES } from '../constants.js';

export default function TaskCard({ task, onEdit, onDelete, onChangeStatus }) {
  const priority = PRIORITIES.find((p) => p.id === task.priority);

  return (
    <article
      className="card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
    >
      <div className="card-top">
        <h3>{task.title}</h3>
        {priority && <span className={`badge badge-${priority.id}`}>{priority.label}</span>}
      </div>

      {task.description && <p className="card-desc">{task.description}</p>}

      <div className="card-actions">
        <select
          value={task.status}
          onChange={(e) => onChangeStatus(e.target.value)}
          aria-label="Cambiar estado"
        >
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="card-buttons">
          <button className="btn btn-small" onClick={onEdit}>
            Editar
          </button>
          <button className="btn btn-small btn-danger" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
