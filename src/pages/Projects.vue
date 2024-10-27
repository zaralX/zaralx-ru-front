<script setup>
import {ref} from "vue";
import Checkbox from "../components/global/Checkbox.vue";
import {tag} from "postcss-selector-parser";

const tags = ref([
  {
    key: "t1",
    name: "Test 1",
    icon: "/logos/html.svg",
    selected: false
  },
  {
    key: "t2",
    name: "Test 2",
    icon: "/logos/html.svg",
    selected: false
  }
])

const projects = [
  {
    name: "Empty Project",
    description: "Проекты скоро будут перенесен из _about",
    type: "_hz_cho_eto",
    image: "/filters/3.png",
    tags: ["t1"],
    links: [
      {
        type: "youtube",
        link: "#"
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

</script>

<template>
<div class="flex-grow flex h-full">
  <div class="w-64 flex-shrink-0">
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

  <div class="flex-1 border-l-2 border-border-main-dark flex flex-col">
    <div class="h-10 flex items-center gap-2 border-b-2 border-border-main-light dark:border-border-main-dark text-border-inside-more-light dark:text-border-inside-more-dark">
      <p class="pl-4 pr-4 max-w-64 overflow-ellipsis truncate">{{tags.map(tag => tag.name).join('; ')}}</p>
      <div class="h-full border-r-2 border-border-main-light dark:border-border-main-dark flex justify-center items-center pr-4">
        <i class="pi pi-times text-xs"></i>
      </div>
    </div>
    <div class="flex-1 grid grid-cols-3 gap-8 overflow-y-scroll p-12">
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
          <div class="w-full h-32 bg-cover rounded-t-xl border-b-[1px] border-slate-700/[.4]" style="background-image: url('/fillers/1.png')"></div>
          <div class="p-4 text-slate-400 font-medium flex flex-col flex-grow h-32">
            <div class="flex-1">{{project.description}}</div>
            <div class="flex gap-2">
              <a v-for="link in project.links" :href="link.link" class="text-white py-1 px-2 rounded-lg flex justify-center items-center gap-1"
              :class="
              link.type === 'youtube' ? 'bg-red-500 hover:bg-red-600' : '?'
">
                <img class="w-6 h-6" :src="
                link.type === 'youtube' ? `/logos/youtube.svg` : '?'
" alt="">
                <p class="font-[450]">{{
                    link.type === "youtube" ? 'Видео' : '?'
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