<script setup lang="ts">
import { animate, onScroll } from 'animejs';
import AboutPart from "~/components/index/AboutPart.vue";
import SkillsPart from "~/components/index/SkillsPart.vue";
import ProjectsPart from "~/components/index/ProjectsPart.vue";
import BeautifulButton from "~/components/common/BeautifulButton.vue";

onMounted(() => {
  for (let i = 1; i < 4; i++) {
    animate('#index-1-overflow-triangle-'+i, {
      y: `-${120*(i)}px`,
      duration: 2000,
      alternate: true,
      ease: 'linear',
      autoplay: onScroll({
        sync: 1,
        enter: 'max top',
        leave: 'max bottom',
        debug: true
      })
    });
  }

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
<!--  400px orig | 540px orig | 900px orig-->
  <div class="">
    <div class="w-full left-0 z-30 relative mb-32">
      <div v-for="i in 3" :id="`index-1-overflow-triangle-${i}`" class="absolute inset-0 opacity-75 -translate-y-32">
        <div class="h-32 bg-stone-900"
             style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);">
        </div>
        <div class="h-96 bg-stone-900"></div>
      </div>
      <div class="absolute inset-0 bg-stone-900 h-32 -translate-y-32"
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
  <div class="-translate-y-[0px]">
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

    <div class="h-full flex flex-col justify-center items-center">
      <h1 class="text-center font-unbounded text-4xl mt-16">Cвязь со мной</h1>
      <div class="mt-8 flex gap-4">
        <a href="t.me/zWork1" target="_blank">
          <BeautifulButton>
            Написать в Telegram
          </BeautifulButton>
        </a>
        <a href="mailto:looppersmail@gmail.com">
          <BeautifulButton>
            Написать на почту
          </BeautifulButton>
        </a>
      </div>
    </div>
  </div>
</div>
</template>