<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const jobTitles = ['Software Engineer', 'Fullstack Engineer', 'Frontend Engineer']
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
    <h2 class="greeting-text">
      Hi, I am Dimas Aji Wardhana.
      <span class="job-title">{{ currentTitle }}</span>
      <span class="cursor">|</span>
    </h2>
  </div>
</template>

<style scoped>
.greeting {
  margin-bottom: 4rem;
}

.greeting-text {
  font-size: 3rem;
  font-weight: bold;
  color: #e2e8f0;
  margin: 0;
}

.job-title {
  color: #63b3ed;
}

.cursor {
  display: inline-block;
  width: 3px;
  background-color: #63b3ed;
  margin-left: 2px;
  animation: blink 1s infinite;
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
</style>
