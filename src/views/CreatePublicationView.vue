<template>
  <div class="publication-page">
    <MainNavbar />

    <main class="publication-shell">
      <section class="publication-hero" :class="{ 'is-review': currentStep === 3 }" aria-labelledby="publication-title">
        <p class="publication-kicker">SOLICITUDES VERIFICADAS</p>
        <h1 id="publication-title">{{ pageHeader.title }}</h1>
        <p>
          {{ pageHeader.copy }}
        </p>
      </section>

      <div class="publication-access-frame" :class="{ 'is-auth-locked': isAuthLocked }">
        <nav class="publication-stepper" aria-label="Progreso de creación">
          <template v-for="(item, index) in steps" :key="item.label">
            <button class="stepper-item" :class="{
              'is-active': currentStep === index + 1,
              'is-complete': currentStep > index + 1,
              'is-locked': isStepLocked(index + 1)
            }" type="button" :aria-current="currentStep === index + 1 ? 'step' : undefined"
              :aria-disabled="isStepLocked(index + 1) || isAuthLocked" @click="requestStep(index + 1)">
              <span class="stepper-dot">
                <svg v-if="isStepLocked(index + 1)" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2M6 10h12v10H6V10Z" />
                </svg>
                <svg v-else-if="currentStep > index + 1" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </span>
              <span>{{ item.label }}</span>
            </button>
            <span v-if="index < steps.length - 1" class="stepper-line" :class="{ 'is-filled': currentStep > index + 1 }"
              aria-hidden="true"></span>
          </template>
        </nav>

        <form class="publication-grid"
          :class="{ 'is-step-one': currentStep === 1, 'is-review-layout': currentStep === 3 }"
          :aria-hidden="isAuthLocked" @submit.prevent="publishPost">
          <section class="publication-card" aria-live="polite">
            <div v-if="currentStep === 1" class="step-panel">
              <SectionTitle tone="yellow" title="Elige una Categoría" />

              <div class="category-grid"
                :class="{ 'has-error': errors.category, 'is-shaking': errorFocusField === 'category' }"
                data-field="category" role="radiogroup" aria-label="Categoría">
                <label v-for="category in categories" :key="category.name" class="category-option"
                  :class="{ 'is-selected': form.category === category.name }"
                  :style="{ '--category-active': category.color }">
                  <input v-model="form.category" type="radio" name="category" :value="category.name"
                    @change="clearError('category')" />
                  <span class="category-icon" v-html="category.icon"></span>
                  <span>{{ category.name }}</span>
                  <svg class="category-check" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </label>
                <ValidationMessage :message="errors.category" />
              </div>

              <SectionTitle tone="blue" title="Detalles de la Publicación" />

              <div class="form-stack">
                <label class="field-group"
                  :class="{ 'has-error': errors.title, 'is-shaking': errorFocusField === 'title' }" data-field="title">
                  <span>TÍTULO DE TU PUBLICACIÓN</span>
                  <input v-model="form.title" type="text" placeholder="Ej. Donación de antibióticos para niños"
                    :aria-invalid="Boolean(errors.title)" @input="clearError('title')" />
                  <ValidationMessage :message="errors.title" />
                </label>

                <div class="two-column">
                  <!-- <label class="field-group" :class="{ 'has-error': errors.value, 'is-shaking': errorFocusField === 'value' }" data-field="value">
                  <span>VALOR ESTIMADO ($)</span>
                  <input
                    v-model="form.value"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    :aria-invalid="Boolean(errors.value)"
                    @input="clearError('value')"
                  />
                  <ValidationMessage :message="errors.value" />
                </label> -->

                  <label class="field-group date-field"
                    :class="{ 'has-error': errors.deadline, 'is-shaking': errorFocusField === 'deadline' }"
                    data-field="deadline">
                    <span>FECHA LÍMITE / VENCIMIENTO</span>
                    <button class="date-trigger" type="button" :aria-invalid="Boolean(errors.deadline)"
                      @click="toggleCalendar">
                      <span>{{ formattedDeadline || 'Selecciona una fecha' }}</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                      </svg>
                    </button>
                    <ValidationMessage :message="errors.deadline" />

                    <div v-if="isCalendarOpen" class="calendar-panel" aria-label="Calendario de fecha límite">
                      <div class="calendar-header">
                        <button type="button" class="calendar-nav" aria-label="Mes anterior"
                          :disabled="isAtCurrentMonth" @click="previousMonth">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                        </button>

                        <div class="calendar-title">
                          <button type="button" @click="toggleMonthList">
                            {{ monthNames[calendarMonth] }}
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                          <span>{{ calendarYear }}</span>
                        </div>

                        <button type="button" class="calendar-nav" aria-label="Mes siguiente" @click="nextMonth">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                      </div>

                      <div v-if="showMonthList" class="month-grid" aria-label="Seleccionar mes">
                        <button v-for="month in availableMonths" :key="month.index" type="button"
                          :class="{ 'is-active': calendarMonth === month.index }" @click="selectMonth(month.index)">
                          {{ month.name.slice(0, 3) }}
                        </button>
                      </div>

                      <div class="calendar-weekdays" aria-hidden="true">
                        <span v-for="day in weekDays" :key="day">{{ day }}</span>
                      </div>

                      <div class="calendar-days">
                        <button v-for="day in calendarDays" :key="day.key" type="button" class="calendar-day" :class="{
                          'is-placeholder': day.isPlaceholder,
                          'is-selected': day.iso === form.deadline,
                          'is-today': day.iso === todayIso
                        }" :disabled="day.isPlaceholder" @click="selectDate(day)">
                          {{ day.label }}
                        </button>
                      </div>
                    </div>
                  </label>
                </div>

                <label class="field-group"
                  :class="{ 'has-error': errors.description, 'is-shaking': errorFocusField === 'description' }"
                  data-field="description">
                  <span>DESCRIPCIÓN</span>
                  <textarea v-model="form.description" rows="5"
                    placeholder="Describe los artículos o la necesidad en detalle..."
                    :aria-invalid="Boolean(errors.description)" @input="clearError('description')"></textarea>
                  <ValidationMessage :message="errors.description" />
                </label>

                <div class="field-group">
                  <span>Fotos de referencia(MÁX 5)</span>
                  <input type="file" accept="image/png, image/jpeg, image/webp" multiple
                    :disabled="form.images.length >= 5" @change="handleImageUpload"
                    style="margin-top: 0.5rem; padding: 0.5rem; background: white; border-radius: 12px; border: 1px solid #dbe1ff; width: 100%;" />

                  <div v-if="form.images.length > 0"
                    style="display: flex; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap;">
                    <div v-for="(img, index) in form.images" :key="index"
                      style="position: relative; width: 5rem; height: 5rem;">
                      <img :src="img"
                        style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px; border: 1px solid #dbe1ff;" />
                      <button type="button" @click="removeImage(index)"
                        style="position: absolute; top: -6px; right: -6px; background: #b91c1c; color: white; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; display: grid; place-items: center; font-weight: bold; font-size: 12px;">✕</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div v-else-if="currentStep === 2" class="step-panel">
              <SectionTitle tone="blue" title="Información de contacto" />

              <div class="form-stack">
                <label class="field-group"
                  :class="{ 'has-error': errors.contactName, 'is-shaking': errorFocusField === 'contactName' }"
                  data-field="contactName">
                  <span>NOMBRE DE CONTACTO</span>
                  <input v-model="form.contactName" type="text" placeholder="Ej. Fundación Manos Solidarias"
                    :aria-invalid="Boolean(errors.contactName)" @input="clearError('contactName')" />
                  <ValidationMessage :message="errors.contactName" />
                </label>

                <div class="two-column">
                  <label class="field-group"
                    :class="{ 'has-error': errors.phone, 'is-shaking': errorFocusField === 'phone' }"
                    data-field="phone">
                    <span>NÚMERO DE TELÉFONO</span>
                    <div class="phone-input-row">
                      <CustomSelect v-model="form.countryCode" :options="countryCodeOptions" placeholder="+58"
                        :invalid="Boolean(errors.phone)" @update:model-value="clearError('phone')" />
                      <input v-model="form.phone" type="tel" inputmode="numeric" placeholder="000 000 0000"
                        :aria-invalid="Boolean(errors.phone)" @input="handlePhoneInput" />
                    </div>
                    <ValidationMessage :message="errors.phone" />
                  </label>

                  <div class="field-group"
                    :class="{ 'has-error': errors.location, 'is-shaking': errorFocusField === 'location' }"
                    data-field="location">
                    <span id="location-label">UBICACIÓN PRINCIPAL</span>
                    <CustomSelect v-model="form.location" :options="locationOptions" placeholder="Ciudad, Estado"
                      :invalid="Boolean(errors.location)" label-id="location-label"
                      @update:model-value="clearError('location')" />
                    <ValidationMessage :message="errors.location" />
                  </div>
                </div>

                <div class="preference-group"
                  :class="{ 'has-error': errors.preference, 'is-shaking': errorFocusField === 'preference' }"
                  data-field="preference">
                  <span>PREFERENCIA DE COMUNICACIÓN</span>
                  <div class="preference-grid" role="radiogroup" aria-label="Preferencia de comunicación">
                    <label v-for="preference in preferences" :key="preference.name" class="preference-option"
                      :class="{ 'is-selected': form.preference === preference.name }">
                      <input v-model="form.preference" type="radio" name="preference" :value="preference.name"
                        @change="clearError('preference')" />
                      <span class="preference-icon" v-html="preference.icon"></span>
                      <strong>{{ preference.name }}</strong>
                      <small>{{ preference.caption }}</small>
                    </label>
                  </div>
                  <ValidationMessage :message="errors.preference" />
                </div>
              </div>
            </div>

            <div v-else class="step-panel review-panel">
              <SectionTitle tone="red" title="Revisa antes de publicar" />

              <div class="publication-preview">
                <div class="preview-header">
                  <span class="preview-badge">
                    <span class="review-icon" v-html="currentCategory.icon"></span>
                    {{ form.category }}
                  </span>
                  <strong>
                    <span class="review-icon" v-html="reviewIcons.calendar"></span>
                    {{ formattedDeadline || 'Fecha pendiente' }}
                  </strong>
                </div>
                <h3>{{ form.title || 'Título de tu publicación' }}</h3>
                <p>{{ form.description || 'Describe los artículos, cantidades, condiciones y urgencia de la necesidad.'
                }}</p>
                <div class="preview-meta">
                  <span v-for="item in previewMetaItems" :key="item.label">
                    <span class="review-icon" v-html="item.icon"></span>
                    {{ item.value }}
                  </span>
                </div>
              </div>

              <div class="review-grid">
                <div class="review-summary">
                  <h3>Resumen de contacto</h3>
                  <div v-for="item in reviewItems" :key="item.label" class="review-row">
                    <span>
                      <span class="review-icon" v-html="item.icon"></span>
                      {{ item.label }}
                    </span>
                    <strong>{{ item.value || 'Pendiente' }}</strong>
                  </div>
                </div>

                <div class="verification-card">
                  <h3>Checklist de transparencia</h3>
                  <label v-for="item in verificationItems" :key="item" class="verification-row">
                    <input type="checkbox" checked />
                    <span>{{ item }}</span>
                  </label>
                </div>
              </div>

              <div class="impact-strip">
                <div>
                  <strong>24 h</strong>
                  <span>Revisión estimada</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>Datos clave validados</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Enfoque comunitario</span>
                </div>
              </div>

              <div v-if="submitted" class="success-panel" role="status">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <div>
                  <strong>Publicación enviada</strong>
                  <p>Quedó lista para revisión humanitaria.</p>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button class="ghost-action" type="button" :disabled="currentStep === 1 || isPublishing"
                @click="previousStep">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 12H5m7 7-7-7 7-7" />
                </svg>
                Atrás
              </button>

              <button v-if="currentStep < 3" class="primary-action" type="button" :disabled="isPublishing"
                @click="nextStep">
                {{ currentStep === 1 ? 'Continuar al Contacto' : 'Continuar a Revisión' }}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>

              <button v-else class="primary-action" type="submit" :disabled="isPublishing">
                {{ isPublishing ? 'Publicando...' : 'Publicar solicitud' }}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </button>
            </div>

            <div v-if="currentStep === 1" class="step-one-support">
              <div class="trust-panel compact">
                <div class="trust-heading">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <h2>Transparencia Garantizada</h2>
                </div>
                <p>Cada publicación es revisada para proteger a la comunidad y validar la necesidad.</p>
              </div>

              <div class="image-panel compact">
                <img :src="communityHandsImage" alt="Manos unidas en señal de apoyo comunitario" />
                <blockquote>"Juntos, construimos un legado de esperanza."</blockquote>
              </div>
            </div>
          </section>

          <aside v-if="currentStep !== 1" class="publication-aside" aria-label="Contexto de publicación">
            <div class="trust-panel" :class="{ 'review-trust': currentStep === 3 }">
              <div class="trust-heading">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <h2>Transparencia Garantizada</h2>
              </div>
              <p v-if="currentStep === 3" class="trust-copy">
                Todas las solicitudes pasan por un riguroso proceso de verificación antes de ser
                publicadas en nuestra plataforma.
              </p>
              <ul>
                <li v-for="item in sidebarTrustItems" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div class="image-panel">
              <img :src="asideImage.src" :alt="asideImage.alt" />
              <blockquote>{{ asideImage.quote }}</blockquote>
            </div>
          </aside>
        </form>

        <section v-if="isAuthLocked" class="auth-lock-modal" role="dialog" aria-modal="true"
          aria-labelledby="auth-lock-title">
          <div class="auth-lock-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3 4 7v5c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V7l-8-4Z" />
              <path d="M9.5 12.5 11.2 14 15 10" />
            </svg>
          </div>
          <p class="auth-lock-kicker">Cuenta requerida</p>
          <h2 id="auth-lock-title">Inicia sesión para publicar con confianza</h2>
          <p>
            Protegemos cada solicitud para que la ayuda llegue mejor. Entra o crea tu cuenta y esta vista se desbloquea
            al
            instante.
          </p>
          <div class="auth-lock-actions">
            <button type="button" class="auth-lock-primary" @click="goToLogin">
              Iniciar sesión
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
            <button type="button" class="auth-lock-secondary" @click="goToRegister">
              Crear cuenta
            </button>
          </div>
        </section>
      </div>
    </main>

    <PublishingLoader :active="isPublishing" title="Publicando solicitud"
      copy="Estamos resguardando la información y preparando tu solicitud para revisión comunitaria." />

    <MainFooter />
  </div>
