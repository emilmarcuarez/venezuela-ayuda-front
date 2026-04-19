import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import HomeView from './views/HomeView.vue';
import CreatePublicationView from './views/CreatePublicationView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/crear-publicacion', name: 'create-publication', component: CreatePublicationView }
  ]
});

export default router;
