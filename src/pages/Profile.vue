<template>
  <div class="max-w-md mx-auto glass-card p-8" v-if="user">
    <BackButton class="mb-4" />
    <h1 class="text-3xl font-bold mb-6 text-accent">profile</h1>
    <div class="flex items-center gap-4 mb-6">
      <div class="w-16 h-16 rounded-full accent-bg flex items-center justify-center text-2xl font-bold uppercase">
        {{ user.name.charAt(0) }}
      </div>
      <div>
        <p class="text-xl font-semibold text-foreground">{{ user.name }}</p>
        <p class="text-muted">@{{ user.username }}</p>
      </div>
    </div>

    <form @submit.prevent="updateProfile">
      <div class="space-y-4">
        <div>
          <label class="text-sm text-muted">Name (change once per week)</label>
          <input v-model="editName" type="text" class="w-full bg-secondary border border-theme rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-foreground">
        </div>
        <div>
          <label class="text-sm text-muted">Username (change once per month, lowercase)</label>
          <input v-model="editUsername" type="text" class="w-full bg-secondary border border-theme rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-foreground">
        </div>
        <button type="submit" class="w-full btn-primary">update</button>
      </div>
    </form>
    <button @click="logout" class="w-full mt-4 bg-red-900/30 hover:bg-red-900/50 text-red-400 py-3 rounded-xl transition">logout</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'
import BackButton from '@/components/BackButton.vue'

const auth = useAuthStore()
const router = useRouter()
const user = auth.user
const editName = ref(user?.name || '')
const editUsername = ref(user?.username || '')

async function updateProfile() {
  try {
    const updates: any = {}
    if (editName.value !== user?.name) updates.name = editName.value
    if (editUsername.value !== user?.username) updates.username = editUsername.value
    if (Object.keys(updates).length === 0) return
    const res = await api.updateProfile(updates)
    auth.updateUser(res)
    alert('Profile updated')
  } catch (err: any) {
    alert(err.message)
  }
}

function logout() {
  auth.logout()
  router.push('/')
}
</script>
