<template>
  <section class="info-section">
    <div class="section-header-flex">
      <h2 class="section-title">Mis Donaciones Recientes</h2>
      <a href="#" class="view-all-link">Ver historial completo &rarr;</a>
    </div>

    <div class="donations-grid">
      <div class="donation-card">
        <div class="card-image-wrapper">
          <img src="../assets/educacion-zulia.png" alt="Educación para Zulia" />
          <div class="card-badge bg-yellow">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            VERIFICADO
          </div>
        </div>
        <div class="card-content">
          <h3>Educación para Zulia</h3>
          <p>Donación de $50 el 15/10/2023</p>
          <div class="card-footer-right">
            <a href="#" class="details-link">
              Ver Detalles
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="donation-card">
        <div class="card-image-wrapper">
          <img src="../assets/medico-valencia.png" alt="Insumos Pediátricos" />
          <div class="card-badge bg-yellow">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            VERIFICADO
          </div>
        </div>
        <div class="card-content">
          <h3>Insumos Pediátricos</h3>
          <p>Donación de $100 el 02/09/2023</p>
          <div class="card-footer-right">
            <a href="#" class="details-link">
              Ver Detalles
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="donation-card">
        <div class="card-image-wrapper">
          <img src="../assets/comedores-petare.png" alt="Comedores Solidarios" />
          <div class="card-badge bg-yellow">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            VERIFICADO
          </div>
        </div>
        <div class="card-content">
          <h3>Comedores Solidarios</h3>
          <p>Donación de $25 el 10/08/2023</p>
          <div class="card-footer-right">
            <a href="#" class="details-link">
              Ver Detalles
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </a>
          </div>
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

.section-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header-flex .section-title {
  margin-bottom: 0;
}

.view-all-link {
  color: #2563eb;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.view-all-link:hover {
  text-decoration: underline;
}

.donations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.donation-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
}

.card-image-wrapper {
  position: relative;
  height: 160px;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bg-yellow {
  background: #fef08a;
  color: #854d0e;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-content h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-va-ink, #0f172a);
  margin: 0 0 0.5rem 0;
}

.card-content p {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.card-footer-right {
  display: flex;
  justify-content: flex-end;
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
  .donations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
