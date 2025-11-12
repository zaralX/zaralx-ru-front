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
  const rect = document.getElementById("index-projects-container")!.getBoundingClientRect()
  console.log(rect.width)

  const draggable = createDraggable('#' + props.id, {
    trigger: '#' + props.id + '-trigger',
    container: '#index-projects-container',
    containerPadding: 32
  });

  draggable.x = (random(0, 1) == 0 ? -1 : 1) * (rect.width + random(0, 500))
  draggable.y = (random(0, 1) == 0 ? -1 : 1) * (rect.height + random(0, 500))

  draggable.animateInView(4000, 0)

})
</script>

<template>
  <div>
    <div :id="id" class="absolute select-none aspect-video bg-stone-900 p-1 rounded-md w-[25vw] space-y-1 shadow-md border border-white/10 group -translate-1/2">
      <div :id="`${id}-trigger`" class="flex items-center text-stone-400 px-1">
        <div class="flex items-center gap-1 flex-1">
          <Icon name="lucide:folder" />
          <p class="text-sm">Проект такой то</p>
        </div>
        <div class="flex items-center">
          <Icon name="lucide:x" />
        </div>
      </div>
      <img draggable="false" class="h-full rounded-sm select-none" src="/img/fillers/1.png" alt="">
    </div>
  </div>
</template>

<style scoped>

</style>