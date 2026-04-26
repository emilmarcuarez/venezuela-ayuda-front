<template>
  <div class="profile-info-container">
    <section class="profile-header-card">
      <div class="profile-main-info">
        <div class="avatar-wrapper">
          <img src="../assets/avatar.png" alt="Avatar Usuario" class="avatar-img" />
          <div class="rating-badge">
            <span class="star">★</span> 4.9
          </div>
        </div>
        <div class="user-details">
          <h1 class="user-name">{{ displayName }}</h1>
          <div class="verified-badge">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {{ accountLabel }}
          </div>
          <p class="donations-count">{{ userForm.email }}</p>
        </div>
      </div>

      <div class="profile-actions">
        <button v-if="!isEditing" class="btn-edit" @click="isEditing = true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Editar Perfil
        </button>

        <div class="stats-box">
          <div class="stat-item">
            <span class="stat-label">TOTAL DONADO</span>
            <span class="stat-value text-blue">$1,250</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-label">VIDAS IMPACTADAS</span>
            <span class="stat-value text-green">~45</span>
          </div>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2 class="section-title">Información Personal</h2>
      <div class="info-card">
        <p v-if="isLoading" class="profile-status">Cargando datos de sesión...</p>
        <p v-else-if="errorMessage" class="profile-status is-error">{{ errorMessage }}</p>
        <p v-else-if="successMessage" class="profile-status is-success">{{ successMessage }}</p>
        <div class="info-grid">
          <template v-if="userForm.accountType === 'ORGANIZATION'">
            <div class="info-field">
              <label>NOMBRE DE LA ORGANIZACIÓN</label>
              <div v-if="!isEditing" class="field-value">{{ userForm.organizationName || 'No especificado' }}</div>
              <input v-else v-model="userForm.organizationName" class="edit-input" type="text" />
            </div>
          </template>
          <template v-else>
            <div class="info-field">
              <label>NOMBRE</label>
              <div v-if="!isEditing" class="field-value">{{ userForm.firstName || 'No especificado' }}</div>
              <input v-else v-model="userForm.firstName" class="edit-input" type="text" />
            </div>
            <div class="info-field">
              <label>APELLIDO</label>
              <div v-if="!isEditing" class="field-value">{{ userForm.lastName || 'No especificado' }}</div>
              <input v-else v-model="userForm.lastName" class="edit-input" type="text" />
            </div>
          </template>

          <div class="info-field">
            <label>CORREO ELECTRÓNICO</label>
            <div class="field-value">{{ userForm.email }}</div>
          </div>
          <div class="info-field">
            <label>NÚMERO DE TELÉFONO</label>
            <div v-if="!isEditing" class="field-value">{{ userForm.phone }}</div>
            <input v-else v-model="userForm.phone" class="edit-input" type="tel" />
          </div>

          <div class="info-field" style="grid-column: 1 / -1;">
            <label>BIOGRAFÍA / DESCRIPCIÓN</label>
            <div v-if="!isEditing" class="field-value">{{ userForm.bio || 'Sin descripción' }}</div>
            <textarea v-else v-model="userForm.bio" class="edit-input edit-textarea" rows="3"></textarea>
          </div>

          <div class="info-field">
            <label>CIUDAD</label>
            <div v-if="!isEditing" class="field-value">{{ userForm.city || 'No especificada' }}</div>
            <input v-else v-model="userForm.city" class="edit-input" type="text" />
          </div>
          <div class="info-field">
            <label>ESTADO / PROVINCIA</label>
            <div v-if="!isEditing" class="field-value">{{ userForm.state || 'No especificado' }}</div>
            <input v-else v-model="userForm.state" class="edit-input" type="text" />
          </div>
          <div class="info-field">
            <label>PAÍS</label>
            <div v-if="!isEditing" class="field-value">{{ userForm.country || 'No especificado' }}</div>
            <input v-else v-model="userForm.country" class="edit-input" type="text" />
          </div>
        </div>

        <div v-if="isEditing" class="edit-actions">
          <button class="btn-cancel" @click="cancelEdit" :disabled="isSaving">Cancelar</button>
          <button class="btn-save" @click="saveEdit" :disabled="isSaving">
            {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { authState, loadCurrentUser, updateProfile } from '../services/auth';

const isEditing = ref(false);
const isLoading = ref(false);
const isSaving = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const userForm = reactive({
  firstName: '',
  lastName: '',
  organizationName: '',
  email: '',
  phone: '',
  bio: '',
  city: '',
  state: '',
  country: '',
  accountType: 'PERSON'
});

const originalData = { ...userForm };
const displayName = computed(() => {
  if (userForm.accountType === 'ORGANIZATION' && userForm.organizationName) {
    return userForm.organizationName;
  }
  if (userForm.firstName || userForm.lastName) {
    return `${userForm.firstName || ''} ${userForm.lastName || ''}`.trim();
  }
  return userForm.email || 'Usuario';
});

const accountLabel = computed(() => {
  return authState.user?.accountType === 'ORGANIZATION'
    ? 'Organización Verificada'
    : 'Donante Verificado';
});

const syncUserForm = (user) => {
  if (!user) return;

  const nextData = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    organizationName: user.organizationName || '',
    email: user.email || '',
    phone: user.phone || 'No registrado',
    bio: user.bio || '',
    city: user.city || '',
    state: user.state || '',
    country: user.country || '',
    accountType: user.accountType || 'PERSON'
  };

  Object.assign(userForm, nextData);
  Object.assign(originalData, nextData);
};

