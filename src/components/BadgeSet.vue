<template>
  <span class="badge">{{ text }}</span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const {color} = defineProps<{
  text: string, color?: string
}>()

const badgeColor = color ?? "#555"
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 3px 7px;
  margin-right: 5px;
  border-radius: 12px;
  background-color: v-bind(badgeColor);
  color: white;
  font-size: 0.75em;
}
</style>
