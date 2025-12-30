<script setup lang="ts">
import {animate, onScroll, svg} from 'animejs';

onMounted(() => {
  const carAnimation = animate('.car', {
    ease: 'linear',
    duration: 5000,
    loop: true,
    ...svg.createMotionPath('path')
  });

// Line drawing animation following the motion path values
// For demo aesthetic only
  animate(svg.createDrawable('path'), {
    draw: '0 1',
    ease: 'linear',
    duration: 5000,
    alternate: true,
    loop: true,
  });

  if (useDevice()?.isDesktop) {
    animate("#project-video-api", {
      rotateX: [-90, 0],
      rotateY: [30, 0],
      ease: 'inOutCirc',
      duration: 5000,
      alternate: true,
      autoplay: onScroll({
        sync: 1,
        enter: 'max bottom',
        leave: 'min top',
        // debug: true,
      })
    });
  } else {
    animate("#project-video-api", {
      rotateX: [-90, 0],
      rotateY: [30, 0],
      ease: 'inOutCirc',
      duration: 5000,
      alternate: true,
      autoplay: onScroll({
        sync: 1,
        enter: 'max bottom-=300',
        leave: 'min top-=100',
        // debug: true,
      })
    });
  }
})
</script>

<template>
<div class="py-16 px-4 sm:px-8 md:px-32">
  <div class="space-y-4 lg:grid grid-cols-2 gap-4 md:gap-8 lg:gap-16">
    <div class="flex flex-col justify-center w-full text-stone-300">
      <h2 class="text-3xl font-unbounded bg-gradient-to-r from-red-500 via-amber-500 to-orange-400 bg-size-[300%] text-transparent bg-clip-text animate-[animated-gradient_6s_ease_infinite_alternate]">zaralX Assets</h2>
      <div class="max-w-152">
        <p>
          <span class="text-sky-400 underline">zaralX Assets</span> - API сервис предоставляющий иконки предметов, блоков, скины игроков, а также файлы локализации из Minecraft.
        </p>
        <p>
          В проекте реализовано удобное REST API с документацией позволяющей сделать простое внедрение в свой проект!
        </p>
        <div class="mt-3 absolute flex gap-2">
          <ShButton as="a" target="_blank" href="https://github.com/zaralX/zaralx-assets" variant="ghost" class="bg-black/25" icon="lucide:github">
            Исходный код
          </ShButton>
          <ShButton as="a" target="_blank" href="https://assets.zaralx.ru/" variant="ghost" class="bg-black/25" icon="lucide:external-link">
            Сайт
          </ShButton>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end w-full">
      <div id="project-video-api" class="bg-sky-500/50 p-1 rounded-sm relative">
        <div class="absolute w-full h-full bg-sky-500/50 blur top-0 left-0"></div>
        <NuxtImg src="/img/projects/zaralx_assets.webp" class="rounded-sm relative" alt="" />
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
#svg-createmotionpath {
  position: relative;
}

#svg-createmotionpath .car {
  position: absolute;
  width: 16px;
  height: 8px;
  left: -8px;
  top: -5px;
  color: #FFF;
}

#svg-createmotionpath .docs-demo-template .car {
  display: none;
}
</style>