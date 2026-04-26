<template>
  <main class="login-layout">
    <LeftPanel />
    <RightPanel @auth-loading-change="handleAuthLoadingChange" />
    <PublishingLoader
      :active="authLoading.active"
      kicker="ACCESO SEGURO"
      :title="authLoaderText.title"
      :copy="authLoaderText.copy"
    />
  </main>
</template>

<script setup>
import { computed, reactive } from 'vue';
import LeftPanel from '../components/LeftPanel.vue';
import PublishingLoader from '../components/PublishingLoader.vue';
import RightPanel from '../components/RightPanel.vue';

const authLoading = reactive({
  active: false,
  mode: 'login'
});

const authLoaderText = computed(() => {
  if (authLoading.mode === 'register') {
    return {
      title: 'Creando tu cuenta',
      copy: 'Estamos preparando tu acceso seguro y conectando tu perfil con la red de ayuda.'
    };
  }

  return {
    title: 'Iniciando sesión',
    copy: 'Estamos verificando tus credenciales y abriendo tu espacio solidario.'
  };
});

const handleAuthLoadingChange = (payload) => {
  authLoading.active = payload.active;
  authLoading.mode = payload.mode;
};
</script>

<style scoped>
.login-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .login-layout {
    flex-direction: column;
  }
}
</style>
