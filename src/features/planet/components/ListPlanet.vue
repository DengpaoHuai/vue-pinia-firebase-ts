<script setup lang="ts">
import getPlanets from '@/services/get.planets';
import usePlanets from '../api/get-planets';

const { data: planets, suspense } = usePlanets();
await suspense();
</script>

<template>
  <div>
    <p>Planets</p>
    <div v-for="planet in planets" :key="planet.url">
      <p>{{ planet.name }}</p>
      <p>{{ planet.diameter }}</p>
    </div>
  </div>
</template>
