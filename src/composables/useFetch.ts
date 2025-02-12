import type { Planet } from '@/types/planets.type';
import { onMounted, ref } from 'vue';

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

const useFetch = <T>(url: string) => {
  const data = ref<T | null>(null);
  const loading = ref(true);
  const error = ref<null | string>(null);

  onMounted(() => {
    waitFor(2000).then(() => {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          data.value = response.results;
        })
        .catch((err: unknown) => {
          //narrowing - instanceof - typeof
          if (err instanceof Error) {
            error.value = err.message;
          } else if (typeof err === 'string') {
            error.value = err;
          } else {
            error.value = 'An error occured';
          }
        })
        .finally(() => {
          loading.value = false;
        });
    });
  });

  return { data, loading, error };
};

export default useFetch;
