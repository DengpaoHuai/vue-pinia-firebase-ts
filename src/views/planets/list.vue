<script setup lang="ts">
import ListPlanet from '@/features/planet/components/ListPlanet.vue';
import ListSkeleton from '@/features/planet/components/ListSkeleton.vue';
import { Suspense } from 'vue';
</script>

<template>
  <div>
    <p>Planets</p>
    <Suspense>
      <ListPlanet></ListPlanet>
      <template #fallback>
      <ListSkeleton></ListSkeleton>
      </template>
    </Suspense>
  </div>
</template>
