<template>
  <div class="petitions-page">
    <MainNavbar />

    <div class="page-wrapper">
      <div class="hero-banner">
        <div class="hero-content">
          <h1>Directorio de Peticiones</h1>
          <p>Explora y apoya causas humanitarias verificadas. Tu contribución directa transforma vidas a través de la
            transparencia radical y la excelencia en la ayuda.</p>
        </div>
        <div class="hero-grid-bg"></div>
      </div>

      <div class="layout-container">
        <aside class="sidebar">
          <div class="sidebar-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            <h2>Filtros de Búsqueda</h2>
          </div>

          <form @submit.prevent="applyFilters" class="filters-form">
            <div class="filter-group">
              <label>PALABRA CLAVE</label>
              <input v-model="filters.search" type="text" placeholder="Buscar por título..." />
            </div>

            <div class="filter-group">
              <label>CATEGORÍA</label>
              <div class="custom-select">
                <select v-model="filters.category">
                  <option value="">Todas las categorías</option>
                  <option value="MEDICINE">Salud y Medicinas</option>
                  <option value="FOOD">Alimentación</option>
                  <option value="EDUCATION">Educación</option>
                  <option value="CLOTHING">Ropa y Calzado</option>
                  <option value="SHELTER">Refugio/Vivienda</option>
                  <option value="HYGIENE">Higiene</option>
                  <option value="OTHER">Otras necesidades</option>
                </select>
                <svg viewBox="0 0 24 24" class="select-icon">
                  <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div class="filter-group">
              <label>FECHA DE PUBLICACIÓN</label>
              <input v-model="filters.startDate" type="date" />
            </div>

            <div class="filter-group checkbox-section">
              <label>ESTADO</label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="urgencyFilters" value="CRITICAL" />
                <span class="checkmark"></span>
                Urgente
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="statusFilters" value="OPEN" />
                <span class="checkmark"></span>
                En Curso
              </label>
            </div>

            <button type="submit" class="btn-apply">Aplicar Filtros</button>
          </form>
        </aside>

        <main class="main-content">
          <div class="results-header">
            <p class="results-count">Mostrando <strong>{{ posts.length }}</strong> peticiones activas</p>
            <div class="sort-wrapper">
              <span class="sort-label">Ordenar por:</span>
              <div class="custom-select sort-select">
                <select v-model="sortBy">
                  <option value="recent">Más Recientes</option>
                  <option value="urgency">Mayor Urgencia</option>
                </select>
                <svg viewBox="0 0 24 24" class="select-icon">
                  <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div v-if="loading" class="state-container">
            <div class="spinner"></div>
            <p>Buscando...</p>
          </div>

          <div v-else-if="posts.length === 0" class="state-container">
            <p>No encontramos resultados con esos filtros.</p>
            <button class="btn-clear" @click="clearFilters">Limpiar filtros</button>
          </div>

          <div v-else class="cards-grid">
            <article v-for="post in sortedPosts" :key="post.id" class="card">
              <div class="card-img-wrapper">
                <div class="badge" :class="getBadgeClass(post)">{{ getBadgeText(post) }}</div>

                <div v-if="post.images && post.images.length > 0" class="image-carousel">
                  <div class="carousel-track" :style="`transform: translateX(-${(activeImage[post.id] || 0) * 100}%)`">
                    <img v-for="img in post.images" :key="img" :src="img" class="card-img" />
                  </div>
                  <div class="carousel-nav" v-if="post.images.length > 1">
                    <button class="nav-btn prev" @click.stop="prevImage(post.id, post.images.length)">❮</button>
                    <button class="nav-btn next" @click.stop="nextImage(post.id, post.images.length)">❯</button>
                  </div>
                  <div class="carousel-dots" v-if="post.images.length > 1">
                    <span v-for="(_, i) in post.images" :key="i" class="dot"
                      :class="{ active: (activeImage[post.id] || 0) === i }"></span>
                  </div>
                </div>

                <div v-else class="no-image-banner" :id="`export-post-${post.id}`">
                  <div class="banner-pattern"></div>
                  <div class="banner-content">
                    <div class="banner-top-space"></div>
                    <div class="banner-watermark">
                      <span></span> VENEZUELA AYUDA
                    </div>
                    <h4 class="banner-title">{{ truncate(post.title, 60) }}</h4>
                    <div class="banner-footer">
                      <div class="banner-badges">
                        <span class="category-badge">{{ post.category }}</span>
                        <span class="location-badge">{{ formatLocation(post) }}</span>
                      </div>
                      <div class="goal-badge">META: {{ post.quantityNeeded }}</div>
                    </div>
                  </div>
                  <button class="btn-download-overlay" @click.stop="downloadCard(post.id, post.title)"
                    title="Descargar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="card-body">
                <div class="location">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{{ formatLocation(post) }} • {{ formatDate(post.createdAt) }}</span>
                </div>
                <h3 class="title">{{ post.title }}</h3>
                <p class="desc">{{ truncate(post.description, 100) }}</p>

                <div class="progress-section">
                  <div class="progress-labels">
                    <span class="progress-title">Progreso</span>
                    <strong class="progress-percent" :class="getBadgeClass(post)">{{ calculateProgress(post)
                      }}%</strong>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :class="getBadgeClass(post)"
                      :style="`width: ${calculateProgress(post)}%`"></div>
                  </div>
                </div>

                <div class="card-footer">
                  <div class="meta-info">
                    <span class="meta-label">REQUERIDO</span>
                    <strong class="meta-value">{{ post.quantityNeeded }}</strong>
                  </div>
                  <button class="btn-details" @click="router.push(`/peticiones/${post.id}`)">Ver Detalles</button>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
    </div>

    <div v-if="exportPostData" class="ig-export-wrapper">
      <div id="instagram-export-template" class="ig-export-container">
        <div class="ig-pattern"></div>
        <div class="ig-content">
          <div class="ig-header">
            <div class="ig-watermark">
              <span></span> VENEZUELA AYUDA
            </div>
            <div class="ig-category">{{ exportPostData.category }}</div>
          </div>
          <h2 class="ig-title">{{ exportPostData.title }}</h2>
          <p class="ig-desc">{{ truncate(exportPostData.description, 350) }}</p>
          <div class="ig-footer">
            <div class="ig-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {{ formatLocation(exportPostData) }}
            </div>
            <div class="ig-goal">META: {{ exportPostData.quantityNeeded }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import MainNavbar from '../components/MainNavbar.vue';
import { getPosts } from '../services/posts';
import html2canvas from 'html2canvas';

const router = useRouter();
const loading = ref(true);
const posts = ref([]);
const activeImage = ref({});
const exportPostData = ref(null);
const sortBy = ref('recent');

const filters = ref({
  search: '',
  category: '',
  startDate: '',
});
const urgencyFilters = ref([]);
const statusFilters = ref([]);

const fetchPosts = async () => {
  loading.value = true;
  try {
    // Si tienen checks seleccionados, los usamos. Si no, traemos todo.
    // Esto es un acercamiento básico a los checkboxes en el frontend.
    const apiFilters = {
      search: filters.value.search,
      category: filters.value.category,
      startDate: filters.value.startDate,
      urgency: urgencyFilters.value.length > 0 ? urgencyFilters.value[0] : '', // Simulado
    };

    let data = await getPosts(apiFilters);

    // Filtrado en memoria para las combinaciones complejas de checkboxes
    if (urgencyFilters.value.length > 0) {
      data = data.filter(p => urgencyFilters.value.includes(p.urgency));
    }

    posts.value = data;

    data.forEach(p => {
      if (p.images && p.images.length > 0) {
        activeImage.value[p.id] = 0;
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    loading.value = false;
  }
};

const nextImage = (postId, max) => {
  if (activeImage.value[postId] < max - 1) activeImage.value[postId]++;
  else activeImage.value[postId] = 0;
};

const prevImage = (postId, max) => {
  if (activeImage.value[postId] > 0) activeImage.value[postId]--;
  else activeImage.value[postId] = max - 1;
};

const downloadCard = async (postId, title) => {
  const post = posts.value.find(p => p.id === postId);
  if (!post) return;

  exportPostData.value = post;
  await nextTick();

  // Breve pausa para asegurar que el DOM del template oculto se renderizó y cargó estilos
  await new Promise(resolve => setTimeout(resolve, 150));

  const element = document.getElementById('instagram-export-template');
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 1,
      width: 1080,
      height: 1080,
      backgroundColor: '#0f172a',
      useCORS: true
    });
    const link = document.createElement('a');
    link.download = `VzlaAyuda_${title.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Error generating 1080x1080 image:', err);
  } finally {
    exportPostData.value = null;
  }
};

const applyFilters = () => {
  fetchPosts();
};

const clearFilters = () => {
  filters.value = { search: '', category: '', startDate: '' };
  urgencyFilters.value = [];
  statusFilters.value = [];
  fetchPosts();
};

const formatLocation = (post) => {
  const city = post.city || 'Venezuela';
  const country = post.country || '';
  return country ? `${city}, ${country}`.toUpperCase() : city.toUpperCase();
};

const formatDate = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' });
};

const sortedPosts = computed(() => {
  let result = [...posts.value];
  if (sortBy.value === 'recent') {
    result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } else if (sortBy.value === 'urgency') {
    const uMap = { 'CRITICAL': 3, 'HIGH': 2, 'MEDIUM': 1, 'LOW': 0 };
    result.sort((a, b) => {
      const aVal = uMap[a.urgency] || 0;
      const bVal = uMap[b.urgency] || 0;
      if (bVal !== aVal) return bVal - aVal;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }
  return result;
});

const truncate = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Simulamos el progreso con la cantidad de ofertas versus la meta. Si no hay aportes, es 0%.
const calculateProgress = (post) => {
  if (!post._count || !post._count.offers) return 0;
  const goal = post.quantityNeeded || 100;
  const progress = Math.min(Math.round((post._count.offers / goal) * 100), 100);
  return progress;
};

const getBadgeText = (post) => {
  if (post.urgency === 'CRITICAL') return 'URGENTE';
  return 'EN CURSO';
};

const getBadgeClass = (post) => {
  if (post.urgency === 'CRITICAL') return 'badge-urgent';
  return 'badge-ongoing';
};

const formatCurrency = (val) => {
  if (!val) return '$0';
  // Solo como ejemplo visual
  return '$' + Number(val).toLocaleString('en-US');
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.petitions-page {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  padding-bottom: 5rem;
}

.page-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-banner {
  background-color: #020617;
  border-radius: 12px;
  margin: 2rem 0;
  padding: 4.5rem 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(2, 6, 23, 0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

.hero-content h1 {
  font-size: 2.8rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem 0;
  letter-spacing: -0.03em;
}

.hero-content p {
  font-size: 1.05rem;
  color: #bfdbfe;
  line-height: 1.6;
  margin: 0;
  max-width: 90%;
}

.hero-grid-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center;
  mask-image: radial-gradient(ellipse at right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%);
  z-index: 1;
}

.layout-container {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 2rem;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.sidebar-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #020617;
  margin: 0;
}

.filters-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-group input[type="text"],
.filter-group input[type="date"],
.custom-select select {
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s;
  appearance: none;
}

.filter-group input:focus,
.custom-select select:focus {
  border-color: #020617;
  background-color: #ffffff;
}

.custom-select {
  position: relative;
}

.select-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #64748b;
  pointer-events: none;
}

.checkbox-section {
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 0.9rem !important;
  font-weight: 500 !important;
  color: #334155 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  user-select: none;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  transition: all 0.2s;
}

.checkbox-label:hover input~.checkmark {
  background-color: #f1f5f9;
}

.checkbox-label input:checked~.checkmark {
  background-color: #020617;
  border-color: #020617;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label input:checked~.checkmark:after {
  display: block;
}

.btn-apply {
  background-color: #020617;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.9rem;
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-apply:hover {
  background-color: #0f172a;
}

.main-content {
  flex: 1;
  min-width: 0;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.results-count {
  font-size: 0.95rem;
  color: #475569;
  margin: 0;
}

.results-count strong {
  color: #020617;
}

.sort-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sort-label {
  font-size: 0.9rem;
  color: #64748b;
}

.sort-select select {
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: none;
  background: transparent;
  font-weight: 600;
  color: #020617;
  font-size: 0.95rem;
  cursor: pointer;
  outline: none;
}

.sort-select .select-icon {
  right: 0.5rem;
  color: #020617;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
}

.card-img-wrapper {
  height: 220px;
  position: relative;
  background: #f1f5f9;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-img-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
}

.badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  z-index: 10;
}

.badge-urgent {
  background-color: #fde047;
  color: #854d0e;
}

.badge-ongoing {
  background-color: #e0f2fe;
  color: #0284c7;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #020617;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.location svg {
  width: 14px;
  height: 14px;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0f172a;
  line-height: 1.3;
  margin: 0 0 0.75rem 0;
}

.desc {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.progress-section {
  margin-bottom: 1.5rem;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #475569;
}

.progress-percent {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

.progress-percent.badge-urgent {
  background-color: #fef08a;
  color: #a16207;
}

.progress-percent.badge-ongoing {
  background-color: #e0f2fe;
  color: #0369a1;
}

.progress-bar-bg {
  width: 100%;
  height: 8px;
  background-color: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-bar-fill.badge-urgent {
  background-color: #ca8a04;
}

.progress-bar-fill.badge-ongoing {
  background-color: #0284c7;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

.meta-info {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}

.meta-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
}

.btn-details {
  background-color: #f8fafc;
  color: #020617;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-details:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
}

.state-container {
  text-align: center;
  padding: 4rem 2rem;
}

.btn-clear {
  margin-top: 1rem;
  background: #020617;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

@media (max-width: 900px) {
  .layout-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    gap: 1rem;
  }
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
  transition: transform 0.3s ease-in-out;
}

.carousel-track .card-img {
  min-width: 100%;
  object-fit: cover;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  pointer-events: none;
  z-index: 5;
}

.nav-btn {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #020617;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
}

.nav-btn:hover {
  background: white;
}

.carousel-dots {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 5;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: 0.3s;
}

.dot.active {
  background: white;
  transform: scale(1.2);
}

.no-image-banner {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  color: white;
}

.banner-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.15;
  background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
  background-size: 20px 20px;
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
}

.banner-top-space {
  height: 1.5rem;
}

.banner-watermark {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #60a5fa;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.5rem;
}

.banner-watermark span {
  width: 6px;
  height: 6px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 8px #3b82f6;
}

.banner-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  color: #ffffff;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.banner-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.category-badge,
.location-badge {
  font-size: 0.65rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  color: #e2e8f0;
}

.goal-badge {
  align-self: flex-start;
  font-size: 0.75rem;
  font-weight: 600;
  color: #0f172a;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
}

.btn-download-overlay {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: #ffffff;
  color: #020617;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(10px);
}

.card-img-wrapper:hover .btn-download-overlay {
  opacity: 1;
  transform: translateY(0);
}

.btn-download-overlay:hover {
  transform: scale(1.1);
  background: #f1f5f9;
}

.btn-download-overlay svg {
  width: 16px;
  height: 16px;
}

.ig-export-wrapper {
  position: fixed;
  left: -9999px;
  top: -9999px;
}

.ig-export-container {
  width: 1080px;
  height: 1080px;
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  position: relative;
  display: flex;
  color: white;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.ig-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: radial-gradient(circle at 4px 4px, white 2px, transparent 0);
  background-size: 40px 40px;
  z-index: 1;
}

.ig-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 6rem;
  width: 100%;
  height: 100%;
}

.ig-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}

.ig-watermark {
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #60a5fa;
  display: flex;
  align-items: center;
  gap: 16px;
}

.ig-watermark span {
  width: 16px;
  height: 16px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 20px #3b82f6;
}

.ig-category {
  font-size: 1.5rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  text-transform: uppercase;
  color: #e2e8f0;
}

.ig-title {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.15;
  margin: 0 0 3rem 0;
  color: #ffffff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ig-desc {
  font-size: 2.2rem;
  line-height: 1.5;
  color: #cbd5e1;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ig-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 4rem;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
}

.ig-location {
  font-size: 2.2rem;
  font-weight: 700;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.ig-location svg {
  width: 40px;
  height: 40px;
  color: #60a5fa;
}

.ig-goal {
  font-size: 2.5rem;
  font-weight: 600;
  color: #020617;
  background: #fde047;
  padding: 1rem 3rem;
  border-radius: 999px;
  box-shadow: 0 8px 30px rgba(253, 224, 71, 0.3);
}
</style>
