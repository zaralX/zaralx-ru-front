<script setup lang="ts">
import {animate, stagger, utils} from 'animejs';

interface Skill {
  title: string
  icon: string
  color: string
  isWhite?: boolean
  current?: boolean
}

interface SkillGroup {
  title: string
  skills: Skill[]
}

const groups: SkillGroup[] = [
  {
    title: "Фронтенд",
    skills: [
      { title: "Nuxt", icon: "devicon:nuxtjs", color: "#00DC82", current: true },
      { title: "Vue", icon: "devicon:vuejs", color: "#42B883", current: true },
      { title: "Typescript", icon: "devicon:typescript", color: "#3178C6", current: true },
      { title: "Javascript", icon: "devicon:javascript", color: "#F7DF1E", current: true },
      { title: "Tailwind", icon: "devicon:tailwindcss", color: "#06B6D4", current: true },
      { title: "Vite", icon: "devicon:vitejs", color: "#646CFF", current: true },
      { title: "HTML", icon: "devicon:html5", color: "#E34F26", current: true },
      { title: "CSS", icon: "devicon:css3", color: "#1572B6", current: true },
      { title: "Anime.js", icon: "simple-icons:animedotjs", isWhite: true, color: "#fd4a4a" },
      { title: "React", icon: "devicon:react", color: "#61DAFB" },
    ],
  },
  {
    title: "Бэкенд и данные",
    skills: [
      { title: "Node.js", icon: "simple-icons:nodedotjs", color: "#539E43", current: true },
      { title: "Fastify", icon: "devicon-plain:fastify", isWhite: true, color: "#cecece", current: true },
      { title: "Rest API", icon: "dashicons:rest-api", isWhite: true, color: "#5A9BD4", current: true },
      { title: "Postgresql", icon: "devicon:postgresql", color: "#336791", current: true },
      { title: "MongoDB", icon: "devicon:mongodb", color: "#47A248", current: true },
      { title: "Express", icon: "simple-icons:express", isWhite: true, color: "#eaeaea" },
      { title: "MySql", icon: "devicon:mysql", color: "#4479A1" },
      { title: "SQLite", icon: "devicon:sqlite", color: "#003B57" },
    ],
  },
  {
    title: "Инфраструктура",
    skills: [
      { title: "Docker", icon: "devicon:docker", color: "#2496ED", current: true },
      { title: "Git", icon: "devicon:git", color: "#F05032", current: true },
      { title: "CI/CD", icon: "devicon:githubactions", color: "#2088FF", current: true },
      { title: "Linux", icon: "devicon:linux", color: "#FCC624", current: true },
    ],
  },
  {
    title: "Языки",
    skills: [
      { title: "Rust", icon: "simple-icons:rust", isWhite: true, color: "#ff7300", current: true },
      { title: "Java", icon: "devicon:java", color: "#007396", current: true },
      { title: "Kotlin", icon: "devicon:kotlin", color: "#7F52FF", current: true },
      { title: "Go", icon: "material-icon-theme:go", color: "#00ADD8" },
      { title: "Python", icon: "devicon:python", color: "#3776AB" },
      { title: "C#", icon: "devicon:csharp", color: "#672179" },
      { title: "C++", icon: "devicon:cplusplus", color: "#00599C" },
      { title: "PHP", icon: "devicon:php", color: "#777BB4" },
    ],
  },
  {
    title: "Minecraft и десктоп",
    skills: [
      { title: "Bukkit", icon: "roentgen:stratovolcano-lava", isWhite: true, color: "#F16436", current: true },
      { title: "Folia", icon: "f7:paperplane", isWhite: true, color: "#4285F4", current: true },
      { title: "Net Minecraft System", icon: "arcticons:mods-maps-skins-for-minecraft", isWhite: true, color: "#62B47A", current: true },
      { title: "Tauri v2", icon: "devicon:tauri", color: "#FFC131", current: true },
      { title: "Electron", icon: "devicon:electron", color: "#47848F" },
    ],
  },
]

onMounted(() => {
  const squares = utils.$('.square')

  function animateGrid() {
    animate(squares, {
      boxShadow: [
        { to: '0 0 1rem 0 currentColor' },
        { to: '0 0 0rem 0 currentColor' }
      ],
      delay: stagger(90, { from: 'random' }),
      onComplete: animateGrid
    });
  }

  animateGrid();
})
</script>

<template>
<div class="px-4 md:px-8 lg:px-32 xl:px-64">
  <h2 class="font-unbounded text-center text-3xl">Что по скиллам?</h2>
  <p class="text-stone-400 mt-3 text-center">Основные скильчиксы.</p>

  <div class="mx-auto mt-10 max-w-4xl space-y-6">
    <div v-for="group in groups" :key="group.title" class="md:flex md:items-start md:gap-6">
      <p class="w-40 shrink-0 pt-1 text-sm text-stone-500 md:text-right">{{ group.title }}</p>

      <div class="mt-3 flex flex-wrap gap-2 md:mt-0">
        <Tooltip v-for="skill in group.skills" :key="skill.title">
          <TooltipTrigger>
            <div class="square flex size-14 items-center justify-center rounded-sm bg-stone-900 transition-opacity duration-200"
                 :class="skill.current ? 'text-black' : 'text-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0'"
                 :style="{ color: skill.current ? skill.color : undefined }">
              <Icon :name="skill.icon" class="text-3xl text-white"
                    :style="{ color: skill.isWhite ? skill.color : undefined }" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ skill.title }}</p>
            <p class="text-stone-400">{{ skill.current ? 'использую сейчас' : 'есть опыт' }}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  </div>

  <p class="mt-8 text-center font-unbounded text-sm italic text-stone-600">"Дальше - Больше!"</p>
</div>
</template>
