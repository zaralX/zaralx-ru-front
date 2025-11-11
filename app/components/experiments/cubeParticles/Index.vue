<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ExperimentCard from "~/components/experiments/ExperimentCard.vue";
import {animate, random} from "animejs";

const container = ref<HTMLDivElement | null>(null)
const squares = ref<HTMLElement[]>([])

const NUM_SQUARES = 25

onMounted(() => {
  if (!container.value) return

  const rect = container.value.getBoundingClientRect()

  for (let i = 0; i < NUM_SQUARES; i++) {
    const el = document.createElement('div')
    el.classList.add('particle')
    container.value.appendChild(el)
    squares.value.push(el)
  }

  animate(squares.value, {
    // scale: [1, 0.5, 1],
    x: () => random(-rect.width, rect.width),
    y: () => random(-rect.height, rect.height),
    duration: () => random(1000, 2500),
    opacity: 0,
    loop: true
  })
})
</script>

<template>
  <ExperimentCard>
    <div ref="container" class="relative w-full h-full overflow-hidden flex justify-center items-center">
      <div class="square-grid -z-10"></div>
    </div>
  </ExperimentCard>
</template>

<style>
.particle {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: rgb(var(--rgb-current-1));
  border-radius: 2px;
}
</style>
