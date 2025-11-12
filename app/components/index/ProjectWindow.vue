<script setup lang="ts">
import type {PrimitiveProps} from "reka-ui";
import {type HTMLAttributes, onMounted} from "vue";
import {animate, createDraggable, random, splitText, stagger} from "animejs";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  z?: number
  translateY?: string
  xFull?: boolean
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  z: 1,
  translateY: "50%",
  xFull: false
})

onMounted(() => {
  animate('#' + props.id, {
    // translateX: () => [random(10, 20) * random(10, 20), 0],
    opacity: [0, 1],
    ease: 'easeIn',
    duration: 750,
  });


})
</script>

<template>
  <div>
    <div :id="id" :class="{ '-translate-x-full': xFull }" class="opacity-0 absolute aspect-video bg-stone-900 p-1 rounded-md w-[25vw] space-y-1 shadow-md border border-white/10 group hover:-translate-y-2 duration-200" :style="{ transform: `translateY(${translateY})`, zIndex: z }">
      <div class="flex items-center text-stone-400 px-1">
        <div class="flex items-center gap-1 flex-1">
          <Icon name="lucide:folder" />
          <p class="text-sm">Проект такой то</p>
        </div>
        <div class="flex items-center">
          <Icon name="lucide:x" />
        </div>
      </div>
      <img class="h-full rounded-sm" src="/img/fillers/1.png" alt="">
    </div>
  </div>
</template>

<style scoped>

</style>