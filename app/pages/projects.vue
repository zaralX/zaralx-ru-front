<script setup lang="ts">
import { animate, stagger } from "animejs";
import { projects } from "~/data/projects";

useSeoMeta({
  title: 'Проекты - zaralx.ru',
  description: 'Проекты zaralX: лаунчер Cast Launcher, маркетплейс FreshMarket, Cristalix Dungeons, zaralX Assets, FreshDonate, плагины для Minecraft и другие разработки.',
})


onMounted(() => {
  animate('.project-card', {
    opacity: [0, 1],
    y: [24, 0],
    duration: 600,
    ease: 'out(3)',
    delay: stagger(120),
  });
})
</script>

<template>
  <div class="px-4 sm:px-8 md:px-32 pb-24">
    <div class="py-16 text-center">
      <h1 class="text-3xl font-unbounded">Проекты</h1>
      <p class="text-slate-400 text-lg">Тут только самое крутое, что я делал</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
      <ProjectsProjectCard v-for="project in projects" :key="project.title" :project="project" class="project-card opacity-0" />
    </div>

    <div class="text-center mt-16 space-y-3">
      <p class="text-stone-500">Ещё больше старых работ - на прошлой версии сайта</p>
      <ShButton as="a" href="https://old.zaralx.ru" target="_blank" variant="ghost" class="bg-black/25" icon="lucide:history">
        Посмотреть старый сайт
      </ShButton>
    </div>
  </div>
</template>
