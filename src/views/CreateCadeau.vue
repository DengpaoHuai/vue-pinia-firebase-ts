<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '@/components/ui/inputs/InputText.vue';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import cadeauSchema from '@/schemas/cadeau.schema';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'vue-router';

const title = ref('');
const description = ref('');
const price = ref(0);

const navigate = useRouter();

const onSubmit = () => {
  console.log(title.value, description.value, price.value);
  const results = cadeauSchema.safeParse({
    title: title.value,
    description: description.value,
    price: price.value,
  });
  if (!results.success) {
    console.log(results.error.errors);
    return;
  }
  console.log(results.data);

  addDoc(collection(db, 'cadeaux'), results.data)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      navigate.back();
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};
</script>

<template>
  <div>
    <TextInput v-model="title" label="Title" />
    <TextInput v-model="description" label="Description" />
    <InputNumber v-model="price" label="Price" />

    <Button @click="onSubmit">Submit</Button>
  </div>
</template>
