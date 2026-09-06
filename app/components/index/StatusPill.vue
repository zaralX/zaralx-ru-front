<script setup lang="ts">
const OFFSET_HOURS = 8

const now = ref(shiftedNow())
let timer: ReturnType<typeof setInterval> | undefined

function shiftedNow() {
  return new Date(Date.now() + OFFSET_HOURS * 60 * 60 * 1000)
}

const time = computed(() => now.value.toISOString().slice(11, 19))
const awake = computed(() => {
  const hour = now.value.getUTCHours()

  return hour >= 10 || hour < 3
})

onMounted(() => {
  timer = setInterval(() => now.value = shiftedNow(), 1000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="inline-flex items-center gap-2.5 rounded-full border border-stone-800 bg-black/40 px-3 py-1.5 text-xs backdrop-blur">
    <span class="relative flex h-2 w-2 shrink-0">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            :class="awake ? 'bg-emerald-400' : 'bg-amber-400'"></span>
      <span class="relative inline-flex h-2 w-2 rounded-full" :class="awake ? 'bg-emerald-400' : 'bg-amber-400'"></span>
    </span>

    <span class="font-mono tabular-nums text-stone-300">{{ time }}</span>
    <span class="text-stone-600">UTC+8</span>

    <span class="h-3 w-px bg-stone-700"></span>

    <span :class="awake ? 'text-emerald-400' : 'text-amber-400'">
      {{ awake ? 'на связи' : 'сплю' }}
    </span>
  </div>
</template>
