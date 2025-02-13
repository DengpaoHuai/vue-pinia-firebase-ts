<script setup lang="ts">
import ListPlanet from '@/components/ListPlanet.vue';
import { Skeleton } from 'primevue';
import { defineAsyncComponent, Suspense } from 'vue';
</script>

<template>
  <div>
    <p>Planets</p>
    <Suspense>
      <ListPlanet></ListPlanet>
      <template #fallback>
        <div v-for="i in 10" :key="i">
          <Skeleton width="5rem" class="mb-2" style="margin-bottom: 10px"></Skeleton>
        </div>
      </template>
    </Suspense>
  </div>
</template>
