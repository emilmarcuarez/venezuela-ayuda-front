import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import HomeView from './views/HomeView.vue';
import CreatePublicationView from './views/CreatePublicationView.vue';
import ThankYouView from './views/ThankYouView.vue';
import ChatView from './components/ChatView.vue';
import PetitionsView from './views/PetitionsView.vue';
import PetitionDetailsView from './views/PetitionDetailsView.vue';
import { initAuth, isAuthenticated } from './services/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/peticiones', name: 'petitions', component: PetitionsView },
    { path: '/peticiones/:id', name: 'petition-details', component: PetitionDetailsView },
    { path: '/crear-publicacion', name: 'create-publication', component: CreatePublicationView },
    { path: '/thank-you', name: 'thank-you', component: ThankYouView },
    { path: '/chat', name: 'chat', component: ChatView },
    {
      path: '/perfil',
      name: 'profile',
      component: () => import('./views/UserProfileView.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to) => {
  initAuth();

  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  if (to.name === 'login' && isAuthenticated()) {
    return { name: 'home' };
  }

  return true;
});

export default router;
