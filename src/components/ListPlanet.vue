<script setup lang="ts">
import getPlanets from '@/services/get.planets';

const planets = await getPlanets();
</script>

<template>
  <div>
    <p>Planets</p>
    <div v-for="planet in planets" :key="planet.id">
      <p>{{ planet.name }}</p>
      <p>{{ planet.description }}</p>
    </div>
  </div>
</template>
