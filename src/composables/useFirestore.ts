import { db } from '@/lib/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  type DocumentData,
  type WithFieldValue,
} from 'firebase/firestore';
import { onMounted, ref } from 'vue';

//generic
//we use generic to define the type of the data we are going to get from firestore
// we use WithFieldValue to define the type of the data we are going to get from firestore. We want to maintain the type of the data we are going to get from firestore in the future.
const useFirestore = <T extends WithFieldValue<DocumentData>>(name: string) => {
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

  const addItem = async (item: T) => {
    const result = await addDoc(collection(db, name), item);
    return result.id;
  };

  return {
    data,
    deleteItem,
    addItem,
  };
};

export default useFirestore;
