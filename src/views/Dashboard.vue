<script setup lang="ts">
import useFirestore from '@/composables/useFirestore';
import type { Cadeau } from '@/schemas/cadeau.schema';
import useCadeauStore from '@/stores/cadeau';
import useUserStore from '@/stores/user';
import { storeToRefs } from 'pinia';

const { userStore } = useUserStore();
const cadeauStore = useCadeauStore();

const { deleteCadeau } = cadeauStore;
const { cadeaux } = storeToRefs(cadeauStore);

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
