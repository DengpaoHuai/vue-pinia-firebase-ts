<script setup lang="ts">
import getPlanets from '@/services/get.planets';
import { type Planet } from '@/types/planets.type';
import { useQuery } from '@tanstack/vue-query';
import { onMounted, ref, watch } from 'vue';
/*
const planets = ref<Planet[]>([]);
const page = ref(1);

onMounted(() => {
  getPlanets(page.value).then((data) => {
    planets.value = data;
  });
});

watch(page, (newPage) => {
  getPlanets(newPage).then((data) => {
    planets.value = data;
  });
});*/
const page = ref(1);

const { data } = useQuery({
  queryKey: ['planets', page],
  queryFn: () => getPlanets(page.value),
  staleTime: 5000,
});
</script>

<template>
  <div>
    <p>Planets</p>
    <div v-for="planet in data" :key="planet.url">
      <p>{{ planet.name }}</p>
      <p>{{ planet.gravity }}</p>
    </div>
    <div>
      <button @click="page--">Previous</button>
      <button @click="page++">Next</button>
    </div>
  </div>
</template>
