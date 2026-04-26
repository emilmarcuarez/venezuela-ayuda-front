<template>
  <form class="signup-form" @submit.prevent="submitForm">
    <p v-if="errorMessage" class="form-alert" role="alert">{{ errorMessage }}</p>

    <div v-if="!isLoginMode" class="form-row">
      <div class="form-group">
        <label for="firstName">NOMBRE</label>
        <input type="text" id="firstName" placeholder="Juan" v-model.trim="form.firstName" autocomplete="given-name" required />
      </div>
      <div class="form-group">
        <label for="lastName">APELLIDO</label>
        <input type="text" id="lastName" placeholder="Pérez" v-model.trim="form.lastName" autocomplete="family-name" required />
      </div>
    </div>

    <div v-if="showOrganizationField" class="form-group">
      <label for="organizationName">NOMBRE DE LA ORGANIZACIÓN</label>
      <input
        type="text"
        id="organizationName"
        placeholder="Fundación Esperanza"
        v-model.trim="form.organizationName"
        autocomplete="organization"
        required
      />
    </div>

    <div class="form-group">
      <label for="email">CORREO ELECTRÓNICO</label>
      <input type="email" id="email" placeholder="juan@ejemplo.com" v-model.trim="form.email" autocomplete="email" required />
    </div>

    <div class="form-group">
      <label for="password">CONTRASEÑA</label>
      <input
        type="password"
        id="password"
        placeholder="••••••••"
        v-model="form.password"
        :autocomplete="isLoginMode ? 'current-password' : 'new-password'"
        minlength="8"
        required
      />
    </div>

    <button type="submit" class="submit-btn" :disabled="isSubmitting">
      {{ submitLabel }}
      <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </button>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { login, register } from '../services/auth';

const AUTH_LOADER_MIN_DURATION_MS = 2200;

const props = defineProps({
  mode: {
    type: String,
    default: 'login'
  },
  accountType: {
    type: String,
    default: 'persona'
  }
});
const emit = defineEmits(['loading-change']);

const router = useRouter();
const route = useRoute();
const isSubmitting = ref(false);
const errorMessage = ref('');

const form = reactive({
  firstName: '',
  lastName: '',
  organizationName: '',
  email: '',
  password: ''
});

const isLoginMode = computed(() => props.mode === 'login');
const showOrganizationField = computed(() => !isLoginMode.value && props.accountType === 'organizacion');
const submitLabel = computed(() => {
  if (isSubmitting.value) {
    return isLoginMode.value ? 'Iniciando...' : 'Creando...';
  }

  return isLoginMode.value ? 'Iniciar Sesión' : 'Crear Cuenta';
});

const submitForm = async () => {
  errorMessage.value = '';
  isSubmitting.value = true;
  const startedAt = Date.now();
  emit('loading-change', {
    active: true,
    mode: isLoginMode.value ? 'login' : 'register'
  });

  try {
    if (isLoginMode.value) {
      await login({
        email: form.email,
        password: form.password
      });
    } else {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        accountType: props.accountType === 'organizacion' ? 'ORGANIZATION' : 'PERSON'
      };

      if (props.accountType === 'organizacion') {
        payload.organizationName = form.organizationName;
      }

      await register({
        ...payload
      });
    }

    await waitForLoaderMinimum(startedAt);
    router.push(typeof route.query.redirect === 'string' ? route.query.redirect : '/');
  } catch (error) {
    await waitForLoaderMinimum(startedAt);
    errorMessage.value = error.message || 'No se pudo iniciar sesión.';
  } finally {
    isSubmitting.value = false;
    emit('loading-change', {
      active: false,
      mode: isLoginMode.value ? 'login' : 'register'
    });
  }
};

const waitForLoaderMinimum = (startedAt) => {
  const remaining = AUTH_LOADER_MIN_DURATION_MS - (Date.now() - startedAt);
  return remaining > 0
    ? new Promise((resolve) => window.setTimeout(resolve, remaining))
    : Promise.resolve();
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

.form-alert {
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.45;
  padding: 0.85rem 1rem;
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

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  transform: none;
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
