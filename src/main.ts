import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Nora from '@primevue/themes/nora';

import App from './App.vue';
import router from './router';
import PrivateLayout from './components/layouts/PrivateLayout.vue';
import PublicLayout from './components/layouts/PublicLayout.vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Nora,
  },
});

app.use(VueQueryPlugin);

app.component('PrivateLayout', PrivateLayout);
app.component('PublicLayout', PublicLayout);

app.mount('#app');
