import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useUserStore from '../user';

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have an initial empty email', () => {
    const userStore = useUserStore();
    expect(userStore.userStore).toBe('');
  });

  it('should set user email', () => {
    const userStore = useUserStore();
    userStore.setUser('test@example.com');
    expect(userStore.userStore).toBe('test@example.com');
  });
});
