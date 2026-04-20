<template>
  <nav class="main-navbar">
    <div class="nav-container">
      <div class="logo">
        <div class="logo-icon-wrapper">
          <img src="../assets/venezuela_ayuda.png" alt="Logo Venezuela Ayuda" class="logo-img" />
        </div>
        <span class="logo-text">Venezuela Ayuda</span>
      </div>

      <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <svg v-if="!isMobileMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="nav-menu" :class="{ 'is-open': isMobileMenuOpen }">
        <div class="menu-content">
          <div class="nav-links">
            <RouterLink to="/" :class="{ active: route.name === 'home' }">Inicio</RouterLink>
            <a href="#">Nosotros</a>
            <RouterLink to="/crear-publicacion" :class="{ active: route.name === 'create-publication' }">Peticiones
            </RouterLink>
            <a href="#">Transparencia</a>
          </div>

          <div class="nav-actions">
            <RouterLink to="/crear-publicacion" class="btn btn-primary">Donar Ahora</RouterLink>
            
            <div class="profile-dropdown-wrapper">
              <button class="icon-btn profile-btn" @click.stop="toggleDropdown">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              
              <div v-if="isDropdownOpen" class="dropdown-menu">
                <a href="#" class="dropdown-item" @click.prevent="goToProfile">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Perfil
                </a>
                <a href="#" class="dropdown-item" @click.prevent="logout">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Cerrar Sesión
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onUnmounted, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isMobileMenuOpen = ref(false);
const isDropdownOpen = ref(false);
const route = useRoute();
const router = useRouter();

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const goToProfile = () => {
  isDropdownOpen.value = false;
  router.push({ name: 'profile' });
};

const logout = () => {
  isDropdownOpen.value = false;
  // Handle logout logic here, for now go to login
  router.push({ name: 'login' });
};

const closeDropdown = (e) => {
  if (!e.target.closest('.profile-dropdown-wrapper')) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.addEventListener('click', closeDropdown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.main-navbar {
  width: 100%;
  background-color: #020617;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon-wrapper {
  width: 44px;
  height: 44px;
  background-color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: scale(1.2);
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.nav-menu {
  display: flex;
  align-items: center;
}

.menu-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #e2e8f0;
  /* Crisp light slate instead of dull gray */
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 0.2s;
  position: relative;
}

.nav-links a:hover {
  color: #ffffff;
}

.nav-links a.active {
  color: #38bdf8;
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #38bdf8;
  border-radius: 2px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.6rem;
  border-radius: 9999px;
  font-weight: 700;
  font-family: var(--font-family);
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-primary {
  background-color: #0ea5e9;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);
}

.btn-primary:hover {
  background-color: #0284c7;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
}

.profile-dropdown-wrapper {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: slideDown 0.2s ease forwards;
  transform-origin: top right;
}

@keyframes slideDown {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.dropdown-item {
  padding: 0.75rem 1rem;
  color: #e2e8f0;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.icon-btn {
  background: none;
  border: none;
  color: #e2e8f0;
  /* Crisp light slate */
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.icon-btn:hover {
  color: #ffffff;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-toggle svg {
  width: 32px;
  height: 32px;
}

@media (max-width: 992px) {
  .nav-container {
    padding: 0 1.5rem;
  }

  .mobile-toggle {
    display: block;
    z-index: 1000;
  }

  .nav-menu {
    display: block;
    position: fixed;
    top: 76px;
    left: 0;
    width: 100%;
    height: calc(100vh - 76px);
    background-color: rgba(2, 6, 23, 0.4);
    backdrop-filter: blur(4px);
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transition: clip-path 0.4s ease-in-out;
    overflow-y: auto;
  }

  .nav-menu.is-open {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  .menu-content {
    background-color: #020617;
    flex-direction: column;
    padding: 3rem 2rem;
    gap: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-links a {
    font-size: 1.2rem;
  }

  .nav-actions {
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .profile-dropdown-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .profile-btn {
    width: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    height: 48px;
    margin-top: 0.5rem;
  }

  .profile-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .dropdown-menu {
    position: static;
    width: 100%;
    margin-top: 1rem;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    align-items: center;
    gap: 0.5rem;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dropdown-item {
    font-size: 1.1rem;
    padding: 0.8rem 1rem;
    justify-content: center;
    width: 100%;
    border-radius: 12px;
  }
}
</style>
