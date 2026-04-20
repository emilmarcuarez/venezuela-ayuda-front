<template>
  <section class="info-section">
    <h2 class="section-title">Mis Peticiones Realizadas</h2>

    <div class="petitions-list">
      <div class="petition-row-card border-left-red">
        <div class="petition-info">
          <div class="petition-meta">
            <span class="badge-tag bg-red-tag"><span class="alert-icon">⚠</span> URGENTE</span>
            <span class="petition-date">Creada: 01/11/2023</span>
          </div>
          <h3>Insumos Médicos para Clínica El Valle</h3>

          <div class="progress-wrapper">
            <div class="progress-labels">
               <span>Progreso de la meta</span>
              <span class="text-blue font-bold">85% Asegurado</span>
            </div>
            <div class="progress-bar-thin">
              <div class="progress-fill-thin bg-blue" style="width: 85%"></div>
            </div>
          </div>
        </div>
        <div class="petition-action">
          <a href="#" class="details-link">Ver Detalles &rarr;</a>
        </div>
      </div>

      <div class="petition-row-card border-left-yellow">
        <div class="petition-info">
          <div class="petition-meta">
            <span class="badge-tag bg-yellow-tag"><span class="refresh-icon">↻</span> EN CURSO</span>
            <span class="petition-date">Creada: 20/09/2023</span>
          </div>
          <h3>Reconstrucción Techo Escuela Básica</h3>

          <div class="progress-wrapper">
            <div class="progress-labels">
              <span>Progreso de la meta</span>
              <span class="text-yellow font-bold">40% Asegurado</span>
            </div>
            <div class="progress-bar-thin">
              <div class="progress-fill-thin bg-yellow" style="width: 40%"></div>
            </div>
          </div>
        </div>
        <div class="petition-action">
          <a href="#" class="details-link">Ver Detalles &rarr;</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-va-ink, #0f172a);
  margin-bottom: 1.5rem;
}

.petitions-list {
  display: flex;
  gap: 2rem;
}

.petition-row-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  border-left: 4px solid transparent;
}

.border-left-red {
  border-left-color: #e11d48;
}

.border-left-yellow {
  border-left-color: #d97706;
}

.petition-info {
  flex: 1;
  padding-right: 2rem;
}

.petition-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.badge-tag {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  letter-spacing: 0.05em;
}

.bg-red-tag {
  background: #ffe4e6;
  color: #be123c;
}

.bg-yellow-tag {
  background: #fef3c7;
  color: #b45309;
}

.petition-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.petition-info h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-va-ink, #0f172a);
  margin: 0 0 1rem 0;
}

.progress-wrapper {
  max-width: 400px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.4rem;
}

.font-bold {
  font-weight: 700;
}

.text-yellow {
  color: #d97706;
}

.progress-bar-thin {
  height: 6px;
  background: #f1f5f9;
  border-radius: 99px;
  overflow: hidden;
}

.progress-fill-thin {
  height: 100%;
  border-radius: 99px;
}

.bg-blue {
  background: var(--color-va-blue, #224192);
}

.petition-action {
  padding-left: 2rem;
  border-left: 1px solid #f1f5f9;
  height: 100%;
  display: flex;
  align-items: center;
}

.text-blue {
  color: var(--color-va-blue, #224192);
}

.details-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-va-blue, #224192);
  text-decoration: none;
}

.details-link:hover {
  text-decoration: underline;
}

@media (max-width: 992px) {
  .petitions-list {
    flex-direction: column;
  }

  .petition-row-card {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }

  .petition-info {
    padding-right: 0;
  }

  .petition-action {
    padding-left: 0;
    border-left: none;
    padding-top: 1rem;
    border-top: 1px solid #f1f5f9;
    justify-content: flex-end;
  }
}
</style>
