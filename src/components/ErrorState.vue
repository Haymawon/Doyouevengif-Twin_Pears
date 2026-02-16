<template>
  <div class="text-center py-16 glass-card max-w-md mx-auto px-8">
    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 text-accent mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    </div>
    <p class="text-foreground text-lg mb-2">something went wrong</p>
    <p class="text-muted text-sm">{{ message }}</p>
    <button @click="$emit('retry')" class="mt-6 btn-primary">
      try again
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
defineEmits<{ (e: 'retry'): void }>()
</script>