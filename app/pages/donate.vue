<script setup lang="ts">
import { onMounted, computed } from 'vue'
import {animate, random, stagger} from "animejs";
import ExperimentsParticleCircleComponent from "~/components/experiments/particleCircle/Component.vue";

type Donator = {
  id: number
  name: string
  value: number
}

const props = withDefaults(defineProps<{
  list: Donator[]
}>(), {
  list: () => [{id: 1, name: "kirik", value: 100}, {id: 2, name: "burik", value: 2000}, {id: 3, name: "pupii", value: 400}]
})

const lowest = Math.min(...props.list.map(d => d.value))
const highest = Math.max(...props.list.map(d => d.value))

const rotation = ref(0)
const offset = 100

const minOffset = 10
const maxOffset = 100

const minTextSize = 0.75
const maxTextSize = 2.0

const positions = computed(() => {
  const n = props.list.length
  return props.list.map((donator, index) => {
    const angle = (index / n) * Math.PI * 2 + rotation.value

    const t = (donator.value - lowest) / (highest - lowest)
    const radius = maxOffset - t * (maxOffset - minOffset)

    return {
      ...donator,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  })
})

onMounted(() => {
  animate(rotation, {
    value: Math.PI * 2,
    duration: 10000,
    ease: 'linear',
    loop: true,
    update: () => {
      // computed positions автоматически обновляются
    }
  })
})
</script>

<template>
  <div class="px-4 sm:px-8 md:px-32 overflow-hidden">
    <div class="py-16 text-center">
      <h1 class="text-3xl font-unbounded">Спонсоры</h1>
      <p class="text-slate-400 text-lg">Спасибо вам за поддержку, вы лучшие!</p>
    </div>
    <div class="h-[50vh]">
      <div class="relative w-full h-full flex justify-center items-center">
        <p
            v-for="donator in positions"
            :key="donator.id"
            class="absolute"
            :style="{
      transform: `translate(${donator.x}px, ${donator.y}px)`,
      fontSize: `${minTextSize + (donator.value - lowest) / (highest - lowest) * (maxTextSize - minTextSize)}rem`}"
        >
          {{ donator.name }}
        </p>

        <ExperimentsParticleCircleComponent color="#FF6900" :size="2" />
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>