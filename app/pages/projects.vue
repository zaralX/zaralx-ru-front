<script setup lang="ts">
import { animate, stagger } from "animejs";
import type { Project } from "~/types/project";

useSeoMeta({
  title: 'Проекты - zaralx.ru',
  description: 'Проекты zaralX: маркетплейс FreshMarket, игровой режим Cristalix Dungeons, API zaralX Assets и другие разработки.',
})

const projects: Project[] = [
  {
    title: "FreshMarket",
    description: "Маркетплейс, полностью повторяющий работу реальных маркетплейсов внутри Minecraft: банковская система, покупка товаров с доставкой, управление магазином в команде и аналитика продаж.",
    tags: ["Minecraft", "Маркетплейс", "Банковская система", "Аналитика"],
    image: "/img/projects/freshmarket_v2.webp",
    gradient: "from-blue-400 via-sky-300 to-sky-400",
    accent: "#38bdf8",
    links: [
      { label: "Сайт", href: "https://fresh.zaralx.ru/", icon: "lucide:external-link" },
    ],
  },
  {
    title: "Cristalix Dungeons",
    description: "Игровой режим про подземелья внутри Minecraft: исследуйте таинственные данжи, сражайтесь с толпами монстров, побеждайте боссов и улучшайте добытую амуницию.",
    tags: ["Minecraft", "Игровой режим", "PvE"],
    video: "https://s3.zaralx.ru/zaralx_ru/cristalix_dungeons_trailer",
    gradient: "from-teal-400 via-green-300 to-emerald-400",
    accent: "#34d399",
    links: [
      { label: "Сайт", href: "https://cristalix.gg", icon: "lucide:external-link" },
    ],
  },
  {
    title: "zaralX Assets",
    description: "API-сервис с иконками предметов и блоков, скинами игроков и файлами локализации из Minecraft. Удобное REST API с документацией для простого внедрения в свой проект.",
    tags: ["REST API", "Minecraft", "Документация"],
    image: "/img/projects/zaralx_assets.webp",
    gradient: "from-red-500 via-amber-500 to-orange-400",
    accent: "#fb923c",
    links: [
      { label: "Исходный код", href: "https://github.com/zaralX/zaralx-assets", icon: "lucide:github" },
      { label: "Сайт", href: "https://assets.zaralx.ru/", icon: "lucide:external-link" },
    ],
  },
  {
    title: "zaralx.ru",
    description: "Этот сайт: портфолио на Nuxt с кастомными анимациями на Anime.js, экспериментами и интеграциями. Собирается в Docker и деплоится через CI/CD.",
    tags: ["Nuxt", "Vue", "Tailwind", "Anime.js", "Docker"],
    gradient: "from-amber-400 via-orange-400 to-yellow-400",
    accent: "#fbbf24",
    links: [
      { label: "Исходный код", href: "https://github.com/zaralX/zaralx-ru-front", icon: "lucide:github" },
    ],
  },
]

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
