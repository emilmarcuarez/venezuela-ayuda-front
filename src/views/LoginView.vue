<template>
  <main class="login-layout">
    <LeftPanel />
    <RightPanel />
  </main>
</template>

<script setup>
import LeftPanel from '../components/LeftPanel.vue';
import RightPanel from '../components/RightPanel.vue';
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
