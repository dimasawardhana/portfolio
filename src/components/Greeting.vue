<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const jobTitles = ['Software Engineer', 'Fullstack Engineer', 'Backend Engineer']
const currentTitle = ref('')
const currentIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = 100
const deletingSpeed = 50
const pauseTime = 2000

const typeWriter = () => {
  const currentJob = jobTitles[currentIndex.value]

  if (isDeleting.value) {
    currentTitle.value = currentJob.substring(0, currentTitle.value.length - 1)
    if (currentTitle.value === '') {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % jobTitles.length
      setTimeout(typeWriter, typingSpeed)
    } else {
      setTimeout(typeWriter, deletingSpeed)
    }
  } else {
    currentTitle.value = currentJob.substring(0, currentTitle.value.length + 1)
    if (currentTitle.value === currentJob) {
      isDeleting.value = true
      setTimeout(typeWriter, pauseTime)
    } else {
      setTimeout(typeWriter, typingSpeed)
    }
  }
}

onMounted(() => {
  setTimeout(typeWriter, 1000)
})
</script>

<template>
  <div class="greeting">
    <h1 class="greeting-intro">
      Hi, I am Dimas Aji Wardhana.
    </h1>
    <div class="greeting-title-wrapper">
      <h2 class="greeting-job">
        <span class="job-title">{{ currentTitle }}</span>
        <span class="cursor">|</span>
      </h2>
    </div>
  </div>
</template>

<style scoped>
.greeting {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.greeting-intro {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.greeting-title-wrapper {
  /* This prevents the height from jumping when text wraps on smaller screens */
  min-height: 3rem;
  display: flex;
  align-items: center;
}

.greeting-job {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
  color: var(--color-text);
  line-height: 1.2;
}

.job-title {
  color: var(--primary-color);
}

.cursor {
  display: inline-block;
  width: 3px;
  background-color: var(--primary-color);
  margin-left: 4px;
  animation: blink 1s infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .greeting-intro {
    font-size: 2rem;
  }
  .greeting-job {
    font-size: 1.5rem;
  }
  .greeting-title-wrapper {
    min-height: 2.5rem;
  }
}
</style>
