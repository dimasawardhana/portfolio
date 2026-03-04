<script setup lang="ts">
import { ref } from 'vue'
import projectsData from '@/data/projects.json'
import type { IProject } from '@/interfaces/project.interface'
import BadgeSet from '@/components/BadgeSet.vue'

const projects = ref(projectsData as IProject[])
</script>

<template>
  <div class="project-page">
    <h1 class="page-title">Projects</h1>
    <div class="projects-grid">
      <article
        v-for="project in projects"
        :key="project.project_name"
        class="project-card"
      >
        <a :href="project.links[0]" target="_blank" rel="noopener noreferrer" class="project-link">
          <div class="image-container">
            <img
              loading="lazy"
              :src="project.image_urls[0]"
              :alt="project.project_name"
              class="project-image"
            />
          </div>
          <div class="project-content">
            <h2 class="project-title">
              {{ project.project_name }}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="external-icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </h2>
            <div class="tags-container">
              <BadgeSet
                v-for="stack in project.tech_stacks"
                :key="project.project_name + stack"
                :text="stack"
              />
            </div>
            <p class="project-description">
              {{ project.description }}
            </p>
          </div>
        </a>
      </article>
    </div>
  </div>
</template>

<style scoped>
.project-page {
  max-width: 1280px;
  margin: 0 auto;
  /* Top padding perfectly clears the floating navbar */
  padding: 6.5rem 1rem 2rem 1rem;
}

.page-title {
  font-size: 2rem;
  color: var(--color-heading);
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--color-background-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--primary-color);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.project-link {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.image-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-title {
  color: var(--color-heading);
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.2s ease;
}

.project-card:hover .project-title {
  color: var(--primary-color);
}

.external-icon {
  opacity: 0.5;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.project-card:hover .external-icon {
  opacity: 1;
  transform: scale(1.1);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.project-description {
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  /* Uncomment below if you want to clamp the description to 3 lines */
  /* display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden; */
}
</style>
