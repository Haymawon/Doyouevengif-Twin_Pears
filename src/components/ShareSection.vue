<template>
  <div class="share-section">
    <span class="share-label">Spread the word</span>
    <div class="share-buttons">
      <button class="share-btn" @click="copyLink" title="Copy link"><i class="fas fa-link"></i></button>
      <button class="share-btn" @click="shareX" title="Share on X"><i class="fab fa-twitter"></i></button>
      <button class="share-btn" @click="shareFacebook" title="Share on Facebook"><i class="fab fa-facebook-f"></i></button>
      <button class="share-btn" @click="shareThreads" title="Share on Threads"><i class="fab fa-threads"></i></button>
    </div>
    <div :class="['copy-feedback', { show: feedbackVisible }]">Link copied</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BlogPost } from '../data/posts'

const props = defineProps<{ post: BlogPost }>()
const feedbackVisible = ref(false)

const url = `${window.location.origin}/post/${props.post.slug}`
const text = encodeURIComponent(`“${props.post.title}” on Twin Pears`)

const copyLink = async () => {
  await navigator.clipboard.writeText(url)
  feedbackVisible.value = true
  setTimeout(() => feedbackVisible.value = false, 2000)
}
const shareX = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`, '_blank')
const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
const shareThreads = () => window.open(`https://www.threads.net/intent/post?text=${text}%20${encodeURIComponent(url)}`, '_blank')
</script>

<style scoped>
/* Styles are in global.css */
</style>