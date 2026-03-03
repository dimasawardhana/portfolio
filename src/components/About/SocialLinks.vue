<script lang="ts" setup>
import Cards from '../ContentContainer.vue'
</script>

<template>
  <Cards id="github">
    <div class="centered">
      <a href="http://github.com/dimasawardhana" target="_blank">
        <i class="pi pi-github"></i>
      </a>
    </div>
  </Cards>
  <Cards id="linkedin">
    <div class="centered">
      <a href="http://linkedin.com/in/dimasajiwardhana" target="_blank">
        <i class="pi pi-linkedin"></i>
      </a>
    </div>
  </Cards>
  <Cards id="email">
    <div class="centered">
      <a href="mailto:dimasawardhana@gmail.com" target="_blank">
        <i class="pi pi-envelope"></i>
      </a>
    </div>
  </Cards>
  <Cards id="phone">
    <div class="centered">
      <a href="https://api.whatsapp.com/send/?phone=6281235850354&type=phone_number&app_absent=0" target="_blank">
        <i class="pi pi-whatsapp"></i>
      </a>
    </div>
  </Cards>
</template>

<style lang="css" scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 100%;
}
.centered a {
  color: whitesmoke;
}
</style>
