<template>
  <div class="details-page">
    <MainNavbar />

    <div v-if="loading" class="state-container">
      <div class="spinner"></div>
      <p>Cargando detalles...</p>
    </div>

    <div v-else-if="post" class="content-wrapper">
      <div class="back-navigation">
        <router-link to="/peticiones" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Volver a Peticiones
        </router-link>
      </div>

      <section class="hero-section">
        <div class="hero-background">
          <div v-if="post.images && post.images.length > 0" class="image-carousel">
            <div class="carousel-track" :style="`transform: translateX(-${activeImageIndex * 100}%)`">
              <img v-for="(img, idx) in post.images" :key="idx" :src="img" class="hero-img" @click="openLightbox(img)"
                style="cursor: zoom-in" />
            </div>
            <div class="carousel-nav" v-if="post.images.length > 1">
              <button class="nav-btn prev" @click="prevImage">❮</button>
              <button class="nav-btn next" @click="nextImage">❯</button>
            </div>
          </div>
          <div v-else class="hero-placeholder">
            <div class="pattern-bg"></div>
          </div>
          <div class="hero-overlay"></div>
        </div>

        <div class="hero-content">
          <span class="badge" :class="getBadgeClass(post)">{{ getBadgeText(post) }}</span>
          <h1 class="hero-title">{{ post.title }}</h1>
          <p class="hero-subtitle">{{ truncate(post.description, 150) }}</p>
        </div>
      </section>

      <div class="layout-grid">
        <div class="left-col">
          <section class="card-section">
            <h2 class="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              Descripción de la Petición
            </h2>
            <div class="section-content text-content">
              <p>{{ post.description }}</p>
            </div>
          </section>

          <section class="card-section">
            <h2 class="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Información de Contacto
            </h2>
            <div class="contact-grid">
              <div class="contact-item">
                <span class="contact-label">Nombre</span>
                <strong class="contact-value">{{ post.contactName || 'No especificado' }}</strong>
              </div>
              <div class="contact-item">
                <span class="contact-label">Teléfono</span>
                <strong class="contact-value">{{ post.contactPhone || 'No especificado' }}</strong>
              </div>
              <div class="contact-item">
                <span class="contact-label">Preferencia</span>
                <strong class="contact-value">{{ post.contactPreference || 'Cualquiera' }}</strong>
              </div>
            </div>
          </section>

          <section class="card-section">
            <h2 class="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Ubicación y Entorno
            </h2>
            <div class="contact-grid">
              <div class="contact-item">
                <span class="contact-label">Ciudad</span>
                <strong class="contact-value">{{ post.city || 'No especificada' }}</strong>
              </div>
              <div class="contact-item">
                <span class="contact-label">Estado</span>
                <strong class="contact-value">{{ post.state || 'No especificado' }}</strong>
              </div>
              <div class="contact-item">
                <span class="contact-label">País</span>
                <strong class="contact-value">{{ post.country || 'Venezuela' }}</strong>
              </div>
            </div>
          </section>
        </div>

        <div class="right-col">
          <div class="sticky-sidebar">
            <div class="donation-card">
              <div class="donation-header">
                <div class="amount-raised">
                  <h2>{{ post.quantityFulfilled || 0 }} <span class="unit-text">recolectados</span></h2>
                  <span class="amount-goal">Meta: {{ post.quantityNeeded || 1 }} artículos</span>
                </div>
              </div>

              <div class="progress-section">
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="`width: ${calculateProgress()}%`"></div>
                </div>
                <div class="progress-stats">
                  <span>{{ post._count?.offers || 0 }} APORTES</span>
                  <span>{{ calculateProgress() }}% COMPLETADO</span>
                </div>
              </div>

              <button class="btn-primary-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Aportar Ayuda
              </button>
              <button class="btn-secondary-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                </svg>
                Compartir Causa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="state-container">
      <h2>Petición no encontrada</h2>
      <p>Esta petición no existe o ha sido eliminada.</p>
    </div>

    <div v-if="lightboxImage" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content">
        <button class="lightbox-close" @click="closeLightbox">✕</button>
        <img :src="lightboxImage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainNavbar from '../components/MainNavbar.vue';

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const activeImageIndex = ref(0);
const lightboxImage = ref(null);

const fetchPost = async () => {
  loading.value = true;
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
    const response = await fetch(`${baseUrl}/posts/${route.params.id}`);
    if (response.ok) {
      post.value = await response.json();
    } else {
      console.error('Post no encontrado');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPost();
});

