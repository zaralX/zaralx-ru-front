<script setup lang="ts">
import ExperimentCard from "~/components/experiments/ExperimentCard.vue";

import { animate, stagger, splitText } from 'animejs';

onMounted(() => {
  const { chars } = splitText('h2', { words: false, chars: true });

  animate(chars, {
    // Property keyframes
    y: [
      { to: '-2.75rem', ease: 'outExpo', duration: 600 },
      { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
    ],
    // Property specific parameters
    rotate: {
      from: '-1turn',
      delay: 0
    },
    delay: stagger(50),
    ease: 'inOutCirc',
    loopDelay: 1000,
    loop: true
  });
})
</script>

<template>
  <ExperimentCard>
    <div class="relative flex items-center justify-center h-full text-orange-500">
      <div class="square-grid -z-10"></div>
      <h2 class="text-2xl">ANIME.JS TEST</h2>
      <h3 class="text-2xl absolute opacity-50">ANIME.JS TEST</h3>
    </div>
  </ExperimentCard>
</template>

<style scoped>
#animation .text-xl {
  font-size: 1.5rem;
  color: currentColor;
  letter-spacing: 0.06em;
}
</style>