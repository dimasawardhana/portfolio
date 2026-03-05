<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import blogData from '@/data/blog.json'
import type { IBlog } from '@/interfaces/blog.interface'
import Badge from '@/components/BadgeSet.vue'
import { Marked } from 'marked'
import 'github-markdown-css' // import the CSS file
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

type langType = 'ID' | 'EN'

const route = useRoute()
const router = useRouter()
const activeLang = ref<langType>('ID')
const postId = route.params.id as string
const blog = blogData.find((p) => p.id === postId)
const post = ref<IBlog>({
  status: blog?.status === 'published' ? 'published' : 'draft',
  tags: blog?.tags || [],
  content: blog?.content || '',
  published_date: blog?.published_date || '',
  title: blog?.title || '',
  filepath: blog?.filepath || '',
  filepathID: blog?.filepathID || '',
  id: blog?.id || '',
})

const postContent = ref<string>('') // initialize as empty string

const isMobileScreen = window.matchMedia('(max-width: 767px)').matches

const tags = isMobileScreen ? post.value.tags.slice(0, 2) : post.value.tags

const files = import.meta.glob('@/assets/posts/*.md', { query: '?raw' }) // import as raw text

const marked = new Marked(markedHighlight({
	emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  }))

async function renderMD(lang: langType) {

  let content = ''
  const _filePath = lang === 'ID' ? post.value?.filepathID : post.value?.filepath
  if (_filePath) {
    const filePath = _filePath.replace('@/assets/posts/', '/src/assets/posts/')
    const fileKey = `${filePath}`

    if (files[fileKey]) {
      try {
        const text = await files[fileKey]()
        content = await marked.parse(text as string)
      } catch (error) {
        console.error('Error fetching post content:', error)
        content = await marked.parse(post.value.content || '') // fallback to content field
      }
    }
    else if (filePath.includes('http')) {
      try {
        const text = await fetch(`${filePath}`).then((res) => res.text())
        content = await marked.parse(text)
      } catch (error) {
        console.error('Error fetching post content:', error)
        content = await marked.parse(post.value.content || '') // fallback to content field
      }
    } else {
      content = await marked.parse(post.value.content || '') // fallback to content field
    }
  } else {
    content = await marked.parse(post.value?.content || '') // use content field if filepath is not found
  }

  content = content.replace(
    /<img src="\/picture\/(.*?)"/g,
    (match, filename) =>
      `<img src="${window.location.origin}/picture/${filename}" alt="${filename}" />`,
  )
  postContent.value = content
}

onMounted(async () => {
  renderMD(activeLang.value)
})

function changeLang(lang: 'ID' | 'EN') {
  activeLang.value = lang
  renderMD(lang)
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="post-detail-page">
    <div v-if="post && post.id" class="post-container">
      <button class="back-button" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Blog
      </button>

      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        
        <div class="post-meta-container">
          <div class="tags-container">
            <Badge v-for="tag in tags" :key="tag" :text="tag" />
          </div>
          
          <div class="lang-selector">
            <button
              class="lang-btn"
              :class="{ activeOption: activeLang === 'ID' }"
              @click="changeLang('ID')"
            >
              ID
            </button>
            <button
              class="lang-btn"
              :class="{ activeOption: activeLang === 'EN' }"
              @click="changeLang('EN')"
            >
              EN
            </button>
          </div>
        </div>
        
        <div class="post-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          {{ post.published_date }}
        </div>
      </div>
      
      <div class="divider"></div>

      <div class="post-content markdown-body" v-html="postContent"></div>
    </div>
    
    <div v-else class="post-not-found">
      <h2>Post not found</h2>
      <button class="back-button primary" @click="goBack">Return to Blog</button>
    </div>
  </div>
</template>

<style scoped>
.post-detail-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 6.5rem 1rem 4rem 1rem;
}

.post-container {
  background: var(--color-background-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2.5rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: var(--primary-color);
}

.back-button.primary {
  background: rgba(79, 209, 197, 0.1);
  color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.back-button.primary:hover {
  background: rgba(79, 209, 197, 0.2);
}

.post-header {
  margin-bottom: 2rem;
}

.post-title {
  font-size: 2.5rem;
  color: var(--color-heading);
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
}

.post-meta-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.lang-selector {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.25rem;
  border: 1px solid var(--color-border);
}

.lang-btn {
  background: none;
  border: none;
  color: var(--color-text);
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.activeOption {
  background: var(--primary-color);
  color: #1a1a2e;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-size: 0.95rem;
  font-weight: 500;
}

.divider {
  height: 1px;
  background: var(--color-border);
  margin: 2rem 0;
}

.post-not-found {
  text-align: center;
  padding: 5rem 2rem;
  background: var(--color-background-glass);
  border-radius: 16px;
  border: 1px dashed var(--color-border);
  color: var(--color-text-muted);
}

@media (max-width: 640px) {
  .post-container {
    padding: 1.5rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
}
</style>

<style>
/* Unscoped Global Markdown styles to support github-markdown-css base */
.markdown-body {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-text);
  background: transparent !important;
}

.markdown-body pre {
  background-color: rgb(20, 24, 30, 0.8) !important;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.markdown-body img {
  max-width: 100% !important;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  color: var(--color-heading);
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.3em;
}

.markdown-body h1 { font-size: 2em; }
.markdown-body h2 { font-size: 1.5em; }
.markdown-body h3 { font-size: 1.25em; border-bottom: none; }

.markdown-body p {
  margin-bottom: 1.5em;
}

.markdown-body a {
  color: var(--primary-color);
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body strong {
  font-weight: 600;
  color: var(--color-heading);
}

.markdown-body blockquote {
  padding: 0.5em 1em;
  margin: 1.5em 0;
  border-left: 0.25em solid var(--primary-color);
  color: var(--color-text-muted);
  background: rgba(79, 209, 197, 0.05);
  border-radius: 0 8px 8px 0;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
  margin-bottom: 1.5em;
}

.markdown-body li {
  margin-bottom: 0.5em;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #e2e8f0;
}

.markdown-body pre code {
  background-color: transparent;
  padding: 0;
}
</style>
