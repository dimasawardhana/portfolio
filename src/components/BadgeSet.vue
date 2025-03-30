<template>
  <span class="badge">{{ text }}</span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  text: string
}>()
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 3px 7px;
  margin-right: 5px;
  border-radius: 12px;
  background-color: #555;
  color: white;
  font-size: 0.75em;
}
</style>
