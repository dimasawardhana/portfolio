<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import blogData from '@/data/blog.json'
import experienceData from '@/data/experience.json'
import projectsData from '@/data/projects.json'
import ContentContainer from './ContentContainer.vue'
import BadgeSet from './BadgeSet.vue'
import SocialLinks from './About/SocialLinks.vue'
import Greeting from './Greeting.vue'

const router = useRouter()

const latestBlog = ref<any>(null)
const latestExperience = ref<any>(null)
const latestProject = ref<any>(null)

onMounted(() => {
  // Get latest published blog post
  latestBlog.value = blogData
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())[0]

  // Get latest experience
  latestExperience.value = experienceData.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )[0]

  // Get latest project
  latestProject.value = projectsData[0]
})
</script>

<template>
  <div class="dashboard">
    <div class="hero-section">
      <Greeting />
      <h2 class="dashboard-title">Look at what I've accomplished so far:</h2>
    </div>

    <div class="dashboard-grid">
      <ContentContainer title="Latest Experience">
        <div v-if="latestExperience" class="card-content">
          <h3 class="card-subtitle">{{ latestExperience.role }}</h3>
          <p class="card-text">{{ latestExperience.company }}</p>
          <p class="card-date">{{ latestExperience.startDate }} - {{ latestExperience.endDate }}</p>
          <div class="tags-container">
            <BadgeSet v-for="tag in latestExperience.tags" :key="tag" :text="tag" :color="'blue'" />
          </div>
          <button @click="router.push('/about')" class="view-all-button">
            View all experiences <span>&rarr;</span>
          </button>
        </div>
        <p v-else class="no-data">No experience available</p>
      </ContentContainer>

      <!-- Latest Blog Post -->
      <ContentContainer title="Latest Blog Post">
        <div v-if="latestBlog" class="card-content">
          <h3 class="card-subtitle">{{ latestBlog.title }}</h3>
          <p class="card-date">
            {{ new Date(latestBlog.published_date).toLocaleDateString() }}
          </p>
          <div class="tags-container">
            <BadgeSet v-for="tag in latestBlog.tags" :key="tag" :text="tag" color="green" />
          </div>
          <button @click="router.push('/blog')" class="view-all-button">
            View all blog posts <span>&rarr;</span>
          </button>
        </div>
        <p v-else class="no-data">No blog posts available</p>
      </ContentContainer>

      <!-- Latest Project -->
      <ContentContainer title="Latest Project">
        <div v-if="latestProject" class="card-content">
          <h3 class="card-subtitle">{{ latestProject.project_name }}</h3>
          <p class="card-text">{{ latestProject.description }}</p>
          <div class="tags-container">
            <BadgeSet
              v-for="tech in latestProject.tech_stacks.slice(0, 3)"
              :key="tech"
              :text="tech"
            />
          </div>
          <button @click="router.push('/project')" class="view-all-button">
            View all projects <span>&rarr;</span>
          </button>
        </div>
        <p v-else class="no-data">No projects available</p>
      </ContentContainer>

      <!-- Social Links (now wrapped in a card) -->
      <ContentContainer title="Connect With Me">
        <div class="social-links-wrapper">
          <p class="card-text">Feel free to reach out for collaborations or just a friendly hello!</p>
          <div class="social-links">
            <SocialLinks />
          </div>
        </div>
      </ContentContainer>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.social-links-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.social-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 6.5rem 1rem 1rem 1rem;
}

.dashboard-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0;
  color: var(--color-heading);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-subtitle {
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
  color: var(--color-heading);
}

.card-text {
  color: var(--color-text);
  margin: 0;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-date {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.view-all-button {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto; 
  padding-top: 0.5rem;
}

.view-all-button span {
  transition: transform 0.2s ease;
}

.view-all-button:hover span {
  transform: translateX(4px);
}

.no-data {
  color: var(--color-text-muted);
  margin: 0;
}
</style>
