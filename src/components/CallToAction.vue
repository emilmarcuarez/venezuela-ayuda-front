<template>
  <section class="cta-section">
    <div class="container">
      <div class="cta-box">
        <h2>Sé el cambio que Venezuela necesita.</h2>
        <p>
          Únete a un movimiento global de transparencia radical e impacto inmediato. Tu contribución cambia vidas hoy.
        </p>
        <div class="cta-actions">
          <button class="btn btn-light">Empezar a Donar</button>
          <button class="btn btn-outline-light">Solicitar Ayuda</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 4rem 2rem 8rem 2rem;
  background-color: var(--color-bg-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.cta-box {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-bg-dark) 100%);
  border-radius: 24px;
  padding: 5rem 3rem;
  text-align: center;
  color: var(--color-white);
}

h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 3rem auto;
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-light {
  background-color: var(--color-white);
  color: var(--color-primary);
}

.btn-light:hover {
  background-color: #f0f4f8;
}

.btn-outline-light {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--color-white);
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .cta-box {
    padding: 3rem 1.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  .cta-actions {
    flex-direction: column;
  }
}
</style>
