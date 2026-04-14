<template>
  <div>
    <button class="back-button" @click="router.push('/')">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <div v-if="post" class="post-full">
      <div class="full-post-image-container">
        <img :src="post.image" :alt="post.title" id="full-post-image" />
      </div>
      <div class="post-full-content">
        <div class="post-meta">
          <img :src="post.authorImg" :alt="post.author" class="author-img" />
          <div class="author-info">
            <div class="author-name">{{ post.author }}</div>
            <div class="post-date">{{ post.date }} • {{ post.time }}</div>
          </div>
        </div>
        <h2 class="post-full-title">{{ post.title }}</h2>
        <div class="post-full-text" v-html="post.content"></div>
        <ShareSection :post="post" />
      </div>
    </div>

    <div v-else class="not-found">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Post not found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { blogPosts } from '../data/posts'
import ShareSection from '../components/ShareSection.vue'

const router = useRouter()
const route = useRoute()

const slug = computed(() => route.params.slug as string)
const post = computed(() => blogPosts.find(p => p.slug === slug.value))

const updateMeta = () => {
  const base = window.location.origin
  const p = post.value
  const title = p ? `${p.title} — Twin Pears` : 'Twin Pears · 5log'
  const desc = p ? p.excerpt : 'Midnight uploads, no filters. Poems, thoughts, and raw words.'
  const image = p ? `${base}${p.image}` : `${base}/logo.png`
  const url = p ? `${base}/post/${p.slug}` : base

  document.title = title
  setMeta('description', desc)
  setMeta('og:title', title)
  setMeta('og:description', desc)
  setMeta('og:image', image)
  setMeta('og:url', url)
  setMeta('twitter:title', title)
  setMeta('twitter:description', desc)
  setMeta('twitter:image', image)
  setMeta('twitter:url', url)
}

const setMeta = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

watch(post, updateMeta, { immediate: true })
</script>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  background: #9b5de5;
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 2rem;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(125, 70, 194, 0.3);
}
.back-button i { margin-right: 8px; }
.back-button:hover { background: #7d46c2; transform: translateX(-4px); }

.not-found {
  text-align: center;
  padding: 4rem;
  color: #b0a5c5;
}
.not-found i { font-size: 3rem; margin-bottom: 1rem; }

/* These styles are duplicated from global.css for safety */
.post-full {
  background: #080511;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  margin-bottom: 3rem;
  border: 1px solid #2a1b3d;
}
#full-post-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}
.post-full-content { padding: 2rem; }
.post-meta { display: flex; align-items: center; margin-bottom: 1rem; }
.author-img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid #9b5de5;
}
.author-name { font-weight: 600; color: #b28cef; }
.post-date { font-size: 0.85rem; color: #b0a5c5; }
.post-full-title {
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  margin: 1.5rem 0 1rem;
  color: #b28cef;
}
.post-full-text { line-height: 1.9; font-size: 1.1rem; color: #f0e9ff; }
.post-full-text :deep(p) { margin-bottom: 1.5rem; }
.post-full-text :deep(.poem) {
  font-style: italic;
  padding: 1.2rem 0 1.2rem 1.8rem;
  border-left: 3px solid #9b5de5;
  margin: 2rem 0;
  font-family: "Nunito", sans-serif;
  color: #b0a5c5;
}
</style>