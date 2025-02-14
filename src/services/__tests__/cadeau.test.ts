import { describe, it, expect, vi } from 'vitest';
import getCadeaux, { getCadeauConfig } from '../get.cadeaux';

describe('Tests des fonctions API cadeau', () => {
  describe('getCadeaux', () => {
    it('devrait récupérer la liste des cadeaux', async () => {
      const fakeData = [{ _id: '1', nom: 'Cadeau A' }];

      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => fakeData,
      } as Response);

      const data = await getCadeaux();
      expect(data).toEqual(fakeData);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f/cadeau',
      );

      vi.restoreAllMocks();
    });
  });

  describe('getCadeauConfig', () => {
    it('devrait récupérer les détails d’un cadeau avec un délai de 2000ms', async () => {
      const fakeCadeau = { _id: '1', nom: 'Cadeau A Detail' };

      // On mock fetch pour renvoyer les détails du cadeau
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => fakeCadeau,
      } as Response);

      vi.useFakeTimers();

      const { queryFn } = getCadeauConfig('1');
      const promise = queryFn();

      await vi.advanceTimersByTimeAsync(2000);

      const data = await promise;
      expect(data).toEqual(fakeCadeau);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f/cadeau/1',
      );

      vi.useRealTimers();
      vi.restoreAllMocks();
    });
  });
});