</template>

<script setup>
import { createPost } from '../services/posts';
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import communityHandsImage from '../assets/community-hands.png';
import handshakeWindowImage from '../assets/handshake-window.jpg';
import hopeCommunityImage from '../assets/impacto-movimiento.png';
import CustomSelect from '../components/CustomSelect.vue';
import MainFooter from '../components/MainFooter.vue';
import MainNavbar from '../components/MainNavbar.vue';
import PublishingLoader from '../components/PublishingLoader.vue';
import ValidationMessage from '../components/ValidationMessage.vue';
import { isAuthenticated } from '../services/auth';

const router = useRouter();
const route = useRoute();

const SectionTitle = defineComponent({
  props: {
    title: { type: String, required: true },
    tone: { type: String, default: 'blue' }
  },
  setup(props) {
    return () =>
      h('div', { class: ['section-title', `is-${props.tone}`] }, [
        h('span', { class: 'section-title-marker', 'aria-hidden': 'true' }),
        h('h2', props.title)
      ]);
  }
});

const steps = [
  { label: 'Intención' },
  { label: 'Contacto' },
  { label: 'Revisión' }
];

const categories = [
  {
    name: 'Médico',
    color: '#3c589f',
    icon: '<svg viewBox="0 0 24 24"><path d="M10 3h4v6h6v4h-6v8h-4v-8H4V9h6V3Z"/></svg>'
  },
  {
    name: 'Comida',
    color: '#705d00',
    icon: '<svg viewBox="0 0 24 24"><path d="M7 2v9M11 2v9M7 6h4M17 2v20M5 22h14"/></svg>'
  },
  {
    name: 'Educación',
    color: '#930015',
    icon: '<svg viewBox="0 0 24 24"><path d="m12 3 10 5-10 5L2 8l10-5Z"/><path d="M6 10v6c3 3 9 3 12 0v-6"/></svg>'
  },
  {
    name: 'Otros',
    color: '#224192',
    icon: '<svg viewBox="0 0 24 24"><path d="M5 12h.01M12 12h.01M19 12h.01"/></svg>'
  }
];

