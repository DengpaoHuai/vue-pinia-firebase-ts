import useFirestore from '@/composables/useFirestore';
import type { Cadeau } from '@/schemas/cadeau.schema';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const useCadeauStore = defineStore('cadeau', () => {
  const { deleteItem, addItem, data } = useFirestore<Cadeau>('cadeaux');
  const cadeaux = ref<Cadeau[]>([]);

  watch(data, () => {
    //console.log('data.value', data.value);
    cadeaux.value = data.value;
  });

  const addCadeau = async (cadeau: Cadeau) => {
    const id = await addItem(cadeau);
    cadeaux.value = [...cadeaux.value, { ...cadeau, id }];
  };

  const deleteCadeau = async (id: string) => {
    await deleteItem(id);
    cadeaux.value = cadeaux.value.filter((cadeau) => cadeau.id !== id);
  };

  return {
    addCadeau,
    deleteCadeau,
    cadeaux,
  };
});

export default useCadeauStore;
