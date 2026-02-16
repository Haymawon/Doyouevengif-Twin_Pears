import { ref } from 'vue'

export function useSearch<T>(searchFn: (query: string) => Promise<T[]>) {
  const results = ref<T[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const search = async (query: string) => {
    if (!query.trim()) {
      results.value = []
      return
    }

    loading.value = true
    error.value = null
    try {
      results.value = await searchFn(query)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'something went wrong'
      results.value = []
    } finally {
      loading.value = false
    }
  }

  return { results, loading, error, search }
}