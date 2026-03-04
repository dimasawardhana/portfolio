<script lang="ts" setup>
import router from '@/router'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'

// type
interface KBarItem {
  label: string
  type: string
  onClick: (payload?: MouseEvent) => void
}

const searchActive = ref(false)
const searchText = ref('')
const searchRef = useTemplateRef('searchRef')
const route = useRoute()

const items: KBarItem[] = [
  {
    label: 'Dashboard',
    type: 'Navigation',
    onClick: () => {
      router.replace('/')
      searchActive.value = false
    },
  },
  {
    label: 'About',
    type: 'Navigation',
    onClick: () => {
      router.replace('/about')
      searchActive.value = false
    },
  },
  {
    label: 'Blog',
    type: 'Navigation',
    onClick: () => {
      router.replace('/blog')
      searchActive.value = false
    },
  },
  {
    label: 'Project',
    type: 'Navigation',
    onClick: () => {
      router.replace('/project')
      searchActive.value = false
    },
  },
]

const searchItems = computed(() =>
  items.filter((_item) => _item.label.toLowerCase().includes(searchText.value.toLowerCase())),
)

function toggleNav() {
  searchActive.value = !searchActive.value
  if (searchActive.value) {
    nextTick(() => {
      searchRef.value?.focus()
      searchText.value = ''
    })
  }
}

document.addEventListener('keydown', function (event) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    toggleNav()
  }
  if (event.key === 'Escape' && searchActive.value) {
    searchActive.value = false
  }
})
</script>

<template>
  <!-- Floating Pill Navigation -->
  <nav class="floating-nav">
    <div class="nav-links">
      <RouterLink to="/" title="Home" class="nav-item">
        <i class="pi pi-home"></i><span class="desktop-only text-label">Home</span>
      </RouterLink>
      <RouterLink to="/about" title="About" class="nav-item">
        <i class="pi pi-user"></i><span class="desktop-only text-label">About</span>
      </RouterLink>
      <RouterLink to="/project" title="Projects" class="nav-item">
        <i class="pi pi-briefcase"></i><span class="desktop-only text-label">Projects</span>
      </RouterLink>
      <RouterLink to="/blog" title="Blog" class="nav-item">
        <i class="pi pi-book"></i><span class="desktop-only text-label">Blog</span>
      </RouterLink>
      <div class="divider"></div>
      <button @click="toggleNav" class="search-trigger" title="Search">
        <i class="pi pi-search"></i>
        <div class="cmd desktop-only">CTRL K</div>
      </button>
      <a href="/Dimas_Aji_Wardhana_-_Software_Engineer.pdf" target="_blank" title="CV" class="nav-item cv-item">
        <i class="pi pi-file-pdf"></i>
      </a>
    </div>
  </nav>

  <!-- Command Palette Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="searchActive" class="command-palette-backdrop" @click="searchActive = false">
        <div class="command-palette" @click.stop>
          <div class="search-header">
            <i class="pi pi-search"></i>
            <input 
              type="text" 
              placeholder="Search navigation..." 
              v-model="searchText"
              ref="searchRef"
              @keydown.esc="searchActive = false"
              autofocus
            />
            <button class="close-btn" @click="searchActive = false">ESC</button>
          </div>
          <div class="search-results">
            <div v-if="searchItems.length === 0" class="no-results">No results found</div>
            <div v-for="item in searchItems" :key="item.label" class="search-item" @click="item.onClick">
              <i class="pi pi-compass"></i>
              <span class="item-type">{{ item.type }}:</span> 
              <span class="item-label">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Floating Pill Navigation */
.floating-nav {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-background-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  padding: 0.5rem 0.5rem;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: var(--color-border);
  margin: 0 0.5rem;
}

.nav-item, .search-trigger {
  text-decoration: none;
  color: var(--color-text);
  padding: 0.6rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
}

.nav-item i {
  font-size: 1.1rem;
}

.nav-item:hover, .search-trigger:hover, .nav-item.router-link-active {
  background-color: var(--color-background-soft);
  color: var(--primary-color);
}

.cv-item {
  color: var(--color-border-hover);
  padding: 0.6rem;
}

.cmd {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .desktop-only {
    display: inline-flex;
  }
}

/* Command Palette Modal */
.command-palette-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15vh;
}

.command-palette {
  width: 100%;
  max-width: 500px;
  background-color: var(--color-background-glass);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  gap: 0.75rem;
}

.search-header i {
  color: var(--color-text-muted);
  font-size: 1.2rem;
}

.search-header input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: var(--color-text);
  outline: none;
}

.close-btn {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.close-btn:hover {
  opacity: 1;
  background-color: var(--color-border);
}

.search-results {
  padding: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text);
}

.search-item i {
  color: var(--primary-color);
  opacity: 0.7;
}

.item-type {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.item-label {
  font-weight: 500;
}

.search-item:hover {
  background-color: var(--color-background-soft);
  color: var(--primary-color);
}

.search-item:hover i {
  opacity: 1;
}

.no-results {
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem 0;
  font-size: 0.9rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
