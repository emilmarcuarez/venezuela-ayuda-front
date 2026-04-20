<template>
  <section class="hero-section">
    <div class="hero-bg">
      <img src="../assets/header.jpg" alt="Hero Background" class="bg-img" />
      <div class="bg-overlay"></div>
    </div>

    <div class="glass-panel-bg"></div>

    <div class="hero-container">
      <div class="hero-content">
        <div class="text-wrapper">
          <span class="badge premium-badge">
            <span class="dot"></span> ÚNETE A LA ACCIÓN
          </span>

          <h1 class="professional-title">
            Empoderando la <br />
            <span class="text-blue">Transparencia</span> en la<br />
            Ayuda Humanitaria.
          </h1>

          <p class="professional-desc">
            Una conexión solidaria directa entre la generosidad global y las necesidades locales en Venezuela. Cerrando
            la brecha con dignidad y eficiencia.
          </p>

          <div class="hero-actions">
            <button class="btn btn-primary">Donar Ahora</button>
            <button class="btn btn-secondary">Pedir Ayuda</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  background-color: #020617;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center right;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, rgba(2, 6, 23, 0.1) 0%, rgba(2, 6, 23, 0.4) 100%);
}

.glass-panel-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 65vw;
  height: 100vh;
  background: linear-gradient(to right, rgba(10, 15, 30, 0.8) 0%, rgba(10, 15, 30, 0.5) 60%, transparent 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  -webkit-mask-image: linear-gradient(to right, black 0%, black 75%, transparent 100%);
  mask-image: linear-gradient(to right, black 0%, black 75%, transparent 100%);
  z-index: 5;
}

.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
}

.hero-content {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4rem;
}

.text-wrapper {
  max-width: 600px;
  margin-top: 2rem;
}

.premium-badge {
  display: inline-flex;
  align-items: center;
  color: #38bdf8;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  background: rgba(14, 165, 233, 0.05);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid rgba(56, 189, 248, 0.2);
  margin-bottom: 2rem;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #38bdf8;
  border-radius: 50%;
  margin-right: 10px;
}

.professional-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 1.8rem;
  letter-spacing: -0.02em;
}

.text-blue {
  color: #0ea5e9;
}

.professional-desc {
  font-size: 1.15rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 550px;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  gap: 1.2rem;
}

.btn {
  padding: 0.85rem 2.2rem;
  border-radius: 6px;
  font-family: inherit;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background-color: #0ea5e9;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0284c7;
}

.btn-secondary {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}

@media (max-width: 1400px) {
  .professional-title {
    font-size: 4rem;
  }

  .glass-panel-bg {
    width: 55vw;
  }

  .hero-content {
    width: 55%;
    padding: 0 4rem;
  }
}

@media (max-width: 1200px) {
  .professional-title {
    font-size: 3.3rem;
  }

  .glass-panel-bg {
    width: 60vw;
  }

  .hero-content {
    width: 60%;
    padding: 0 3rem;
  }
}

@media (max-width: 992px) {

  .glass-panel-bg {
    width: 100vw;
    background: rgba(10, 15, 30, 0.85);
    border-right: none;
  }

  .hero-content {
    width: 100%;
    justify-content: center;
    padding: 0 3rem;
  }

  .text-wrapper {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 2rem;
  }

  .professional-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .professional-desc {
    font-size: 1rem;
    margin-bottom: 1.8rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
