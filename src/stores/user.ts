import { reactive } from 'vue';

const userStore = reactive<{
  email: string | null;
}>({
  email: null,
});

const useUserStore = () => {
  const setUser = (email: string) => {
    userStore.email = email;
  };

  return {
    userStore,
    setUser,
  };
};

export default useUserStore;
