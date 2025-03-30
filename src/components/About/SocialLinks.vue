<script lang="ts" setup>
import Cards from '../ContentContainer.vue'
</script>

<template>
  <Cards id="github">
    <div class="centered">
      <a href="http://github.com/dimasawardhana">
        <i class="pi pi-github"></i>
      </a>
    </div>
  </Cards>
  <Cards id="linkedin">
    <div class="centered">
      <a href="http://linkedin.com/in/dimasajiwardhana">
        <i class="pi pi-linkedin"></i>
      </a>
    </div>
  </Cards>
  <Cards id="email">
    <div class="centered">
      <a href="mailto:dimasawardhana@gmail.com">
        <i class="pi pi-envelope"></i>
      </a>
    </div>
  </Cards>
  <Cards id="phone">
    <div class="centered">
      <a href="tel:+6281235850354">
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
  font-size: 22px;
  height: 100%;
}
.centered a {
  color: whitesmoke;
}
</style>
