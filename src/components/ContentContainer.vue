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
  border-radius: 6px;
  box-shadow: whitesmoke 0px 0px 2px;
  background-color: rgb(40, 44, 52, 0.6);
  color: whitesmoke;
  margin: 8px;
  padding: 20px;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.cards::-webkit-scrollbar {
  width: 10px;
}
.cards::-webkit-scrollbar-thumb {
  background-color: #4f4f4f;
  border-radius: 10px;
}
.cards::-webkit-scrollbar-track {
  background-color: #2d2d2d;
}
.cards h1 {
  margin-bottom: 15px;
}
</style>
