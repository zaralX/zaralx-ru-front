<script setup>
import {ref} from "vue";
import Checkbox from "../components/global/Checkbox.vue";
import Project from "../components/projects/Project.vue";
import {useRoute} from "vue-router";

const tags = ref([
  {
    key: "minecraft",
    name: "Minecraft",
    icon: "/logos/minecraft-cube.svg",
    classes: "bg-green-600",
    selected: false
  },
  {
    key: "website",
    name: "Website",
    icon: "/logos/globe.svg",
    classes: "bg-blue-600",
    selected: false
  },
  {
    key: "application",
    name: "Application",
    icon: "/logos/browser.svg",
    classes: "bg-purple-600",
    selected: false
  },
  {
    key: "source",
    name: "Source Code",
    icon: "/logos/source-code.svg",
    classes: "bg-slate-800",
    selected: false
  }
])

const projects = [
  {
    id: 1,
    name: "SPm Combat",
    description: "Игра пародирующая популярный в 2024 году Hamster Combat, но со своими фичами. Работающая на СПм.",
    type: "_hamster_criminal",
    image: "/projects/spm-combat-banner.png",
    tags: ["website", "minecraft"],
    date: "2024-08-19",
    links: [
      {
        type: "website",
        link: "https://spmk.zaralx.ru/"
      }
    ]
  },
  {
    id: 2,
    name: "Pillars",
    description: "Minecraft Bukkit плагин добавляющий игру Столбы, ваша задача - остаться последним, получая случайные предметы.",
    type: "_best_pillars",
    image: "/projects/pillars-banner.png",
    tags: ["minecraft"],
    date: "2024-03-16",
    links: [
      {
        type: "buy-tg",
        link: "https://zWork1.t.me/"
      },
      {
        type: "youtube",
        link: "https://www.youtube.com/watch?v=nvlq8B7DDHk"
      }
    ]
  },
  {
    id: 3,
    name: "BridgeBuilders",
    description: "Minecraft Bukkit плагин добавляющий игру Мосты, ваша задача - вместе с командой как можно быстрее собрать ресурсы для строителя, вы можете телепортироваться на базы противников и воровать у них ресурсы.",
    type: "_new_bridges",
    image: "/projects/bridgebuilders-banner.png",
    tags: ["minecraft"],
    date: "2024-06-23",
    links: [
      {
        type: "buy-tg",
        link: "https://zWork1.t.me/"
      },
      {
        type: "youtube",
        link: "https://www.youtube.com/shorts/-WimqjhG9G0"
      }
    ]
  },
  {
    id: 4,
    name: "Grief Mod",
    description: "Minecraft Bukkit плагин который предоставляет ограничения для новых игроков (Например чтобы пока игрок не проведёт на сервере 24ч. он не сможет никого ударить)",
    type: "_anti_grief",
    image: "/fillers/3.png",
    tags: ["minecraft", "source"],
    date: "2024-04-11",
    links: [
      {
        type: "source-github",
        link: "https://github.com/zaralX/GriefMod"
      }
    ]
  },
  {
    id: 5,
    name: "InfinityButtonSimulator",
    description: "Minecraft Bukkit плагин с простой игрой симулятором и топом. Создано за 24ч.",
    type: "_infinity_afk",
    image: "/projects/infbuttonsim-banner.png",
    tags: ["minecraft", "source"],
    date: "2024-04-29",
    links: [
      {
        type: "source-github",
        link: "https://github.com/zaralX/InfinityButtonSimulator"
      },
      {
        type: "youtube",
        link: "https://www.youtube.com/watch?v=v8jNgkoQlmQ"
      }
    ]
  },
  {
    id: 6,
    name: "Cristalix Dungeons",
    description: "Разработка игрового режима в команде на проекте cristalix.gg",
    type: "_cristalix_dev",
    image: "/projects/dungeons-banner.jpg",
    tags: ["minecraft"],
    date: "2024-04-06",
    links: [
      {
        type: "youtube",
        link: "https://www.youtube.com/watch?v=5Qjz4l0CZho"
      },
      {
        type: "website",
        link: "https://cristalix.gg"
      }
    ]
  },
  {
    id: 7,
    name: "FreshMarket",
    description: "Маркетплейс в игре Minecraft который предоставляет продажу и покупку товаров.",
    type: "_marketplace",
    image: "/projects/freshmarket-banner.gif",
    tags: ["minecraft", "website"],
    date: "2023-07-28",
    links: [
      {
        type: "youtube",
        link: "https://www.youtube.com/watch?v=RVah56XIITM"
      },
      {
        type: "website",
        link: "https://spx.zaralx.ru"
      }
    ]
  },
  {
    id: 8,
    name: "Image Service",
    description: "API которое предоставляет minecraft иконки предметов, а так же майнкрафт скины",
    type: "_minecraft_icons",
    image: "/projects/xis-banner.png",
    tags: ["minecraft", "website"],
    date: "2023-11-01",
    links: [
      {
        type: "website",
        link: "https://img.zaralx.ru"
      }
    ]
  },
  {
    id: 9,
    name: "Minecast Launcher",
    description: "Лаунчер для майнкрафт сервера. (Сейчас проект закрыт)",
    type: "_minecraft_launcher",
    image: "/fillers/1.png",
    tags: ["minecraft", "application"],
    date: "2024-06-12",
    links: [
      {
        type: "website",
        link: "https://github.com/zaralX/minecast-launcher-updates/releases/latest"
      }
    ]
  }
]

