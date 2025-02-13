<script setup lang="ts">
import type { Cadeau } from '@/schemas/cadeau.schema';
import { deleteCadeau } from '@/services/delete.cadeaux';
import getCadeaux, { getCadeauConfig } from '@/services/get.cadeaux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { RouterLink } from 'vue-router';

const { data, isLoading, error } = useQuery({
  queryKey: ['cadeaux'],
  queryFn: () => getCadeaux(),
  staleTime: 5000,
});

const queryClient = useQueryClient();

const prefetchData = (id: string) => {
  queryClient.prefetchQuery(getCadeauConfig(id));
};

const { mutate } = useMutation({
  mutationFn: (id: string) => deleteCadeau(id),
  onMutate: async (id) => {
    const previousCadeaux = queryClient.getQueryData(['cadeaux']);
    queryClient.setQueryData(['cadeaux'], (old: Cadeau[]) =>
      old.filter((cadeau) => cadeau._id !== id),
    );
    return { previousCadeaux };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['cadeaux'], context?.previousCadeaux);
  },
  mutationKey: ['deleteCadeau'],
});
</script>

<template>
  <div>
    <p>Cadeaux</p>
    <p>test</p>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-for="planet in data" :key="planet.url">
      <p>{{ planet.title }}</p>
      <p>test</p>
      <RouterLink
        :to="{
          name: 'cadeau_api_id',
          params: { id: planet._id },
        }"
        @mouseover="prefetchData(planet._id)"
        >voir plus</RouterLink
      >
      <button @click="mutate(planet._id)">delete</button>
    </div>
    <div></div>
  </div>
</template>