const preferences = [
  {
    name: 'Chat Interno',
    caption: 'Más seguro',
    icon: '<svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/></svg>'
  },
  {
    name: 'WhatsApp',
    caption: 'Más rápido',
    icon: '<svg viewBox="0 0 24 24"><path d="M20 11.5A8.5 8.5 0 0 1 7.4 19L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5Z"/><path d="M9 8c.5 3 2.3 4.8 5 6l1.5-1.2"/></svg>'
  },
  {
    name: 'Llamada',
    caption: 'Directo',
    icon: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>'
  }
];

const locationOptions = [
  'Caracas, Distrito Capital',
  'Maracaibo, Zulia',
  'Valencia, Carabobo',
  'Barquisimeto, Lara',
  'San Cristóbal, Táchira'
];

const countryCodeOptions = [
  { label: '+58', value: '+58' },
  { label: '+57', value: '+57' },
  { label: '+1', value: '+1' },
  { label: '+34', value: '+34' },
  { label: '+51', value: '+51' },
  { label: '+56', value: '+56' }
];

const reviewIcons = {
  calendar:
    '<svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>',
  contact:
    '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  location:
    '<svg viewBox="0 0 24 24"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  value:
    '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 6.5c-.9-.9-2.4-1.5-4-1.5-2.4 0-4 1.1-4 2.8 0 4.4 8.5 1.8 8.5 6.9 0 1.9-1.8 3.3-4.6 3.3-2 0-3.7-.7-4.9-1.8"/></svg>',
  title:
    '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h12M4 18h9"/></svg>'
};

const verificationItems = [
  'La descripción evita datos sensibles innecesarios.',
  'La ubicación permite coordinar sin exponer a nadie.',
  'El contacto será usado solo para esta publicación.'
];

const sidebarTrustItems = [
  'Verificación de identidad del solicitante.',
  'Revisión de documentación médica/soporte.',
  'Seguimiento de fondos y reporte de impacto.'
];

const currentStep = ref(1);
const submitted = ref(false);
const isPublishing = ref(false);
const highestUnlockedStep = ref(1);
const errorFocusField = ref('');
const errors = reactive({});
const errorTimers = new Map();
const today = new Date();
today.setHours(0, 0, 0, 0);
const todayIso = toIsoDate(today);
const calendarMonth = ref(today.getMonth());
const calendarYear = ref(today.getFullYear());
const isCalendarOpen = ref(false);
const showMonthList = ref(false);
const form = reactive({
  category: 'Médico',
  title: '',
  value: '',
  deadline: '',
  description: '',
  contactName: '',
  countryCode: '+58',
  phone: '',
  location: '',
  preference: 'Chat Interno',
  images: [],
});

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];
const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const calendarDays = computed(() => {
  const firstDay = new Date(calendarYear.value, calendarMonth.value, 1);
  const firstValidDate = isAtCurrentMonth.value ? today : firstDay;
  const startOffset = (firstValidDate.getDay() + 6) % 7;
  const daysInMonth = new Date(calendarYear.value, calendarMonth.value + 1, 0).getDate();
  const visibleDays = daysInMonth - firstValidDate.getDate() + 1;
  const totalCells = Math.ceil((startOffset + visibleDays) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    if (index < startOffset) {
      return {
        key: `empty-${index}`,
        label: '',
        iso: '',
        isPlaceholder: true
      };
    }

    const date = new Date(firstValidDate);
    date.setDate(firstValidDate.getDate() + index - startOffset);

    if (date.getMonth() !== calendarMonth.value) {
      return {
        key: `empty-tail-${index}`,
        label: '',
        iso: '',
        isPlaceholder: true
      };
    }

    return {
      date,
      label: date.getDate(),
      iso: toIsoDate(date),
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      isPlaceholder: false
    };
  });
});

