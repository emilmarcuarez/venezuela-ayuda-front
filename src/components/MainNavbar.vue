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
        <svg v-if="!isMobileMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div class="nav-menu" :class="{ 'is-open': isMobileMenuOpen }">
        <div class="nav-links">
          <a href="#" class="active">Inicio</a>
          <a href="#">Nosotros</a>
          <a href="#">Peticiones</a>
          <a href="#">Transparencia</a>
        </div>

        <div class="nav-actions">
          <button class="btn btn-primary">Donar Ahora</button>
          <button class="icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);
</script>

<style scoped>
.main-navbar {
  width: 100%;
  background-color: #020617; /* Solid ultra-dark blue to match the theme strictly without murky mixing */
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
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
  gap: 3rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #e2e8f0; /* Crisp light slate instead of dull gray */
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

.icon-btn {
  background: none;
  border: none;
  color: #e2e8f0; /* Crisp light slate */
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
  .mobile-toggle {
    display: block;
    z-index: 1000;
  }
  .nav-menu {
    position: absolute;
    top: 76px; /* Below navbar */
    left: 0;
    width: 100%;
    height: auto; /* Only take the space of the contents */
    background-color: #020617; /* Solid deep blue matching the navbar */
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); /* Hidden */
    transition: clip-path 0.4s ease-in-out;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05); /* Clean border at the end of the menu */
  }
  .nav-menu.is-open {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); /* Revealed */
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
  }
  .btn { width: 100%; text-align: center; }
}
</style>
