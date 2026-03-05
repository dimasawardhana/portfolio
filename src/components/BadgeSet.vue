<template>
  <span class="badge">{{ text }}</span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const { color } = defineProps<{
  text: string
  color?: string
}>()

const badgeColor = color ?? 'rgba(79, 209, 197, 0.15)'
const textColor = color ? '#ffffff' : 'var(--primary-color)'
const borderColor = color ? color : 'rgba(79, 209, 197, 0.3)'
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background-color: v-bind(badgeColor);
  color: v-bind(textColor);
  border: 1px solid v-bind(borderColor);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>
