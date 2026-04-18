<template>
  <section class="hero-section hero-banner">
    <!-- Efecto tenue de profundidad -->
    <div class="bg-glow blob-1"></div>

    <div class="hero-container">
      <div class="hero-content-wrapper">
        <div class="hero-content">
          <span class="badge">ÚNETE A LA ACCIÓN</span>
          <h1 class="title">
            Empoderando la <span class="highlight">Transparencia</span> en la Ayuda Humanitaria.
          </h1>
          <p class="description">
            Una conexión solidaria directa entre la generosidad global y las necesidades locales en Venezuela. Cerrando la brecha con dignidad y eficiencia.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary">Donar Ahora</button>
            <button class="btn btn-secondary">Pedir Ayuda</button>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="image-wrapper-3d">
            <div class="image-container">
              <img src="../assets/header.jpg" alt="Hero Illustration" />
            </div>
            <div class="floating-badge">
              <div class="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <div class="badge-text">
                <span class="count">12.4K</span>
                <span class="label">Vidas Impactadas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position: relative;
}

.hero-banner {
  position: relative;
  background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #172554 100%);
  border-radius: 0;
  padding: 9rem 4rem 11rem;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.hero-container {
  max-width: 1400px; /* Increased from 1200px for larger spread */
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  pointer-events: none;
}

.blob-1 {
  width: 500px;
  height: 500px;
  background-color: rgba(96, 165, 250, 0.4); /* vivid cyan/blue */
  top: -150px;
  left: -150px;
  opacity: 0.8;
}

.blob-2 {
  width: 600px;
  height: 600px;
  background-color: rgba(139, 92, 246, 0.3); /* vivid purple */
  bottom: -200px;
  right: -100px;
  opacity: 0.8;
}

.hero-content-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.hero-content {
  flex: 1;
}

.badge {
  display: inline-flex;
  align-items: center;
  background-color: rgba(14, 165, 233, 0.1); 
  color: #38bdf8;
  padding: 0.5rem 1.25rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.title {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  max-width: 700px;
}

.highlight {
  background: linear-gradient(135deg, #38bdf8, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #38bdf8;
}

.description {
  font-size: 1.15rem;
  color: #94a3b8;
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
  padding: 1rem 2.2rem;
  border-radius: 9999px;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;
}

.btn-primary {
  background-color: #0ea5e9;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0284c7;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.hero-visual {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
}

.image-wrapper-3d {
  position: relative;
  width: 100%;
  max-width: 650px;
  perspective: 1200px;
}

.image-container {
  width: 100%;
  position: relative;
  border-radius: 20px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255,255,255,0.05); /* Professional clean shadow, no glow */
  transform: rotate(-1.5deg) translateY(0);
  animation: floatImg 8s ease-in-out infinite;
  overflow: hidden;
  aspect-ratio: 16/10;
  background-color: #020617;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.image-wrapper-3d:hover .image-container img {
  transform: scale(1.05);
}

@keyframes floatImg {
  0% { transform: translateY(0px) rotate(-1.5deg); }
  50% { transform: translateY(-15px) rotate(-0.5deg); }
  100% { transform: translateY(0px) rotate(-1.5deg); }
}

.floating-badge {
  position: absolute;
  bottom: -30px;
  left: -40px;
  background: rgba(15, 23, 42, 0.85); 
  backdrop-filter: blur(12px);
  padding: 1.25rem 2rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05);
  animation: floatBadge 6s ease-in-out infinite;
  animation-delay: 1.2s;
  z-index: 20;
}

@keyframes floatBadge {
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-12px) scale(1.03); }
  100% { transform: translateY(0px) scale(1); }
}

.icon-circle {
  width: 44px;
  height: 44px;
  background-color: #0ea5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
}

.icon-circle svg {
  width: 20px;
  height: 20px;
}

.badge-text {
  display: flex;
  flex-direction: column;
}

.count {
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
}

.label {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 1400px) {
  .title { font-size: 4rem; }
  .image-wrapper-3d { max-width: 550px; }
  .hero-banner { padding: 6rem 2rem 8rem; }
}

@media (max-width: 992px) {
  .hero-content-wrapper {
    flex-direction: column;
    text-align: center;
    gap: 4rem;
  }
  .title {
    max-width: 100%;
  }
  .description {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-banner {
    padding: 5rem 2rem 8rem;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.8rem;
  }
  .description {
    font-size: 1rem;
  }
  .image-wrapper-3d {
    max-width: 100%;
  }
  .floating-badge {
    left: 50%;
    bottom: -40px;
    width: max-content;
    padding: 1rem 1.5rem;
    animation: floatBadgeMobile 6s ease-in-out infinite;
  }

  @keyframes floatBadgeMobile {
    0% { transform: translate(-50%, 0px); }
    50% { transform: translate(-50%, -10px); }
    100% { transform: translate(-50%, 0px); }
  }

  .btn {
    width: 100%;
    padding: 1rem;
  }
  .hero-actions {
    flex-direction: column;
  }
}
</style>
