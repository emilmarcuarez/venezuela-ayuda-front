<template>
  <Transition name="validation-message">
    <p v-if="message" class="validation-message" role="alert">
      <span aria-hidden="true">!</span>{{ message }}
    </p>
  </Transition>
</template>

<script setup>
defineProps({
  message: { type: String, default: '' }
});
</script>

<style scoped>
.validation-message {
  position: absolute;
  left: 0;
  top: calc(100% + 0.45rem);
  z-index: 40;
  width: max-content;
  max-width: min(100%, 28rem);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 8px;
  background: #f59e0b;
  color: #ffffff;
  padding: 0.6rem 0.9rem;
  box-shadow: 0 16px 30px -18px rgba(5, 29, 48, 0.45);
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.25;
  pointer-events: none;
}

.validation-message::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: -6px;
  width: 12px;
  height: 12px;
  background: inherit;
  transform: rotate(45deg);
}

.validation-message span {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  display: inline-grid;
  place-items: center;
  background: #ffffff;
  color: #f59e0b;
  font-family: var(--font-family);
  font-size: 0.78rem;
  letter-spacing: 0;
  flex: 0 0 auto;
}

.validation-message-enter-active,
.validation-message-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.validation-message-enter-from,
.validation-message-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
