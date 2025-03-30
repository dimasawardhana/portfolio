<script lang="ts" setup>
const portfolioDetails = [
  { name: 'Investment 1', value: 20000 },
  { name: 'Investment 2', value: 30000 },
  { name: 'Investment 3', value: 50000 },
]
</script>

<template>
  <div class="portfolio-details">
    <h2>Portfolio Details</h2>
    <ul>
      <li v-for="(investment, index) in portfolioDetails" :key="index">
        {{ investment.name }}: {{ investment.value }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.portfolio-details {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
