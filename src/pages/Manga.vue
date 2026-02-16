<template>
  <div class="space-y-8">
    <BackButton class="mb-2" />
    <SearchBar searchType="manga" @search="handleSearch" />

    <Loader v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="retry" />
    <div v-else-if="results.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <MangaCard v-for="manga in results" :key="manga.id" :manga="manga" />
    </div>
    <p v-else-if="searched && !loading" class="text-center text-muted py-16 glass-card max-w-md mx-auto px-8">
      no manga found. try another title.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackButton from '@/components/BackButton.vue'
import SearchBar from '@/components/SearchBar.vue'
import MangaCard from '@/components/MangaCard.vue'
import Loader from '@/components/Loader.vue'
import ErrorState from '@/components/ErrorState.vue'
import { useSearch } from '@/composables/useSearch'
import { api } from '@/services/api'

const { results, loading, error, search } = useSearch(api.searchManga)
const searched = ref(false)
let lastQuery = ''

async function handleSearch(query: string) {
  searched.value = true
  lastQuery = query
  await search(query)
}

async function retry() {
  if (lastQuery) await search(lastQuery)
}
</script>