<script setup lang="ts">
import {animate, stagger, utils} from 'animejs';

interface Skill {
  title: string
  icon: string
  isWhite?: boolean
  color: string
}

const skills = [
  // Frontend
  { title: "HTML", icon: "devicon:html5", color: "#E34F26" },
  { title: "CSS", icon: "devicon:css3", color: "#1572B6" },
  { title: "Javascript", icon: "devicon:javascript", color: "#F7DF1E" },
  { title: "Typescript", icon: "devicon:typescript", color: "#3178C6" },
  { title: "Vue", icon: "devicon:vuejs", color: "#42B883" },
  { title: "Nuxt", icon: "devicon:nuxtjs", color: "#00DC82" },
  { title: "React", icon: "devicon:react", color: "#61DAFB" },
  { title: "Vite", icon: "devicon:vitejs", color: "#646CFF" },
  { title: "Tailwind", icon: "devicon:tailwindcss", color: "#06B6D4" },
  { title: "Anime.js", icon: "simple-icons:animedotjs", isWhite: true, color: "#fd4a4a" },

  // Backend
  { title: "Node.js (JS Runtime)", icon: "simple-icons:nodedotjs", color: "#539E43" },
  { title: "Fastify", icon: "devicon-plain:fastify", isWhite: true, color: "#cecece" },
  { title: "Express", icon: "simple-icons:express", isWhite: true, color: "#eaeaea" },
  { title: "Rest API", icon: "dashicons:rest-api", isWhite: true, color: "#5A9BD4" },

  // Базы данных
  { title: "MongoDB", icon: "devicon:mongodb", color: "#47A248" },
  { title: "MySql", icon: "devicon:mysql", color: "#4479A1" },
  { title: "Postgresql", icon: "devicon:postgresql", color: "#336791" },
  { title: "SQLite", icon: "devicon:sqlite", color: "#003B57" },

  // DevOps / Infrastructure
  { title: "Docker", icon: "devicon:docker", color: "#2496ED" },
  { title: "Git", icon: "devicon:git", color: "#F05032" },
  { title: "CI/CD", icon: "devicon:githubactions", color: "#2088FF" },
  { title: "Linux", icon: "devicon:linux", color: "#FCC624" },

  // Языки программирования (общего назначения)
  { title: "Java", icon: "devicon:java", color: "#007396" },
  { title: "Kotlin", icon: "devicon:kotlin", color: "#7F52FF" },
  { title: "C#", icon: "devicon:csharp", color: "#672179" },
  { title: "C++", icon: "devicon:cplusplus", color: "#00599C" },
  { title: "Go", icon: "material-icon-theme:go", color: "#00ADD8" },
  { title: "Python", icon: "devicon:python", color: "#3776AB" },
  { title: "PHP", icon: "devicon:php", color: "#777BB4" },
  { title: "Rust", icon: "simple-icons:rust", isWhite: true, color: "#ff7300" },

  // Desktop / Hybrid
  { title: "Electron", icon: "devicon:electron", color: "#47848F" },
  { title: "Tauri v2", icon: "devicon:tauri", color: "#FFC131" },

  // Minecraft / Game-related
  { title: "Bukkit", icon: "roentgen:stratovolcano-lava", isWhite: true, color: "#F16436" },
  { title: "Net Minecraft System", icon: "arcticons:mods-maps-skins-for-minecraft", isWhite: true, color: "#62B47A" },
  { title: "Folia", icon: "f7:paperplane", isWhite: true, color: "#4285F4" }
];

onMounted(() => {
  const $squares = utils.$('.square');

  function animateGrid() {
    animate($squares, {
      boxShadow: [
        { to: '0 0 1rem 0 currentColor' },
        { to: '0 0 0rem 0 currentColor' }
      ],
      delay: stagger(100, {
        grid: [10, 4],
        from: utils.random(0, 10 * 4)
      }),
      onComplete: animateGrid
    });
  }

  animateGrid();
})
</script>

<template>
<div>
  <h2 class="font-unbounded text-center text-3xl -translate-y-12">Что по скиллам?</h2>
  <div class="w-full flex items-center justify-center">
    <div class="grid grid-cols-10 gap-2">
      <Tooltip v-for="skill in skills">
        <TooltipTrigger>
          <div class="square text-black bg-stone-900 w-16 h-16 rounded-sm flex justify-center items-center group" :style="{ color: skill.color }">
            <Icon :name="skill.icon" class="text-white text-4xl" :style="{ color: skill.isWhite ? skill.color : undefined}" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{skill.title}}</p>
        </TooltipContent>
      </Tooltip>
      <div class="col-span-5 flex items-center justify-center text-stone-600 italic font-unbounded text-sm">
        "Дальше - Больше!"
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>