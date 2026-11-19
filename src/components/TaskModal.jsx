import { useEffect, useState } from 'react';
import { PRIORITIES, STATUSES } from '../constants.js';

export default function TaskModal({ task, defaultStatus, onSave, onClose }) {
  const isEditing = Boolean(task);
  const [form, setForm] = useState(
    task ?? { title: '', description: '', priority: 'media', status: defaultStatus ?? 'pendiente' }
  );
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const title = form.title.trim();
    onSave({ ...form, title, description: form.description.trim() });
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h2>

        <label>
          Título
          <input
            autoFocus
            value={form.title}
            onChange={(e) => {
              update('title', e.target.value);
              setError('');
            }}
            placeholder="¿Qué hay que hacer?"
          />
        </label>
        {error && <p className="error">{error}</p>}

        <label>
          Descripción
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Detalles opcionales"
          />
        </label>

        <div className="row">
          <label>
            Estado
            <select value={form.status} onChange={(e) => update('status', e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Prioridad
            <select value={form.priority} onChange={(e) => update('priority', e.target.value)}>
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Guardar cambios' : 'Crear tarea'}
          </button>
        </div>
      </form>
    </div>
  );
}
