import { defineStore } from 'pinia'

export const useSearchStateStore = defineStore('searchState', {
  state: () => ({
    anime: {
      query: '',
      results: [],
      scroll: 0,
    },
    manga: {
      query: '',
      results: [],
      scroll: 0,
    },
  }),
  actions: {
    setAnimeState(query, results, scroll) {
      this.anime = { query, results, scroll }
    },
    setMangaState(query, results, scroll) {
      this.manga = { query, results, scroll }
    },
    clearAnime() {
      this.anime = { query: '', results: [], scroll: 0 }
    },
    clearManga() {
      this.manga = { query: '', results: [], scroll: 0 }
    },
  },
})
