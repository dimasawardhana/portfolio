<script lang="ts" setup>
import router from '@/router'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'

// type
interface KBarItem {
  label: string
  type: string
  onClick: (payload: MouseEvent) => void
}

const navActive = ref(true)
const isInDashboard = ref(true)
const searchText = ref('')
const searchRef = useTemplateRef('searchRef')
const route = useRoute()

const items: KBarItem[] = [
  {
    label: 'Dashboard',
    type: 'Navigation',
    onClick: () => {
      router.replace('/')
      navActive.value = true
    },
  },
  {
    label: 'About',
    type: 'Navigation',
    onClick: () => {
      router.replace('/about')
      navActive.value = true
    },
  },
  {
    label: 'Blog',
    type: 'Navigation',
    onClick: () => {
      router.replace('/blog')
      navActive.value = true
    },
  },
  {
    label: 'Project',
    type: 'Navigation',
    onClick: () => {
      router.replace('/project')
      navActive.value = true
    },
  },
]
const searchItems = computed(() =>
  items.filter((_item) => _item.label.toLowerCase().includes(searchText.value.toLowerCase())),
)

function toggleNav() {
  const searchActive = navActive.value === true
  navActive.value = !navActive.value
  if (searchActive) {
    nextTick(() => {
      searchRef.value?.focus()
    })
  }
}

watch(
  () => route.fullPath,
  (newPath) => {
    isInDashboard.value = true
    if (newPath !== '/') isInDashboard.value = false
  },
)

document.addEventListener('keydown', function (event) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    // Your code to execute when Cmd + K is pressed
    toggleNav()
  }
})
</script>

<template>
  <div :class="{ overlay: !navActive }">
    <nav class="navbar">
      <div class="nav" :class="{ hide: isInDashboard || !navActive }">
        <a @click="router.back()" title="Back"><i class="pi pi-arrow-left"></i></a>
      </div>
      <div v-if="navActive" class="topbar">
        <nav class="nav left">
          <div class="item">
            <RouterLink to="/project" title="Projects">
              <i class="pi pi-briefcase"></i>
              <div class="label">Projects</div>
            </RouterLink>
          </div>
          <div class="item">
            <RouterLink to="/blog" title="Blog"><i class="pi pi-book"></i></RouterLink>
            <div class="label">Blog</div>
          </div>
        </nav>
        <nav class="nav mid">
          <div class="item">
            <RouterLink to="/" title="Dashboard"><i class="pi pi-home"></i></RouterLink>
            <div class="label">Dashboard</div>
          </div>
        </nav>
        <nav class="nav right">
          <div class="item">
            <RouterLink to="/about" title="About Me"><i class="pi pi-user"></i></RouterLink>
            <div class="label">About Me</div>
          </div>
          <div class="item">
            <a
              ref="cv"
              href="/Dimas_Aji_Wardhana_-_Software_Engineer.pdf"
              target="_blank"
              title="Download CV"
            >
              <i class="pi pi-file-pdf"></i>
            </a>
            <div class="label">CV</div>
          </div>
        </nav>
      </div>
      <div class="search" v-else>
        <input ref="searchRef" class="searchInput" v-model="searchText" />
      </div>
      <div class="nav">
        <a v-if="navActive" title="Search" @click="toggleNav" class="searchBtn">
          <i class="pi pi-search"></i>
          <div class="cmd">CTRL + K</div>
        </a>
        <a v-else @click="toggleNav" title="close"><i class="pi pi-times"></i></a>
      </div>
    </nav>
    <main v-if="!navActive" class="searchContent">
      <div v-if="searchItems.length === 0" class="notFoundItem">Search not found</div>
      <div v-for="item in searchItems" class="searchItem" @click="item.onClick">
        {{ item.type }}: {{ item.label }}
      </div>
    </main>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1000;
}
.cmd {
  background-color: rgb(40, 44, 52, 0.6);
  box-shadow: whitesmoke 0px 0px 2px;
  padding: 0 0.25em;
  border-radius: 5px;
  font-size: 14px;
  align-self: center;
}
.searchBtn {
  display: flex;
}
.searchContent {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.searchItem {
  flex: 0 0 100%;
  padding: 1em;
  font-size: 20px;
}
.searchItem:hover {
  cursor: pointer;
  border: 1px solid #333;
  background-color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-10px);
}
.notFoundItem {
  margin: auto;
  padding: 2em;
  font-size: 20px;
}
.search {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4em;
  animation: slide-in-left 0.5s;
}
.searchInput {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  margin: 15px;
  background-color: rgb(40, 44, 52, 0.6);
  box-shadow: whitesmoke 0px 0px 2px;
}
.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.item .label {
  display: none;
}
.item:hover .label {
  display: flex;
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
  animation: slide-in-right 0.7s;
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
  border-radius: 5px;
  display: flex;
  width: fit-content;
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

.nav a:hover {
  display: flex;
  i,
  .label {
    color: var(--primary-color);
  }
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
  .search {
    padding: 0.5em;
  }
  .searchInput {
    padding: 5px;
  }
  .searchBtn {
    .cmd {
      display: none;
    }
  }
}

@keyframes slide-in-right {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes slide-in-left {
  0% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
