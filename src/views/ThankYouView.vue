<template>
  <div class="thank-page">
    <MainNavbar />

    <main class="thank-shell">
      <section class="thank-hero" aria-labelledby="thank-title">
        <p class="thank-kicker">SOLICITUD RECIBIDA</p>
        <div class="thank-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 id="thank-title">Gracias por confiar en Venezuela Ayuda</h1>
        <p>
          Ya recibimos tu solicitud. Nuestro equipo revisará la información, cuidará los datos de contacto
          y ayudará a que la publicación llegue a personas que puedan coordinar apoyo real.
        </p>
      </section>

      <section class="thank-grid" aria-label="Resumen de solicitud">
        <article class="thank-card summary-card">
          <div class="section-title is-yellow">
            <span aria-hidden="true"></span>
            <h2>Resumen enviado</h2>
          </div>

          <div class="summary-preview">
            <div class="summary-header">
              <span>{{ summary.category }}</span>
              <strong>{{ summary.deadline || 'Fecha por validar' }}</strong>
            </div>
            <h3>{{ summary.title || 'Solicitud comunitaria' }}</h3>
            <p>{{ summary.description || 'La descripción será revisada por nuestro equipo.' }}</p>
          </div>

          <div class="summary-list">
            <div v-for="item in summaryItems" :key="item.label" class="summary-row">
              <span>{{ item.label }}</span>
              <strong>{{ item.value || 'Pendiente' }}</strong>
            </div>
          </div>
        </article>

        <aside class="thank-card process-card">
          <div class="section-title is-blue">
            <span aria-hidden="true"></span>
            <h2>Qué haremos ahora</h2>
          </div>

          <ul class="process-list">
            <li>
              <span>1</span>
              <p>Revisaremos que la solicitud sea clara, segura y verificable.</p>
            </li>
            <li>
              <span>2</span>
              <p>Ordenaremos la información para que donantes puedan entender la necesidad.</p>
            </li>
            <li>
              <span>3</span>
              <p>Te contactaremos por tu canal preferido si necesitamos confirmar algún dato.</p>
            </li>
          </ul>

          <div class="thank-actions">
            <RouterLink class="primary-action" to="/crear-publicacion" @click="handleCreateAnother">
              Crear otra publicación
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </RouterLink>
            <RouterLink class="ghost-action" to="/">
              Ver publicaciones
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
        </aside>
      </section>
    </main>

    <MainFooter />
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted } from 'vue';
import MainFooter from '../components/MainFooter.vue';
import MainNavbar from '../components/MainNavbar.vue';

const fallbackSummary = {
  category: 'Solicitud',
  title: 'Solicitud comunitaria',
  value: 'Valor por definir',
  deadline: '',
  description: 'La información enviada será revisada por nuestro equipo.',
  contactName: '',
  phone: '',
  location: '',
  preference: ''
};

const summary = { ...fallbackSummary, ...readStoredSummary() };

const summaryItems = computed(() => [
  { label: 'Categoría', value: summary.category },
  { label: 'Valor estimado', value: summary.value },
  { label: 'Ubicación', value: summary.location },
  { label: 'Contacto', value: summary.contactName },
  { label: 'Teléfono', value: summary.phone },
  { label: 'Comunicación', value: summary.preference }
]);

function clearSummary() {
  sessionStorage.removeItem('publicationSummary');
}

function handleCreateAnother() {
  clearSummary();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

function readStoredSummary() {
  try {
    return JSON.parse(sessionStorage.getItem('publicationSummary') || '{}');
  } catch {
    return {};
  }
}

onMounted(async () => {
  await nextTick();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
</script>

<style scoped>
.thank-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 18% 8%, rgba(14, 165, 233, 0.08), transparent 28%),
    linear-gradient(180deg, #f7f9ff 0%, #f8fafc 52%, #edf4ff 100%);
}

.thank-shell {
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 5rem 2rem 6rem;
}

.thank-hero {
  width: min(100%, 760px);
  margin: 0 auto 3rem;
  text-align: center;
}

.thank-kicker {
  color: var(--color-va-blue);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  line-height: 1.35;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.thank-mark {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: var(--color-va-blue);
  color: #ffffff;
  box-shadow: 0 22px 38px -20px rgba(34, 65, 146, 0.72);
  margin: 0 auto 1.25rem;
}

.thank-mark svg {
  width: 34px;
  height: 34px;
}

.thank-mark path,
.thank-actions svg path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.thank-hero h1 {
  color: var(--color-va-ink);
  font-size: clamp(2.3rem, 5vw, 3.5rem);
  line-height: 1;
  margin-bottom: 1rem;
}

.thank-hero p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: 1.7;
}

.thank-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 2rem;
  align-items: start;
}

.thank-card {
  border: 1px solid rgba(196, 198, 211, 0.28);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow-va-soft);
  padding: clamp(1.35rem, 3vw, 2rem);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.35rem;
}

.section-title span {
  width: 6px;
  height: 34px;
  border-radius: 999px;
}

.section-title.is-yellow span {
  background: #fed721;
}

.section-title.is-blue span {
  background: var(--color-va-blue);
}

.section-title h2 {
  color: var(--color-va-ink);
  font-size: 1.35rem;
  line-height: 1.25;
}

.summary-preview {
  border: 1px solid rgba(34, 65, 146, 0.1);
  border-radius: 10px;
  background: rgba(237, 244, 255, 0.92);
  padding: 1.35rem;
  display: grid;
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.summary-header span {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-va-blue);
  padding: 0.35rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 800;
}

.summary-header strong {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.summary-preview h3 {
  color: var(--color-va-ink);
  font-size: clamp(1.25rem, 2.2vw, 1.45rem);
  line-height: 1.3;
}

.summary-preview p {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.summary-list {
  display: grid;
}

.summary-row {
  display: grid;
  grid-template-columns: minmax(150px, 0.8fr) minmax(0, 1fr);
  align-items: center;
  gap: 1rem;
  padding: 0.88rem 0;
  border-bottom: 1px solid rgba(196, 198, 211, 0.22);
}

.summary-row:last-child {
  border-bottom: 0;
}

.summary-row span {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.summary-row strong {
  color: var(--color-va-ink);
  text-align: right;
  overflow-wrap: anywhere;
}

.process-list {
  display: grid;
  gap: 1rem;
  list-style: none;
  margin-bottom: 2rem;
}

.process-list li {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 0.85rem;
  align-items: start;
}

.process-list li span {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #edf4ff;
  color: var(--color-va-blue);
  font-weight: 800;
}

.process-list p {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.thank-actions {
  display: grid;
  gap: 0.8rem;
}

.primary-action,
.ghost-action {
  min-height: 48px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  font-weight: 800;
}

.primary-action {
  color: #ffffff;
  background: linear-gradient(165deg, var(--color-va-blue), var(--color-va-blue-soft));
  box-shadow: 0 20px 25px -16px rgba(34, 65, 146, 0.6);
}

.ghost-action {
  color: var(--color-va-blue);
  background: #edf4ff;
}

.thank-actions svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 860px) {
  .thank-shell {
    padding: 3rem 1rem 4rem;
  }

  .thank-grid,
  .summary-row {
    grid-template-columns: 1fr;
  }

  .summary-row strong {
    text-align: left;
  }
}
</style>