const calculateProgress = () => {
  if (!post.value) return 0;
  const goal = post.value.quantityNeeded || 1;
  const fulfilled = post.value.quantityFulfilled || 0;
  return Math.min(Math.round((fulfilled / goal) * 100), 100);
};

const getBadgeText = (p) => p.urgency === 'CRITICAL' ? 'URGENTE' : 'EN CURSO';
const getBadgeClass = (p) => p.urgency === 'CRITICAL' ? 'badge-urgent' : 'badge-ongoing';
const truncate = (text, length) => text && text.length > length ? text.substring(0, length) + '...' : text;

const nextImage = () => {
  if (post.value && post.value.images) {
    activeImageIndex.value = (activeImageIndex.value + 1) % post.value.images.length;
  }
};

const prevImage = () => {
  if (post.value && post.value.images) {
    activeImageIndex.value = activeImageIndex.value === 0
      ? post.value.images.length - 1
      : activeImageIndex.value - 1;
  }
};

const openLightbox = (imgUrl) => {
  lightboxImage.value = imgUrl;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxImage.value = null;
  document.body.style.overflow = '';
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.details-page {
  min-height: 100vh;
  background-color: #f1f5f9;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  padding-bottom: 5rem;
}

.state-container {
  text-align: center;
  padding: 5rem 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #020617;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 2rem 2rem;
}

.back-navigation {
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.back-link:hover {
  color: #0f172a;
  transform: translateX(-4px);
}

.back-link svg {
  width: 18px;
  height: 18px;
}

.hero-section {
  position: relative;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 30px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: flex-end;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.image-carousel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.hero-img:hover {
  transform: scale(1.02);
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  pointer-events: none;
}

.nav-btn {
  pointer-events: auto;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #020617;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: white;
  transform: scale(1.1);
}

.hero-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  position: relative;
}

.pattern-bg {
  position: absolute;
  inset: 0;
  opacity: 0.15;
  background-image: radial-gradient(circle at 4px 4px, white 2px, transparent 0);
  background-size: 30px 30px;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.6) 40%, rgba(2, 6, 23, 0.2) 100%);
  z-index: 2;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 3;
  padding: 4rem;
  color: white;
  max-width: 900px;
}

.badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.badge-urgent {
  background-color: #fde047;
  color: #854d0e;
}

.badge-ongoing {
  background-color: #e0f2fe;
  color: #0284c7;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #f1f5f9;
  line-height: 1.6;
  font-weight: 400;
  margin: 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

/* Layout Grid */
.layout-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.card-section {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 30px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.section-title {
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #020617;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 2rem 0;
}

.section-title svg {
  width: 22px;
  height: 22px;
  color: #3b82f6;
}

.text-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
  margin: 0 0 1rem 0;
  white-space: pre-wrap;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.contact-item {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.contact-label {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.contact-value {
  display: block;
  font-size: 1.1rem;
  color: #0f172a;
  font-weight: 500;
}

.sticky-sidebar {
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.donation-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 30px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.amount-raised h2 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #020617;
  margin: 0 0 0.25rem 0;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.unit-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #475569;
}

.amount-goal {
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748b;
}

.progress-section {
  margin: 2rem 0;
}

.progress-bar-bg {
  height: 12px;
  background: #f1f5f9;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-bar-fill {
  height: 100%;
  background: #020617;
  border-radius: 999px;
  transition: width 0.5s ease;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
}

.btn-primary-large {
  width: 100%;
  background: #020617;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 1.25rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.btn-primary-large:hover {
  background: #0f172a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.3);
}

.btn-primary-large svg {
  width: 22px;
  height: 22px;
}

.btn-secondary-large {
  width: 100%;
  background: white;
  color: #020617;
  border: 2px solid #e2e8f0;
  border-radius: 999px;
  padding: 1.25rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary-large:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.btn-secondary-large svg {
  width: 20px;
  height: 20px;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(8px);
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: -3rem;
  right: -3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.lightbox-close:hover {
  background: white;
  color: #020617;
  transform: scale(1.1);
}

@media (max-width: 1024px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .hero-section {
    height: 350px;
  }

  .hero-content {
    padding: 2rem;
  }

  .lightbox-close {
    top: 1rem;
    right: 1rem;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-section {
    height: 300px;
    border-radius: 12px;
  }

  .card-section,
  .donation-card {
    padding: 1.5rem;
  }

  .content-wrapper {
    padding: 1rem;
  }
}
</style>
