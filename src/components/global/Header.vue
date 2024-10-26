<script setup>
import { useRoute } from "vue-router";
import {ref, onMounted, nextTick, watch, onUnmounted} from "vue";
import {isDark, toggleDark} from "../../providers/theme/index.js";

const route = useRoute();
const links = [
  { name: "_home", to: "/" },
  { name: "_about", to: "/about" }
];

const mobileMenu = ref(false);
const dark = ref(isDark());

const _toggleDark = () => {
  toggleDark();
  dark.value = isDark();
}

// Позиция и ширина для линии
const activeLinkIndex = ref(0);
const linkRefs = ref([]); // Ссылки на DOM-элементы
const activeLineStyles = ref({ left: '0px', width: '0px' });

// Обновляем активную ссылку после рендера
const updateActiveLink = () => {
  nextTick(() => {
    const currentLink = linkRefs.value[activeLinkIndex.value];
    if (currentLink && currentLink.$el) {
      let { offsetLeft, offsetWidth } = currentLink.$el; // Используем $el для доступа к DOM
      let found = false;
      for (const link of links) {
        if (link.to === route.fullPath) {
          found = true;
          break;
        }
      }
      if (!found) {
        offsetLeft = 0;
        offsetWidth = 0;
      }
      activeLineStyles.value = {
        left: `${offsetLeft}px`,
        width: `${offsetWidth-1}px`
      };
    }
  });
};

// Следим за изменением маршрута и обновляем линию
watch(
    () => route.fullPath,
    () => {
      const activeIndex = links.findIndex(link => route.fullPath === link.to);

      activeLinkIndex.value = activeIndex !== -1 ? activeIndex : 0;
      updateActiveLink();
    },
    { immediate: true }
);

onMounted(() => {
  window.addEventListener("resize", updateActiveLink);
  updateActiveLink();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateActiveLink);
});
</script>

<template>
  <div v-if="mobileMenu" class="fixed w-screen h-screen top-0 left-0 z-20">
    <div :class="mobileMenu ? 'top-0' : '-top-full'" class="absolute w-screen h-screen bg-bg-second-light dark:bg-bg-second-dark transition-all duration-200 ease-out pt-16">
      <div class="text-2xl flex flex-col text-border-inside-light dark:text-border-inside-dark">
        <router-link
            v-for="link in links"
            :to="link.to"
            class="flex items-center justify-center border-border-third-light dark:border-border-third-dark transition-all duration-300 border-b-2 border-border-main-light dark:border-border-main-dark py-2"
            :class="route.fullPath === link.to ? '!text-amber-500' : ''"
            @click="mobileMenu = false"
        >
          {{ link.name }}
        </router-link>
        <a href="https://old.zaralx.ru/buy" class="flex items-center justify-center border-border-third-light dark:border-border-third-dark transition-all duration-300 border-b-2 border-border-main-light dark:border-border-main-dark py-2">
          _buy
        </a>
      </div>
    </div>
  </div>
  <div class="h-16 border-b-2 border-border-main-light dark:border-border-main-dark flex justify-center items-center text-border-inside-light dark:text-border-inside-dark font-[450] text-lg z-30 bg-bg-main-light dark:bg-bg-main-dark">
    <div class="px-8 md:min-w-64 h-full flex items-center text-center">zaralx-website</div>

    <nav class="relative grow border-x-2 border-border-main-light dark:border-border-main-dark h-full lg:grid grid-cols-5 hidden">
      <!-- Линия под активной ссылкой -->
      <div
          class="absolute -bottom-[2px] h-[2px] bg-orange-500 transition-all duration-300 z-10 shadow-[0_0_8px_2px_rgba(249,115,22,0.2)] overflow-visible"
          :style="activeLineStyles">
      </div>

      <!-- Используем ref для сохранения ссылок -->
      <router-link
          v-for="(link, index) in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center justify-center border-r-2 border-border-main-light dark:border-border-main-dark relative transition-all duration-300 z-10 shadow-[0_0_8px_2px_24px]"
          :class="route.fullPath === link.to ? 'text-white bg-black/[.05]' : ''"
          ref="linkRefs"
          v-slot="{ el }"
      >
        {{ link.name }}
      </router-link>
      <a href="https://old.zaralx.ru/buy" class="flex items-center justify-center border-r-2 border-border-main-light dark:border-border-main-dark relative transition-all duration-300 z-10 shadow-[0_0_8px_2px_24px]">
        _buy
      </a>
    </nav>

    <div class="px-4 md:min-w-64 h-full hidden md:flex items-center justify-center gap-4">
<!--      <div @click="_toggleDark()" class="flex justify-start items-center text-2xl grow cursor-pointer p-2"><i class="pi" :class="dark ? 'pi-sun' : 'pi-moon'"></i></div>-->
      <div>_nothing</div>
    </div>
    <div @click="mobileMenu = !mobileMenu" class="px-8 grow h-full flex md:hidden items-center justify-end active:text-amber-500 duration-100 transition-all">
      <i v-if="!mobileMenu" class="pi pi-bars"></i>
      <i v-if="mobileMenu" class="pi pi-times"></i>
    </div>
  </div>
</template>
