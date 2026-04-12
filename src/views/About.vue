<template>
  <div class="about-page">
    <button class="back-button" @click="$router.push('/')">
      <i class="fas fa-arrow-left"></i> Back
    </button>
    <div class="about-content">
      <h2 class="about-title">About Us</h2>
      <div class="about-text">
        <h2>Hello, I'm Lain!</h2>
        <p>This website, Twin Pears, is completely just for fun! It's just me and my friend Aaliyah sharing our most random, childish thoughts.</p>
        <p>One midnight—April 12, 2025—Aaliyah and I were having a dumb vs. dumb conversation (don't ask 🙃), and we randomly decided to make a website. And here it is!</p>
        <p>What started as just the two of us has grown into a little team of five. Somehow, it works—we're all different kinds of weird, and it blends perfectly.</p>
        <h2>Hello you, I'm Aaliyah!</h2>
        <p>Like Lain said, we made this just for fun! Let me explain how it came together:</p>
        <p><strong>Powered by:</strong> Deepseek, ChatGPT, and us!</p>
        <h3>What did Deepseek do?</h3>
        <p>Deepseek helped with styling and JavaScript magic.</p>
        <h3>What did ChatGPT do?</h3>
        <p>ChatGPT helped us write stuff, fix grammar, and gave us ideas when we were stuck. Basically our unpaid intern 😌</p>
        <h3>What did we do?</h3>
        <p>We came up with the ideas, gave directions, made corrections, and shaped the vision! We're both beginner Python developers (aka baby coders 🐍), learning as we go.</p>
        <p>And most importantly—we had a lot of laughs while making it.</p>
        <p>We're really sorry if the website isn't working well for you. We're not web developers and know it's not the best, but we're doing our best to improve it whenever we have time. Thanks for your patience!</p>
      </div>
      <div class="signature">Lain & Aaliyah</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No imports needed for router push in template
</script>