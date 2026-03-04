<script lang="ts" setup>
// No extra imports needed now
</script>

<template>
  <div class="social-actions">
    <a href="http://github.com/dimasawardhana" target="_blank" class="social-pill" aria-label="GitHub">
      <i class="pi pi-github"></i>
      <span class="platform-name">GitHub</span>
    </a>
    <a href="http://linkedin.com/in/dimasajiwardhana" target="_blank" class="social-pill" aria-label="LinkedIn">
      <i class="pi pi-linkedin"></i>
      <span class="platform-name">LinkedIn</span>
    </a>
    <a href="mailto:dimasawardhana@gmail.com" target="_blank" class="social-pill" aria-label="Email">
      <i class="pi pi-envelope"></i>
      <span class="platform-name">Email</span>
    </a>
    <a href="https://api.whatsapp.com/send/?phone=6281235850354&type=phone_number&app_absent=0" target="_blank" class="social-pill" aria-label="WhatsApp">
      <i class="pi pi-whatsapp"></i>
      <span class="platform-name">WhatsApp</span>
    </a>
  </div>
</template>

<style scoped>
.social-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  width: 100%;
}

.social-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.social-pill i {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.social-pill:hover {
  background-color: var(--color-background-soft);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-pill:hover i,
.social-pill:hover .platform-name {
  color: var(--primary-color);
}
</style>
