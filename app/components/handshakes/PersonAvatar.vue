<script setup lang="ts">
import type { HandshakePerson } from "~/types/handshake";

const props = defineProps<{
  person: Pick<HandshakePerson, 'name' | 'image'>
  sizeClass?: string
}>()

const imgFailed = ref(false)
watch(() => props.person.image, () => { imgFailed.value = false })

const initials = computed(() =>
    props.person.name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('') || '?'
)

const hue = computed(() => {
  let h = 0
  for (const c of props.person.name) h = (h * 31 + c.charCodeAt(0)) % 360
  return h
})
</script>

<template>
  <div :class="['rounded-full overflow-hidden flex items-center justify-center select-none shrink-0 bg-stone-800', sizeClass ?? 'w-16 h-16']">
    <img v-if="person.image && !imgFailed" :src="person.image" alt="" draggable="false"
         class="w-full h-full object-cover" @error="imgFailed = true" />
    <div v-else class="w-full h-full flex items-center justify-center font-unbounded text-white/90"
         :style="{ background: `linear-gradient(135deg, hsl(${hue}, 55%, 38%), hsl(${(hue + 45) % 360}, 55%, 20%))` }">
      {{ initials }}
    </div>
  </div>
</template>