const isAtCurrentMonth = computed(
  () => calendarYear.value === today.getFullYear() && calendarMonth.value === today.getMonth()
);

const availableMonths = computed(() =>
  monthNames
    .map((name, index) => ({ name, index }))
    .filter((month) => calendarYear.value > today.getFullYear() || month.index >= today.getMonth())
);

const formattedDeadline = computed(() => {
  if (!form.deadline) return '';
  const [year, month, day] = form.deadline.split('-');
  return `${day}/${month}/${year}`;
});

const fullPhone = computed(() => {
  if (!form.phone) return '';
  return `${form.countryCode} ${form.phone}`;
});

const currentCategory = computed(() => categories.find((category) => category.name === form.category) || categories[0]);

const currentPreference = computed(
  () => preferences.find((preference) => preference.name === form.preference) || preferences[0]
);

const previewMetaItems = computed(() => [
  {
    label: 'Ubicación',
    value: form.location || 'Ubicación pendiente',
    icon: reviewIcons.location
  },
  {
    label: 'Comunicación',
    value: form.preference,
    icon: currentPreference.value.icon
  }
]);

const pageHeader = computed(() => {
  if (currentStep.value === 2) {
    return {
      title: '¿Cómo pueden contactarte?',
      copy: 'Facilita un medio de comunicación seguro para que los donantes interesados puedan coordinar la entrega.'
    };
  }

  if (currentStep.value === 3) {
    return {
      title: 'Revisión Final',
      copy: 'Por favor, verifica que todos los detalles sean correctos antes de publicar tu solicitud.'
    };
  }

  return {
    title: 'Crear una Publicación',
    copy: 'Tu contribución, ya sea dando o recibiendo, construye una comunidad más fuerte. Empecemos.'
  };
});

const asideImage = computed(() => {
  if (currentStep.value === 2) {
    return {
      src: handshakeWindowImage,
      alt: 'Personas estrechando manos junto a una ventana',
      quote: '"La conexión humana es el primer paso hacia la ayuda real."'
    };
  }

  if (currentStep.value === 3) {
    return {
      src: hopeCommunityImage,
      alt: 'Jóvenes sonriendo como símbolo de esperanza comunitaria',
      quote: '"Juntos, construimos la esperanza."'
    };
  }

  return {
    src: communityHandsImage,
    alt: 'Manos unidas en señal de apoyo comunitario',
    quote: '"Juntos, construimos un legado de esperanza."'
  };
});

const reviewItems = computed(() => [
  { label: 'Categoría', value: form.category, icon: currentCategory.value.icon },
  { label: 'Título', value: form.title, icon: reviewIcons.title },
  { label: 'Fecha límite', value: formattedDeadline.value, icon: reviewIcons.calendar },
  { label: 'Contacto', value: form.contactName, icon: reviewIcons.contact },
  { label: 'Teléfono', value: fullPhone.value, icon: reviewIcons.phone },
  { label: 'Ubicación', value: form.location, icon: reviewIcons.location },
  { label: 'Comunicación', value: form.preference, icon: currentPreference.value.icon }
]);
const isAuthLocked = computed(() => !isAuthenticated());

function goToLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: route.fullPath,
      mode: 'login'
    }
  });
}

function goToRegister() {
  router.push({
    name: 'login',
    query: {
      redirect: route.fullPath,
      mode: 'register'
    }
  });
}

async function goToStep(step) {
  currentStep.value = step;
  submitted.value = false;
  isCalendarOpen.value = false;
  showMonthList.value = false;
  await nextTick();
  scrollToPageStart();
}

async function requestStep(step) {
  if (isAuthLocked.value) return;
  if (step === currentStep.value) return;

  if (step < currentStep.value) {
    await goToStep(step);
    return;
  }

  const valid = validateThroughStep(step - 1);
  if (!valid || step > highestUnlockedStep.value) {
    focusFirstError();
    return;
  }

  await goToStep(step);
}

async function nextStep() {
  if (isAuthLocked.value) return;
  submitted.value = false;
  const valid = validateStep(currentStep.value);
  if (!valid) {
    focusFirstError();
    return;
  }

  highestUnlockedStep.value = Math.max(highestUnlockedStep.value, currentStep.value + 1);
  await goToStep(Math.min(currentStep.value + 1, 3));
}

async function previousStep() {
  await goToStep(Math.max(currentStep.value - 1, 1));
}

function handleImageUpload(event) {
  const files = Array.from(event.target.files);

  if (form.images.length + files.length > 5) {
    alert('Solo puedes subir un máximo de 5 fotos de referencia.');
    return;
  }
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.images.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });

  event.target.value = '';
}
function removeImage(index) {
  form.images.splice(index, 1);
}
function buildPublicationSummary() {
  return {
    category: form.category,
    title: form.title,
    value: form.value ? `$${form.value}` : 'Valor por definir',
    deadline: formattedDeadline.value,
    description: form.description,
    contactName: form.contactName,
    phone: fullPhone.value,
    location: form.location,
    preference: form.preference,
    images: form.images,
  };
}

async function publishPost() {
  if (isAuthLocked.value) return;
  if (isPublishing.value) return;
  const valid = validateThroughStep(2);
  if (!valid) {
    focusFirstError();
    return;
  }
  isPublishing.value = true;
  submitted.value = false;

  try {
    const postData = buildPublicationSummary();

    await createPost(postData);
    sessionStorage.setItem('publicationSummary', JSON.stringify(postData));
    submitted.value = true;

    window.setTimeout(() => {
      if (form.preference === 'Chat Interno') {
        router.push({ name: 'chat' });
      } else {
        router.push({ name: 'thank-you' });
      }
    }, 1800);
  } catch (error) {
    console.error(error);
    alert('No se pudo publicar. Revisa la consola para más detalles.');
  } finally {
    isPublishing.value = false;
  }
}

function isStepLocked(step) {
  if (step <= currentStep.value) return false;
  if (step > highestUnlockedStep.value) return true;
  return !arePreviousStepsValid(step);
}

function arePreviousStepsValid(step) {
  for (let index = 1; index < step; index += 1) {
    if (!isStepDataValid(index)) return false;
  }

  return true;
}

function isStepDataValid(step) {
  if (step === 1) {
    const numericValue = Number(form.value);
    return Boolean(
      form.category &&
      form.title.trim().length >= 6 &&
      form.value &&
      !Number.isNaN(numericValue) &&
      numericValue > 0 &&
      form.deadline &&
      new Date(`${form.deadline}T00:00:00`) >= today &&
      form.description.trim().length >= 20
    );
  }

  if (step === 2) {
    return Boolean(
      form.contactName.trim().length >= 2 &&
      form.countryCode &&
      form.phone.replace(/\D/g, '').length >= 7 &&
      form.location &&
      form.preference
    );
  }

  return true;
}

