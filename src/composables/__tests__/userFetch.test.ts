import { describe, it, expect, vi } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import useFetch from '../useFetch';

describe('useFetch', () => {
  it('devrait récupérer les données après le montage du composant', async () => {
    vi.useFakeTimers();
    const fakeResponse = { results: ['Mercure', 'Vénus', 'Terre'] };
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => fakeResponse,
    } as Response);

    const TestComponent = defineComponent({
      template: `<div>
          <div data-testid="data">{{ data }}</div>
          <div data-testid="loading">{{ loading }}</div>
          <div data-testid="error">{{ error }}</div>
        </div>`,
      setup() {
        const { data, loading, error } = useFetch<string[]>('https://fakeapi.com/planets');
        return { data, loading, error };
      },
    });

    const wrapper = mount(TestComponent);
    expect(wrapper.get('[data-testid="loading"]').text()).toBe('true');
    await vi.advanceTimersByTimeAsync(2000);
    await nextTick();
    expect(global.fetch).toHaveBeenCalledWith('https://fakeapi.com/planets');
    expect(wrapper.vm.data).toEqual(fakeResponse.results);
    expect(wrapper.vm.loading).toBe(false);
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
});
