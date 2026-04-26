<template>
  <section class="right-panel">
    <div class="form-container">
      <header class="form-header">
        <h2>{{ isLoginMode ? 'Inicia sesión' : 'Crea tu cuenta' }}</h2>
        <p>{{ isLoginMode ? 'Entra para continuar ayudando desde tu perfil.' : 'Comienza a marcar la diferencia en minutos.' }}</p>
      </header>

      <div class="auth-tabs" role="tablist" aria-label="Acceso">
        <button
          type="button"
          class="auth-tab"
          :class="{ active: mode === 'login' }"
          @click="mode = 'login'"
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          class="auth-tab"
          :class="{ active: mode === 'register' }"
          @click="mode = 'register'"
        >
          Registrarse
        </button>
      </div>

      <div v-if="!isLoginMode" class="account-types">
        <button 
          class="type-btn" 
          :class="{ active: accountType === 'persona' }"
          type="button"
          @click="accountType = 'persona'"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Persona
        </button>
        <button 
          class="type-btn" 
          :class="{ active: accountType === 'organizacion' }"
          type="button"
          @click="accountType = 'organizacion'"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
          Organización
        </button>
      </div>

      <SignUpForm :mode="mode" :account-type="accountType" />

      <div class="divider">
        <span>O CONTINÚA CON</span>
      </div>

      <SocialLogin />

      <p class="bottom-text">Tu sesión se mantiene activa durante 24 horas.</p>
    </div>

    <footer class="footer">
      <div class="links">
        <a href="#">POLÍTICA DE PRIVACIDAD</a>
        <a href="#">TÉRMINOS DE SERVICIO</a>
        <a href="#">CENTRO DE AYUDA</a>
      </div>
      <p class="copyright">
        © 2024 Venezuela Ayuda. Todas las métricas de impacto son verificadas de forma independiente.
      </p>
    </footer>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SignUpForm from './SignUpForm.vue';
import SocialLogin from './SocialLogin.vue';

const route = useRoute();
const mode = ref(route.query.mode === 'register' ? 'register' : 'login');
const accountType = ref('persona');
const isLoginMode = computed(() => mode.value === 'login');

watch(
  () => route.query.mode,
  (nextMode) => {
    mode.value = nextMode === 'register' ? 'register' : 'login';
  }
);
</script>

<style scoped>
.right-panel {
  flex: 1;
  background-color: var(--color-bg-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  overflow-y: auto;
}

.form-container {
  width: 100%;
  max-width: 440px;
  margin-top: 2rem;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 0.35rem;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  background: #ffffff;
  margin-bottom: 1.5rem;
}

.auth-tab {
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  font-weight: 800;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

.auth-tab.active {
  background: #0ea5e9;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25);
}

.account-types {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.type-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.2rem 1.25rem;
  background: var(--color-white);
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s ease;
}

.type-btn:hover {
  border-color: #cbd5e1;
}

.type-btn.active {
  background: rgba(14, 165, 233, 0.05); /* very light cyan */
  border-color: #0ea5e9;
  color: #0f172a;
}

.type-btn .icon {
  width: 20px;
  height: 20px;
  color: inherit;
}

.type-btn.active .icon {
  color: #0ea5e9;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--color-border);
}

.divider span {
  padding: 0 1rem;
  color: #94a3b8;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.bottom-text {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin-top: 2rem;
}

.footer {
  width: 100%;
  max-width: 440px;
  margin-top: 4rem;
}

.links {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.links a:hover {
  color: var(--color-text-muted);
}

.copyright {
  color: #bdc3c7;
  font-size: 0.7rem;
  line-height: 1.5;
}
</style>
