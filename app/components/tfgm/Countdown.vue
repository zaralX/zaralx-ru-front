<script setup lang="ts">
const props = defineProps<{
  target: string
}>()

const targetTime = new Date(props.target).getTime()

const mounted = ref(false)
const now = ref(targetTime)
let timer: ReturnType<typeof setInterval> | undefined

const diff = computed(() => Math.max(0, targetTime - now.value))
const started = computed(() => mounted.value && diff.value <= 0)

const parts = computed(() => {
  const total = Math.floor(diff.value / 1000)
  return [
    { value: Math.floor(total / 86400), suffix: 'д' },
    { value: Math.floor(total / 3600) % 24, suffix: 'ч' },
    { value: Math.floor(total / 60) % 60, suffix: 'м' },
    { value: total % 60, suffix: 'с' },
  ]
})

function pad(value: number) {
  return value < 10 ? `0${value}` : `${value}`
}

onMounted(() => {
  mounted.value = true
  now.value = Date.now()
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <p v-if="started" class="font-montserrat text-lime-400">

  </p>
  <p v-else class="whitespace-nowrap font-montserrat text-sm leading-none text-amber-300">
    <span class="text-stone-500">до старта</span>
    <template v-for="part in parts" :key="part.suffix">
      <span class="ml-2">{{ mounted ? pad(part.value) : '--' }}</span><span class="text-stone-500">{{ part.suffix }}</span>
    </template>
  </p>
</template>
