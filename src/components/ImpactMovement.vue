<template>
  <section class="movement-section">
    <div class="container">
      <div class="visual-side">
        <div class="image-stack">
          <img src="../assets/impacto-movimiento.png" alt="Trabajador Industrial" class="img-back" />
          <img src="../assets/impacta-movimiento2.png" alt="Jóvenes Felices" class="img-front" />
          
          <div class="floating-quote">
            <p>"El apoyo que recibimos ha devuelto la esperanza. No vamos a rendirnos gracias a esta comunidad tan grande en todo Venezuela."</p>
            <span class="author">— María Gabriela, Líder comunitaria</span>
          </div>
        </div>
      </div>

      <div class="content-side">
        <h2>Impacto en <span class="highlight">Movimiento</span></h2>
        <p class="description">
          No solo validamos la urgencia, hacemos un seguimiento de los envíos. Cada petición tiene asociada un perfil de transparencia y dignidad humana.
        </p>

        <div class="features">
          <div class="feature-item">
            <div class="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div class="text">
              <h3>Rendición de Cuentas Certificada</h3>
              <p>Cada céntimo es validado mensualmente por firmas contables internacionales para proveer transparencia total.</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <div class="text">
              <h3>Entrega de Última Milla</h3>
              <p>Asociaciones con redes locales verificadas para asegurar que tu apoyo llegue a las regiones más remotas.</p>
            </div>
          </div>
        </div>

        <a href="#" class="report-link">Lee el Informe de Impacto 2024 &rarr;</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.movement-section {
  padding: 8rem 2rem;
  background-color: var(--color-bg-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 6rem;
}

.visual-side {
  flex: 1;
  position: relative;
}

.image-stack {
  position: relative;
  height: 580px;
  width: 100%;
}

.img-back {
  width: 65%;
  height: 70%;
  object-fit: cover;
  border-radius: 24px;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  z-index: 1;
}

.img-front {
  width: 65%;
  height: 70%;
  object-fit: cover;
  border-radius: 24px;
  position: absolute;
  bottom: 0;
  right: 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  z-index: 2;
  border: 10px solid var(--color-bg-light);
}

.floating-quote {
  position: absolute;
  bottom: 40px;
  left: -40px;
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 16px;
  width: 300px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  z-index: 3;
}

.floating-quote p {
  color: var(--color-text-dark);
  font-size: 0.95rem;
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.author {
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
}

.content-side {
  flex: 1;
}

h2 {
  font-size: 3rem;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.highlight {
  color: var(--color-primary);
}

.description {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-item {
  display: flex;
  gap: 1.5rem;
}

.icon {
  width: 48px;
  height: 48px;
  background-color: rgba(14, 165, 233, 0.1); /* light cyan */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0ea5e9;
  flex-shrink: 0;
}

.icon svg {
  width: 20px;
  height: 20px;
}

.text h3 {
  font-size: 1.1rem;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.text p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

.report-link {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 992px) {
  .container {
    flex-direction: column;
    gap: 4rem;
  }
  .visual-side {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .image-stack {
    height: 480px;
    max-width: 550px;
    margin: 0 auto;
  }
  .img-back {
    width: 70%;
    height: 70%;
  }
  .img-front {
    width: 75%;
    height: 70%;
  }
  .floating-quote {
    left: 5%;
    width: 90%;
    bottom: -30px;
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .movement-section {
    padding: 5rem 1.5rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  .image-stack {
    height: 400px;
  }
  .img-front {
    border-width: 6px;
  }
  .floating-quote p {
    font-size: 0.85rem;
  }
}
</style>
