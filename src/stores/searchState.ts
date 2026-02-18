import { defineStore } from 'pinia'

type SearchCategoryState = {
  query: string;
  results: any[];
  scroll: number;
};

export const useSearchStateStore = defineStore('searchState', {
  state: (): { anime: SearchCategoryState; manga: SearchCategoryState } => ({
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
      setAnimeState(query: string, results: any[], scroll: number) {
        this.anime = { query, results, scroll }
      },
      setMangaState(query: string, results: any[], scroll: number) {
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
