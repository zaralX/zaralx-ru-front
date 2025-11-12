<script setup lang="ts">
import { animate, onScroll } from 'animejs';
import AboutPart from "~/components/index/AboutPart.vue";
import SkillsPart from "~/components/index/SkillsPart.vue";
import ProjectsPart from "~/components/index/ProjectsPart.vue";

onMounted(() => {
  animate('#index-1-overflow-triangle', {
    y: '-360px',
    duration: 2000,
    alternate: true,
    ease: 'linear',
    autoplay: onScroll({
      sync: 1,
      enter: 'max bottom',
      leave: 'min top',
    })
  });

  animate('#index-1-skills-separator', {
    opacity: 0,
    duration: 2000,
    alternate: true,
    ease: 'linear',
    autoplay: onScroll({
      sync: 1,
      enter: 'max bottom',
      leave: 'min top',
      // debug: true,
    })
  });
})
</script>

<template>
<div id="index-scroll-container">
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
    <div id="index-1-skills-separator">
      <div class="mt-16">
        <div style="animation-delay: 50ms" class="bg-stone-800 w-full h-32 animate-clip-fluid-reverse absolute opacity-50"></div>
        <div style="animation-delay: 240ms" class="bg-stone-800 w-full h-32 animate-clip-fluid opacity-50"></div>
      </div>
      <div class="rotate-180 -translate-y-">
        <div style="animation-delay: 130ms" class="bg-stone-800 w-full h-32 animate-clip-fluid-reverse absolute opacity-50"></div>
        <div style="animation-delay: 200ms" class="bg-stone-800 w-full h-32 animate-clip-fluid opacity-50"></div>
      </div>
    </div>
    <ProjectsPart />
  </div>
</div>
</template>