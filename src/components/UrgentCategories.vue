<template>
  <section class="categories-section">
    <div class="container">
      <div class="section-header">
        <div class="header-text">
          <h2>Categorías Urgentes</h2>
          <p>Encuentra áreas temáticas específicas donde tu aporte hace la diferencia de inmediato.</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary">Descubrir</button>
          <button class="btn btn-outline">Saber</button>
        </div>
      </div>

      <div class="categories-grid">
        <!-- Card 1 -->
        <div class="cat-card large">
          <div class="icon-wrapper yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
          </div>
          <h3>Seguridad Alimentaria</h3>
          <p>Plan de necesidades específicas para combatir el impacto en todo Venezuela.</p>
          <a href="#" class="explore-link">Explorar Necesidades &rarr;</a>
        </div>

        <div class="middle-col">
          <!-- Card 2 -->
          <div class="cat-card small">
            <span class="danger-tag">En Peligro</span>
            <h3>Salud Física</h3>
            <p>Financiar necesidades específicas sobre el impacto en infraestructura.</p>
          </div>
          <!-- Card 3 -->
          <div class="cat-card small bg-primary">
            <h3>Salud Mental</h3>
            <p>Apoyo psicológico en colegios, hospitales o comunidades locales.</p>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="cat-card tall">
          <h3>Agua</h3>
          <p>Recuperar infraestructuras comunitarias para que poblaciones afectadas tengan agua purificada.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.categories-section {
  padding: 5rem 2rem;
  background-color: var(--color-bg-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}

.header-text h2 {
  font-size: 2.5rem;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.header-text p {
  color: var(--color-text-muted);
  max-width: 500px;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-outline {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-text-dark);
}

.categories-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 1.5rem;
}

.cat-card {
  background-color: var(--color-white);
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  transition: transform 0.2s;
}

.cat-card:hover {
  transform: translateY(-5px);
}

.middle-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cat-card.small {
  padding: 1.5rem;
  flex: 1;
}

.cat-card.bg-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.cat-card.bg-primary h3, .cat-card.bg-primary p {
  color: var(--color-white);
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.icon-wrapper.yellow {
  background-color: rgba(255, 215, 0, 0.2);
  color: #b8860b;
}

.icon-wrapper svg {
  width: 24px;
  height: 24px;
}

.danger-tag {
  background-color: #ffe4e6;
  color: #e11d48;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  width: fit-content;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
}

p {
  color: var(--color-text-muted);
  line-height: 1.5;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.explore-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: auto;
}

@media (max-width: 992px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}
</style>
