<template>
  <div class="chat-page">
    <MainNavbar />

    <main class="chat-container">
      <div class="chat-layout">
        <ChatSidebar />
        <ChatMainArea />
      </div>
    </main>
    
    <MainFooter />
  </div>
</template>

<script setup>
import MainNavbar from './MainNavbar.vue';
import MainFooter from './MainFooter.vue';
import ChatSidebar from './ChatSidebar.vue';
import ChatMainArea from './ChatMainArea.vue';
</script>

<style scoped>
.chat-page {
  min-height: 100vh;
  background-color: #f1f4f9;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  padding: 3rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.chat-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 2rem;
  height: calc(100vh - 180px);
  min-height: 600px;
}

@media (max-width: 992px) {
  .chat-layout {
    grid-template-columns: 1fr;
    height: auto;
  }
}
</style>
