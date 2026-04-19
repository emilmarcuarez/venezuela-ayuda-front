<div align="center">
  <img src="src/assets/venezuela_ayuda.png" alt="Venezuela Ayuda Logo" width="150"/>
  <h1>Venezuela Ayuda - Plataforma</h1>
  <p>Una plataforma digital moderna diseñada para conectar la solidaridad global directamente con las necesidades de Venezuela, empoderando el impacto humanitario con absoluta transparencia.</p>
</div>

<br>

## 🚀 Tecnologías Utilizadas

Este proyecto ha sido desarrollado desde cero usando:

* **Vue 3** (`Composition API`)
* **Vite** (Empaquetado de altísima velocidad)
* **Vue Router** (Para la gestión de navegación SPA entre Login y Home)
* **Vanilla CSS Avanzado** (Cero dependencias pesadas de UI. Variables nativas, flexbox, grid y animaciones)
* **Tipografía:** *Plus Jakarta Sans* (El estándar de oro en UI moderno).

## ✨ Componentes Principales

La arquitectura está basada en bloques desacoplados y fácilmente reutilizables:

* **High-Impact Landing Page (`HomeView`):**
  * **MainHero:** Un cabezal cinemático *Full-width* con esquema dark-mode, gradientes en tonos medianoche (`#020617`), e imágenes levitando en 3D.
  * **MainNavbar:** Barra principal *sticky* translúcida (`backdrop-filter`) .
  * *Otras Secciones:* Peticiones de impacto (Barras de progreso animadas), y un collage de comunidad (Efecto "Movimiento").

* **Experiencia de Onboarding (`LoginView`):**
  * **Layout Split-Screen:** Combinación híbrida del tema *Dark Space* (Panel Izquierdo con métricas de impacto) y Clean Light Mode (Panel Derecho moderno).
  * **SignUpForm:** Botones tipo píldora, inputs altamente estilizados con respuestas dinámicas al foco (`outline`).

## 🛠 Instalación y Configuración Local

Arrancar la plataforma para visualizarla:

1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/emilmarcuarez/venezuela-ayuda-front.git
   cd venezuela-ayuda-front
   ```

2. **Instala las dependencias necesarias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo Vite:**
   ```bash
   npm run dev
   ```

4. ¡Y listo! Abre tu navegador en la URL que indique la consola (generalmente `http://localhost:5173/`).

### Correr en WSL

Requisitos:

```bash
node -v
npm -v
```

Este repo fue probado en WSL con Node `v22.22.2` y npm `10.9.7`.

Instalación:

```bash
npm install
```

Modo desarrollo:

```bash
npm run dev -- --host 0.0.0.0
```

URL local:

```text
http://localhost:5173/
```

Build de producción:

```bash
npm run build
```

Servir el build localmente:

```bash
npm start
```

URL local del build:

```text
http://localhost:4173/
```

Nota: `npm start` usa `vite preview` para probar el build local. Para producción real, sirve la carpeta `dist/` con Nginx, Apache, Caddy, Docker, Vercel, Netlify u otro servidor estático.

## 📂 Arquitectura de Carpetas

```text
src/
├── assets/         # Recursos gráficos (Logo, imágenes, ilustraciones en alta calidad)
├── components/     # Todos los bloques de construcción visuales de la aplicación
│   ├── MainHero.vue
│   ├── SignUpForm.vue
│   └── ...
├── views/          # Pantallas maestras 
│   ├── HomeView.vue
│   └── LoginView.vue
├── router.js       # Controlador de rutas y navegación de Vue Router
├── style.css       # Sistema de diseño maestro (Variables, resets de alto nivel)
├── App.vue         # Marco de entrada de la aplicación
└── main.js         # Archivo de arranque de Vue
```
