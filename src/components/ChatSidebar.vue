<template>
  <aside class="chat-sidebar">
    <div class="kit-card">
      <div class="kit-image-wrapper">
        <img src="../assets/kit-insumos.png" alt="Kit de Suministros Médicos" class="kit-img" />
      </div>
      
      <div class="kit-content">
        <div class="kit-header">
          <h3>Kit de Suministros Médicos Críticos</h3>
          <span class="badge-urgent">URGENTE</span>
        </div>
        <p class="kit-description">
          Solicitud de insulina y vendajes médicos básicos para la clínica comunitaria en El Valle.
        </p>

        <div class="progress-section">
          <div class="progress-labels">
            <span class="status-verified">ESTADO VERIFICADO</span>
            <span class="status-secured">85% ASEGURADO</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 85%"></div>
            <div class="progress-indicator"></div>
          </div>
        </div>

        <button class="btn-confirm">Confirmar Donación</button>
        <p class="terms-text">
          AL CONFIRMAR, ACEPTAS NUESTRAS GUÍAS DE TRANSPARENCIA COMUNITARIA.
        </p>
      </div>
    </div>

    <div class="donor-card">
      <span class="donor-badge">DONANTE VERIFICADO</span>
      <div class="donor-info">
        <div class="donor-avatar">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="donor-details">
          <h4>Alejandro M.</h4>
          <div class="donor-rating">
            <span class="star">★</span> 4.9 (12 Donaciones)
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.chat-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.kit-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
}

.kit-image-wrapper {
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  height: 200px;
}

.kit-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kit-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.kit-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-va-ink, #0f172a);
  line-height: 1.3;
  margin: 0;
}

.badge-urgent {
  background: #e11d48;
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.kit-description {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.progress-section {
  margin-bottom: 1.5rem;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.status-verified {
  color: var(--color-va-blue, #224192);
}

.status-secured {
  color: var(--color-va-blue, #224192);
}

.progress-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 99px;
  position: relative;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--color-va-blue, #224192);
  border-radius: 99px;
}

.progress-indicator {
  position: absolute;
  right: 15%; /* Corresponds to 85% */
  top: 50%;
  transform: translate(50%, -50%);
  width: 12px;
  height: 12px;
  background: white;
  border: 2px solid var(--color-va-blue, #224192);
  border-radius: 50%;
}

.btn-confirm {
  width: 100%;
  background: var(--color-va-blue, #224192);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.btn-confirm:hover {
  background: #1a3275;
  transform: translateY(-2px);
}

.terms-text {
  font-size: 0.65rem;
  text-align: center;
  color: #94a3b8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
}

.donor-card {
  background: #eff6ff;
  border-radius: 20px;
  padding: 1.5rem;
}

.donor-badge {
  display: block;
  font-size: 0.75rem;
  color: #60a5fa;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.donor-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.donor-avatar {
  width: 40px;
  height: 40px;
  background: #dbeafe;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--color-va-blue, #224192);
}

.donor-details h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--color-va-ink, #0f172a);
}

.donor-rating {
  font-size: 0.85rem;
  color: var(--color-text-muted, #475569);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.star {
  color: #fbbf24;
}
</style>
