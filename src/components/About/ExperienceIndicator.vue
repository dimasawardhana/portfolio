<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Experience {
  startDate: string
  endDate: string
}

const props = defineProps<{
  experiences: Experience[]
}>()

const emit = defineEmits<{
  (e: 'navigate', index: number): void
}>()

const activeIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)

const handleScroll = () => {
  const container = document.querySelector('.experience-container')
  if (!container) return
  
  const scrollLeft = container.scrollLeft
  const itemWidth = container.clientWidth
  
  activeIndex.value = Math.round(scrollLeft / itemWidth)
}

const handleIndicatorClick = (index: number) => {
  emit('navigate', index)
}

onMounted(() => {
  const container = document.querySelector('.experience-container')
  if (container) {
    container.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  const container = document.querySelector('.experience-container')
  if (container) {
    container.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="timeline-container">
    <div class="timeline-line"></div>
    <div class="timeline-indicators">
      <div 
        v-for="(exp, index) in experiences" 
        :key="index"
        class="timeline-item"
        :class="{ active: index === activeIndex }"
        @click="handleIndicatorClick(index)"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="date-range">{{ exp.startDate }} - {{ exp.endDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  position: relative;
  padding: 1rem 0;
  margin: 0 2rem;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%);
}

.timeline-indicators {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0 1rem;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  z-index: 1;
}

.timeline-content {
  position: absolute;
  top: -30px;
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.timeline-item:hover .timeline-content,
.timeline-item.active .timeline-content {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item.active .timeline-dot {
  background-color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 1);
  transform: scale(1.2);
}

.date-range {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}
</style> 