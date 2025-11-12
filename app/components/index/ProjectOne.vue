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

  animate("#project-line-fm", {
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

  animate("#project-video-fm", {
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
})
</script>

<template>
<div class="py-16 px-4 sm:px-8 md:px-32">
  <div class="grid grid-cols-2 gap-4 md:gap-8 lg:gap-16">
    <div class="flex flex-col justify-center w-full text-stone-300">
      <h2 class="text-3xl font-unbounded bg-gradient-to-r from-blue-400 via-sky-300 to-sky-400 bg-size-[300%] text-transparent bg-clip-text animate-[animated-gradient_6s_ease_infinite_alternate]">FreshMarket</h2>
      <div class="max-w-152">
        <p>
          <span class="text-sky-400 underline">FreshMarket</span> - маркетплейс полностью повторяющий работу реальных маркетплейсов внутри игры Minecraft.
        </p>
        <p>
          В проекте реализована банковская система, покупка товаров с доставкой, управление магазином в команде, аналитика продаж и многое другое!
        </p>
        <div class="relative mt-2">
          <h3 class="font-unbounded z-20">Логика доставки</h3>
          <div id="project-line-fm" class="h-1 w-24 bg-sky-500 -translate-y-1.5 -translate-x-1 opacity-50"></div>
          <svg viewBox="0 0 600 60" xmlns="http://www.w3.org/2000/svg" class="absolute text-sky-500">
            <g fill="none" stroke="currentColor" stroke-width="2">
              <path d="
      M75,15
      L75,45
      Q150,45 225,45
      L225,15
      Q300,15 375,15
      L375,45
      Q450,45 525,45
      L525,15
    " />
            </g>
          </svg>
          <svg viewBox="0 0 600 60" xmlns="http://www.w3.org/2000/svg" class="absolute text-sky-500 blur-sm">
            <g fill="none" stroke="currentColor" stroke-width="2">
              <path d="
      M75,15
      L75,45
      Q150,45 225,45
      L225,15
      Q300,15 375,15
      L375,45
      Q450,45 525,45
      L525,15
    " />
            </g>
          </svg>
          <div class="w-full grid gap-2 grid-cols-4 text-sm relative text-sky-300">
            <div class="space-y-1">
              <div class="flex items-center gap-0.5 px-2 py-1 bg-stone-950 rounded-sm">
                <Icon name="lucide:shopping-basket" />
                <p>Сбор корзины</p>
              </div>
              <div class="flex items-center gap-0.5 px-2 py-1 bg-stone-950 rounded-sm">
                <Icon name="lucide:map-pin-check" />
                <p>Выбор филиала</p>
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-0.5 px-2 py-1 bg-stone-950 rounded-sm">
                <Icon name="lucide:banknote-arrow-down" />
                <p>Оплата</p>
              </div>
              <div class="flex items-center gap-0.5 px-2 py-1 bg-stone-950 rounded-sm">
                <Icon name="lucide:banknote-arrow-up" />
                <p>Пополнение</p>
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-0.5 px-2 py-1 bg-stone-950 rounded-sm">
                <Icon name="lucide:baggage-claim" />
                <p>Сбор заказа</p>
              </div>
              <div class="flex items-center gap-0.5 px-2 py-1 bg-stone-950 rounded-sm">
                <Icon name="lucide:truck" />
                <p>Доставка</p>
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-0.5 px-2 py-1 bg-stone-950 rounded-sm">
                <Icon name="lucide:handshake" />
                <p>Подтверждение</p>
              </div>
              <div class="flex items-center gap-0.5 px-2 py-1 bg-stone-950 rounded-sm">
                <Icon name="lucide:package" />
                <p>Получение</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end w-full">
      <div id="project-video-fm" class="bg-sky-500/50 p-1 rounded-sm relative">
        <div class="absolute w-full h-full bg-sky-500/50 blur top-0 left-0"></div>
        <video src="/img/freshmarket-overview.mp4" class="rounded-sm relative" muted autoplay loop />
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