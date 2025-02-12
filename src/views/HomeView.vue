<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import type { Planet } from '@/types/planets.type';

const { data: planets, loading, error } = useFetch<Array<Planet>>('https://swapi.dev/api/planets');
</script>

<template>
  <main>
    <h1>Planets</h1>

    <ul>
      <li v-if="loading">Loading...</li>
      <li v-if="error">{{ error }}</li>
      <li v-for="planet in planets" :key="planet.url">
        {{ planet?.name?.toUpperCase() }}
      </li>
    </ul>
  </main>
</template>
