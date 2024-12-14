<script setup>

import CategoryAbout from "../components/about/CategoryAbout.vue";
import {onMounted, onUnmounted, ref} from "vue";
import TodoAboutComponent from "../components/about/TodoAboutComponent.vue";
import MiniSkillAbout from "../components/about/MiniSkillAbout.vue";
import SkillTypeBlockAbout from "../components/about/SkillTypeBlockAbout.vue";

const datetime = ref({
  unix: 0
})

const updater = ref(null)

onMounted(() => {
  updater.value = setInterval(() => {
    datetime.value = {
      unix: Date.now(),
      string: new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toUTCString().replace(' GMT', ''),
    }
  }, 1)
})

onUnmounted(() => {
  clearInterval(updater.value)
})

const skills = ref([
  {
    title: "Языки программирования",
    main: [
      {color: "#e8b208", name: "Javascript", icon: "devicon-javascript-plain", subtitle: "Active"},
      {color: "#ed4444", name: "Java", icon: "devicon-java-plain", subtitle: "Active"},
      {color: "#c88904", name: "Python", icon: "devicon-python-plain", subtitle: "Inactive"},
    ],
    low: [
      {color: "#7d22cc", name: "PHP", percent: 30, icon: "devicon-php-plain"},
      {color: "#5c248e", name: "C#", percent: 40, icon: "devicon-csharp-plain"},
      {color: "#0283c5", name: "Typescript", percent: 60, icon: "devicon-typescript-plain"},
      {color: "#d77606", name: "Rust", percent: 15, icon: "devicon-rust-plain"},
      {color: "#3183a8", name: "C++", percent: 15, icon: "devicon-cplusplus-plain"},
    ],
    basic: [
      {color: "#d77606", name: "HTML", icon: "devicon-html5-plain"},
      {color: "#0283c5", name: "CSS", icon: "devicon-css3-plain"},
      {color: "#5b5b5b", name: "SQL", icon: "devicon-sqlite-plain"},
    ]
  },
  {
    title: "Frontend",
    main: [
      {color: "#32d368", name: "Vue", icon: "devicon-vuejs-plain", subtitle: "Active"},
      {color: "#1daee7", name: "Tailwind", icon: "devicon-tailwindcss-plain", subtitle: "Active"},
    ],
    low: [
      {color: "#00b3ff", name: "React", percent: 30, icon: "devicon-react-plain"},
      {color: "#00e341", name: "Nuxt", percent: 15, icon: "devicon-nuxtjs-plain"},
    ],
    basic: [
      {color: "#c202e0", name: "Vite", icon: "devicon-vite-plain"},
    ]
  },
  {
    title: "Backend",
    main: [
      {color: "#777777", name: "Fastify", icon: "devicon-fastify-plain", subtitle: "Active"},
      {color: "#707070", name: "Express", icon: "devicon-express-original", subtitle: "Inactive"},
    ],
    low: [],
    basic: []
  },
  {
    title: "Прочее",
    main: [
      {color: "#008cff", name: "Docker", icon: "devicon-docker-plain", subtitle: "Active"},
      {color: "#ff5900", name: "Git", icon: "devicon-git-plain", subtitle: "Active"},
      {color: "#ffcc00", name: "CI/CD", icon: "devicon-circleci-plain", subtitle: "Active"},
      {color: "#ff6200", name: "Linux", icon: "devicon-linux-plain", subtitle: "Active"},
      {color: "#dc5510", name: "Bukkit", icon: "/img/logos/bukkit.png", subtitle: "Active"},
      {color: "#00c7e0", name: "Electron", icon: "devicon-electron-original", subtitle: "Active"},
    ],
    low: [],
    basic: [
      {color: "#004f67", name: "MySql", icon: "devicon-mysql-plain"},
      {color: "#02567b", name: "SQLite", icon: "devicon-sqlite-plain"},
      {color: "#336690", name: "Postgresql", icon: "devicon-postgresql-plain"},
    ]
  }
])
</script>

