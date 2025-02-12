import { db } from '@/lib/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const useFirestore = <T extends { [x: string]: any }>(name: string) => {
  const data = ref<T[]>([]);
  const error = ref<string | null>(null);

  onMounted(() => {
    getData();
  });

  const getData = () => {
    getDocs(collection(db, name))
      .then((querySnapshot) => {
        data.value = [];
        let tempData: T[] = [];
        querySnapshot.forEach((doc) => {
          tempData.push({ ...doc.data(), id: doc.id } as unknown as T);
        });
        data.value = tempData;
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          error.value = err.message;
        } else if (typeof err === 'string') {
          error.value = err;
        } else {
          error.value = 'An error occured';
        }
      });
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, name, id));
    getData();
  };

  const addItem = (item: T) => {
    addDoc(collection(db, name), item);
  };

  return {
    data,
    deleteItem,
    addItem,
  };
};

export default useFirestore;
