<template>
  <form class="signup-form" @submit.prevent="submitForm">
    <div class="form-row">
      <div class="form-group">
        <label for="firstName">NOMBRE</label>
        <input type="text" id="firstName" placeholder="Juan" v-model="form.firstName" />
      </div>
      <div class="form-group">
        <label for="lastName">APELLIDO</label>
        <input type="text" id="lastName" placeholder="Pérez" v-model="form.lastName" />
      </div>
    </div>

    <div class="form-group">
      <label for="email">CORREO ELECTRÓNICO</label>
      <input type="email" id="email" placeholder="juan@ejemplo.com" v-model="form.email" />
    </div>

    <div class="form-group">
      <label for="password">CONTRASEÑA</label>
      <input type="password" id="password" placeholder="••••••••" v-model="form.password" />
    </div>

    <button type="submit" class="submit-btn">
      Crear Cuenta
      <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});

const submitForm = () => {
  console.log('Form submitted', form);
  router.push('/');
};
</script>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.4rem;
}

label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

input {
  width: 100%;
  padding: 0.9rem 1.1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: var(--color-white);
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--color-text-dark);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
}

input::placeholder {
  color: #cbd5e1;
}

.submit-btn {
  margin-top: 1rem;
  background-color: #0ea5e9;
  color: #ffffff;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 1rem;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);
}

.submit-btn:hover {
  background-color: #0284c7;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
}

.submit-btn:active {
  transform: translateY(1px);
}

.arrow-icon {
  width: 18px;
  height: 18px;
}
</style>
