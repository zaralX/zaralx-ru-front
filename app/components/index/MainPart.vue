<script setup lang="ts">
import { onMounted } from 'vue'
import { animate, random, splitText, stagger, svg, utils } from "animejs";
import PerspectiveCube from "~/components/common/PerspectiveCube.vue";

function animateHello() {
  const { chars } = splitText('#index-hello', { chars: { wrap: 'clip' }});
  animate(chars, {
    y: [{ to: ['100%', '0%'] }],
    duration: 750,
    ease: 'out(3)',
    delay: stagger(50),
  });
}

function animateTitle() {
  const { chars } = splitText('#index-title', { chars: {} });
  animate(chars, {
    translateX: () => [random(-20, 20) * random(10, 20), 0],
    translateY: () => [random(10, 20) * random(10, 20), 0],
    opacity: [0, 1],
    duration: 750,
    ease: 'out(3)',
    delay: stagger(300),
  });
}

onMounted(() => {
  animateHello()
  animateTitle()
})
</script>

<template>
  <div class="h-[75vh] min-h-96 relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 transform -translate-1/2">
      <div class="flex justify-center items-center">
        <PerspectiveCube />
      </div>
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-1/2">
      <p id="index-hello" class="text-stone-400">Привет, я:</p>
      <p id="index-title" class="text-5xl font-unbounded">zaralX</p>
    </div>
    <div class="absolute top-1/2 transform -translate-y-1/2">
      <div class="w-[25vw]">
        <IndexProjectWindow :z="3" translate-y="-25%" id="index-project-1" />
        <IndexProjectWindow :z="2" translate-y="-50%" id="index-project-2" />
        <IndexProjectWindow :z="1" translate-y="-75%" id="index-project-3" />
        <div class="absolute aspect-video bg-stone-950 w-[25vw] z-50 h-8 top-48 blur-sm"></div>
        <div class="absolute aspect-video bg-stone-950 w-[25vw] z-50 h-4 top-52"></div>
      </div>
    </div>
    <div class="absolute top-1/2 right-0 transform -translate-y-1/2">
      <div>
        <IndexProjectWindow :z="3" translate-y="-25%" x-full id="index-project-4" />
        <IndexProjectWindow :z="2" translate-y="-50%" x-full id="index-project-5" />
        <IndexProjectWindow :z="1" translate-y="-75%" x-full id="index-project-6" />
        <div class="absolute aspect-video bg-stone-950 w-[25vw] z-50 h-8 top-48 blur-sm -translate-x-full"></div>
        <div class="absolute aspect-video bg-stone-950 w-[25vw] z-50 h-4 top-52 -translate-x-full"></div>
      </div>
    </div>
  </div>
</template>
