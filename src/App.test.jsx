import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App.jsx';

// Devuelve la columna (<section>) cuyo título coincide con el texto dado
function getColumn(name) {
  return screen.getByRole('heading', { level: 2, name }).closest('section');
}

describe('Tablero Kanban', () => {
  it('muestra las tres columnas', () => {
    render(<App />);

    expect(getColumn('Pendiente')).toBeInTheDocument();
    expect(getColumn('En progreso')).toBeInTheDocument();
    expect(getColumn('Completado')).toBeInTheDocument();
  });

  it('crea una tarea nueva en la columna Pendiente', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '+ Nueva tarea' }));
    await user.type(screen.getByPlaceholderText('¿Qué hay que hacer?'), 'Comprar café');
    await user.click(screen.getByRole('button', { name: 'Crear tarea' }));

    expect(within(getColumn('Pendiente')).getByText('Comprar café')).toBeInTheDocument();
  });

  it('no deja crear una tarea sin título', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '+ Nueva tarea' }));
    await user.click(screen.getByRole('button', { name: 'Crear tarea' }));

    expect(screen.getByText('El título es obligatorio.')).toBeInTheDocument();
  });

  it('edita el título de una tarea', async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen.getByText('Escribir documentación').closest('article');
    await user.click(within(card).getByRole('button', { name: 'Editar' }));

    const input = screen.getByPlaceholderText('¿Qué hay que hacer?');
    await user.clear(input);
    await user.type(input, 'Documentación final');
    await user.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    expect(screen.getByText('Documentación final')).toBeInTheDocument();
    expect(screen.queryByText('Escribir documentación')).not.toBeInTheDocument();
  });

  it('cambia el estado de una tarea a Completado', async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen.getByText('Escribir documentación').closest('article');
    await user.selectOptions(within(card).getByRole('combobox'), 'completado');

    expect(within(getColumn('Completado')).getByText('Escribir documentación')).toBeInTheDocument();
    expect(within(getColumn('Pendiente')).queryByText('Escribir documentación')).not.toBeInTheDocument();
  });

  it('elimina una tarea tras confirmar', async () => {
    const user = userEvent.setup();
    // window.confirm no existe en jsdom: lo simulamos respondiendo "Aceptar"
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<App />);

    const card = screen.getByText('Escribir documentación').closest('article');
    await user.click(within(card).getByRole('button', { name: 'Eliminar' }));

    expect(window.confirm).toHaveBeenCalled();
    expect(screen.queryByText('Escribir documentación')).not.toBeInTheDocument();
  });
});