function clearError(field) {
  window.clearTimeout(errorTimers.get(field));
  errorTimers.delete(field);

  if (errors[field]) {
    delete errors[field];
  }
}

function handlePhoneInput(event) {
  form.phone = event.target.value.replace(/\D/g, '');
  clearError('phone');
}

function clearAllErrors() {
  errorTimers.forEach((timer) => window.clearTimeout(timer));
  errorTimers.clear();
  Object.keys(errors).forEach((field) => delete errors[field]);
}

function scheduleErrorClear(field) {
  window.clearTimeout(errorTimers.get(field));
  const timer = window.setTimeout(() => {
    delete errors[field];
    errorTimers.delete(field);
  }, 2000);
  errorTimers.set(field, timer);
}

function setStepErrors(step) {
  const nextErrors = {};

  if (step === 1) {
    if (!form.category) nextErrors.category = 'Selecciona una categoría antes de continuar.';
    if (!form.title.trim()) nextErrors.title = 'Completa el título antes de continuar.';
    else if (form.title.trim().length < 6) nextErrors.title = 'Usa un título más claro, mínimo 6 caracteres.';

    if (!form.deadline) nextErrors.deadline = 'Selecciona una fecha límite válida.';
    else if (new Date(`${form.deadline}T00:00:00`) < today) nextErrors.deadline = 'La fecha límite no puede ser anterior a hoy.';

    if (!form.description.trim()) nextErrors.description = 'Completa la descripción antes de continuar.';
    else if (form.description.trim().length < 20) nextErrors.description = 'Describe la necesidad con al menos 20 caracteres.';
  }

  if (step === 2) {
    if (!form.contactName.trim()) nextErrors.contactName = 'Completa el nombre de contacto antes de continuar.';
    else if (form.contactName.trim().length < 2) nextErrors.contactName = 'El nombre de contacto es demasiado corto.';

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!form.countryCode) nextErrors.phone = 'Selecciona el código de país.';
    else if (!form.phone.trim()) nextErrors.phone = 'Completa el número de teléfono antes de continuar.';
    else if (phoneDigits.length < 7) nextErrors.phone = 'Ingresa un teléfono válido.';

    if (!form.location) nextErrors.location = 'Selecciona una ubicación principal.';
    if (!form.preference) nextErrors.preference = 'Selecciona una preferencia de comunicación.';
  }

  clearAllErrors();
  Object.assign(errors, nextErrors);
  Object.keys(nextErrors).forEach(scheduleErrorClear);
  return nextErrors;
}

function validateStep(step) {
  return Object.keys(setStepErrors(step)).length === 0;
}

function validateThroughStep(step) {
  for (let index = 1; index <= step; index += 1) {
    const stepErrors = setStepErrors(index);
    if (Object.keys(stepErrors).length > 0) {
      currentStep.value = index;
      highestUnlockedStep.value = Math.min(highestUnlockedStep.value, index);
      return false;
    }
  }

  clearAllErrors();
  highestUnlockedStep.value = Math.max(highestUnlockedStep.value, step + 1);
  return true;
}

async function focusFirstError() {
  await nextTick();
  const firstField = Object.keys(errors)[0];
  if (!firstField) return;

  errorFocusField.value = firstField;
  const container = document.querySelector(`[data-field="${firstField}"]`);
  const focusable = container?.querySelector('input, select, textarea, button');

  container?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  window.setTimeout(() => focusable?.focus({ preventScroll: true }), 260);
  window.setTimeout(() => {
    errorFocusField.value = '';
  }, 700);
}

function scrollToPageStart() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function previousMonth() {
  if (isAtCurrentMonth.value) return;
  const nextDate = new Date(calendarYear.value, calendarMonth.value - 1, 1);
  calendarMonth.value = nextDate.getMonth();
  calendarYear.value = nextDate.getFullYear();
  showMonthList.value = false;
}

function nextMonth() {
  const nextDate = new Date(calendarYear.value, calendarMonth.value + 1, 1);
  calendarMonth.value = nextDate.getMonth();
  calendarYear.value = nextDate.getFullYear();
  showMonthList.value = false;
}

function toggleMonthList() {
  showMonthList.value = !showMonthList.value;
}

function closeCalendar() {
  isCalendarOpen.value = false;
  showMonthList.value = false;
}

async function toggleCalendar() {
  isCalendarOpen.value = !isCalendarOpen.value;
  if (!isCalendarOpen.value) {
    showMonthList.value = false;
    return;
  }

  await nextTick();
  const calendar = document.querySelector('.calendar-panel');
  calendar?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest'
  });
}

function selectMonth(month) {
  if (calendarYear.value === today.getFullYear() && month < today.getMonth()) return;
  calendarMonth.value = month;
  showMonthList.value = false;
}

function selectDate(day) {
  if (day.isPlaceholder) return;
  form.deadline = day.iso;
  clearError('deadline');
  closeCalendar();
}

function handleCalendarOutsideClick(event) {
  if (!isCalendarOpen.value) return;

  const dateField = document.querySelector('.date-field');
  if (!dateField?.contains(event.target)) {
    closeCalendar();
  }
}

onMounted(() => document.addEventListener('pointerdown', handleCalendarOutsideClick));
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleCalendarOutsideClick);
  clearAllErrors();
});
</script>

<style scoped>
.publication-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 18% 8%, rgba(14, 165, 233, 0.08), transparent 28%),
    linear-gradient(180deg, #f7f9ff 0%, #f8fafc 52%, #edf4ff 100%);
}

.publication-shell {
  width: min(100%, 1280px);
  margin: 0 auto;
  padding: 5rem 2rem 6rem;
}

.publication-access-frame {
  position: relative;
}

.publication-access-frame.is-auth-locked .publication-stepper,
.publication-access-frame.is-auth-locked .publication-grid {
  filter: blur(10px) saturate(0.88);
  opacity: 0.58;
  pointer-events: none;
  user-select: none;
}

.publication-access-frame.is-auth-locked::before {
  content: '';
  position: absolute;
  inset: -2rem -1rem;
  z-index: 8;
  border-radius: 32px;
  background:
    radial-gradient(circle at 50% 6%, rgba(56, 189, 248, 0.16), transparent 32%),
    rgba(247, 249, 255, 0.46);
  backdrop-filter: blur(2px);
}

.auth-lock-modal {
  position: absolute;
  z-index: 9;
  left: 50%;
  top: 7rem;
  width: min(92vw, 520px);
  transform: translateX(-50%);
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(237, 244, 255, 0.92)),
    rgba(255, 255, 255, 0.86);
  box-shadow:
    0 32px 70px -26px rgba(5, 29, 48, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  padding: clamp(1.6rem, 4vw, 2.4rem);
  text-align: center;
}

