<script setup lang="ts">
import { Skeleton } from 'primevue';
</script>

<template>
  <div v-for="i in 10" :key="i">
    <Skeleton width="5rem" class="mb-2" style="margin-bottom: 10px"></Skeleton>
  </div>
</template>
