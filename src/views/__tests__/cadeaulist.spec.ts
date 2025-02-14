import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import CadeauxView from '@/views/CadeauList.vue';
import getCadeaux, { getCadeauConfig } from '@/services/get.cadeaux';
import { deleteCadeau } from '@/services/delete.cadeaux';

const fakeCadeaux = [
  { _id: '1', title: 'Cadeau 1', url: '/1' },
  { _id: '2', title: 'Cadeau 2', url: '/2' },
];

vi.mock('@/services/get.cadeaux', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve(fakeCadeaux)),
  getCadeauConfig: vi.fn(),
}));

vi.mock('@/services/delete.cadeaux', () => ({
  deleteCadeau: vi.fn(() => Promise.resolve(true)),
}));

describe('CadeauxView component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it('renders loading state and displays data', async () => {
    const wrapper = mount(CadeauxView, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    });
    expect(wrapper.html()).toContain('Loading...');
    await flushPromises();
    expect(wrapper.html()).toContain('Cadeau 1');
    expect(wrapper.html()).toContain('Cadeau 2');
  });

  it('calls deleteCadeau and updates the list when delete button is clicked', async () => {
    const wrapper = mount(CadeauxView, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    });
    await flushPromises();
    const buttons = wrapper.findAll('button');
    await buttons[0].trigger('click');
    await flushPromises();
    expect(deleteCadeau).toHaveBeenCalledWith('1');
    expect(wrapper.html()).not.toContain('Cadeau 1');
    expect(wrapper.html()).toContain('Cadeau 2');
  });
});
