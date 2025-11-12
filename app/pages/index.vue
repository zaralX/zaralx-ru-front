<script setup lang="ts">
import { animate, onScroll } from 'animejs';
import AboutPart from "~/components/index/AboutPart.vue";
import SkillsPart from "~/components/index/SkillsPart.vue";

onMounted(() => {
  animate('#index-1-overflow-triangle', {
    y: '-360px',
    duration: 2000,
    alternate: true,
    ease: 'linear',
    autoplay: onScroll({
      container: '#index-scroll-container',
      sync: 1,
      enter: 'max bottom',
      leave: 'min top',
      // debug: true,
    })
  });
})
</script>

<template>
<div id="index-scroll-container overflow-hidden">
  <IndexMainPart />
  <div class="h-screen">
    <div id="index-1-overflow-triangle" class="w-full h-32 absolute left-0 z-30">
      <div class="absolute inset-0 bg-stone-900"
           style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);">
      </div>
      <AboutPart />
      <div class="relative w-full h-32">
        <div class="absolute inset-0 bg-stone-900 rotate-180 -translate-y-px"
             style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);">
        </div>
      </div>
    </div>
  </div>
  <div class="-translate-y-[360px]">
    <SkillsPart />
  </div>
</div>
</template>