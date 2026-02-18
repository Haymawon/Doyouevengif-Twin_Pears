<template>
  <div class="space-y-8" v-if="auth.user">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-foreground">DoYouEvenGif, <span class="text-accent">{{ auth.user.name }}</span></h1>
    </div>

    <section v-if="filteredRecommendations.length">
      <h2 class="text-xl font-semibold mb-4 text-accent">based on your history</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimeCard v-for="item in filteredRecommendations" :key="item.mal_id" :anime="item" />
      </div>
    </section>

    <section v-else>
      <h2 class="text-xl font-semibold mb-4 text-accent">trending now</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimeCard v-for="item in trending" :key="item.mal_id" :anime="item" />
      </div>
    </section>
  </div>
  <div v-else class="text-center py-16 glass-card max-w-md mx-auto">
    <p class="text-muted mb-4">please login to see personalized content</p>
    <router-link to="/login" class="btn-primary inline-block">Login</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useHomeStore } from '@/stores/home'
import { api } from '@/services/api'
import AnimeCard from '@/components/AnimeCard.vue'
import type { JikanAnime } from '@/types/anime'

const auth = useAuthStore()
const homeStore = useHomeStore()
const trending = ref<JikanAnime[]>([])

const filteredRecommendations = computed(() => {
  // Deduplicate by mal_id
  const seen = new Set()
  return homeStore.recommendations.filter((item) => {
    if (!item || !item.mal_id || !item.title || !item.images || !item.synopsis || item.episodes === undefined || item.score === undefined || !item.status) return false
    if (seen.has(item.mal_id)) return false
    seen.add(item.mal_id)
    return true
  })
})

async function loadHomeData() {
  if (!auth.user) return
  
  await homeStore.fetchHome()
  
  const trendingRes = await fetch('https://api.jikan.moe/v4/top/anime')
  const trendingData = await trendingRes.json()
  trending.value = (trendingData.data as any[]).map((item) => ({
    mal_id: item.mal_id,
    title: item.title,
    images: item.images,
    synopsis: item.synopsis ?? '',
    episodes: item.episodes ?? null,
    score: item.score ?? null,
    year: item.year ?? null,
    status: item.status ?? '',
    type: item.type,
    duration: item.duration,
    rating: item.rating,
  })).filter((item) => 
    item.mal_id && item.title && item.images && 
    item.synopsis !== undefined && item.episodes !== undefined && 
    item.score !== undefined && item.status
  )
}

onMounted(loadHomeData)
onBeforeRouteUpdate(loadHomeData)
</script>
