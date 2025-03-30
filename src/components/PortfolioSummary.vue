<script lang="ts" setup>
const portfolioSummary = {
  totalValue: 100000,
  totalInvestments: 5,
}
</script>

<template>
  <div class="portfolio-summary">
    <h2>Portfolio Summary</h2>
    <p>Total Value: {{ portfolioSummary.totalValue }}</p>
    <p>Total Investments: {{ portfolioSummary.totalInvestments }}</p>
  </div>
</template>

<style scoped>
.portfolio-summary {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
