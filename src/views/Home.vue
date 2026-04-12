<template>
  <div class="home-page">
    <div class="hero">
      <h1>Twin Pears</h1>
      <p>Midnight uploads, no filters</p>
    </div>
    <h2 class="section-title">When Words Bloom</h2>
    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['category-btn', { active: currentCategory === cat }]"
        @click="currentCategory = cat"
      >
        {{ cat === 'all' ? 'All Posts' : cat }}
      </button>
    </div>
    <div class="posts-grid">
      <PostCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        @click="navigateToPost(post.slug)"
      />
      <div v-if="filteredPosts.length === 0" class="no-results">
        <i class="fas fa-leaf"></i>
        <p>No posts found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { blogPosts } from '../data/posts'
import PostCard from '../components/PostCard.vue'
import { scrollMemory } from '../utils/scrollMemory'

const router = useRouter()
const categories = ['all', 'poem', 'music', 'knowledge', 'philosophy', 'history']
const currentCategory = ref('all')

const filteredPosts = computed(() => {
  if (currentCategory.value === 'all') return blogPosts
  return blogPosts.filter(p =>
    Array.isArray(p.category)
      ? p.category.includes(currentCategory.value)
      : p.category === currentCategory.value
  )
})

const navigateToPost = (slug: string) => {
  scrollMemory.save()
  router.push({ name: 'post', params: { slug } })
}

onMounted(() => {
  scrollMemory.restore()
  scrollMemory.reset()
})

// Explicitly mark as used for TypeScript (silences "never read" warnings)
void categories
void filteredPosts
void navigateToPost
void PostCard
</script>