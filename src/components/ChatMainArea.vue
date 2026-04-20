<template>
  <section class="chat-main">
    <header class="chat-header">
      <div class="chat-user-info">
        <div class="chat-avatar">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div>
          <h2>Chat con Carlos (Solicitante)</h2>
          <div class="status-wrapper">
            <span class="status-dot"></span>
            <span class="status-text">CONECTADO Y SEGURO</span>
          </div>
        </div>
      </div>
      <div class="chat-actions">
        <button class="action-btn" aria-label="Información">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
        <button class="action-btn" aria-label="Reportar">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" y1="22" x2="4" y2="15"></line>
          </svg>
        </button>
      </div>
    </header>

    <div class="chat-messages" ref="messagesContainer">
      <div class="date-divider"><span>HOY</span></div>

      <div v-for="msg in mensajes" :key="msg.id" :class="['message-row', msg.esMio ? 'is-me' : 'is-other']">
        <div v-if="!msg.esMio" class="message-avatar-small">
          <span>C</span>
        </div>
        <div class="message-content-wrapper">
          <div class="message-bubble">
            {{ msg.texto }}
          </div>
          <span class="message-time">
            {{ msg.hora }} <template v-if="msg.esMio && msg.visto">• Visto</template>
          </span>
        </div>
      </div>
    </div>

    <footer class="chat-input-area">
      <div class="chat-love-reaction">
        <button class="btn-love">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div class="input-wrapper">
        <button class="btn-add">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <input 
          v-model="nuevoMensaje" 
          @keyup.enter="enviarMensaje"
          placeholder="Escribe tu mensaje de forma segura..." 
        />
        <button @click="enviarMensaje" class="btn-send">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue';

const nuevoMensaje = ref('');
const messagesContainer = ref(null);

const mensajes = reactive([
  {
    id: 1,
    autor: "Carlos",
    texto: "Hola Alejandro, gracias por contactarnos. La clínica comunitaria necesita urgentemente esos kits de insulina. ¿Cuándo podríamos coordinar la entrega?",
    hora: "10:42 AM",
    esMio: false
  },
  {
    id: 2,
    autor: "Yo",
    texto: "Los tengo listos. Puedo dejarlos mañana por la tarde en el punto de recolección verificado. ¿Te parece bien a las 3:00 PM?",
    hora: "10:45 AM",
    esMio: true,
    visto: true
  },
  {
    id: 3,
    autor: "Carlos",
    texto: "Eso funciona perfectamente. Tendré al coordinador de la clínica allí para recibir y verificar. Estamos muy agradecidos por tu transparencia y rapidez.",
    hora: "10:46 AM",
    esMio: false
  }
]);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});

const enviarMensaje = () => {
  if (nuevoMensaje.value.trim() === '') return;

  mensajes.push({
    id: Date.now(),
    texto: nuevoMensaje.value,
    hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    esMio: true,
    visto: false
  });

  nuevoMensaje.value = '';
  scrollToBottom();
};
</script>

<style scoped>
.chat-main {
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  position: relative;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f1f5f9;
}

.chat-user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chat-avatar {
  width: 48px;
  height: 48px;
  background: #e0f2fe;
  color: #0284c7;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.chat-user-info h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-va-ink, #0f172a);
  margin: 0 0 0.25rem 0;
}

.status-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
}

.status-text {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f1f5f9;
  color: var(--color-va-ink, #0f172a);
}

.chat-messages {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.date-divider {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.date-divider span {
  background: #eff6ff;
  color: #60a5fa;
  padding: 0.4rem 1rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.message-row {
  display: flex;
  gap: 1rem;
  max-width: 85%;
}

.message-row.is-other {
  align-self: flex-start;
}

.message-row.is-me {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar-small {
  width: 32px;
  height: 32px;
  background: #e0f2fe;
  color: #0284c7;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
  margin-top: 0.5rem;
}

.message-content-wrapper {
  display: flex;
  flex-direction: column;
}

.is-other .message-content-wrapper {
  align-items: flex-start;
}

.is-me .message-content-wrapper {
  align-items: flex-end;
}

.message-bubble {
  padding: 1rem 1.25rem;
  border-radius: 20px;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

.is-other .message-bubble {
  background: #f8fafc;
  color: var(--color-va-ink, #0f172a);
  border-top-left-radius: 4px;
}

.is-me .message-bubble {
  background: var(--color-va-blue, #224192);
  color: white;
  border-top-right-radius: 4px;
}

.message-time {
  display: block;
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
}

.chat-input-area {
  padding: 1.5rem 2rem;
  background: #fafaf9;
  position: relative;
}

.chat-love-reaction {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
}

.btn-love {
  width: 56px;
  height: 56px;
  background: #fbbf24;
  color: white;
  border: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.btn-love:hover {
  transform: scale(1.1);
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: white;
  padding: 0.5rem;
  border-radius: 99px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  margin-top: 1rem;
}

.btn-add {
  background: transparent;
  border: none;
  color: #94a3b8;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-add:hover {
  background: #f1f5f9;
  color: var(--color-va-ink, #0f172a);
}

.input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  outline: none;
  color: var(--color-va-ink, #0f172a);
}

.input-wrapper input::placeholder {
  color: #94a3b8;
}

.btn-send {
  background: var(--color-va-blue, #224192);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-send:hover {
  background: #1a3275;
}

@media (max-width: 992px) {
  .chat-messages {
    height: 500px; /* fixed height on mobile */
  }
}
</style>
