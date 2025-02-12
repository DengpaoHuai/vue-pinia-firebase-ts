<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps<{
  modelValue: string | undefined;
}>();

const emits = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <InputText
    type="text"
    :modelValue="modelValue"
    @input="emits('update:modelValue', ($event.target! as HTMLInputElement).value)"
    variant="filled"
  />
</template>
