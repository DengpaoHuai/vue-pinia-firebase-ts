import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import useUserStore from '@/stores/user';
import LoginView from '@/views/LoginView.vue';

const mockPush = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
  };
});

import * as firebaseAuth from 'firebase/auth';

describe('LoginView component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockPush.mockReset();
    const signInMock = firebaseAuth.signInWithEmailAndPassword;
    if (signInMock && typeof signInMock.mockReset === 'function') {
      signInMock.mockReset();
    }
  });

  it('should show error on invalid input', async () => {
    const wrapper = mount(LoginView, {
      global: {
        stubs: {
          Button: { template: `<button @click="$emit('click')"><slot /></button>` },
          InputText: {
            template:
              '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue'],
          },
        },
      },
    });
    await wrapper.find('button').trigger('click');
    await nextTick();
    expect(wrapper.vm.error.length).toBeGreaterThan(0);
  });
});
