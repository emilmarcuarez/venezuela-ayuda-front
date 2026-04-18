<template>
  <section class="petitions-section">
    <div class="container">
      <div class="section-header">
        <h2>Peticiones de Impacto Directo</h2>
        <p>Cada aporte conecta a una historia real de necesidad. Hoy, tu ayuda detendrá la crisis en los centros más vulnerables.</p>
      </div>

      <div class="petitions-grid">
        <!-- Petition 1 -->
        <div class="petition-card card-blue" :class="{ 'fade-in': isVisible }">
          <div class="image-wrapper">
            <div class="image-overlay"></div>
            <span class="tag bg-blue">Urgente</span>
            <img src="../assets/educacion-zulia.png" alt="Educación en Zulia" />
          </div>
          <div class="card-content">
            <h3>Educación Digna en Zulia</h3>
            <p>Proveyendo el material básico para 300 niños en comunidades del norte del Zulia.</p>
            
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress bg-blue" :style="{ width: isVisible ? '45%' : '0%' }"></div>
              </div>
              <div class="progress-stats">
                <span class="raised text-blue">$4,500 recaudados</span>
                <span class="goal">de $10,000</span>
              </div>
            </div>

            <button class="btn btn-light hover-blue">
              Apoyar Proyecto <span class="arrow">&rarr;</span>
            </button>
          </div>
        </div>

        <!-- Petition 2 -->
        <div class="petition-card card-red" :class="{ 'fade-in': isVisible }" style="transition-delay: 100ms;">
          <div class="image-wrapper">
            <div class="image-overlay"></div>
            <span class="tag bg-red">Crítico</span>
            <img src="../assets/medico-valencia.png" alt="Suministro Médico en Valencia" />
          </div>
          <div class="card-content">
            <h3>Suministro Médico en Valencia</h3>
            <p>Envío de analgésicos e insumos médicos para el Hospital Central regional.</p>
            
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress bg-red" :style="{ width: isVisible ? '65%' : '0%' }"></div>
              </div>
              <div class="progress-stats">
                <span class="raised text-red">$13,000 recaudados</span>
                <span class="goal">de $20,000</span>
              </div>
            </div>

            <button class="btn btn-light hover-red">
              Apoyar Proyecto <span class="arrow">&rarr;</span>
            </button>
          </div>
        </div>

        <!-- Petition 3 -->
        <div class="petition-card card-yellow" :class="{ 'fade-in': isVisible }" style="transition-delay: 200ms;">
          <div class="image-wrapper">
            <div class="image-overlay"></div>
            <span class="tag bg-yellow">En Curso</span>
            <img src="../assets/comedores-petare.png" alt="Comedores Petare" />
          </div>
          <div class="card-content">
            <h3>Comedores de Petare</h3>
            <p>Gestión alimentaria de tres comedores infantiles que atienden al barrio de Petare.</p>
            
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress bg-yellow" :style="{ width: isVisible ? '80%' : '0%' }"></div>
              </div>
              <div class="progress-stats">
                <span class="raised text-yellow">$8,000 recaudados</span>
                <span class="goal">de $10,000</span>
              </div>
            </div>

            <button class="btn btn-light hover-yellow">
              Apoyar Proyecto <span class="arrow">&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Expanded "Ver Más" section -->
      <div class="load-more-container">
        <div class="divider"></div>
        <button class="btn-load-more" @click="handleSeeMore">
          Ver todas las peticiones
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sparkle-icon">
            <path d="M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z"></path>
          </svg>
        </button>
        <div class="divider"></div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  // A simple trick to trigger the animation slightly after the component mounts
  setTimeout(() => {
    isVisible.value = true;
  }, 150);
});

const handleSeeMore = () => {
  alert("Aquí se expandiría la lista cargando datos desde tu backend. ¡Próximamente!");
};
</script>

