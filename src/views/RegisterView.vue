<script setup lang="ts">
import Button from 'primevue/button';
import InputText from '@/components/ui/inputs/InputText.vue';
import { ref, type Ref } from 'vue';
import { registerSchema } from '@/schemas/register.schema';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const error = ref<string[]>([]);

const navigate = useRouter();

const submit = () => {
  const result = registerSchema.safeParse({ email: email.value, password: password.value });
  if (!result.success) {
    error.value = result.error.errors.map((e) => e.message);
    return;
  }
  error.value = [];
  createUserWithEmailAndPassword(auth, result.data.email, result.data.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      navigate.push({ name: 'login' });
    })
    .catch((error) => {
      console.error(error);
      navigate.push({ name: 'login' });
    });
};
</script>

<template>
  <main>
    <InputText v-model="email" type="email"></InputText>
    <InputText v-model="password" type="password"></InputText>
    <div v-if="error.length">
      <ul>
        <li v-for="e in error" :key="e">{{ e }}</li>
      </ul>
    </div>
    <Button @click="submit"> submit </Button>
  </main>
</template>
