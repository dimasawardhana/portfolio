<script lang="ts" setup>
import { ref, computed } from 'vue'
import blogData from '@/data/blog.json'
import type { IBlog } from '@/interfaces/blog.interface'
import ContentContainer from '@/components/ContentContainer.vue'
import Badge from '@/components/BadgeSet.vue' // Import Badge component

const topbarHeight = `${document.querySelector('.topbar')?.scrollHeight || 0}px`

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

const MAX_CONTENT_LENGTH = 100

const getPreviewContent = (content: string) => {
  if (content.length <= MAX_CONTENT_LENGTH) {
    return content
  }
  const trimmedContent = content.substring(0, MAX_CONTENT_LENGTH)
  return trimmedContent.substring(0, trimmedContent.lastIndexOf(' ')) + '...'
}
</script>
<template>
  <div class="content">
    <div class="items">
      <ContentContainer id="posts">
        <div class="posts">
          <div v-if="filteredPosts.length === 0" class="no-results">
            <h2>No results found.</h2>
          </div>
          <router-link
            v-else
            v-for="post in filteredPosts"
            :key="post.published_date"
            :to="{ name: 'Blog Detail', params: { id: post.id } }"
            class="post-link"
          >
            <div class="post">
              <h3 class="post-title">{{ post.title }}</h3>
              <div class="tags">
                <Badge v-for="tag in post.tags" :key="tag" :text="tag" />
              </div>
              <p class="post-content">{{ getPreviewContent(post.content) }}</p>
              <p class="post-meta">Published Date: {{ post.published_date }}</p>
              <p class="post-meta">
                Status:
                <span
                  :class="{
                    'status-published': post.status === 'published',
                    'status-draft': post.status === 'draft',
                  }"
                >
                  {{ post.status }}
                </span>
              </p>
            </div>
          </router-link>
        </div>
      </ContentContainer>
    </div>
    <div class="items">
      <ContentContainer id="filters">
        <div class="filters">
          <input v-model="searchQuery" type="text" placeholder="Search by title" class="input" />
          <input v-model="selectedTag" type="text" placeholder="Filter by tag" class="input" />
          <select v-model="selectedStatus" class="select">
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </ContentContainer>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  height: calc(100vh - v-bind(topbarHeight) - 0.625rem);
  margin: 0.625rem 1rem;
}
.content .items:first-child {
  flex: 3;
}
.content .items:last-child {
  flex: 1;
}
@media (max-width: 767px) {
  .content {
    flex-direction: column-reverse;
    overflow-y: auto;
    justify-content: flex-end;
    flex-basis: fit-content;
  }
  .content .items:first-child {
    flex: 0 0 auto;
  }
  .content .items:last-child {
    flex: 0 0 auto;
  }
}
.posts {
  height: 100%; /* Set height to 100% */
}
.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%; /* Set height to 100% */
}
.input,
.select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}
.input:focus,
.select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.post {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  color: #f9f9f9;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
.post-link:hover .post {
  transform: translateY(-5px);
  border: 1px solid #333;
  background-color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.post-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #fff;
}
.tags {
  margin-bottom: 10px;
}
.badge {
  display: inline-block;
  padding: 3px 7px; /* Smaller padding */
  margin-right: 5px;
  border-radius: 12px;
  background-color: #555; /* Darker background color */
  color: white;
  font-size: 0.75em; /* Smaller font size */
}
.post-content {
  font-size: 1.1em;
  margin-bottom: 10px;
}
.post-meta {
  font-size: 0.9em;
  color: #777;
}
.status-published {
  color: green;
  font-weight: bold;
}
.status-draft {
  color: orange;
  font-weight: bold;
}
.post-title-link {
  color: #007bff;
  text-decoration: none;
}
.post-title-link:hover {
  text-decoration: underline;
}
.no-results {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  margin-top: 20px;
}
</style>
