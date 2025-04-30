<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import blogData from '@/data/blog.json'
import type { IBlog } from '@/interfaces/blog.interface'
import ContentContainer from '@/components/ContentContainer.vue'
import { marked } from 'marked'
import 'github-markdown-css' // import the CSS file

type langType = 'ID' | 'EN'

const route = useRoute()
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

async function renderMD(lang: langType) {
  let content = ''
  const _filePath = lang === 'ID' ? post.value?.filepathID : post.value?.filepath
  if (_filePath) {
    const filePath = _filePath.replace('@/assets/posts/', '/src/assets/posts/')
    const fileKey = `${filePath}`

    if (files[fileKey]) {
      try {
        const text = await files[fileKey]()
        content = await marked(text as string)
      } catch (error) {
        console.error('Error fetching post content:', error)
        content = await marked(post.value.content || '') // fallback to content field
      }
    }
    if (filePath.includes('http')) {
      try {
        const text = await fetch(`${filePath}`).then((res) => res.text())
        content = await marked(text)
      } catch (error) {
        console.error('Error fetching post content:', error)
        content = await marked(post.value.content || '') // fallback to content field
      }
    } else {
      content = await marked(post.value.content || '') // fallback to content field
    }
  } else {
    content = await marked(post.value?.content || '') // use content field if filepath is not found
  }

  content.replace(
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
</script>

<template>
  <ContentContainer id="post-detail" :title="post.title" section-style="margin: 2em">
    <div v-if="post">
      <div class="meta">
        <div class="tags">
          <span v-for="tag in tags" :key="tag" class="badge">{{ tag }}</span>
        </div>
        <div class="lang">
          <div
            class="lang-option"
            :class="{ activeOption: activeLang === 'ID' }"
            @click="changeLang('ID')"
          >
            ID
          </div>
          <div
            class="lang-option"
            :class="{ activeOption: activeLang === 'EN' }"
            @click="changeLang('EN')"
          >
            EN
          </div>
        </div>
      </div>
      <div class="post-content markdown-body" v-html="postContent"></div>
      <!-- use v-html to render HTML content with markdown-body class -->
      <p class="post-meta">Published Date: {{ post.published_date }}</p>
    </div>
    <div v-else class="no-results">Post not found.</div>
  </ContentContainer>
</template>

<style>
.markdown-body pre {
  background-color: rgb(40, 44, 52, 0.8) !important;
}
code {
  font-family: Consolas, 'courier new';
  color: #ff0000;
  padding: 2px;
  font-size: 105%;
}
img {
  max-width: 100% !important;
  height: auto;
}
.meta {
  display: flex;
  justify-content: space-between;
}
.lang {
  display: flex;
  justify-content: flex-end;
}
.lang-option {
  padding: 5px 10px;
}
.lang-option:hover {
  cursor: pointer;
}
.activeOption {
  box-shadow: whitesmoke 0px 0px 2px;
}
.tags {
  margin-bottom: 10px;
}
.badge {
  display: inline-block;
  padding: 3px 7px;
  margin-right: 5px;
  border-radius: 12px;
  background-color: #555;
  color: white;
  font-size: 0.75em;
}
.post-content {
  font-size: 1.1em;
  margin-bottom: 10px;
  color: #f9f9f9;
}
.markdown-body img {
  max-width: 600px; /* Adjust as needed */
  height: auto; /* Maintain aspect ratio */
  display: inline-flex;
}
.post-meta {
  font-size: 0.9em;
  color: #777;
}
.no-results {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  margin-top: 20px;
}

/* Custom styles for markdown-body */
.markdown-body {
  font-size: 1em;
  line-height: 1.6;
  color: whitesmoke;
  background-color: inherit;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.markdown-body p {
  margin-bottom: 1em;
}

.markdown-body a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body strong {
  font-weight: bold;
}

.markdown-body blockquote {
  padding: 0.5em 1em;
  margin: 0;
  border-left: 0.25em solid #dfe2e5;
  color: #6a737d;
  background-color: #f6f8fa;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
  margin-bottom: 1em;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

.markdown-body pre {
  padding: 1em;
  margin: 0;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}
</style>
