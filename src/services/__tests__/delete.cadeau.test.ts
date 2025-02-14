import { describe, it, expect, vi } from 'vitest';
import { deleteCadeau } from '../delete.cadeaux';

describe('deleteCadeau', () => {
  it('devrait supprimer le cadeau après un délai de 2000ms', async () => {
    const id = '1';

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({} as unknown as Response);

    vi.useFakeTimers();

    const promise = deleteCadeau(id);

    await vi.advanceTimersByTimeAsync(2000);

    const result = await promise;

    expect(result).toBe(true);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f/cadeau/${id}`,
      { method: 'DELETE' },
    );

    vi.useRealTimers();
    vi.restoreAllMocks();
  });
});
