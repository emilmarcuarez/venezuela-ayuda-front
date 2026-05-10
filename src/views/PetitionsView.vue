<template>
  <div class="petitions-page">
    <MainNavbar />

    <main class="petitions-shell">
      <form class="search-band" @submit.prevent="applyFilters" role="search" aria-label="Buscar peticiones">
        <div class="search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
          </svg>
          <input v-model="filters.search" type="text" placeholder="Buscar peticiones o causas humanitarias..." />
          <button type="submit" aria-label="Buscar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
            </svg>
          </button>
        </div>
      </form>

      <section class="control-row" aria-label="Filtros de peticiones">
        <div class="category-chips">
          <button
            v-for="category in visibleCategories"
            :key="category.value"
            type="button"
            class="category-chip"
            :class="{ active: filters.category === category.value }"
            @click="setCategory(category.value)"
          >
            {{ category.label }}
          </button>
        </div>

        <div class="compact-controls">
          <label class="select-control">
            <span>Categoría</span>
            <select v-model="filters.category" @change="applyFilters">
              <option value="">Todas</option>
              <option value="MEDICINE">Salud</option>
              <option value="FOOD">Alimentos</option>
              <option value="EDUCATION">Educación</option>
              <option value="CLOTHING">Ropa</option>
              <option value="SHELTER">Refugio</option>
              <option value="HYGIENE">Higiene</option>
              <option value="OTHER">Otros</option>
            </select>
          </label>

          <label class="select-control">
            <span>Orden</span>
            <select v-model="sortBy">
              <option value="recent">Más recientes</option>
              <option value="urgency">Mayor urgencia</option>
            </select>
          </label>

          <button type="button" class="clear-button" @click="clearFilters">Limpiar</button>
        </div>
      </section>

      <section class="results-summary" aria-live="polite">
        <p>
          <strong>{{ sortedPosts.length }}</strong> peticiones verificadas
          <span v-if="urgentCount">• {{ urgentCount }} urgentes</span>
        </p>
      </section>

      <section v-if="loading" class="cards-grid" aria-label="Cargando peticiones">
        <article v-for="item in 8" :key="item" class="petition-card skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-body">
            <span></span>
            <strong></strong>
            <p></p>
            <small></small>
          </div>
        </article>
      </section>

      <section v-else-if="errorMessage" class="state-panel error-state">
        <span>No se pudo cargar</span>
        <h1>Directorio temporalmente fuera de línea</h1>
        <p>{{ errorMessage }}</p>
        <button type="button" @click="fetchPosts">Reintentar</button>
      </section>

      <section v-else-if="sortedPosts.length === 0" class="state-panel">
        <span>Sin resultados</span>
        <h1>No encontramos peticiones con esos filtros</h1>
        <p>Prueba con otra palabra, categoría o limpia filtros para ver todas las causas.</p>
        <button type="button" @click="clearFilters">Limpiar filtros</button>
      </section>

      <section v-else class="cards-grid" aria-label="Peticiones verificadas">
        <article v-for="post in sortedPosts" :key="post.id" class="petition-card">
          <div class="card-media">
            <span class="verified-badge">Verificada</span>

            <div v-if="post.images?.length" class="image-carousel">
              <div class="carousel-track" :style="`transform: translateX(-${(activeImage[post.id] || 0) * 100}%)`">
                <img v-for="img in post.images" :key="img" :src="img" :alt="post.title" class="card-img" />
              </div>

              <div class="carousel-nav" v-if="post.images.length > 1">
                <button type="button" @click.stop="prevImage(post.id, post.images.length)" aria-label="Imagen anterior">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button type="button" @click.stop="nextImage(post.id, post.images.length)" aria-label="Imagen siguiente">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            </div>

            <div v-else class="no-image-banner" :id="`export-post-${post.id}`">
              <div class="banner-pattern"></div>
              <div class="banner-content">
                <span>Venezuela Ayuda</span>
                <strong>{{ truncate(post.title, 70) }}</strong>
                <small>{{ formatCategory(post.category) }}</small>
              </div>

              <button
                type="button"
                class="download-button"
                @click.stop="downloadCard(post.id, post.title)"
                aria-label="Descargar pieza para Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </button>
            </div>
          </div>

          <div class="card-body">
            <h2>{{ post.title }}</h2>
            <p class="location-line">{{ formatLocation(post) }} • {{ formatDate(post.createdAt) }}</p>

            <div class="progress-row">
              <div class="progress-track" :aria-label="`Progreso ${calculateProgress(post)} por ciento`">
                <span :class="getProgressClass(post)" :style="`width: ${calculateProgress(post)}%`"></span>
              </div>
              <button type="button" class="details-button" @click="goToDetails(post.id)">Ver Detalles</button>
            </div>

            <div class="meta-row">
              <span>{{ calculateProgress(post) }}%</span>
              <span>Requerido: {{ post.quantityNeeded || 'Por definir' }}</span>
            </div>
          </div>
        </article>
      </section>
    </main>

    <div v-if="exportPostData" class="ig-export-wrapper">
      <div id="instagram-export-template" class="ig-export-container">
        <div class="ig-pattern"></div>
        <div class="ig-content">
          <div class="ig-header">
            <div class="ig-watermark"><span></span> VENEZUELA AYUDA</div>
            <div class="ig-category">{{ formatCategory(exportPostData.category) }}</div>
          </div>
          <h2 class="ig-title">{{ exportPostData.title }}</h2>
          <p class="ig-desc">{{ truncate(exportPostData.description, 350) }}</p>
          <div class="ig-footer">
            <div class="ig-location">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path d="M19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {{ formatLocation(exportPostData) }}
            </div>
            <div class="ig-goal">META: {{ exportPostData.quantityNeeded || 'POR DEFINIR' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import html2canvas from 'html2canvas';
import MainNavbar from '../components/MainNavbar.vue';
import { getPosts } from '../services/posts';

const router = useRouter();
const loading = ref(true);
const errorMessage = ref('');
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

const categoryLabels = {
  MEDICINE: 'Salud',
  FOOD: 'Alimentos',
  EDUCATION: 'Educación',
  CLOTHING: 'Ropa',
  SHELTER: 'Refugio',
  HYGIENE: 'Higiene',
  OTHER: 'Otros',
};

const visibleCategories = [
  { value: '', label: 'Todas' },
  { value: 'MEDICINE', label: 'Salud' },
  { value: 'FOOD', label: 'Alimentos' },
  { value: 'EDUCATION', label: 'Educación' },
  { value: 'CLOTHING', label: 'Ropa' },
  { value: 'HYGIENE', label: 'Higiene' },
];

const fetchPosts = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const apiFilters = {
      search: filters.value.search,
      category: filters.value.category,
      startDate: filters.value.startDate,
      urgency: urgencyFilters.value.length > 0 ? urgencyFilters.value[0] : '',
    };

    let data = await getPosts(apiFilters);

    if (urgencyFilters.value.length > 0) {
      data = data.filter((post) => urgencyFilters.value.includes(post.urgency));
    }

    if (statusFilters.value.length > 0) {
      data = data.filter((post) => !post.status || statusFilters.value.includes(post.status));
    }

    posts.value = data;
    activeImage.value = {};

    data.forEach((post) => {
      if (post.images?.length) {
        activeImage.value[post.id] = 0;
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    errorMessage.value = error.message || 'Error inesperado al consultar el directorio.';
  } finally {
    loading.value = false;
  }
};

const nextImage = (postId, max) => {
  activeImage.value[postId] = activeImage.value[postId] < max - 1 ? activeImage.value[postId] + 1 : 0;
};

const prevImage = (postId, max) => {
  activeImage.value[postId] = activeImage.value[postId] > 0 ? activeImage.value[postId] - 1 : max - 1;
};

const downloadCard = async (postId, title) => {
  const post = posts.value.find((item) => item.id === postId);
  if (!post) return;

  exportPostData.value = post;
  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 150));

  const element = document.getElementById('instagram-export-template');
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 1,
      width: 1080,
      height: 1080,
      backgroundColor: '#224192',
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = `VzlaAyuda_${title.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error generating 1080x1080 image:', error);
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

const setCategory = (category) => {
  filters.value.category = filters.value.category === category ? '' : category;
  fetchPosts();
};

const goToDetails = (postId) => {
  router.push(`/peticiones/${postId}`);
};

const formatLocation = (post) => {
  const city = post.city || 'Venezuela';
  const country = post.country || '';
  return country ? `${city}, ${country}` : city;
};

const formatDate = (isoString) => {
  if (!isoString) return 'Sin fecha';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatCategory = (category) => categoryLabels[category] || 'Otros';

const parseGoal = (value) => {
  if (!value) return 100;
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) return numeric;
  const extracted = String(value).match(/\d+/);
  return extracted ? Number(extracted[0]) : 100;
};

const sortedPosts = computed(() => {
  const result = [...posts.value];

  if (sortBy.value === 'recent') {
    result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } else {
    const urgencyMap = { CRITICAL: 3, HIGH: 2, MEDIUM: 1, LOW: 0 };
    result.sort((a, b) => {
      const urgencyDiff = (urgencyMap[b.urgency] || 0) - (urgencyMap[a.urgency] || 0);
      if (urgencyDiff !== 0) return urgencyDiff;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }

  return result;
});

const urgentCount = computed(() => posts.value.filter((post) => post.urgency === 'CRITICAL').length);

const truncate = (text, length) => {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

const calculateProgress = (post) => {
  const offers = post._count?.offers || post.quantityFulfilled || 0;
  return Math.min(Math.round((offers / parseGoal(post.quantityNeeded)) * 100), 100);
};

const getProgressClass = (post) => {
  if (post.urgency === 'CRITICAL') return 'progress-critical';
  if (post.urgency === 'HIGH') return 'progress-high';
  return 'progress-normal';
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
  color: #101827;
  background:
    radial-gradient(circle at 22% 16%, rgba(34, 65, 146, 0.08), transparent 22rem),
    radial-gradient(circle at 82% 10%, rgba(14, 165, 233, 0.12), transparent 20rem),
    linear-gradient(180deg, #f7fbff 0%, #f4f8fd 44%, #ffffff 100%);
  font-family: var(--font-family);
}

.petitions-shell {
  width: min(1440px, calc(100% - 64px));
  margin: 0 auto;
  padding: 28px 0 76px;
}

.search-band {
  display: flex;
  justify-content: center;
  margin: 0 0 30px;
}

.search-box {
  width: min(680px, 100%);
  min-height: 54px;
  display: grid;
  grid-template-columns: 28px 1fr 48px;
  align-items: center;
  gap: 10px;
  padding: 5px 5px 5px 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow:
    0 14px 32px rgba(34, 65, 146, 0.12),
    0 2px 8px rgba(15, 23, 42, 0.14);
}

.search-box > svg {
  width: 22px;
  height: 22px;
  color: #475569;
}

.search-box input {
  min-width: 0;
  width: 100%;
  height: 42px;
  color: #111827;
  border: 0;
  background: transparent;
  font-size: 1rem;
  outline: none;
}

.search-box input::placeholder {
  color: #5f6d7d;
}

.search-box button {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  color: #ffffff;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, #23bde8 0%, #0ea5d9 100%);
  box-shadow: 0 7px 16px rgba(14, 165, 217, 0.42);
  cursor: pointer;
}

.search-box svg,
.search-box button svg,
.carousel-nav svg,
.download-button svg,
.ig-location svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.search-box button svg {
  width: 21px;
  height: 21px;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.category-chips,
.compact-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.category-chip,
.clear-button {
  min-height: 36px;
  padding: 0 14px;
  color: #224192;
  border: 1px solid rgba(34, 65, 146, 0.16);
  border-radius: 999px;
  background: #ffffff;
  font-weight: 800;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.category-chip:hover,
.category-chip.active,
.clear-button:hover {
  color: #ffffff;
  background: #224192;
  box-shadow: 0 8px 18px rgba(34, 65, 146, 0.18);
  transform: translateY(-1px);
}

.select-control {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5d73;
  font-size: 0.83rem;
  font-weight: 800;
}

.select-control select {
  min-height: 36px;
  padding: 0 34px 0 12px;
  color: #12213a;
  border: 1px solid rgba(34, 65, 146, 0.16);
  border-radius: 999px;
  background: #ffffff;
  font-weight: 700;
}

.results-summary {
  margin: 0 0 14px;
  color: #52657c;
  font-size: 0.92rem;
}

.results-summary p {
  margin: 0;
}

.results-summary strong {
  color: #12213a;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.petition-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid rgba(34, 65, 146, 0.12);
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 16px 34px rgba(15, 23, 42, 0.1),
    0 2px 8px rgba(15, 23, 42, 0.08);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.petition-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 40px rgba(34, 65, 146, 0.16),
    0 2px 8px rgba(15, 23, 42, 0.08);
}

.card-media {
  position: relative;
  height: 174px;
  overflow: hidden;
  background: #dbe7f5;
}

.verified-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 4;
  min-height: 28px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  color: #ffffff;
  border-radius: 999px;
  background: linear-gradient(180deg, #385aa3 0%, #24458d 100%);
  box-shadow: 0 5px 13px rgba(16, 31, 65, 0.22);
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.image-carousel,
.carousel-track {
  width: 100%;
  height: 100%;
}

.carousel-track {
  display: flex;
  transition: transform 220ms ease;
}

.card-img {
  min-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-nav {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  pointer-events: none;
}

.carousel-nav button {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.36);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(8px);
  cursor: pointer;
  pointer-events: auto;
}

.carousel-nav svg {
  width: 17px;
  height: 17px;
}

.no-image-banner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  background:
    radial-gradient(circle at 74% 20%, rgba(14, 165, 233, 0.4), transparent 9rem),
    linear-gradient(135deg, #224192, #0ea5e9);
}

.banner-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.15;
  background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
  background-size: 18px 18px;
}

.banner-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 50px 14px 16px;
}

.banner-content span,
.banner-content small {
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.banner-content strong {
  font-size: 1.08rem;
  line-height: 1.2;
}

.download-button {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 3;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: #224192;
  border: 0;
  border-radius: 999px;
  background: #ffffff;
  cursor: pointer;
}

.download-button svg {
  width: 16px;
  height: 16px;
}

.card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 11px 12px 12px;
}

.card-body h2 {
  min-height: 40px;
  display: -webkit-box;
  margin: 0 0 3px;
  overflow: hidden;
  color: #050b18;
  font-size: 1.02rem;
  font-weight: 900;
  line-height: 1.16;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.location-line {
  margin: 0 0 12px;
  color: #111827;
  font-size: 0.84rem;
  line-height: 1.35;
}

.progress-row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.progress-track {
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: #e5e7eb;
}

.progress-track span {
  display: block;
  height: 100%;
  min-width: 4px;
  border-radius: inherit;
}

.progress-normal {
  background: linear-gradient(90deg, #0ea5e9, #22c2ea);
}

.progress-high {
  background: linear-gradient(90deg, #f59e0b, #0ea5e9);
}

.progress-critical {
  background: linear-gradient(90deg, #f97316, #ef4444);
}

.details-button {
  min-height: 34px;
  padding: 0 13px;
  color: #ffffff;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(180deg, #25bce8 0%, #099dd0 100%);
  box-shadow: 0 5px 12px rgba(14, 165, 217, 0.32);
  font-size: 0.82rem;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 7px;
  color: #111827;
  font-size: 0.74rem;
  text-transform: uppercase;
}

.meta-row span:first-child {
  font-weight: 900;
}

.state-panel {
  max-width: 720px;
  margin: 64px auto;
  padding: 44px;
  text-align: center;
  border: 1px solid rgba(34, 65, 146, 0.12);
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.1);
}

.state-panel span {
  color: #224192;
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.state-panel h1 {
  margin: 8px 0;
  color: #050b18;
  font-size: 1.8rem;
}

.state-panel p {
  max-width: 520px;
  margin: 0 auto 20px;
  color: #52657c;
  line-height: 1.6;
}

.state-panel button {
  min-height: 42px;
  padding: 0 18px;
  color: #ffffff;
  border: 0;
  border-radius: 999px;
  background: #224192;
  font-weight: 800;
  cursor: pointer;
}

.error-state span {
  color: #dc2626;
}

.skeleton-card {
  pointer-events: none;
}

.skeleton-image,
.skeleton-body span,
.skeleton-body strong,
.skeleton-body p,
.skeleton-body small {
  display: block;
  border-radius: 8px;
  background: linear-gradient(90deg, #eaf1f8, #ffffff, #eaf1f8);
  background-size: 220% 100%;
  animation: shimmer 1.2s linear infinite;
}

.skeleton-image {
  height: 174px;
  border-radius: 0;
}

.skeleton-body {
  padding: 12px;
}

.skeleton-body span {
  width: 82%;
  height: 20px;
}

.skeleton-body strong {
  width: 62%;
  height: 15px;
  margin-top: 9px;
}

.skeleton-body p {
  width: 100%;
  height: 8px;
  margin-top: 14px;
}

.skeleton-body small {
  width: 74%;
  height: 14px;
  margin-top: 10px;
}

.ig-export-wrapper {
  position: fixed;
  left: -9999px;
  top: -9999px;
}

.ig-export-container {
  width: 1080px;
  height: 1080px;
  position: relative;
  display: flex;
  overflow: hidden;
  color: white;
  background:
    radial-gradient(circle at 82% 18%, rgba(14, 165, 233, 0.36), transparent 320px),
    linear-gradient(135deg, #224192 0%, #0ea5e9 100%);
  font-family: var(--font-family);
}

.ig-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.14;
  background-image: radial-gradient(circle at 4px 4px, white 2px, transparent 0);
  background-size: 40px 40px;
}

.ig-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 88px;
}

.ig-header,
.ig-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.ig-watermark {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #ffffff;
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: 0.14em;
}

.ig-watermark span {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ffffff;
}

.ig-category,
.ig-goal {
  padding: 14px 24px;
  color: #224192;
  border-radius: 999px;
  background: #ffffff;
  font-size: 1.4rem;
  font-weight: 900;
}

.ig-title {
  margin: 92px 0 36px;
  color: #ffffff;
  font-size: 4.6rem;
  line-height: 1.08;
}

.ig-desc {
  max-width: 880px;
  margin: 0;
  color: #e7f6ff;
  font-size: 2.15rem;
  line-height: 1.45;
}

.ig-footer {
  margin-top: auto;
  padding-top: 42px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
}

.ig-location {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 900;
}

@keyframes shimmer {
  to {
    background-position: -220% 0;
  }
}

@media (max-width: 1240px) {
  .cards-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 920px) {
  .petitions-shell {
    width: min(100% - 32px, 1440px);
  }

  .control-row {
    align-items: stretch;
    flex-direction: column;
  }

  .compact-controls {
    justify-content: space-between;
  }

  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .petitions-shell {
    width: min(100% - 22px, 1440px);
    padding-top: 20px;
  }

  .search-box {
    grid-template-columns: 24px 1fr 44px;
    min-height: 52px;
    padding-left: 14px;
  }

  .search-box input {
    font-size: 0.92rem;
  }

  .category-chips {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .category-chip {
    flex: 0 0 auto;
  }

  .compact-controls {
    display: grid;
    grid-template-columns: 1fr;
  }

  .select-control {
    justify-content: space-between;
  }

  .select-control select {
    min-width: 170px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .card-media,
  .skeleton-image {
    height: 190px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
