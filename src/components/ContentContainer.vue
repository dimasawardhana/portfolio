<script lang="ts" setup>
defineProps(['id', 'title', 'sectionStyle'])
</script>

<template>
  <section class="cards" :id="id" :style="sectionStyle">
    <!-- Fixed binding for id -->
    <h1 v-if="title">{{ title }}</h1>
    <slot></slot>
  </section>
</template>

<style scoped>
.cards {
  border-radius: 8px;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: var(--color-background-glass);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--color-text);
  margin: 0;
  padding: 16px;
  max-width: 100%;
}
.cards::-webkit-scrollbar {
  width: 8px;
}
.cards::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 8px;
}
.cards::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-border-hover);
}
.cards::-webkit-scrollbar-track {
  background-color: transparent;
}
.cards h1 {
  margin-bottom: 15px;
  color: var(--color-heading);
}
</style>
