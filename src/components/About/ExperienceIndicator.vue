<script setup lang="ts">
defineProps<{
  count: number
  selected: number
}>()

defineEmits<{
  (e: 'navigate', index: number): void
}>()
</script>

<template>
  <div class="indicator-container">
    <button
      v-for="(_, index) in count"
      :key="index"
      class="indicator-dot"
      :class="{ active: selected === index }"
      @click="$emit('navigate', index)"
      :aria-label="`Slide ${index + 1}`"
    ></button>
  </div>
</template>

<style scoped>
.indicator-container {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator-dot.active {
  background: var(--primary-color);
  width: 24px;
  border-radius: 6px;
}

.indicator-dot:hover {
  background: var(--color-background-soft);
  transform: scale(1.2);
}
</style>