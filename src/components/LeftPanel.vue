<template>
  <aside class="left-panel">
    <div class="background-decorations">
      <div class="circle-sm"></div>
      <div class="circle-lg"></div>
      <div class="bulb-illustration">
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.992 4.992 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
          <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2z" />
        </svg>
      </div>
    </div>

    <div class="content">
      <header class="logo">
        <div class="logo-icon">
          <img src="../assets/venezuela_ayuda.png" alt="Logo Venezuela Ayuda" />
        </div>
        <h1>Venezuela Ayuda</h1>
      </header>

      <main class="hero">
        <span class="badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          EL IMPACTO PRIMERO
        </span>
        <h2 class="title">
          Empoderando a <br>
          <span class="highlight">Venezuela</span> <br>
          Juntos.
        </h2>
        <p class="description">
          Únete a una comunidad de transparencia y esperanza. Ya seas una persona que desea ayudar o una organización
          que necesita apoyo, tu camino comienza aquí.
        </p>
      </main>

      <div class="social-proof">
        <div class="avatars">
          <div class="avatar img-1"></div>
          <div class="avatar img-2"></div>
          <div class="avatar img-3"></div>
        </div>
        <span class="proof-text">Unido a más de 12,000 héroes locales</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.left-panel {
  flex: 1;
  background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #172554 100%);
  color: var(--color-white);
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  max-width: 50%;
}

@media (max-width: 768px) {
  .left-panel {
    max-width: 100%;
    padding: 2rem;
  }
}

.background-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

.circle-sm {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  top: 15%;
  left: 10%;
}

.circle-lg {
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 50%;
  bottom: -10%;
  right: -10%;
}

.bulb-illustration {
  position: absolute;
  top: 15%;
  right: 20%;
  width: 150px;
  height: 150px;
  color: rgba(255, 255, 255, 0.03);
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 6rem;
}

.logo-icon {
  width: 72px;
  height: 72px;
  background-color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  flex-shrink: 0;
}

.logo-icon img {
  width: 100%;
  padding: 5px;
  height: 100%;
  object-fit: contain;
  transform: scale(1.3);
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 480px;
  margin-top: 2rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: rgba(14, 165, 233, 0.1);
  color: #38bdf8;
  padding: 0.4rem 1rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  width: fit-content;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.title {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
}

.highlight {
  background: linear-gradient(135deg, #38bdf8, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #38bdf8;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.85;
  margin-bottom: 3rem;
  max-width: 420px;
}

.social-proof {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-bottom: 2rem;
}

.avatars {
  display: flex;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--color-bg-darker);
  background-color: var(--color-white);
  margin-left: -12px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.avatar:first-child {
  margin-left: 0;
}

.img-1 {
  background-image: url('https://i.pravatar.cc/100?img=32');
}

.img-2 {
  background-image: url('https://i.pravatar.cc/100?img=11');
}

.img-3 {
  background-image: url('https://i.pravatar.cc/100?img=12');
}

.proof-text {
  font-size: 0.85rem;
  opacity: 0.8;
  font-weight: 500;
}
</style>
