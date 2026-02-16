<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <BackButton class="mb-4" />

    <Loader v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="fetchData" />
    <div v-else-if="anime" class="space-y-8">
      <!-- Hero with backdrop blur -->
      <div class="relative rounded-3xl overflow-hidden">
        <div class="absolute inset-0">
          <img
            :src="anime.images.jpg.large_image_url"
            :alt="anime.title"
            class="w-full h-full object-cover blur-xl scale-110 opacity-30"
          />
        </div>
        <div class="relative glass-card border-0 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
          <!-- Cover -->
          <div class="md:w-1/3 lg:w-1/4 flex-shrink-0 -mt-12 md:mt-0">
            <img
              :src="anime.images.jpg.large_image_url"
              :alt="anime.title"
              class="w-full rounded-2xl shadow-2xl ring-4 ring-accent/20"
            />
          </div>

          <!-- Info -->
          <div class="flex-1 space-y-4">
            <h1 class="text-3xl md:text-4xl font-bold text-foreground">{{ anime.title }}</h1>

            <!-- Quick stats badges -->
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-accent/20 rounded-full text-sm flex items-center gap-1">
                <span class="text-yellow-400">★</span> {{ anime.score?.toFixed(1) || '?' }}
              </span>
              <span class="px-3 py-1 bg-secondary/50 rounded-full text-sm">{{ anime.episodes || '?' }} eps</span>
              <span class="px-3 py-1 bg-secondary/50 rounded-full text-sm">{{ anime.status }}</span>
              <span v-if="anime.year" class="px-3 py-1 bg-secondary/50 rounded-full text-sm">{{ anime.year }}</span>
            </div>

            <!-- Synopsis -->
            <div class="glass-card bg-secondary/30 p-4 border-0">
              <p class="text-foreground leading-relaxed">{{ anime.synopsis || 'No synopsis available.' }}</p>
            </div>

            <!-- Additional details grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div v-if="anime.type">
                <span class="text-xs text-muted block">Type</span>
                <p class="font-medium text-foreground">{{ anime.type }}</p>
              </div>
              <div v-if="anime.duration">
                <span class="text-xs text-muted block">Duration</span>
                <p class="font-medium text-foreground">{{ anime.duration }}</p>
              </div>
              <div v-if="anime.rating">
                <span class="text-xs text-muted block">Rating</span>
                <p class="font-medium text-foreground">{{ anime.rating }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <section v-if="recommendations.length" class="space-y-4">
        <h2 class="text-2xl font-semibold text-accent">you might also like</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimeCard v-for="item in recommendations" :key="item.mal_id" :anime="item" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/services/api'
import type { JikanAnime } from '@/types/anime'
import BackButton from '@/components/BackButton.vue'
import Loader from '@/components/Loader.vue'
import ErrorState from '@/components/ErrorState.vue'
import AnimeCard from '@/components/AnimeCard.vue'

const route = useRoute()
const anime = ref<JikanAnime | null>(null)
const recommendations = ref<JikanAnime[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchData() {
  loading.value = true
  error.value = null
  try {
    const id = Number(route.params.id)
    anime.value = await api.getAnimeById(id)
    const recs = await api.getAnimeRecommendations(id)
    recommendations.value = recs.slice(0, 20)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load'
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>