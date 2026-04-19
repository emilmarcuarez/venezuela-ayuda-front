<template>
  <div ref="selectRef" class="custom-select" :class="{ 'is-open': isOpen, 'has-value': hasValue, 'has-error': invalid }">
    <div
      :id="buttonId"
      class="custom-select-trigger"
      role="combobox"
      :aria-controls="listboxId"
      :aria-expanded="isOpen"
      :aria-haspopup="'listbox'"
      :aria-invalid="invalid || undefined"
      :aria-labelledby="labelId"
      @click="focusInput"
    >
      <input
        ref="inputRef"
        v-model="searchTerm"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        autocomplete="off"
        @focus="openList"
        @input="handleSearchInput"
        @keydown="handleInputKeydown"
      />
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>

    <Transition name="select-popover">
      <div v-if="isOpen" class="custom-select-menu">
        <ul
          :id="listboxId"
          class="custom-select-list"
          role="listbox"
          :aria-labelledby="labelId || buttonId"
          tabindex="-1"
          @keydown="handleListKeydown"
        >
          <li
            v-if="placeholder"
            class="custom-select-option is-placeholder"
            role="option"
            :aria-selected="!hasValue"
            @pointerdown.prevent.stop="selectOption('')"
          >
            {{ placeholder }}
          </li>
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            class="custom-select-option"
            :class="{ 'is-selected': option.value === modelValue, 'is-active': index === activeIndex }"
            role="option"
            :aria-selected="option.value === modelValue"
            @mouseenter="activeIndex = index"
            @pointerdown.prevent.stop="selectOption(option.value)"
          >
            <span>{{ option.label }}</span>
            <svg v-if="option.value === modelValue" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </li>
          <li v-if="!filteredOptions.length" class="custom-select-empty">
            Sin resultados
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'Selecciona una opción' },
  invalid: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  labelId: { type: String, default: undefined }
});

const emit = defineEmits(['update:modelValue']);

const selectRef = ref(null);
const inputRef = ref(null);
const isOpen = ref(false);
const isSelecting = ref(false);
const activeIndex = ref(0);
const searchTerm = ref('');
const instanceId = `custom-select-${Math.random().toString(36).slice(2, 9)}`;
const buttonId = `${instanceId}-button`;
const listboxId = `${instanceId}-listbox`;

const normalizedOptions = computed(() =>
  props.options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return { label: String(option), value: option };
    }

    return option;
  })
);

const selectedOption = computed(() => normalizedOptions.value.find((option) => option.value === props.modelValue));
const selectedLabel = computed(() => selectedOption.value?.label || '');
const hasValue = computed(() => props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined);
const filteredOptions = computed(() => {
  const query = searchTerm.value.trim().toLocaleLowerCase();
  if (!query || selectedLabel.value === searchTerm.value) return normalizedOptions.value;

  return normalizedOptions.value.filter((option) => option.label.toLocaleLowerCase().includes(query));
});

watch(
  () => props.modelValue,
  () => {
    const selectedIndex = normalizedOptions.value.findIndex((option) => option.value === props.modelValue);
    activeIndex.value = Math.max(selectedIndex, 0);
    searchTerm.value = selectedLabel.value;
  },
  { immediate: true }
);

watch(filteredOptions, (options) => {
  if (activeIndex.value >= options.length) {
    activeIndex.value = Math.max(options.length - 1, 0);
  }
});

async function openList() {
  if (props.disabled || isSelecting.value) return;
  isOpen.value = true;
  await nextTick();
  inputRef.value?.focus();
}

function closeList() {
  isOpen.value = false;
  if (hasValue.value) searchTerm.value = selectedLabel.value;
}

function selectOption(value) {
  isSelecting.value = true;
  const nextOption = normalizedOptions.value.find((option) => option.value === value);
  searchTerm.value = nextOption?.label || '';
  emit('update:modelValue', value);
  isOpen.value = false;
  inputRef.value?.blur();
  window.setTimeout(() => {
    isSelecting.value = false;
  }, 0);
}

function moveActive(step) {
  const total = filteredOptions.value.length;
  if (!total) return;
  activeIndex.value = (activeIndex.value + step + total) % total;
}

function focusInput() {
  inputRef.value?.focus();
}

function handleSearchInput() {
  isOpen.value = true;
  activeIndex.value = 0;
}

function handleInputKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeList();
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveActive(1);
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveActive(-1);
    return;
  }

  if (event.key === 'Enter') {
    event.preventDefault();
    const option = filteredOptions.value[activeIndex.value];
    if (option) selectOption(option.value);
  }
}

function handleListKeydown(event) {
  handleInputKeydown(event);
}

function handleOutsideClick(event) {
  if (!selectRef.value?.contains(event.target)) {
    closeList();
  }
}

onMounted(() => document.addEventListener('pointerdown', handleOutsideClick));
onBeforeUnmount(() => document.removeEventListener('pointerdown', handleOutsideClick));
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
}

.custom-select-trigger {
  width: 100%;
  height: 58px;
  border: 0;
  border-bottom: 2px solid var(--color-va-line);
  border-radius: 12px 12px 0 0;
  background: var(--color-va-field);
  color: var(--color-va-ink);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.custom-select-trigger input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-va-ink);
  font: inherit;
  font-size: 1rem;
  line-height: 1.25;
}

.custom-select-trigger input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.95;
}

.custom-select-trigger input:disabled {
  cursor: not-allowed;
}

.custom-select-trigger input,
.custom-select-option span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-select-trigger svg {
  width: 20px;
  height: 20px;
  color: var(--color-va-ink);
  flex: 0 0 auto;
  transition: transform 0.2s ease, color 0.2s ease;
}

.custom-select-trigger path,
.custom-select-option path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.custom-select-trigger:hover,
.custom-select-trigger:focus-visible,
.custom-select.is-open .custom-select-trigger {
  background: #ffffff;
  border-bottom-color: var(--color-va-blue);
}

.custom-select.is-open .custom-select-trigger svg {
  color: var(--color-va-blue);
  transform: rotate(180deg);
}

.custom-select.has-error .custom-select-trigger {
  background: #fffaf0;
  border-bottom-color: #f59e0b;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.12);
}

.custom-select:has(.custom-select-trigger input:disabled) .custom-select-trigger {
  cursor: not-allowed;
  opacity: 0.58;
}

.custom-select-menu {
  position: absolute;
  inset: calc(100% + 0.15rem) 0 auto;
  z-index: 30;
  border: 1px solid rgba(34, 65, 146, 0.24);
  border-radius: 0 0 12px 12px;
  background: #ffffff;
  box-shadow: 0 24px 48px -24px rgba(34, 65, 146, 0.32);
  overflow: hidden;
}

.custom-select-list {
  max-height: 18rem;
  overflow-y: auto;
  list-style: none;
  padding: 0.35rem 0;
  margin: 0;
  outline: none;
}

.custom-select-option {
  min-height: 36px;
  padding: 0.5rem 1.65rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--color-va-ink);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.35;
  transition: background 0.16s ease, color 0.16s ease;
}

.custom-select-option svg {
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
}

.custom-select-option.is-placeholder {
  color: var(--color-text-muted);
}

.custom-select-option:hover,
.custom-select-option.is-active {
  background: var(--color-va-blue);
  color: #ffffff;
}

.custom-select-option.is-selected {
  font-weight: 700;
}

.custom-select-empty {
  padding: 0.7rem 1.65rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.select-popover-enter-active,
.select-popover-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.select-popover-enter-from,
.select-popover-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
