<script lang="ts" setup>
import router from '@/router'
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button @click="router.push('/')" class="home-button">
        <i class="pi pi-home"></i> Back to Home
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
  padding: 2rem;
}

.content {
  background-color: rgb(40, 44, 52, 0.6);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: whitesmoke 0px 0px 2px;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: var(--primary-color);
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: white;
}

p {
  color: #ccc;
  margin-bottom: 2rem;
}

.home-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: var(--primary-color-dark);
}

.home-button i {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .content {
    padding: 1.5rem;
  }
}
</style>
