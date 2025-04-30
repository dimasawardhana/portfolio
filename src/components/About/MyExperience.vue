<script setup lang="ts">
import experience from '@/data/experience.json'
import { reactive, useTemplateRef, ref } from 'vue'
import BadgeSet from '@/components/BadgeSet.vue'
import ExperienceIndicator from './ExperienceIndicator.vue'

const experience_ = reactive(experience)
const experienceContainer = ref<HTMLElement | null>(null)

const handleNavigate = (index: number) => {
  if (experienceContainer.value) {
    const itemWidth = experienceContainer.value.clientWidth
    experienceContainer.value.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <h1 class="header">Work Experiences</h1>
  <div class="experience-scrollbar">
    <ExperienceIndicator :experiences="experience_" @navigate="handleNavigate" />
  </div>
  <div ref="experienceContainer" class="experience-container">
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
@media (min-width: 768px) {
  .experience-container {
    padding: 0 2rem;
  }
  .experience-item {
    padding: 1em 4em;
  }
  .experience-item h2 {
    text-align: justify;
  }
}
.experience-container {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  height: calc(100% - 200px);
  margin-top: 20px;
  flex-wrap: nowrap;
  display: flex;
}
.experience-container::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.experience-container::-webkit-scrollbar-thumb {
  border-radius: 15px;
  width: 0px;
}
.experience-container::-webkit-scrollbar-thumb:hover {
  height: 0px;
}
.experience-item {
  scroll-snap-align: start;
  margin-right: 20px;
  flex: 0 0 100%;
  position: relative;
}
.experience-item p {
  margin-bottom: 20px;
}
.tags {
  margin-bottom: 10px;
}

.experience-scrollbar {
  margin-top: 1rem;
  position: relative;
  z-index: 1;
}
</style>
