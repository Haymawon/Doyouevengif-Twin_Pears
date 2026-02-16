<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <div v-for="n in 10" :key="n" class="glass-card overflow-hidden">
      <div class="aspect-[2/3] bg-secondary animate-pulse"></div>
      <div class="p-4 space-y-2">
        <div class="h-4 bg-secondary animate-pulse w-3/4"></div>
        <div class="h-3 bg-secondary animate-pulse w-1/2"></div>
        <div class="h-3 bg-secondary animate-pulse w-full"></div>
      </div>
    </div>
  </div>
</template>