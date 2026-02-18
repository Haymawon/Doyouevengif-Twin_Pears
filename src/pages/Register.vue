<template>
  <div class="max-w-md mx-auto glass-card p-8">
    <BackButton class="mb-4" />
    <h1 class="text-3xl font-bold mb-6 text-accent">register</h1>
    <form @submit.prevent="handleRegister">
      <div class="space-y-4">
        <input v-model="name" type="text" placeholder="full name" required class="w-full bg-secondary border border-theme rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-muted">
        <input v-model="username" type="text" placeholder="username (lowercase)" required class="w-full bg-secondary border border-theme rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-muted">
        <input v-model="email" type="email" placeholder="email" required class="w-full bg-secondary border border-theme rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-muted">
        <input v-model="password" type="password" placeholder="password" required class="w-full bg-secondary border border-theme rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-muted">
        <label class="flex items-center gap-2 text-foreground">
          <input type="checkbox" v-model="terms" required>
          <span>I agree to the <router-link to="/terms" class="text-accent hover:underline">terms</router-link> and <router-link to="/privacy" class="text-accent hover:underline">privacy</router-link></span>
        </label>
        <button type="submit" class="w-full btn-primary">register</button>
      </div>
    </form>
    <p class="mt-4 text-center text-muted">
      already have an account?
      <router-link to="/login" class="text-accent hover:underline">login</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'
import BackButton from '@/components/BackButton.vue'


const router = useRouter()
const auth = useAuthStore()
const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const terms = ref(false)

async function handleRegister() {
  if (!terms.value) {
    alert('You must agree to terms and privacy')
    return
  }
  try {
    const res = await api.register({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      terms: terms.value
    })
    auth.setAuth(res.token, res.user)
    router.push('/')
  } catch (err: any) {
    alert(err.message)
  }
}
</script>
