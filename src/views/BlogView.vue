<script lang="ts" setup>
import { ref, computed } from 'vue'
import blogData from '@/data/blog.json'
import type { IBlog } from '@/interfaces/blog.interface'
import Badge from '@/components/BadgeSet.vue'

const posts = ref(blogData as IBlog[])
const searchQuery = ref('')
const selectedTag = ref('')
const selectedStatus = ref('published')

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTag = selectedTag.value ? post.tags.includes(selectedTag.value) : true
    const matchesStatus = selectedStatus.value ? post.status === selectedStatus.value : true
    return matchesQuery && matchesTag && matchesStatus
  })
})

const MAX_CONTENT_LENGTH = 120

const getPreviewContent = (content: string) => {
  if (content.length <= MAX_CONTENT_LENGTH) {
    return content
  }
  const trimmedContent = content.substring(0, MAX_CONTENT_LENGTH)
  return trimmedContent.substring(0, trimmedContent.lastIndexOf(' ')) + '...'
}
</script>

<template>
  <div class="blog-page">
    <div class="header-section">
      <h1 class="page-title">Blog</h1>
      
      <div class="filters">
        <input v-model="searchQuery" type="text" placeholder="Search by title..." class="filter-input" />
        <input v-model="selectedTag" type="text" placeholder="Filter by tag..." class="filter-input" />
        <select v-model="selectedStatus" class="filter-select">
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>

    <div class="posts-list">
      <div v-if="filteredPosts.length === 0" class="no-results">
        <h2>No posts found matching your criteria.</h2>
      </div>
      
      <router-link
        v-else
        v-for="post in filteredPosts"
        :key="post.id || post.published_date"
        :to="{ name: 'Blog Detail', params: { id: post.id } }"
        class="post-card"
      >
        <div class="post-content-wrapper">
          <h3 class="post-title">{{ post.title }}</h3>
          
          <div class="tags-container">
            <Badge v-for="tag in post.tags" :key="tag" :text="tag" />
          </div>
          
          <p class="post-content">{{ getPreviewContent(post.content) }}</p>
          
          <div class="post-meta">
            <span class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {{ post.published_date }}
            </span>
            <span 
              class="status-badge"
              :class="{
                'status-published': post.status === 'published',
                'status-draft': post.status === 'draft',
              }"
            >
              {{ post.status }}
            </span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  max-width: 900px;
  margin: 0 auto;
  /* Clears the floating navbar gracefully */
  padding: 6.5rem 1rem 4rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-title {
  font-size: 2rem;
  color: var(--color-heading);
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .filters {
    flex-direction: row;
    align-items: center;
  }
}

.filter-input,
.filter-select {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-text);
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.filter-input::placeholder {
  color: var(--color-text-muted);
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
  background: var(--color-background);
  box-shadow: 0 0 0 2px rgba(79, 209, 197, 0.2);
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  text-decoration: none;
  background: var(--color-background-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: block;
}

.post-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  background: var(--color-background-soft);
}

.post-content-wrapper {
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
}

.post-title {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin: 0 0 0.75rem 0;
  transition: color 0.2s ease;
}

.post-card:hover .post-title {
  color: var(--primary-color);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.post-content {
  font-size: 1rem;
  color: var(--color-text);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 500;
}

.status-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 0.8rem;
}

.status-published {
  background-color: rgba(79, 209, 197, 0.15);
  color: var(--primary-color);
}

.status-draft {
  background-color: rgba(246, 173, 85, 0.15);
  color: #f6ad55;
}

.no-results {
  text-align: center;
  color: var(--color-text-muted);
  padding: 3rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  border: 1px dashed var(--color-border);
}
</style>
