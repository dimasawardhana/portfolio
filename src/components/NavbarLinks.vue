<script lang="ts" setup>
import router from '@/router'
import { onUpdated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isActive = ref(true)
const isInDashboard = ref(true)

function toggleNav() {
  isActive.value = !isActive.value
}
const route = useRoute()

watch(
  () => route.fullPath,
  (newPath) => {
    console.log(newPath)
    isInDashboard.value = true
    if (newPath !== '/') isInDashboard.value = false
  },
)
</script>

<template>
  <div class="navbar">
    <div class="nav" :class="{ hide: isInDashboard }">
      <a @click="router.back()" title="Back"><i class="pi pi-arrow-left"></i></a>
    </div>
    <div class="topbar">
      <nav class="nav left">
        <RouterLink to="/project" title="Projects"><i class="pi pi-briefcase"></i></RouterLink>
        <RouterLink to="/blog" title="Blog"><i class="pi pi-book"></i></RouterLink>
      </nav>
      <nav class="nav mid">
        <RouterLink to="/" title="Dashboard"><i class="pi pi-home"></i></RouterLink>
      </nav>
      <nav class="nav right">
        <RouterLink to="/about" title="About Me"><i class="pi pi-user"></i></RouterLink>
        <a href="/Dimas_Aji_Wardhana_-_Software_Engineer.pdf" target="_blank" title="Download CV">
          <i class="pi pi-file-pdf"></i>
        </a>
      </nav>
    </div>
    <div class="nav">
      <a title="Search">
        <i class="pi pi-search"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}
.hide {
  visibility: hidden;
}
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
  padding: 1em;
  transition: all 0.3s ease;
}

.nav i {
  color: white;
  font-size: 1.25em;
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

@media (max-width: 768px) {
  .nav {
    padding: 0.25em;
    margin: 5px;
  }
  .nav i {
    font-size: 1em;
  }
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
