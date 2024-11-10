<script setup>
import {ref, computed, onMounted} from "vue";
import {router} from "../../providers/router/index.js";
import {useRoute} from "vue-router";

const props = defineProps({
  project: Object,
  tags: Array,
  opened: {type: Boolean, default: false},
});

const tagsFiltered = computed(() => {
  return props.project.tags.map(tag => {
    const tagData = props.tags.find(el => el.key === tag);
    return tagData ? tagData : null;
  });
});

const backgroundImage = computed(() => ({
  backgroundImage: `url(${props.project.image})`,
}));

const linkClass = type => {
  return {
    'bg-red-500 hover:bg-red-600': type === 'youtube',
    'bg-blue-600 hover:bg-blue-700': type === 'website',
    'bg-sky-600 hover:bg-sky-700': type === 'buy-tg',
    'bg-slate-600 hover:bg-slate-700': type === 'source-github',
  };
};

const linkIcon = type => {
  switch (type) {
    case 'youtube':
      return '/logos/youtube.svg';
    case 'website':
      return '/logos/globe.svg';
    case 'buy-tg':
      return '/logos/telegram.svg';
    case 'source-github':
      return '/logos/github.svg';
    default:
      return '?';
  }
};

const linkText = type => {
  switch (type) {
    case 'youtube':
      return 'Видео';
    case 'website':
      return 'Сайт';
    case 'buy-tg':
      return 'Купить';
    case 'source-github':
      return 'Исходники';
    default:
      return '?';
  }
};

const openedFull = ref(props.opened);

const myDiv = ref(null);
const divStyle = computed(() => {
  if (openedFull.value && myDiv.value) {
    // Получаем размеры и положение элемента
    let { width, height, left, top} = myDiv.value.getBoundingClientRect();
    // Получаем размеры body документа
    const bodyRect = document.body.getBoundingClientRect();
    // Размеры окна
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (viewportWidth < 1024) {
      return {};
    }

    // Да да, криво но я сломался..
    width = viewportWidth / 2;
    height = viewportWidth * 5 / 6;

    // Вычисляем смещение относительно видимой области
    const translateX = (viewportWidth - width) / 2 - left + bodyRect.left;
    const translateY = - top + bodyRect.top - (viewportHeight - height) / 6;

    return {
      transform: `translate(${translateX}px, ${translateY}px)`
    };
  }
  return {};
});

// Обновляем позицию при изменении размеров окна
const updatePosition = () => {
  if (openedFull.value && myDiv.value) {
    myDiv.value.style.transform = divStyle.value.transform;
  }
};
window.addEventListener('resize', updatePosition);

onMounted(() => {
  updatePosition();
});

const route = useRoute()
</script>

<template>
  <transition>
    <div @click="openedFull = false; router.push({
        name: 'ProjectsPage',
        params: { projectId: null},
        });" v-if="openedFull" class="fixed w-screen h-screen top-0 left-0 bg-black/[.5] z-30">
      <button><i class="pi pi-times p-2 lg:p-4 lg:text-2xl text-lg hover:opacity-100 opacity-75 transition-all duration-200"></i></button>
    </div>
  </transition>
  <div>
    <div class="flex gap-2 text-sm md:text-base">
      <p class="font-bold text-orange-500">{{ project.name }}</p>
      <p class="text-slate-500 truncate">// {{ project.type }}</p>
    </div>
    <div
        ref="myDiv"
        @click="openedFull = true; router.push({
        name: 'ProjectsPage',
        params: { projectId: project.id},
        }); updatePosition()"
        :class="openedFull ? 'fixed z-40 duration-500 w-full h-screen top-0 lg:top-auto left-0 lg:left-auto lg:w-1/2 lg:h-5/6' : 'hover:-translate-y-1 hover:ring-1 cursor-pointer'"
        :style="divStyle"
        class="bg-bg-second-dark border border-slate-700/[.4] shadow-lg hover:shadow-[0_5px_8px_2px_rgba(0,0,0,0.25)] transition-all duration-200 transform ring-amber-600 rounded-xl flex flex-col"
    >
      <div class="relative flex justify-end">
        <div class="absolute pt-2 pr-3 flex gap-2">
          <div
              v-for="(data, index) in tagsFiltered"
              :key="index"
              class="bg-amber-600 rounded p-1 w-7 h-7"
              :class="data.classes"
          >
            <img :src="data.icon" alt="icon" v-if="data?.icon">
          </div>
        </div>
      </div>
      <div
          class="w-full bg-cover rounded-t-xl border-b border-slate-700/[.4]"
          :class="openedFull ? 'h-full max-h-80' : 'h-32'"
          :style="backgroundImage"
      >
        <button v-if="openedFull" @click="openedFull = false; router.push({
        name: 'ProjectsPage',
        params: { projectId: null},
        });" class="lg:hidden"><i class="absolute pi pi-times p-2 lg:text-2xl text-lg hover:opacity-100 opacity-90 transition-all duration-200 -top-0 bg-black/[0.5] rounded-lg m-2"></i></button>

      </div>
      <div class="p-4 text-slate-400 font-medium flex flex-col flex-grow h-40">
        <div class="flex-1 line-clamp-4">{{ project.description }}</div>
        <div class="flex gap-2">
          <a
              v-for="(link, index) in project.links"
              :key="index"
              :href="link.link"
              class="text-white py-1 px-2 rounded-lg flex justify-center items-center gap-2"
              :class="linkClass(link.type)"
              v-on:click.stop
              target="_blank"
          >
            <img class="w-5 h-5" :src="linkIcon(link.type)" alt="">
            <p class="font-[450]">{{ linkText(link.type) }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>