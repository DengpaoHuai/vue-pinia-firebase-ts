import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserStore = defineStore('user', () => {
  const email = ref('');

  const setUser = (email1: string) => {
    email.value = email1;
  };

  return {
    setUser,
    userStore: email,
  };
});

export default useUserStore;