<style scoped>
.petitions-section {
  padding: 6rem 2rem;
  background-color: var(--color-bg-light);
  background-image: radial-gradient(circle at 10% 20%, rgba(59, 89, 152, 0.03) 0%, transparent 40%),
                    radial-gradient(circle at 90% 80%, rgba(217, 119, 6, 0.03) 0%, transparent 40%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-header p {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.petitions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  perspective: 1000px;
}

/* Card Styling */
.petition-card {
  background-color: var(--color-white);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.petition-card.fade-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.petition-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.1);
}

.card-blue:hover { box-shadow: 0 25px 50px rgba(59, 89, 152, 0.15); border-color: rgba(59, 89, 152, 0.1); }
.card-red:hover { box-shadow: 0 25px 50px rgba(225, 29, 72, 0.15); border-color: rgba(225, 29, 72, 0.1); }
.card-yellow:hover { box-shadow: 0 25px 50px rgba(217, 119, 6, 0.15); border-color: rgba(217, 119, 6, 0.1); }

.image-wrapper {
  position: relative;
  height: 240px;
  width: 100%;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 100%);
  z-index: 1;
  transition: opacity 0.3s ease;
}

.petition-card:hover .image-overlay {
  opacity: 0.5;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  z-index: 0;
}

.petition-card:hover .image-wrapper img {
  transform: scale(1.1) rotate(1deg);
}

.tag {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  color: var(--color-white);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  letter-spacing: 0.05em;
}

.bg-blue { background-color: var(--color-primary); }
.bg-red { background-color: #e11d48; }
.bg-yellow { background-color: #d97706; }

.card-content {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--color-white);
  z-index: 2;
  position: relative;
}

h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
}

p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex: 1;
}

.progress-container {
  margin-bottom: 2rem;
}

.progress-bar {
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}

.progress {
  height: 100%;
  border-radius: 4px;
  transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
}

/* Add an animated striped sheer effect to the progress bar */
.progress::after {
  content: "";
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background-image: linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent);
  background-size: 1rem 1rem;
  animation: moveStripes 1s linear infinite;
}

@keyframes moveStripes {
  0% { background-position: 0 0; }
  100% { background-position: 1rem 0; }
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: 700;
}

.text-blue { color: var(--color-primary); }
.text-red { color: #e11d48; }
.text-yellow { color: #d97706; }

.goal {
  color: #64748b;
  font-weight: 600;
}

.btn {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.arrow {
  transition: transform 0.3s ease;
}

.petition-card:hover .btn .arrow {
  transform: translateX(4px);
}

.btn-light { background-color: #f8fafc; color: var(--color-text-dark); border: 1px solid #e2e8f0; }
.hover-blue:hover { background-color: var(--color-primary); color: var(--color-white); border-color: var(--color-primary); box-shadow: 0 4px 12px rgba(59, 89, 152, 0.3); }
.hover-red:hover { background-color: #e11d48; color: var(--color-white); border-color: #e11d48; box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3); }
.hover-yellow:hover { background-color: #d97706; color: var(--color-white); border-color: #d97706; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3); }

/* Load More Section */
.load-more-container {
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
  flex: 1;
  opacity: 0.5;
}

.btn-load-more {
  background-color: var(--color-white);
  color: var(--color-text-dark);
  font-family: var(--font-family);
  font-size: 1.1rem;
  font-weight: 700;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-load-more::before {
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
  transition: left 0.5s ease;
  z-index: 1;
}

.btn-load-more:hover::before {
  left: 100%;
}

.btn-load-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.sparkle-icon {
  width: 20px;
  height: 20px;
  color: var(--color-yellow);
  z-index: 2;
  position: relative;
  transition: transform 0.5s ease;
}

.btn-load-more:hover .sparkle-icon {
  transform: rotate(180deg) scale(1.2);
}

@media (max-width: 992px) {
  .petitions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .petitions-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .load-more-container {
    flex-direction: column;
    gap: 1rem;
  }
  .divider {
    display: none;
  }
}
</style>
