<script setup lang="ts">
import { animate, onScroll } from 'animejs';
import AboutPart from "~/components/index/AboutPart.vue";
import SkillsPart from "~/components/index/SkillsPart.vue";
import ProjectsPart from "~/components/index/ProjectsPart.vue";
import ActivityPart from "~/components/index/ActivityPart.vue";
import ServicesPart from "~/components/index/ServicesPart.vue";
import StatsPart from "~/components/index/StatsPart.vue";
import TrustPart from "~/components/index/TrustPart.vue";
import SnakePart from "~/components/index/SnakePart.vue";
import BeautifulButton from "~/components/common/BeautifulButton.vue";

useSeoMeta({
  title: 'zaralx.ru - универсальный разработчик',
  description: 'zaralX - универсальный разработчик: веб-сервисы, Minecraft-разработка, API и десктоп. Живая активность с GitHub и GitLab, проекты и отзывы.',
})

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
        leave: 'max bottom'
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

  <div class="mb-40">
    <StatsPart />
  </div>

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
    <ServicesPart />

    <div class="mt-28">
      <SkillsPart />
    </div>

    <div id="index-1-skills-separator" class="mt-16">
      <div>
        <div style="animation-delay: 50ms" class="bg-stone-800 w-full h-32 animate-clip-fluid-reverse absolute opacity-50"></div>
        <div style="animation-delay: 240ms" class="bg-stone-800 w-full h-32 animate-clip-fluid opacity-50"></div>
      </div>
      <div class="rotate-180">
        <div style="animation-delay: 130ms" class="bg-stone-800 w-full h-32 animate-clip-fluid-reverse absolute opacity-50"></div>
        <div style="animation-delay: 200ms" class="bg-stone-800 w-full h-32 animate-clip-fluid opacity-50"></div>
      </div>
    </div>

    <ActivityPart />

    <div class="mt-28">
      <ProjectsPart />
    </div>

    <div class="flex justify-center mt-12">
      <NuxtLink to="/projects">
        <BeautifulButton>
          Все проекты
          <Icon name="lucide:arrow-right" />
        </BeautifulButton>
      </NuxtLink>
    </div>

    <div class="mt-28">
      <TrustPart />
    </div>

    <div class="mt-28">
      <SnakePart />
    </div>

    <div id="contact" class="mt-28 scroll-mt-24 flex flex-col justify-center items-center">
      <h2 class="text-center font-unbounded text-3xl">Связь со мной</h2>
      <p class="text-stone-400 mt-3 text-center px-4">Открыт к интересным проектам и заказам - напишите, обсудим вашу идею.</p>

      <div class="mt-8 flex flex-wrap justify-center gap-4 px-4">
        <a href="https://t.me/zWork1" target="_blank">
          <BeautifulButton>
            <Icon name="iconoir:telegram" />
            Написать в Telegram
          </BeautifulButton>
        </a>
        <a href="mailto:admin@zaralx.ru">
          <BeautifulButton>
            <Icon name="lucide:mail" />
            Написать на почту
          </BeautifulButton>
        </a>
      </div>

      <div class="mt-8 grid max-w-2xl gap-3 px-4 text-sm text-stone-400 sm:grid-cols-3">
        <p class="rounded-lg border border-stone-800 bg-stone-900 px-4 py-3 flex items-center gap-4">
          <Icon name="lucide:clock" class="text-stone-500" size="24"/>
          Обычно отвечаю сразу если не занят
        </p>
        <p class="rounded-lg border border-stone-800 bg-stone-900 px-4 py-3 flex items-center gap-4">
          <Icon name="lucide:message-square-text" class="text-stone-500" size="24" />
          Пишите сразу задачу и сроки
        </p>
        <p class="rounded-lg border border-stone-800 bg-stone-900 px-4 py-3 flex items-center gap-4">
          <Icon name="lucide:user-round" class="text-stone-500" size="24" />
          По инвайтам на работу тоже пишите
        </p>
      </div>
    </div>
  </div>
</div>
</template>