const cancelEdit = () => {
  Object.assign(userForm, originalData);
  isEditing.value = false;
  errorMessage.value = '';
  successMessage.value = '';
};

const saveEdit = async () => {
  isSaving.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const payload = {
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      phone: userForm.phone,
      bio: userForm.bio,
      city: userForm.city,
      state: userForm.state,
      country: userForm.country,
      organizationName: userForm.organizationName
    };
    
    const updatedUser = await updateProfile(payload);
    syncUserForm(updatedUser);
    isEditing.value = false;
    successMessage.value = 'Perfil actualizado exitosamente.';
    
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errorMessage.value = error.message || 'Error al actualizar el perfil.';
  } finally {
    isSaving.value = false;
  }
};

onMounted(async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const user = await loadCurrentUser();
    syncUserForm(user || authState.user);
  } catch (error) {
    errorMessage.value = error.message || 'No se pudieron cargar los datos de sesión.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.profile-info-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.profile-header-card {
  background: linear-gradient(135deg, white 0%, #f0f7ff 100%);
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(226, 232, 240, 0.6);
}

.profile-main-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 4px;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.rating-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: #fbbf24;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  box-shadow: 0 2px 5px rgba(251, 191, 36, 0.4);
}

.user-name {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-va-ink, #0f172a);
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #475569;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.verified-badge svg {
  color: #64748b;
}

.donations-count {
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.5rem;
}

.btn-edit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  color: var(--color-va-blue, #224192);
  padding: 0.6rem 1.25rem;
  border-radius: 99px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.stats-box {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  gap: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-divider {
  width: 1px;
  background: #e2e8f0;
  margin: 0 0.5rem;
}

.stat-label {
  font-size: 0.65rem;
  color: #64748b;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
}

.text-blue {
  color: var(--color-va-blue, #224192);
}

.text-green {
  color: #65a30d;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-va-ink, #0f172a);
  margin-bottom: 1.5rem;
}

.info-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.profile-status {
  color: #475569;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.profile-status.is-error {
  color: #b91c1c;
}

.profile-status.is-success {
  color: #16a34a;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem 4rem;
}

.info-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-field label {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.field-value {
  font-size: 1.05rem;
  color: var(--color-va-ink, #0f172a);
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.edit-input {
  font-size: 1.05rem;
  color: var(--color-va-ink, #0f172a);
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.edit-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.edit-textarea {
  resize: vertical;
  min-height: 80px;
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #f8fafc;
}

.btn-save {
  background: var(--color-va-blue, #224192);
  border: none;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save:hover {
  background: #1a3275;
}

@media (max-width: 992px) {
  .profile-header-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }

  .profile-actions {
    align-items: flex-start;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
