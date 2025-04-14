<script setup lang="ts">
import { ref } from 'vue'
import projectsData from '@/data/projects.json'
import type { IProject } from '@/interfaces/project.interface'
import ContentContainer from '@/components/ContentContainer.vue'
import BadgeSet from '@/components/BadgeSet.vue'

const projects = ref(projectsData as IProject[])
</script>
<template>
  <ContentContainer>
    <h1>Projects</h1>
    <div class="projects-grid">
      <ContentContainer
        v-for="project in projects"
        :key="project.project_name"
        class="project-item"
      >
        <img
          loading="eager"
          :src="project.image_urls[0]"
          alt="Project Thumbnail"
          class="project-thumbnail"
        />
        <br />
        <a :href="project.links[0]" target="_blank">
          <button class="project-links">
            <h2>
              {{ project.project_name }}
            </h2>
          </button>
        </a>
        <p>
          Tech Stacks:
          <BadgeSet
            v-for="stack in project.tech_stacks"
            :key="project.project_name + stack"
            :text="stack"
          />
        </p>
        <br />
        <p>
          {{ project.description }}
        </p>
      </ContentContainer>
    </div>
  </ContentContainer>
</template>
<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 767px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
.project-item {
  text-align: center;
}
.project-thumbnail {
  width: 100%;
  height: auto;
  max-width: 300px;
  max-height: 200px;
}
.tech-badge {
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 4px 8px;
  margin: 2px;
}
.project-links {
  background: none;
  border: none;
  color: #63b3ed;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.project-links:hover {
  text-decoration: underline;
}
</style>
