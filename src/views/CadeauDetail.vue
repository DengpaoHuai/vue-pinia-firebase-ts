<script setup lang="ts">
import { getCadeauConfig } from '@/services/get.cadeaux';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const page = ref(1);

const route = useRoute();

const { data, isLoading, error } = useQuery(getCadeauConfig(route.params.id as string));
</script>

<template>
  <div>
    <p>Cadeaux</p>
    <p>
      {{ data.title }}
    </p>
    <div>
      {{ data.description }}
    </div>
  </div>
</template>