.auth-lock-icon {
  width: 68px;
  height: 68px;
  margin: 0 auto 1rem;
  border-radius: 22px;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: linear-gradient(145deg, var(--color-va-blue), #0ea5e9);
  box-shadow: 0 18px 32px -18px rgba(34, 65, 146, 0.7);
}

.auth-lock-icon svg {
  width: 34px;
  height: 34px;
}

.auth-lock-icon path,
.auth-lock-primary path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.auth-lock-kicker {
  color: var(--color-va-blue);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.auth-lock-modal h2 {
  color: var(--color-va-ink);
  font-size: clamp(1.65rem, 3vw, 2.15rem);
  line-height: 1.08;
  margin-bottom: 0.9rem;
}

.auth-lock-modal p:not(.auth-lock-kicker) {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin: 0 auto;
  max-width: 430px;
}

.auth-lock-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-top: 1.6rem;
}

.auth-lock-primary,
.auth-lock-secondary {
  min-height: 50px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 800;
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.auth-lock-primary {
  color: #ffffff;
  background: linear-gradient(165deg, var(--color-va-blue), var(--color-va-blue-soft));
  box-shadow: 0 18px 28px -18px rgba(34, 65, 146, 0.8);
}

.auth-lock-secondary {
  color: var(--color-va-blue);
  background: #ffffff;
  border: 1px solid rgba(34, 65, 146, 0.16);
}

.auth-lock-primary:hover,
.auth-lock-secondary:hover {
  transform: translateY(-2px);
}

.auth-lock-primary svg {
  width: 18px;
  height: 18px;
}

.publication-hero {
  width: min(100%, 720px);
  margin: 0 auto 3rem;
  text-align: center;
}

.publication-hero.is-review h1 {
  font-size: clamp(2.4rem, 5vw, 3.6rem);
}

.publication-kicker {
  color: var(--color-va-blue);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  line-height: 1.35;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.publication-hero h1 {
  color: var(--color-va-ink);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1;
  margin-bottom: 1rem;
}

.publication-hero p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: 1.7;
}

.publication-stepper {
  width: min(100%, 760px);
  margin: 0 auto 3rem;
  display: flex;
  align-items: center;
}

.stepper-item {
  min-width: 6.75rem;
  border: 0;
  background: transparent;
  color: #747683;
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.stepper-item>span:last-child {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.stepper-dot {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #e3efff;
  color: #747683;
  border: 4px solid #f7f9ff;
  transition: 0.2s ease;
}

.stepper-dot svg {
  width: 18px;
  height: 18px;
}

.stepper-dot path,
.publication-card svg path,
.publication-aside svg path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.stepper-item.is-active,
.stepper-item.is-complete {
  color: var(--color-va-blue);
}

.stepper-item.is-locked {
  color: #94a3b8;
  cursor: not-allowed;
}

.stepper-item.is-active .stepper-dot,
.stepper-item.is-complete .stepper-dot {
  background: var(--color-va-blue);
  border-color: var(--color-va-blue);
  color: #ffffff;
  box-shadow: 0 16px 28px -14px rgba(34, 65, 146, 0.6);
}

.stepper-item.is-locked .stepper-dot {
  background: #eef2f7;
  border-color: #f7f9ff;
  color: #94a3b8;
}

.stepper-line {
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: #dbe1ff;
  position: relative;
  overflow: hidden;
}

.stepper-line::before {
  content: '';
  position: absolute;
  inset: 0;
  width: 0;
  background: var(--color-va-blue);
  transition: width 0.25s ease;
}

.stepper-line.is-filled::before {
  width: 100%;
}

.publication-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 405px;
  gap: 3rem;
  align-items: start;
}

.publication-grid.is-step-one {
  grid-template-columns: minmax(0, 896px);
  justify-content: center;
}

.publication-grid.is-review-layout {
  grid-template-columns: minmax(0, 1fr) 405px;
  width: min(100%, 1216px);
  margin: 0 auto;
}

.publication-grid.is-review-layout .publication-card {
  box-shadow: none;
  border-color: rgba(196, 198, 211, 0.16);
}

.publication-grid.is-review-layout .form-actions {
  border-top: 0;
  justify-content: flex-end;
  gap: 2rem;
  padding-top: 3rem;
}

.publication-grid.is-review-layout .ghost-action {
  font-weight: 800;
}

.publication-grid.is-review-layout .primary-action {
  min-width: 190px;
}

.publication-card,
.trust-panel,
.image-panel {
  border: 1px solid rgba(196, 198, 211, 0.28);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow-va-soft);
}

.publication-card {
  border-radius: 24px;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.step-panel {
  display: grid;
  gap: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title :deep(.section-title-marker) {
  width: 6px;
  min-width: 6px;
  height: 34px;
  display: block;
  border-radius: 999px;
  background: var(--color-va-blue);
}

.section-title.is-yellow :deep(.section-title-marker) {
  background: #fed721;
}

.section-title.is-blue :deep(.section-title-marker) {
  background: var(--color-va-blue);
}

.section-title.is-red :deep(.section-title-marker) {
  background: #b91c1c;
}

.section-title h2 {
  color: var(--color-va-ink);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  line-height: 1.3;
}

.category-grid,
.preference-grid {
  display: grid;
  gap: 1rem;
}

.category-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  position: relative;
  margin-bottom: 0;
  transition: margin-bottom 0.2s ease;
}

.category-grid.has-error,
.preference-group.has-error .preference-grid {
  border-radius: 18px;
  outline: 2px solid rgba(245, 158, 11, 0.65);
  outline-offset: 4px;
}

.category-grid.has-error,
.field-group.has-error,
.preference-group.has-error {
  margin-bottom: 3.35rem;
  transition: margin-bottom 0.2s ease;
}

.category-option,
.preference-option {
  position: relative;
  display: grid;
  justify-items: center;
  border: 2px solid transparent;
  background: var(--color-va-field);
  color: var(--color-va-ink);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.category-option {
  min-height: 124px;
  border-radius: 16px;
  padding: 1.6rem 1rem;
  gap: 0.7rem;
  font-size: 0.9rem;
  font-weight: 700;
}

.category-option input,
.preference-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.category-icon :deep(svg),
.preference-icon :deep(svg) {
  display: block;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.category-icon :deep(svg) {
  width: 34px;
  height: 34px;
}

.category-check {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  opacity: 0;
}

.category-option:hover,
.preference-option:hover {
  transform: translateY(-2px);
}

.category-option.is-selected {
  border-color: color-mix(in srgb, var(--category-active, var(--color-va-blue)) 65%, transparent);
  background: #ffffff;
}

.preference-option.is-selected {
  border-color: rgba(34, 65, 146, 0.65);
  background: #ffffff;
}

.category-option.is-selected .category-icon,
.category-option.is-selected>span:not(.category-icon) {
  color: var(--category-active, var(--color-va-blue));
}

.category-option.is-selected .category-check {
  opacity: 1;
  color: var(--category-active, var(--color-va-blue));
}

.form-stack {
  display: grid;
  gap: 1.5rem;
}

.two-column {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.phone-input-row {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 0.75rem;
}

.phone-input-row :deep(.custom-select-trigger) {
  border-radius: 12px 12px 0 0;
}

.phone-input-row :deep(.custom-select-menu) {
  min-width: 112px;
}

.field-group,
.preference-group {
  position: relative;
  display: grid;
  gap: 0.5rem;
  margin-bottom: 0;
  transition: margin-bottom 0.2s ease;
}

.date-field {
  position: relative;
}

.field-group span,
.preference-group>span {
  color: var(--color-text-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
}

.field-group input,
.field-group select {
  width: 100%;
  height: 58px;
  border: 0;
  border-bottom: 2px solid var(--color-va-line);
  border-radius: 12px 12px 0 0;
  background: var(--color-va-field);
  color: var(--color-va-ink);
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.25;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.field-group textarea {
  width: 100%;
  border: 0;
  border-bottom: 2px solid var(--color-va-line);
  border-radius: 12px 12px 0 0;
  background: var(--color-va-field);
  color: var(--color-va-ink);
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.field-group input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

.field-group input[type='number']::-webkit-inner-spin-button,
.field-group input[type='number']::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
}

.field-group.has-error input,
.field-group.has-error select,
.field-group.has-error textarea,
.field-group.has-error .date-trigger {
  background: #fffaf0;
  border-bottom-color: #f59e0b;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.12);
}

.is-shaking {
  animation: validationShake 0.46s ease both;
}

.date-trigger {
  width: 100%;
  height: 58px;
  border: 0;
  border-bottom: 2px solid var(--color-va-line);
  border-radius: 12px 12px 0 0;
  background: var(--color-va-field);
  color: var(--color-va-ink);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.date-trigger:hover,
.date-trigger:focus-visible {
  background: #ffffff;
  border-bottom-color: var(--color-va-blue);
}

.date-trigger svg {
  width: 20px;
  height: 20px;
  color: var(--color-va-blue);
  flex: 0 0 auto;
}

.calendar-panel {
  width: 100%;
  border: 1px solid rgba(34, 65, 146, 0.14);
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 24px 48px -20px rgba(34, 65, 146, 0.28);
  margin-top: 0.45rem;
  position: absolute;
  left: 0;
  top: calc(100% + 0.15rem);
  z-index: 20;
  transform: translateZ(0);
}

.calendar-header {
  min-height: 74px;
  background: linear-gradient(165deg, #2f8ed8, var(--color-va-blue));
  color: #ffffff;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  padding: 0 0.75rem;
}

.calendar-nav,
.calendar-title button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.calendar-nav {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
}

.calendar-nav:hover,
.calendar-title button:hover {
  background: rgba(255, 255, 255, 0.14);
}

.calendar-nav:disabled {
  opacity: 0.28;
  cursor: not-allowed;
}

.calendar-nav svg {
  width: 22px;
  height: 22px;
}

.calendar-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  font-size: 1.35rem;
  line-height: 1;
}

.calendar-title span {
  color: #ffffff;
  font-family: var(--font-family);
  font-size: 1.35rem;
  letter-spacing: 0;
}

.calendar-title button {
  border-radius: 999px;
  padding: 0.45rem 0.65rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.calendar-title svg {
  width: 16px;
  height: 16px;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.35rem;
  padding: 0.75rem;
  background: #edf4ff;
  border-bottom: 1px solid rgba(34, 65, 146, 0.1);
}

.month-grid button {
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--color-va-blue);
  cursor: pointer;
  padding: 0.5rem 0.25rem;
  font-weight: 700;
}

.month-grid button:hover,
.month-grid button.is-active {
  background: #ffffff;
  border-color: rgba(34, 65, 146, 0.18);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: linear-gradient(165deg, #2f8ed8, var(--color-va-blue));
  color: rgba(255, 255, 255, 0.78);
  font-weight: 800;
  padding: 0 0.35rem 0.65rem;
}

.calendar-weekdays span {
  color: rgba(255, 255, 255, 0.82);
  font-family: var(--font-family);
  font-size: 0.95rem;
  letter-spacing: 0;
  text-align: center;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.2rem 0;
  padding: 0.75rem 0.35rem 1rem;
}

.calendar-day {
  height: 48px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1rem;
  display: grid;
  place-items: center;
}

.calendar-day:not(.is-placeholder):hover,
.calendar-day.is-today:not(.is-selected) {
  box-shadow: inset 0 0 0 1px rgba(34, 65, 146, 0.34);
  color: var(--color-va-ink);
}

.calendar-day.is-placeholder {
  visibility: hidden;
  pointer-events: none;
}

.calendar-day.is-selected {
  background: #ffffff;
  color: var(--color-va-ink);
  box-shadow:
    inset 0 0 0 1px rgba(5, 29, 48, 0.26),
    0 10px 22px -16px rgba(5, 29, 48, 0.6);
}

.field-group textarea {
  resize: vertical;
  min-height: 144px;
}

.field-group input:focus,
.field-group select:focus,
.field-group textarea:focus {
  background: #ffffff;
  border-bottom-color: var(--color-va-blue);
}

.step-copy {
  max-width: 680px;
  color: var(--color-text-muted);
  line-height: 1.7;
  font-size: 1rem;
}

.preference-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.preference-option {
  min-height: 148px;
  border-radius: 16px;
  padding: 1.1rem;
  align-content: center;
  gap: 0.55rem;
  text-align: center;
}

.preference-icon {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: var(--color-va-blue);
  background: #eaf1ff;
}

.preference-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.preference-option strong {
  color: var(--color-va-ink);
}

.preference-option small {
  color: var(--color-text-muted);
}

.review-panel {
  gap: 1.35rem;
}

.review-panel .step-copy {
  display: none;
}

.publication-preview,
.review-summary,
.verification-card,
.impact-strip {
  border: 1px solid rgba(34, 65, 146, 0.1);
  background: rgba(237, 244, 255, 0.92);
  box-shadow: none;
}

.publication-preview {
  border-radius: 10px;
  padding: 1.35rem 1.5rem;
  display: grid;
  gap: 0.95rem;
  position: relative;
  overflow: hidden;
}

.preview-header,
.preview-meta,
.impact-strip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.preview-header {
  justify-content: space-between;
}

.preview-badge,
.preview-meta>span {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-va-blue);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 800;
}

.preview-header strong {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 800;
}

.publication-preview h3,
.review-summary h3,
.verification-card h3 {
  color: var(--color-va-ink);
  font-size: 1.25rem;
  line-height: 1.3;
}

.publication-preview h3 {
  font-size: clamp(1.25rem, 2.2vw, 1.45rem);
}

.publication-preview p {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.review-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.review-summary,
.verification-card {
  border-radius: 10px;
  padding: 1.45rem 1.5rem 1.15rem;
  display: grid;
  gap: 0.75rem;
}

.verification-card,
.impact-strip {
  display: none;
}

.review-row {
  display: grid;
  grid-template-columns: minmax(150px, 0.8fr) minmax(0, 1fr);
  align-items: center;
  gap: 1rem;
  padding: 0.88rem 0;
  background: transparent;
  border-bottom: 1px solid rgba(196, 198, 211, 0.22);
}

.review-row:last-child {
  border-bottom: 0;
}

.review-row>span {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.review-row strong {
  color: var(--color-va-ink);
  text-align: right;
  overflow-wrap: anywhere;
}

.review-icon {
  width: 1.05rem;
  height: 1.05rem;
  display: inline-grid;
  place-items: center;
  color: currentColor;
  flex: 0 0 auto;
}

.review-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.verification-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.verification-row input {
  width: 18px;
  height: 18px;
  margin-top: 0.1rem;
  accent-color: var(--color-va-blue);
  flex: 0 0 auto;
}

.impact-strip {
  border-radius: 18px;
  justify-content: space-between;
  padding: 1rem;
}

.impact-strip div {
  display: grid;
  gap: 0.15rem;
  min-width: 130px;
}

.impact-strip strong {
  color: var(--color-va-blue);
  font-size: 1.35rem;
  line-height: 1;
}

.impact-strip span {
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.success-panel {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(22, 163, 74, 0.22);
  background: rgba(22, 163, 74, 0.08);
  border-radius: 16px;
  color: #166534;
  padding: 1rem;
}

.success-panel svg {
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
}

.success-panel p {
  margin-top: 0.2rem;
  color: #15803d;
}

.form-actions {
  border-top: 1px solid rgba(196, 198, 211, 0.22);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
}

.ghost-action,
.primary-action {
  min-height: 48px;
  border: 0;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  font-weight: 800;
}

.ghost-action {
  background: transparent;
  color: var(--color-text-muted);
}

.ghost-action:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.primary-action {
  color: #ffffff;
  background: linear-gradient(165deg, var(--color-va-blue), var(--color-va-blue-soft));
  box-shadow: 0 20px 25px -16px rgba(34, 65, 146, 0.6);
}

.primary-action:disabled {
  cursor: wait;
  opacity: 0.74;
  transform: none;
}

.ghost-action svg,
.primary-action svg {
  width: 18px;
  height: 18px;
}

.publication-aside {
  display: grid;
  gap: 2rem;
  position: sticky;
  top: 110px;
}

.trust-panel {
  border-radius: 20px;
  padding: 2rem;
}

.review-trust {
  background: #edf4ff;
  border-color: rgba(196, 198, 211, 0.18);
  box-shadow: none;
}

.trust-heading {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}

.trust-heading svg {
  width: 28px;
  height: 28px;
  color: var(--color-va-blue);
}

.trust-heading h2 {
  color: var(--color-va-ink);
  font-size: 1.25rem;
}

.trust-copy {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.trust-panel ul {
  display: grid;
  gap: 0.95rem;
  list-style: none;
}

.trust-panel li {
  color: var(--color-text-muted);
  line-height: 1.6;
  padding-left: 1.1rem;
  position: relative;
}

.trust-panel li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7rem;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #fed721;
}

.step-one-support {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.trust-panel.compact {
  background: rgba(255, 225, 109, 0.22);
  border-color: rgba(255, 225, 109, 0.36);
  box-shadow: none;
}

.trust-panel.compact p {
  color: rgba(112, 94, 0, 0.82);
  line-height: 1.65;
}

.image-panel {
  min-height: 520px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition:
    transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.5s ease,
    border-color 0.3s ease;
  animation: imageFloat 6s ease-in-out infinite;
  will-change: transform;
}

.image-panel.compact {
  min-height: 192px;
  align-self: center;
  border-radius: 18px;
  animation-delay: 0.8s;
}

.image-panel img {
  width: 100%;
  height: 100%;
  min-height: 520px;
  object-fit: cover;
  display: block;
  transform: scale(1.01);
  transition: transform 0.75s ease, filter 0.45s ease;
}

.image-panel.compact img {
  min-height: 192px;
}

.image-panel:hover {
  animation: none;
  transform: translateY(-12px) rotate(-0.7deg);
  border-color: rgba(34, 65, 146, 0.18);
  box-shadow: 0 32px 64px -20px rgba(34, 65, 146, 0.28);
}

.image-panel:hover img {
  transform: scale(1.08) rotate(0.8deg);
  filter: saturate(1.08) contrast(1.04);
}

.image-panel:hover blockquote {
  transform: translateY(-3px);
}

.image-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 28%, rgba(34, 65, 146, 0.68)),
    linear-gradient(90deg, rgba(34, 65, 146, 0.16), rgba(34, 65, 146, 0.08));
}

.image-panel blockquote {
  position: absolute;
  z-index: 1;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  color: #ffffff;
  font-weight: 800;
  line-height: 1.5;
  transition: transform 0.35s ease;
}

.publication-aside .image-panel blockquote::before {
  content: '"';
  display: block;
  color: #fed721;
  font-size: 3rem;
  line-height: 0.7;
  margin-bottom: 0.55rem;
}

.image-panel.compact blockquote {
  left: 1.5rem;
  right: 1.5rem;
  bottom: 1.25rem;
  font-size: 0.95rem;
}

@keyframes imageFloat {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-8px) rotate(-0.35deg);
  }

  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes validationShake {

  0%,
  100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-7px);
  }

  40% {
    transform: translateX(7px);
  }

  60% {
    transform: translateX(-5px);
  }

  80% {
    transform: translateX(5px);
  }
}

@media (max-width: 1050px) {
  .publication-grid {
    grid-template-columns: 1fr;
  }

  .publication-grid.is-review-layout {
    grid-template-columns: 1fr;
  }

  .publication-aside {
    position: static;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .publication-grid.is-step-one {
    grid-template-columns: 1fr;
  }

  .image-panel,
  .image-panel img {
    min-height: 320px;
  }
}

@media (max-width: 760px) {
  .publication-shell {
    padding: 3rem 1rem 4rem;
  }

  .auth-lock-modal {
    top: 5.5rem;
  }

  .auth-lock-actions {
    grid-template-columns: 1fr;
  }

  .publication-stepper {
    align-items: flex-start;
  }

  .stepper-item {
    min-width: 4.2rem;
  }

  .stepper-item>span:last-child {
    font-size: 0.64rem;
  }

  .stepper-dot {
    width: 40px;
    height: 40px;
  }

  .category-grid,
  .preference-grid,
  .publication-aside,
  .review-grid,
  .step-one-support,
  .phone-input-row,
  .two-column {
    grid-template-columns: 1fr;
  }

  .impact-strip {
    display: grid;
  }

  .form-actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .ghost-action,
  .primary-action {
    width: 100%;
  }

  .review-row {
    display: grid;
  }

  .review-row strong {
    text-align: left;
  }
}
</style>
