<script lang="ts" setup>
import { ref } from 'vue'

const isActive = ref(true)

function toggleNav() {
  isActive.value = !isActive.value
}
</script>

<template>
  <div class="topbar">
    <nav class="nav" :class="{ left: !isActive, leftHidden: isActive }">
      <RouterLink to="/"><i class="pi pi-home"></i></RouterLink>
      <RouterLink to="/blog"><i class="pi pi-book"></i></RouterLink>
    </nav>
    <nav class="nav mid" @click="toggleNav">
      <i class="pi pi-microsoft rotating-icon"></i>
    </nav>
    <nav class="nav" :class="{ right: !isActive, rightHidden: isActive }">
      <RouterLink to="/about"><i class="pi pi-user"></i></RouterLink>
      <RouterLink to="/project"><i class="pi pi-briefcase"></i></RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.topbar {
  display: grid;
  position: sticky;
  top: 0;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  animation: fall-in 0.7s;
}
.mid {
  z-index: 2;
}
.left {
  justify-self: end;
  opacity: 1;
  z-index: 1;
}
.right {
  justify-self: start;
  opacity: 1;
  z-index: 1;
}
.leftHidden {
  justify-self: end;
  transform: translate(70px, 0px);
  visibility: hidden;
  opacity: 0;
}
.rightHidden {
  justify-self: start;
  transform: translate(-70px, 0px);
  visibility: hidden;
  opacity: 0;
}
.nav {
  margin: 10px;
  display: flex;
  width: fit-content;
  background-color: rgb(40, 44, 52, 0.6);
  padding: 5px 15px;
  border-radius: 5px;
  box-shadow: whitesmoke 0px 0px 2px;
  padding: 10px;
  transition: all 0.3s ease;
}

.nav i {
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;
  transition: rotate 0.3s;
}

.nav a i:hover {
  color: var(--primary-color);
}

.nav .rotating-icon:hover {
  color: var(--primary-color);
  rotate: 90deg;
}

@keyframes fall-in {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
