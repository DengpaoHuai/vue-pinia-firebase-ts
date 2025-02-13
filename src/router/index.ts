import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/RegisterView.vue';
import useUserStore from '@/stores/user';
import PlanetsView from '@/views/PlanetsView.vue';
import PlanetView from '@/views/PlanetView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        requiresAuth: true,
        layout: 'PrivateLayout',
      },
    },
    {
      path: '/create_cadeau',
      name: 'create_cadeau',
      component: () => import('../views/CreateCadeau.vue'),
      meta: {
        requiresAuth: true,
        layout: 'PrivateLayout',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/planets',
      name: 'planets',
      component: PlanetView,
    },
    {
      path: '/cadeau_api',
      name: 'cadeau_api',
      component: () => import('../views/CadeauList.vue'),
    },
    {
      path: '/create_cadeau_api',
      name: 'create_cadeau_api',
      component: () => import('../views/CreateCadeaAPI.vue'),
    },
    {
      path: '/cadeau_api/:id',
      name: 'cadeau_api_id',
      component: () => import('../views/CadeauDetail.vue'),
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !useUserStore().userStore) {
    return '/login';
  }
  return true;
});

export default router;
