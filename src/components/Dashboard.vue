<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import blogData from '@/data/blog.json'
import experienceData from '@/data/experience.json'
import projectsData from '@/data/projects.json'
import ContentContainer from './ContentContainer.vue'
import BadgeSet from './BadgeSet.vue'
import SocialLinks from './About/SocialLinks.vue'

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
    <h1 class="dashboard-title">Dashboard</h1>

    <div class="dashboard-grid">
      <!-- Latest Experience -->
      <ContentContainer title="Latest Experience">
        <div v-if="latestExperience" class="card-content">
          <h3 class="card-subtitle">{{ latestExperience.role }}</h3>
          <p class="card-text">{{ latestExperience.company }}</p>
          <p class="card-date">{{ latestExperience.startDate }} - {{ latestExperience.endDate }}</p>
          <div class="tags-container">
            <BadgeSet
              v-for="tag in latestExperience.tags.slice(0, 3)"
              :key="tag"
              :text="tag"
              :color="'blue'"
            />
          </div>
          <button @click="router.push('/about')" class="view-all-button">
            View all experiences →
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
            View all blog posts →
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
            View all projects →
          </button>
        </div>
        <p v-else class="no-data">No projects available</p>
      </ContentContainer>

      <div class="social-links">
        <SocialLinks />
      </div>
    </div>
  </div>
</template>

<style scoped>
.social-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.dashboard-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #e2e8f0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-subtitle {
  font-weight: 500;
  margin: 0;
  color: #e2e8f0;
}

.card-text {
  color: #e2e8f0;
  margin: 0;
}

.card-date {
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.view-all-button {
  background: none;
  border: none;
  color: #63b3ed;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.view-all-button:hover {
  text-decoration: underline;
}

.no-data {
  color: #a0aec0;
  margin: 0;
}
</style>
