<script setup>

import CategoryAbout from "../components/about/CategoryAbout.vue";
import {onMounted, onUnmounted, ref} from "vue";
import TodoAboutComponent from "../components/about/TodoAboutComponent.vue";
import MiniSkillAbout from "../components/about/MiniSkillAbout.vue";

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
      <CategoryAbout icon="pi-clock" title="datetime.json">
        <div class="bg-neutral-950/20 rounded-md p-2 text-xs sm:text-base md:text-sm xl:text-base">
          <p class="text-neutral-500">{</p>
          <p>    <span class="text-amber-400">"string"</span><span class="text-neutral-400">:</span> <span class="text-amber-400">"{{datetime.string}}"</span><span class="text-neutral-500">,</span></p>
          <p>    <span class="text-amber-400">"utc"</span><span class="text-neutral-400">:</span> <span class="text-amber-400">"UTC+8"</span></p>
          <p>    <span class="text-amber-400">"millis"</span><span class="text-neutral-400">:</span> <span class="text-orange-400">{{datetime.unix}}</span><span class="text-neutral-500">,</span></p>
          <p class="text-neutral-500">}</p>
        </div>
      </CategoryAbout>
      <CategoryAbout icon="pi-list-check" title="todo.db">
        <div class="relative">
          <div class="absolute w-1 h-full left-4 border-r-2 border-dotted border-neutral-500"></div>
          <div class="flex flex-col gap-2 z-20 max-h-48 overflow-y-scroll">
            <TodoAboutComponent title="Оформить личный кабинет" status="incomplete" />
            <TodoAboutComponent title="Заняться _about" status="processing" />
            <TodoAboutComponent title="Сделать в _about todo list" status="completed" />
            <TodoAboutComponent title="Сделать в _about краткую инфу" status="completed" />
            <TodoAboutComponent title="Сделать в _about своё datetime" status="completed" />
          </div>
        </div>
      </CategoryAbout>
    </div>
    <div class="flex flex-col gap-4 flex-1">
      <CategoryAbout icon="pi-list" title="skills.md" inclass="overflow-y-scroll rounded-r-lg max-h-[42rem]">
        <div>
          <div>
            <p class="font-onest text-xl mb-2">Языки программирования</p>
            <!-- load colors-->
            <div class="bg-yellow-500 bg-yellow-600 bg-red-500 bg-purple-700 bg-pink-600 bg-sky-600 bg-amber-600 bg-sky-400 bg-orange-500 bg-blue-500"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Javascript" subtitle="Active" color="yellow-500" />
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Java" subtitle="Active" color="red-500" />
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Python" subtitle="Inactive" color="yellow-600" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
              <MiniSkillAbout low percent="w-[30%]" icon="/img/logos/javascript.svg" name="PHP" subtitle="Inactive" color="purple-700" />
              <MiniSkillAbout low percent="w-[40%]" icon="/img/logos/javascript.svg" name="C#" subtitle="Inactive" color="pink-600" />
              <MiniSkillAbout low percent="w-[60%]" icon="/img/logos/javascript.svg" name="Typescript" subtitle="Inactive" color="sky-600" />
              <MiniSkillAbout low percent="w-[15%]" icon="/img/logos/javascript.svg" name="Rust" subtitle="Inactive" color="amber-600" />
              <MiniSkillAbout low percent="w-[15%]" icon="/img/logos/javascript.svg" name="C++" subtitle="Inactive" color="sky-400" />
              <div class="flex gap-2 mt-2">
                <MiniSkillAbout basic icon="/img/logos/javascript.svg" name="HTML" subtitle="Inactive" color="orange-500" />
                <MiniSkillAbout basic icon="/img/logos/javascript.svg" name="CSS" subtitle="Inactive" color="blue-500" />
              </div>
            </div>

            <p class="font-onest text-xl mb-2 mt-4">Frontend</p>
            <!-- load colors-->
            <div class="bg-emerald-500 bg-blue-500 bg-sky-500 bg-emerald-600"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Vue" subtitle="Active" color="emerald-500" />
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Tailwind" subtitle="Active" color="blue-500" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
              <MiniSkillAbout low percent="w-[50%]" icon="/img/logos/javascript.svg" name="React" subtitle="Inactive" color="sky-500" />
              <MiniSkillAbout low percent="w-[20%]" icon="/img/logos/javascript.svg" name="Nuxt" subtitle="Inactive" color="emerald-600" />
            </div>


            <p class="font-onest text-xl mb-2 mt-4">Backend</p>
            <!-- load colors-->
            <div class="bg-neutral-500"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Fastify" subtitle="Active" color="neutral-500" />
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Express" subtitle="Inactive" color="neutral-500" />
            </div>

            <p class="font-onest text-xl mb-2 mt-4">Прочее</p>
            <!-- load colors-->
            <div class="bg-blue-600 bg-orange-600 bg-orange-500 bg-yellow-500"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Docker" subtitle="Active" color="blue-600" />
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Git" subtitle="Active" color="orange-600" />
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="CI/CD" subtitle="Active" color="orange-500" />
              <MiniSkillAbout icon="/img/logos/javascript.svg" name="Linux" subtitle="Active" color="yellow-500" />
            </div>
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