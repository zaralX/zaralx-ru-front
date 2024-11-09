<script setup>
import {ref} from "vue";
import Checkbox from "../components/global/Checkbox.vue";

const tags = ref([
  {
    key: "minecraft",
    name: "Minecraft",
    icon: "/logos/minecraft-cube.svg",
    selected: false
  },
  {
    key: "website",
    name: "Website",
    icon: "/logos/globe.svg",
    selected: false
  },
  {
    key: "application",
    name: "Application",
    icon: "/logos/browser.svg",
    selected: false
  },
  {
    key: "source",
    name: "Source Code",
    icon: "/logos/source-code.svg",
    selected: false
  }
])

const projects = [
  {
    name: "SPm Combat",
    description: "Игра пародирующая популярный в 2024 году Hamster Combat, но со своими фичами. Работающая на СПм.",
    type: "_hamster_criminal",
    image: "/fillers/3.png",
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
    name: "Pillars",
    description: "Minecraft Bukkit плагин добавляющий игру Столбы, ваша задача - остаться последним, получая случайные предметы.",
    type: "_best_pillars",
    image: "/fillers/2.png",
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
    name: "BridgeBuilders",
    description: "Minecraft Bukkit плагин добавляющий игру Мосты, ваша задача - вместе с командой как можно быстрее собрать ресурсы для строителя, вы можете телепортироваться на базы противников и воровать у них ресурсы.",
    type: "_new_bridges",
    image: "/fillers/2.png",
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
    name: "Grief Mod",
    description: "Minecraft Bukkit плагин который предоставляет ограничения для новых игроков (Например чтобы пока игрок не проведёт на сервере 24ч. он не сможет никого ударить)",
    type: "_anti_grief",
    image: "/fillers/1.png",
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
    name: "InfinityButtonSimulator",
    description: "Minecraft Bukkit плагин с простой игрой симулятором и топом. Создано за 24ч.",
    type: "_infinity_afk",
    image: "/fillers/1.png",
    tags: ["minecraft", "source"],
    date: "2024-04-29",
    links: [
      {
        type: "source-github",
        link: "https://github.com/zaralX/InfinityButtonSimulator"
      }
    ]
  },
  {
    name: "Cristalix Dungeons",
    description: "Разработка игрового режима в команде на проекте cristalix.gg",
    type: "_cristalix_dev",
    image: "/fillers/3.png",
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
    name: "FreshMarket",
    description: "Маркетплейс в игре Minecraft который предоставляет продажу и покупку товаров.",
    type: "_marketplace",
    image: "/fillers/3.png",
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
    name: "Image Service",
    description: "API которое предоставляет minecraft иконки предметов, а так же майнкрафт скины",
    type: "_minecraft_icons",
    image: "/fillers/2.png",
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

  visibleProjects.value = []

  for (const project of projects) {
    if (project.tags.some(tag => selectedTags.includes(tag))) {
      visibleProjects.value.push(project)
    }
  }
}

const tagsTitle = () => {
  const filteredTags = tags.value.filter(tag => tag.selected);
  if (filteredTags.length === 0) return "all";
  return filteredTags.map(tag => tag.name).join('; ');
}

// TODO: Mobile adaptation
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
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 md:overflow-y-scroll p-2 md:p-12">
      <div v-for="project in visibleProjects">
        <div class="flex gap-2">
          <p class="font-bold text-orange-500">{{ project.name }}</p>
          <p class="text-slate-500">// {{ project.type }}</p>
        </div>
        <div class="bg-bg-second-dark border-[1px] border-slate-700/[.4] shadow-lg rounded-xl flex flex-col">
          <div class="relative flex justify-end">
            <div class="absolute pt-2 pr-3 flex gap-2">
              <div v-for="tag in project.tags" class="bg-amber-600 rounded p-1 w-7 h-7">
                <img :src="tags.find((el) => el.key === tag).icon" alt="icon">
              </div>
            </div>
          </div>
          <div class="w-full h-32 bg-cover rounded-t-xl border-b-[1px] border-slate-700/[.4]" :style="'background-image: url('+project.image+')'"></div>
          <div class="p-4 text-slate-400 font-medium flex flex-col flex-grow h-40">
            <div class="flex-1 line-clamp-4">{{project.description}}</div>
            <div class="flex gap-2">
              <a v-for="link in project.links" :href="link.link" class="text-white py-1 px-2 rounded-lg flex justify-center items-center gap-1"
              :class="
              link.type === 'youtube' ? 'bg-red-500 hover:bg-red-600' :
                link.type === 'website' ? 'bg-blue-600 hover:bg-blue-700' :
                  link.type === 'buy-tg' ? 'bg-sky-600 hover:bg-sky-700' :
                    link.type === 'source-github' ? 'bg-slate-600 hover:bg-slate-700' : '?'
">
                <img class="w-6 h-6" :src="
                link.type === 'youtube' ? '/logos/youtube.svg' :
                  link.type === 'website' ? '/logos/globe.svg' :
                    link.type === 'buy-tg' ? '/logos/telegram.svg' :
                      link.type === 'source-github' ? '/logos/github.svg' : '?'
" alt="">
                <p class="font-[450]">{{
                    link.type === "youtube" ? 'Видео' :
                        link.type === "website" ? 'Сайт' :
                            link.type === "buy-tg" ? 'Купить' :
                                link.type === "source-github" ? 'Исходники' : '?'
                  }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>