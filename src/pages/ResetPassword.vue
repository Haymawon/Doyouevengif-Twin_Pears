<template>
  <div class="max-w-md mx-auto glass-card p-8">
    <BackButton class="mb-4" />
    <h1 class="text-3xl font-bold mb-6 text-accent">set new password</h1>

    <div v-if="!success">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <input
            v-model="password"
            type="password"
            placeholder="new password"
            required
            minlength="8"
            class="w-full bg-secondary border border-theme rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-muted"
          />
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="confirm new password"
            required
            minlength="8"
            class="w-full bg-secondary border border-theme rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-muted"
          />
          <button
            type="submit"
            class="w-full btn-primary"
            :disabled="loading || !passwordsMatch"
          >
            <span v-if="loading">resetting...</span>
            <span v-else>reset password</span>
          </button>
        </div>
      </form>

      <p v-if="error" class="mt-4 text-red-400 text-sm">{{ error }}</p>
      <p v-if="!passwordsMatch && password && confirmPassword" class="mt-2 text-yellow-400 text-sm">
        passwords do not match
      </p>
    </div>

    <div v-else class="text-center space-y-4">
      <div class="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-accent">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-foreground">password updated</p>
      <p class="text-sm text-muted">you can now log in with your new password.</p>
      <router-link to="/login" class="btn-primary inline-block px-6 py-2 text-sm">
        go to login
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/services/api'
import BackButton from '@/components/BackButton.vue'

const route = useRoute()
const router = useRouter()
const token = route.query.token as string

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const passwordsMatch = computed(() => password.value === confirmPassword.value)

if (!token) {
  router.push('/login')
}

async function handleSubmit() {
  if (!passwordsMatch.value) return
  loading.value = true
  error.value = ''
  try {
    await api.resetPassword(token, password.value)
    success.value = true
  } catch (err: any) {
    error.value = err.message || 'failed to reset password'
  } finally {
    loading.value = false
  }
}
</script>
