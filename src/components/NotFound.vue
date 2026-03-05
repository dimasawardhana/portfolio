<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found-page">
    <div class="glass-card content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button @click="router.push('/')" class="home-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        Back to Home
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 6.5rem 2rem 2rem 2rem;
  text-align: center;
}

.glass-card.content {
  background: var(--color-background-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  padding: 3.5rem 3rem;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
}

h1 {
  font-size: 6rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, var(--primary-color), #81E6D9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: var(--color-heading);
}

p {
  color: var(--color-text-muted);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.home-button {
  background: rgba(79, 209, 197, 0.1);
  color: var(--primary-color);
  border: 1px solid rgba(79, 209, 197, 0.3);
  padding: 0.8rem 1.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: all 0.2s ease;
}

.home-button:hover {
  background: rgba(79, 209, 197, 0.2);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .glass-card.content {
    padding: 2rem 1.5rem;
  }
}
</style>
