import { useAuthStore } from '@/stores/auth'
import type { JikanAnime, AniListManga } from '@/types/anime'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const auth = useAuthStore()
  const headers = new Headers(options.headers || {})
  if (auth.token) {
    headers.set('Authorization', `Bearer ${auth.token}`)
  }
  headers.set('Content-Type', 'application/json')
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  register(data: { name: string; username: string; email: string; password: string; terms: boolean }) {
    return fetchWithAuth('/register', { method: 'POST', body: JSON.stringify(data) })
  },
  login(credentials: { username: string; password: string }) {
    return fetchWithAuth('/login', { method: 'POST', body: JSON.stringify(credentials) })
  },
  getProfile() {
    return fetchWithAuth('/profile')
  },
  updateProfile(data: { name?: string; username?: string }) {
    return fetchWithAuth('/profile', { method: 'PUT', body: JSON.stringify(data) })
  },

  searchAnime(query: string): Promise<JikanAnime[]> {
    return fetchWithAuth(`/search/anime?q=${encodeURIComponent(query)}`)
  },
  searchManga(query: string): Promise<AniListManga[]> {
    return fetchWithAuth(`/search/manga?q=${encodeURIComponent(query)}`)
  },

  getAnimeById(id: number): Promise<JikanAnime> {
    return fetchWithAuth(`/anime/${id}`)
  },
  getMangaById(id: number): Promise<AniListManga> {
    return fetchWithAuth(`/manga/${id}`)
  },

  async getAnimeRecommendations(id: number): Promise<JikanAnime[]> {
    try {
      return await fetchWithAuth(`/recommendations/anime/${id}`)
    } catch {
      return []
    }
  },
  async getMangaRecommendations(id: number): Promise<any[]> {
    try {
      return await fetchWithAuth(`/recommendations/manga/${id}`)
    } catch {
      return []
    }
  },

  getHomeRecommendations(): Promise<{ recommendations: JikanAnime[] }> {
    return fetchWithAuth('/home')
  },
}