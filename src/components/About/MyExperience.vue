<script setup lang="ts">
import experience from '@/data/experience.json'
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import BadgeSet from '@/components/BadgeSet.vue'
import ExperienceIndicator from './ExperienceIndicator.vue'

const experience_ = reactive(experience)
const experienceContainer = ref<HTMLElement | null>(null)
const selectedExperience = ref(0)
let scrollTimeout: ReturnType<typeof setTimeout>

const handleNavigate = (index: number) => {
  if (experienceContainer.value) {
    const itemWidth = experienceContainer.value.clientWidth
    experienceContainer.value.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth',
    })
    selectedExperience.value = index
  }
}

const onScroll = () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    if (experienceContainer.value) {
      const scrollLeft = experienceContainer.value.scrollLeft
      const itemWidth = experienceContainer.value.clientWidth
      selectedExperience.value = Math.round(scrollLeft / itemWidth)
    }
  }, 100)
}

onMounted(() => {
  experienceContainer.value?.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  experienceContainer.value?.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="slideshow-wrapper">
    <div class="header-section">
      <h2 class="section-title">Experience</h2>
      <div class="navigation-controls">
        <button 
          class="nav-btn" 
          @click="handleNavigate(selectedExperience - 1)" 
          :disabled="selectedExperience === 0"
          aria-label="Previous experience"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <ExperienceIndicator 
          :count="experience_.length" 
          :selected="selectedExperience" 
          @navigate="handleNavigate" 
        />
        <button 
          class="nav-btn" 
          @click="handleNavigate(selectedExperience + 1)" 
          :disabled="selectedExperience === experience_.length - 1"
          aria-label="Next experience"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>

    <div ref="experienceContainer" class="experience-container">
      <div v-for="(exp, index) in experience_" :key="index" class="experience-item">
        <h2>{{ exp.role }}</h2>
        <div class="experience-meta">
          <span class="experience-company">{{ exp.company }}</span>
          <span class="experience-duration">{{ exp.startDate }} - {{ exp.endDate }}</span>
          <span class="experience-location">{{ exp.location }}</span>
        </div>
        <div class="tags">
          <BadgeSet v-for="(tag, tagIndex) in exp.tags" :key="tagIndex" :text="tag" />
        </div>
        <ul class="experience-desc">
          <li v-for="(desc, descIndex) in exp.description" :key="descIndex">{{ desc }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.slideshow-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2rem;
  color: var(--color-heading);
  font-weight: 600;
  margin: 0;
}

.navigation-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.nav-btn:hover:not(:disabled) {
  background: var(--color-background-soft);
  color: var(--color-heading);
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.navigation-controls :deep(.indicator-container) {
  margin-bottom: 0;
}

.experience-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1rem;
  padding-bottom: 1rem;
  /* Allow it to stretch naturally across the available space in a bounded parent */
  flex-grow: 1;
  min-height: 0;
  
  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.experience-container::-webkit-scrollbar {
  display: none;
}

.experience-item {
  min-width: 100%;
  scroll-snap-align: start;
  background: var(--color-background-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  /* Ensure internal content scrolls instead of pushing height out of bounds */
  max-height: 100%;
  overflow-y: auto;
  /* Hide the vertical scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.experience-item::-webkit-scrollbar {
  display: none;
}

@media (min-width: 768px) {
  .experience-item {
    padding: 2rem 2.5rem;
  }
}

.experience-item h2 {
  color: var(--color-heading);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.experience-company {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 1.1rem;
}

.experience-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.experience-desc {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
  color: var(--color-text);
  line-height: 1.6;
}

.experience-desc li {
  margin-bottom: 0.8rem;
}

.tags {
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