<template>
<!--  <div-->
<!--      class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"-->
<!--  ></div>-->
<!--<div class="text-lg md:px-32 xl:px-64 py-8">-->
<!--  <h1>Обо мне</h1>-->
<!--  <p>Я – программист-самоучка с 4-летним опытом разработки. За это время я освоил широкий спектр языков программирования и фреймворков, применяя их на практике в создании различных проектов. Мой опыт включает как работу над коммерческими проектами, так и разработку собственных решений, что позволило мне глубже погрузиться в мир программирования и постоянно совершенствовать свои навыки.</p>-->
<!--  <h1 class="mt-4 text-base opacity-75 text-sky-300">// TODO: Добавить скиллы, и сделать страницу интересней</h1>-->
<!--</div>-->
  <div class="md:px-32 xl:px-64 py-8 grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
    <div class="flex flex-col gap-4 flex-1">
      <CategoryAbout icon="pi-address-book" title="profile.md">
        <div class="flex gap-4">
          <div class="w-20 aspect-square">
            <div class="group/avatar w-20 h-20">
              <img class="transition-all duration-500 group-hover/avatar:rounded-[50%] absolute w-20 aspect-square rounded-lg shadow-lg blur z-0" src="/img/profile.jpg" alt="profile">
              <img class="transition-all duration-500 group-hover/avatar:rounded-[50%] w-20 aspect-square rounded-lg shadow-lg absolute z-10" src="/img/profile.jpg" alt="profile">
            </div>
          </div>
          <div class="flex flex-col">
            <p class="font-onest font-semibold text-xl md:text-2xl text-neutral-200 relative flex-1">Привет! Я <span class="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 inline-block text-transparent bg-clip-text animate-gradient">@zaralx</span><i class="left-32 md:left-40 pi pi-circle-fill blur-2xl text-3xl absolute text-amber-600 animate-[pulse_4s_cubic-bezier(0.6,0.2,0.5,1)_infinite]"></i></p>
            <p class="text-neutral-200/50 text-xs sm:text-sm xl:text-base">В моём опыте широкий спектр языков программирования и фреймворков, которые я постоянно применяю.</p>
          </div>
        </div>
      </CategoryAbout>
      <CategoryAbout delay="300" icon="pi-clock" title="datetime.json">
        <div class="bg-neutral-950/20 rounded-md p-2 text-xs sm:text-base md:text-sm xl:text-base">
          <p class="text-neutral-500">{</p>
          <p>    <span class="text-amber-400">"string"</span><span class="text-neutral-400">:</span> <span class="text-amber-400 relative group-hover:bg-neutral-500/10 group-hover:ring-4 group-hover:ring-neutral-500/10 rounded-md transition-all duration-500">"{{datetime.string}}"</span><span class="text-neutral-500">,</span></p>
          <p>    <span class="text-amber-400">"utc"</span><span class="text-neutral-400">:</span> <span class="text-amber-400">"UTC+8"</span></p>
          <p>    <span class="text-amber-400">"millis"</span><span class="text-neutral-400">:</span> <span class="text-orange-400">{{datetime.unix}}</span><span class="text-neutral-500">,</span></p>
          <p class="text-neutral-500">}</p>
        </div>
      </CategoryAbout>
      <CategoryAbout delay="600" icon="pi-list-check" title="todo.db">
        <div class="relative">
          <div class="absolute w-1 h-full left-4 border-r-2 border-dotted border-neutral-500"></div>
          <div class="flex flex-col gap-2 z-20 max-h-48 overflow-y-scroll">
            <TodoAboutComponent title="Оформить личный кабинет" status="incomplete" />
            <TodoAboutComponent title="Доработать список в skills.md" status="incomplete" />
            <TodoAboutComponent title="Заняться _about" status="completed" />
            <TodoAboutComponent title="Сделать в _about skills" status="completed" />
            <TodoAboutComponent title="Сделать в _about todo list" status="completed" />
            <TodoAboutComponent title="Сделать в _about краткую инфу" status="completed" />
            <TodoAboutComponent title="Сделать в _about своё datetime" status="completed" />
          </div>
        </div>
      </CategoryAbout>
    </div>
    <div class="flex flex-col gap-4 flex-1">
      <CategoryAbout delay="900" icon="pi-list" title="skills.md" inclass="overflow-y-scroll rounded-r-lg max-h-[42rem]">
        <div>
          <div class="flex flex-col gap-2 md:gap-4">
            <SkillTypeBlockAbout
                v-for="skillType in skills"
                :title="skillType.title"
                :main="skillType.main"
                :low="skillType.low"
                :basic="skillType.basic"
            />
          </div>
        </div>
      </CategoryAbout>
    </div>
  </div>
</template>

<style scoped>
.animate-gradient {
  background-size: 300%;
  -webkit-animation: animatedgradient 6s ease infinite alternate;
  -moz-animation: animatedgradient 6s ease infinite alternate;
  animation: animatedgradient 6s ease infinite alternate;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>