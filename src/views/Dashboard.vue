<script setup lang="ts">
import useFirestore from '@/composables/useFirestore';
import type { Cadeau } from '@/schemas/cadeau.schema';
import useUserStore from '@/stores/user';

const { userStore } = useUserStore();

const { deleteItem: deleteCadeau, data: cadeaux } = useFirestore<Cadeau>('cadeaux');

const removeCadeau = (id: string) => {
  deleteCadeau(id)
    .then(() => {
      console.log('deleted');
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<template>
  <p>bienvenue : {{ userStore.email }}</p>
  <RouterLink :to="{ name: 'create_cadeau' }">create cadeau</RouterLink>
  <div v-for="cadeau in cadeaux" :key="cadeau.id">
    <p>{{ cadeau.title }}</p>
    <p>{{ cadeau.description }}</p>
    <p>{{ cadeau.price }}</p>
    <Button @click="removeCadeau(cadeau.id)">delete</Button>
  </div>
</template>
