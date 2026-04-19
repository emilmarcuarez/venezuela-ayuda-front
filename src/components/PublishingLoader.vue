<template>
  <Teleport to="body">
    <Transition name="publishing-loader">
      <div v-if="active" class="loader-backdrop" role="status" aria-live="polite" aria-busy="true">
        <div class="loader-panel">
          <div class="loader-mark" aria-hidden="true">
            <span class="orbit is-yellow"></span>
            <span class="orbit is-blue"></span>
            <span class="orbit is-red"></span>
            <span class="loader-core">
              <svg viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
          </div>

          <p class="loader-kicker">{{ kicker }}</p>
          <h2>{{ title }}</h2>
          <p>{{ copy }}</p>

          <div class="loader-progress" aria-hidden="true">
            <span></span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  active: { type: Boolean, default: false },
  kicker: { type: String, default: 'VENEZUELA AYUDA' },
  title: { type: String, default: 'Enviando solicitud' },
  copy: { type: String, default: 'Estamos preparando la revisión humanitaria de tu publicación.' }
});
</script>

<style scoped>
.loader-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background:
    radial-gradient(circle at 50% 34%, rgba(254, 215, 33, 0.16), transparent 26%),
    rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(14px);
}

.loader-panel {
  width: min(100%, 420px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.94);
  padding: 2rem;
  box-shadow: 0 32px 80px -36px rgba(2, 6, 23, 0.72);
  text-align: center;
}

.loader-mark {
  width: 108px;
  height: 108px;
  display: grid;
  place-items: center;
  margin: 0 auto 1.25rem;
  position: relative;
}

.orbit {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 3px solid transparent;
  animation: loaderSpin 1.35s linear infinite;
}

.orbit.is-yellow {
  border-top-color: #fed721;
}

.orbit.is-blue {
  inset: 10px;
  border-right-color: var(--color-va-blue);
  animation-duration: 1.05s;
  animation-direction: reverse;
}

.orbit.is-red {
  inset: 20px;
  border-bottom-color: #b91c1c;
  animation-duration: 1.6s;
}

.loader-core {
  width: 54px;
  height: 54px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: var(--color-va-blue);
  color: #ffffff;
  box-shadow: 0 20px 34px -20px rgba(34, 65, 146, 0.65);
}

.loader-core svg {
  width: 28px;
  height: 28px;
}

.loader-core path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.loader-kicker {
  color: var(--color-va-blue);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  margin-bottom: 0.65rem;
}

.loader-panel h2 {
  color: var(--color-va-ink);
  font-size: clamp(1.45rem, 4vw, 2rem);
  line-height: 1.15;
  margin-bottom: 0.65rem;
}

.loader-panel p:not(.loader-kicker) {
  color: var(--color-text-muted);
  line-height: 1.65;
}

.loader-progress {
  height: 6px;
  border-radius: 999px;
  overflow: hidden;
  background: #edf4ff;
  margin-top: 1.5rem;
}

.loader-progress span {
  display: block;
  width: 45%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #fed721, var(--color-va-blue), #b91c1c);
  animation: loaderProgress 1.15s ease-in-out infinite;
}

.publishing-loader-enter-active,
.publishing-loader-leave-active {
  transition: opacity 0.22s ease;
}

.publishing-loader-enter-from,
.publishing-loader-leave-to {
  opacity: 0;
}

@keyframes loaderSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loaderProgress {
  0% {
    transform: translateX(-110%);
  }

  100% {
    transform: translateX(240%);
  }
}
</style>
