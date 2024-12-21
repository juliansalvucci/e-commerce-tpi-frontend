import { describe, it, expect, vi } from 'vitest';

describe('fetchUsers Function', () => {
  it('debería mostrar "N/A" en la columna Fecha de Modificación si no hay fecha de modificación', async () => {
    // Mock de la API
    const api = {
      get: vi.fn().mockResolvedValue({
        data: [
          {
            id: 1,
            deleted: false,
            creationDatetime: '2024-10-01T10:00:00Z',
            updateDateTime: null, // Sin fecha de modificación
            deleteDateTime: null,
          },
        ],
      }),
    };

    // Mock de la función de formato de fecha
    const useFormatDateTime = vi.fn((date) => `formatted(${date})`);

    // Mock del setState
    const setUsers = vi.fn();

    // Implementación de la función
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");
        const updatedUsers = response.data.map((user) => ({
          ...user,
          deleted: user.deleted === true,
          creationDatetime: useFormatDateTime(user.creationDatetime),
          updateDateTime: user.updateDateTime
            ? useFormatDateTime(user.updateDateTime)
            : "N/A",
          deleteDateTime: user.deleteDateTime
            ? useFormatDateTime(user.deleteDateTime)
            : null,
        }));
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error (fetch users):", error);
      }
    };

    // Llamar a la función
    await fetchUsers();

    // Validar que se llama a la API con la ruta correcta
    expect(api.get).toHaveBeenCalledWith("/user");

    // Validar que la función de formato de fecha fue llamada para la fecha de creación
    expect(useFormatDateTime).toHaveBeenCalledWith('2024-10-01T10:00:00Z');

    // Validar que no se llamó a la función de formato para la fecha de modificación
    expect(useFormatDateTime).not.toHaveBeenCalledWith(null);

    // Validar que el estado se actualizó correctamente
    expect(setUsers).toHaveBeenCalledWith([
      {
        id: 1,
        deleted: false,
        creationDatetime: 'formatted(2024-10-01T10:00:00Z)',
        updateDateTime: 'N/A', // Validar que muestra "N/A"
        deleteDateTime: null,
      },
    ]);
  });

  it('debería formatear la fecha de modificación si está presente', async () => {
    // Mock de la API
    const api = {
      get: vi.fn().mockResolvedValue({
        data: [
          {
            id: 1,
            deleted: false,
            creationDatetime: '2024-10-01T10:00:00Z',
            updateDateTime: '2024-11-01T12:00:00Z', // Fecha de modificación presente
            deleteDateTime: null,
          },
        ],
      }),
    };

    // Mock de la función de formato de fecha
    const useFormatDateTime = vi.fn((date) => `formatted(${date})`);

    // Mock del setState
    const setUsers = vi.fn();

    // Implementación de la función
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");
        const updatedUsers = response.data.map((user) => ({
          ...user,
          deleted: user.deleted === true,
          creationDatetime: useFormatDateTime(user.creationDatetime),
          updateDateTime: user.updateDateTime
            ? useFormatDateTime(user.updateDateTime)
            : "N/A",
          deleteDateTime: user.deleteDateTime
            ? useFormatDateTime(user.deleteDateTime)
            : null,
        }));
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error (fetch users):", error);
      }
    };

    // Llamar a la función
    await fetchUsers();

    // Validar que la función de formato de fecha fue llamada para la fecha de modificación
    expect(useFormatDateTime).toHaveBeenCalledWith('2024-11-01T12:00:00Z');

    // Validar que el estado se actualizó correctamente
    expect(setUsers).toHaveBeenCalledWith([
      {
        id: 1,
        deleted: false,
        creationDatetime: 'formatted(2024-10-01T10:00:00Z)',
        updateDateTime: 'formatted(2024-11-01T12:00:00Z)', // Validar que se formateó correctamente
        deleteDateTime: null,
      },
    ]);
  });
});
