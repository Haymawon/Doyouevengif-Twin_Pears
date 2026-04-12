<template>
  <header>
    <router-link to="/" class="logo">
      <div class="twin-pears-logo">
        <div class="pear"></div>
        <div class="pear"></div>
      </div>
      <span>Twin Pears</span>
    </router-link>
    <button class="hamburger" @click="menuOpen = true">
      <i class="fas fa-bars"></i>
    </button>

    <Teleport to="body">
      <div :class="['nav-menu', { active: menuOpen }]">
        <button class="close-menu" @click="menuOpen = false">
          <i class="fas fa-times"></i>
        </button>
        <ul>
          <li><router-link to="/" @click="menuOpen = false"><i class="fas fa-home"></i> Home</router-link></li>
          <li><router-link to="/about" @click="menuOpen = false"><i class="fas fa-user"></i> About</router-link></li>
          <li><router-link to="/contact" @click="menuOpen = false"><i class="fas fa-envelope"></i> Contact</router-link></li>
          <li><router-link to="/privacy" @click="menuOpen = false"><i class="fas fa-lock"></i> Privacy</router-link></li>
        </ul>
      </div>
      <div :class="['overlay', { active: menuOpen }]" @click="menuOpen = false"></div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const menuOpen = ref(false)

watch(menuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<style scoped>
/* Styles are in global.css */
</style>