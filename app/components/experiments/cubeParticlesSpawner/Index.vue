<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ExperimentCard from "~/components/experiments/ExperimentCard.vue";
import {animate, random, set} from "animejs"; // v4+ имеет только именованные экспорты

const container = ref<HTMLDivElement | null>(null)
const squares = ref<HTMLElement[]>([])

const SPAWN_MS = 20
const PARTICLE_LIFETIME = 10000
const MAX_PARTICLES = 200

let spawnTimer: number | null = null
const liveParticles = new Set<HTMLElement>()

function spawnParticle() {
  if (!container.value) return
  const el = document.createElement('div')
  el.className = 'particle'
  container.value.appendChild(el)
  liveParticles.add(el)

  const rect = container.value.getBoundingClientRect()
  const angle = Math.random() * Math.PI * 2
  const distance =
      Math.sqrt(rect.width ** 2 + rect.height ** 2) / 2 + random(60, 200)
  const targetX = Math.cos(angle) * distance * 1.5
  const targetY = Math.sin(angle) * distance * 1.5

  animate(el, {
    translateX: targetX,
    translateY: targetY,
    opacity: 0,
    easing: 'easeOutQuad',
    duration: PARTICLE_LIFETIME + random(0, 6000),
    onComplete: () => {
      console.log(liveParticles.size)
      // вызывается по завершении
      liveParticles.delete(el)
      el.remove()
    },
  })

  // безопасное ограничение по количеству DOM-элементов
  if (liveParticles.size > MAX_PARTICLES) {
    const oldest = liveParticles.values().next().value
    if (oldest) {
      liveParticles.delete(oldest)
      oldest.remove()
    }
  }
}

onMounted(() => {
  spawnTimer = window.setInterval(spawnParticle, SPAWN_MS)
})

onBeforeUnmount(() => {
  if (spawnTimer) clearInterval(spawnTimer)
  for (const el of liveParticles) el.remove()
  liveParticles.clear()
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
  opacity: 0.5;
}
</style>
