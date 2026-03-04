<script setup lang="ts">
import IconNext from '../icons/IconNext.vue'
import IconPostgresql from '../icons/IconPostgresql.vue'
import IconReact from '../icons/IconReact.vue'
import IconNodejs from '../icons/IconNodejs.vue'
import IconTypescript from '../icons/IconTypescript.vue'
import IconGolang from '../icons/IconGolang.vue'
import IconRedis from '../icons/IconRedis.vue'
import IconRabbitmq from '../icons/IconRabbitmq.vue'
</script>

<template>
  <div class="skill-set">
    <div class="set">
      <i aria-label="React" title="React"><IconReact /></i>
      <i aria-label="Next.js" title="Next.js"><IconNext /></i>
      <i aria-label="PostgreSQL" title="PostgreSQL"><IconPostgresql /></i>
      <i aria-label="Node.js" title="Node.js"><IconNodejs /></i>
      <i aria-label="TypeScript" title="TypeScript"><IconTypescript /></i>
      <i aria-label="Go" title="Go"><IconGolang /></i>
      <i aria-label="Redis" title="Redis"><IconRedis /></i>
      <i aria-label="RabbitMQ" title="RabbitMQ"><IconRabbitmq /></i>
    </div>
  </div>
</template>

<style lang="css" scoped>
.skill-set {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.set {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 2rem;
  color: var(--color-text-muted);
}
.set i {
  transition: transform 0.2s ease, color 0.2s ease;
  display: flex;
  padding: 0.25rem; /* Small inner padding for touch targets without expanding too much */
}
.set i:hover {
  transform: translateY(-3px) scale(1.05); /* Slightly contained hover effect */
  color: var(--primary-color);
}
</style>
