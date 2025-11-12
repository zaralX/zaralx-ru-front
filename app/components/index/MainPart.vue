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
  <div class="px-4 sm:px-8 md:px-32">
    <div class="h-[75vh] min-h-96 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 transform -translate-1/2">
        <div class="flex justify-center items-center">
          <PerspectiveCube :class="{ 'size-100': !$device.isDesktop }" />
        </div>
      </div>
      <div class="absolute top-1/2 left-1/2 transform -translate-1/2">
        <p id="index-hello" class="text-stone-400">Привет, я:</p>
        <p id="index-title" class="text-3xl md:text-4xl lg:text-5xl font-unbounded">zaralX</p>
      </div>
      <div class="absolute hidden lg:flex justify-center items-center w-full h-full" id="index-projects-container">
        <!--      <div class="absolute w-full h-1 bg-stone-950 top-0 z-50 blur-sm"></div>-->
        <IndexProjectWindow id="index-project-1" />
        <IndexProjectWindow id="index-project-2" />
        <IndexProjectWindow id="index-project-3" />
      </div>
    </div>
  </div>
</template>
