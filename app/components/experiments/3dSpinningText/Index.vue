<script setup lang="ts">
import { createTimeline, stagger, splitText } from 'animejs';
import ExperimentCard from "~/components/experiments/ExperimentCard.vue";

onMounted(() => {
  splitText('#experiment-3d-spinning-text', {
    chars: `<span class="char-3d word-{i}">
    <em class="face face-top">{value}</em>
    <em class="face-front">{value}</em>
    <em class="face face-bottom">{value}</em>
  </span>`,
  });

  const charsStagger = stagger(100, { start: 0 });

  createTimeline({ defaults: { ease: 'linear', loop: true, duration: 750 }})
      .add('.char-3d', { rotateX: -90 }, charsStagger)
      .add('.char-3d .face-top', { opacity: [.25, 0] }, charsStagger)
      .add('.char-3d .face-front', { opacity: [1, .5] }, charsStagger)
      .add('.char-3d .face-bottom', { opacity: [.5, 0] }, charsStagger);
})
</script>

<template>
  <ExperimentCard>
    <div class="relative w-full h-full overflow-hidden flex justify-center items-center text-orange-500">
      <div class="square-grid -z-10"></div>
      <p id="experiment-3d-spinning-text" class="text-3xl">zaralx.ru</p>
    </div>
  </ExperimentCard>
</template>

<style>
.char-3d {
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50% 1rem;
}

.face {
  position: absolute;
  left: 0;
}

.face-bottom {
  top: 100%;
  transform-origin: 50% 0%;
  transform: rotateX(90deg);
}

.face-top {
  bottom: 100%;
  transform-origin: 50% 100%;
  transform: rotateX(-90deg);
}
</style>
