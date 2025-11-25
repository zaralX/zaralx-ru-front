<script setup lang="ts">
import {animate, onScroll, svg} from 'animejs';

onMounted(() => {
  animate("#project-line-cristalix", {
    width: [0, 96],
    ease: 'inOutCirc',
    duration: 5000,
    alternate: true,
    autoplay: onScroll({
      sync: 1,
      enter: 'max+=100 bottom',
      leave: 'top+=300 top',
      // debug: true,
    })
  });

  if (useDevice()?.isDesktop) {
    animate("#project-video-cristalix", {
      rotateX: [90, 0],
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
    animate("#project-video-cristalix", {
      rotateX: [90, 0],
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
    <div class="flex items-center justify-end w-full">
      <div id="project-video-cristalix" class="bg-green-500/50 p-1 rounded-sm relative">
        <div class="absolute w-full h-full bg-green-500/50 blur top-0 left-0"></div>
        <video src="https://s3.zaralx.ru/zaralx_ru/cristalix_dungeons_trailer" class="rounded-sm relative" muted autoplay loop />
      </div>
    </div>
    <div class="flex flex-col justify-center items-end text-right w-full text-stone-300">
      <h2 class="text-3xl font-unbounded bg-gradient-to-r from-teal-400 via-green-300 to-emerald-400 bg-size-[300%] text-transparent bg-clip-text animate-[animated-gradient_6s_ease_infinite_alternate]">Cristalix Dungeons</h2>
      <div class="max-w-152">
        <p>
          <span class="text-green-400 underline">Dungeons</span> - игровой режим про подземелья внутри Minecraft!
        </p>
        <p>
          Исследуйте таинственные подземелья, сражайтесь с толпами монстров и одержите победу над кровожадным боссом, чтобы получить более ценную и редкую амуницию, а также улучшайте её, чтобы стать сильнее.
        </p>
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