<script setup lang="ts">
import experience from '@/data/experience.json'
import { reactive } from 'vue'
import BadgeSet from '@/components/BadgeSet.vue'

const experience_ = reactive(experience)
</script>

<template>
  <h1 class="header">Work Experiences</h1>
  <div class="experience-container">
    <div v-for="(exp, index) in experience_" :key="index" class="experience-item">
      <h2>{{ exp.role }} at {{ exp.company }}</h2>
      <div class="tags">
        <BadgeSet v-for="(tag, tagIndex) in exp.tags" :key="tagIndex" :text="tag" />
      </div>
      <p>{{ exp.location }}</p>
      <p>{{ exp.startDate }} - {{ exp.endDate }}</p>
      <ul>
        <li v-for="(desc, descIndex) in exp.description" :key="descIndex">{{ desc }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.experience-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: calc(100% - 100px);
  margin-top: 20px;
  direction: rtl; /* Add this line */
}
.experience-container::-webkit-scrollbar {
  width: 2px; /* Adjust the width as needed */
  background-color: #f5f5f5; /* Background color of the scrollbar */
}
.experience-container::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the scrollbar thumb */
  border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  width: 20px;
}
.experience-container::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color of the scrollbar thumb on hover */
}
.experience-item {
  height: 100%;
  scroll-snap-align: start;
  margin-bottom: 20px;
  padding: 1em 4em;
  direction: ltr; /* Add this line */
}
.experience-item p {
  margin-bottom: 20px;
}
.tags {
  margin-bottom: 10px;
}
.tag-badge {
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 12px;
}
</style>
