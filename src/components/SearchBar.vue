<template>
  <div class="relative group">
    <form @submit.prevent="emitSearch">
      <input
        type="text"
        v-model="query"
        @input="onInput"
        @focus="showSuggestions = true"
        @blur="handleBlur"
        :placeholder="`Search ${searchType}...`"
        class="w-full glass-card border-0 py-4 pl-14 pr-6 text-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
      />
      <button
        type="submit"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-accent hover:text-accent-light transition-colors"
        :disabled="!query.trim()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </form>

    <SearchSuggestions
      :suggestions="suggestions"
      :show="showSuggestions && suggestions.length > 0"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounce } from '@vueuse/core'
import SearchSuggestions, { type Suggestion } from './SearchSuggestions.vue'

const props = defineProps<{
  searchType: 'anime' | 'manga'
}>()

const emit = defineEmits<{ (e: 'search', query: string): void }>()

const query = ref('')
const showSuggestions = ref(false)
const suggestions = ref<Suggestion[]>([])
const debouncedQuery = useDebounce(query, 300)

const router = useRouter()

async function fetchSuggestions() {
  if (!debouncedQuery.value.trim()) {
    suggestions.value = []
    return
  }
  try {
    if (props.searchType === 'anime') {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(debouncedQuery.value)}&limit=5`)
      if (res.ok) {
        const data = await res.json()
        suggestions.value = data.data.map((item: any) => ({
          id: item.mal_id,
          title: item.title,
          type: 'anime',
          image: item.images.jpg.small_image_url
        }))
      }
    } else {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query ($search: String) {
              Page(perPage: 5) {
                media(search: $search, type: MANGA) {
                  id
                  title { romaji }
                  coverImage { medium }
                }
              }
            }
          `,
          variables: { search: debouncedQuery.value }
        })
      })
      if (res.ok) {
        const data = await res.json()
        suggestions.value = data.data.Page.media.map((item: any) => ({
          id: item.id,
          title: item.title.romaji,
          type: 'manga',
          image: item.coverImage.medium
        }))
      }
    }
  } catch (error) {
    console.error('suggestions error', error)
    suggestions.value = []
  }
}

watch(debouncedQuery, fetchSuggestions)

function onInput() {}

function emitSearch() {
  if (query.value.trim()) {
    emit('search', query.value)
    showSuggestions.value = false
  }
}

function handleSelect(item: Suggestion) {
  showSuggestions.value = false
  query.value = item.title
  if (item.type === 'anime') {
    router.push(`/anime/${item.id}`)
  } else {
    router.push(`/manga/${item.id}`)
  }
}

function handleBlur() {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>