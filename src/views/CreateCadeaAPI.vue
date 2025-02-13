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

const onSubmit = async () => {
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

  //https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f

  await fetch('https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f/cadeau', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(results.data),
  });

  navigate.push({ name: 'cadeau_api' });
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