const visibleProjects = ref(projects)
const showTagsMenuMobile = ref(true)

const updateShowingProjects = () => {
  const selectedTags = []
  for (const tag of tags.value) {
    if (tag.selected) {
      selectedTags.push(tag.key)
    }
  }

  if (selectedTags.length === 0) {
    visibleProjects.value = projects;
    return;
  }

  visibleProjects.value = projects.filter(project =>
      selectedTags.every(tag => project.tags.includes(tag))
  );
}

const tagsTitle = () => {
  const filteredTags = tags.value.filter(tag => tag.selected);
  if (filteredTags.length === 0) return "all";
  return filteredTags.map(tag => tag.name).join('; ');
}

const route = useRoute()
</script>

<template>
<div class="flex-grow flex h-full">
  <div class="w-64 hidden md:block flex-shrink-0">
    <div class="h-10 flex items-center gap-2 px-4 border-b-2 border-border-main-light dark:border-border-main-dark text-border-inside-more-light dark:text-border-inside-more-dark">
      <i class="pi pi-sort-down-fill text-xs"></i>
      <p>projects</p>
    </div>
    <div class="flex flex-col gap-2 py-4">
      <div @click="tag.selected = !tag.selected; updateShowingProjects()" v-for="tag in tags"  class="flex items-center gap-4 px-4 cursor-pointer">
        <Checkbox v-model="tag.selected" />
        <div class="flex items-center gap-2 text-lg text-white select-none transition-all duration-100 font-[450]" :class="tag.selected ? 'opacity-90' : 'opacity-50'">
          <img class="w-6 h-6" :src="tag.icon" :alt="tag.key" />
          <p>{{tag.name}}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex-1 md:border-l-2 border-border-main-dark flex flex-col">
    <div class="h-10 hidden md:flex items-center gap-2 border-b-2 border-border-main-light dark:border-border-main-dark text-border-inside-more-light dark:text-border-inside-more-dark">
      <p class="pl-4 pr-4 max-w-64 overflow-ellipsis truncate">{{ tagsTitle() }}</p>
      <div class="h-full border-r-2 border-border-main-light dark:border-border-main-dark flex justify-center items-center pr-4">
        <i class="pi pi-times text-xs"></i>
      </div>
      <p class="pl-4 pr-4 max-w-96 overflow-ellipsis truncate">ЗДЕСЬ НЕ ПОЛНЫЙ СПИСОК ПРОЕКТОВ</p>
      <div class="h-full border-r-2 border-border-main-light dark:border-border-main-dark flex justify-center items-center pr-4">
        <i class="pi pi-times text-xs"></i>
      </div>
    </div>

    <!-- MOBILE -->
    <div @click="showTagsMenuMobile = !showTagsMenuMobile" class="flex md:hidden items-center gap-2 w-full py-2 px-2 bg-border-main-dark text-border-inside-light my-2">
      <i class="pi pi-sort-down-fill text-xs transition-all duration-200" :class="showTagsMenuMobile ? '' : '-rotate-90'"></i>
      <p>projects</p>
    </div>
    <div v-if="showTagsMenuMobile" class="flex flex-col gap-2 py-1 md:hidden">
      <div @click="tag.selected = !tag.selected; updateShowingProjects()" v-for="tag in tags"  class="flex items-center gap-4 px-4 cursor-pointer">
        <Checkbox v-model="tag.selected" />
        <div class="flex items-center gap-2 text-lg text-white select-none transition-all duration-100 font-[450]" :class="tag.selected ? 'opacity-90' : 'opacity-50'">
          <img class="w-6 h-6" :src="tag.icon" :alt="tag.key" />
          <p>{{tag.name}}</p>
        </div>
      </div>
    </div>
    <div class="mt-8 mb-4 px-2 flex md:hidden gap-2 font-medium truncate max-w-80">
      <p class="text-white">// projects</p>
      <p class="text-slate-500 truncate">/ {{ tagsTitle() }}</p>
    </div>

    <!-- ANY -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 md:overflow-y-scroll p-2 md:p-12">
      <Project :opened="route.params.projectId == project.id" :project="project" :tags="tags" v-for="project in visibleProjects" />
    </div>
  </div>
</div>
</template>

<style scoped>

</style>