<script setup lang="ts">

import {animate, onScroll} from "animejs";
import ProjectOne from "~/components/index/ProjectOne.vue";

onMounted(() => {
  animate('#index-1-projects', {
    x: ["-110%", 0],
    duration: 2000,
    alternate: true,
    ease: 'linear',
    autoplay: onScroll({
      sync: 1,
      enter: 'max bottom',
      leave: 'top+=300 top',
      // debug: true,
    })
  });
  animate('#index-2-projects', {
    x: ["110%", 0],
    duration: 2000,
    alternate: true,
    ease: 'linear',
    autoplay: onScroll({
      sync: 1,
      enter: 'max bottom',
      leave: 'top+=300 top',
      // debug: true,
    })
  });
})
</script>

<template>
<div>
  <div id="index-1-projects" class="bg-stone-900 w-full h-64">
    <div class="absolute inset-0 bg-stone-900 translate-x-[calc(100%-1px)] rotate-180"
         style="clip-path: polygon(100% 0%, 90% 50%, 100% 100%);">
    </div>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <h2 class="text-5xl font-unbounded">Проекты</h2>
      <p class="opacity-25">Тут только самое крутое что я делал</p>
    </div>
  </div>
  <div id="index-2-projects" class="bg-stone-900 w-full">
    <div class="absolute inset-0 bg-stone-900 -translate-x-[calc(100%-1px)]"
         style="clip-path: polygon(100% 0%, 90% 50%, 100% 100%);">
    </div>
    <div class="w-full h-full">
      <ProjectOne />
    </div>
  </div>
</div>
</template>

<style scoped>

</style>