<template>
  <section class="right-panel">
    <div class="form-container">
      <header class="form-header">
        <h2>Crea tu cuenta</h2>
        <p>Comienza a marcar la diferencia en minutos.</p>
      </header>

      <div class="account-types">
        <button 
          class="type-btn" 
          :class="{ active: accountType === 'persona' }"
          @click="accountType = 'persona'"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Persona
        </button>
        <button 
          class="type-btn" 
          :class="{ active: accountType === 'organizacion' }"
          @click="accountType = 'organizacion'"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
          Organización
        </button>
      </div>

      <SignUpForm />

      <div class="divider">
        <span>O CONTINÚA CON</span>
      </div>

      <SocialLogin />

      <p class="bottom-text">Comienza a marcar la diferencia en minutos.</p>
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
import { ref } from 'vue';
import SignUpForm from './SignUpForm.vue';
import SocialLogin from './SocialLogin.vue';

const accountType = ref('persona');
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
