<template>
  <div class="post-card" @click="$emit('click')">
    <img :src="post.image" :alt="post.title" class="post-image" />
    <div class="post-content">
      <div class="post-meta">
        <img :src="post.authorImg" :alt="post.author" class="author-img" />
        <div class="author-info">
          <div class="author-name">{{ post.author }}</div>
          <div class="post-date">{{ post.date }} • {{ post.time }}</div>
        </div>
      </div>
      <h3 class="post-title">{{ post.title }}</h3>
      <p class="post-excerpt">{{ post.excerpt }}</p>
      <div class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '../data/posts'

defineProps<{ post: BlogPost }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<style scoped>
/* Styles are in global.css */
</style>