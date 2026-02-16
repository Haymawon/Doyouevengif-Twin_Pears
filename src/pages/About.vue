<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <BackButton class="mb-4" />
    <h1 class="text-4xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">about doyouevengif</h1>
    
    <section class="glass-card p-6 space-y-4">
      <p class="text-lg leading-relaxed text-foreground">
        doyouevengif is a passion project for anime and manga enthusiasts. We aggregate data from 
        <a href="https://jikan.moe" target="_blank" class="text-accent hover:underline">Jikan (MyAnimeList)</a> and 
        <a href="https://anilist.co" target="_blank" class="text-accent hover:underline">AniList</a> to provide 
        a clean, modern, and personalized search experience.
      </p>
      <p class="text-lg leading-relaxed text-foreground">
        Features include user accounts, search history, personalized recommendations, and multiple themes.
        Built with Vue 3, TypeScript, Tailwind CSS, and Flask.
      </p>
    </section>

    <section class="glass-card p-6">
      <h2 class="text-2xl font-semibold mb-4 text-accent">tech stack</h2>
      <ul class="grid grid-cols-2 gap-3 text-foreground">
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-accent"></span> Vue 3 + Pinia</li>
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-accent"></span> TypeScript</li>
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-accent"></span> Tailwind CSS</li>
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-accent"></span> Flask (Python)</li>
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-accent"></span> SQLite</li>
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-accent"></span> JWT Auth</li>
      </ul>
    </section>

    <section class="glass-card p-6">
      <h2 class="text-2xl font-semibold mb-4 text-accent">data sources</h2>
      <p class="text-foreground">All anime data comes from <strong>Jikan API</strong> (MyAnimeList). Manga data comes from <strong>AniList GraphQL API</strong>.</p>
      <p class="mt-2 text-sm text-muted">We are not affiliated with MAL or AniList.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
</script>