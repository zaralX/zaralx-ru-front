<script setup>
import { useRoute } from "vue-router";
import {ref, onMounted, nextTick, watch, onUnmounted} from "vue";

const route = useRoute();
const links = [
  { name: "_home", to: "/" },
  { name: "_about", to: "/about" }
];

// Позиция и ширина для линии
const activeLinkIndex = ref(0);
const linkRefs = ref([]); // Ссылки на DOM-элементы
const activeLineStyles = ref({ left: '0px', width: '0px' });

// Обновляем активную ссылку после рендера
const updateActiveLink = () => {
  nextTick(() => {
    const currentLink = linkRefs.value[activeLinkIndex.value];
    if (currentLink && currentLink.$el) {
      const { offsetLeft, offsetWidth } = currentLink.$el; // Используем $el для доступа к DOM
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
  <div class="h-16 border-b-2 border-border-main-light dark:border-border-main-dark flex justify-center items-center text-border-inside-light dark:text-border-inside-dark font-[450] text-lg">
    <div class="px-4 md:min-w-64 h-full flex items-center text-center">zaralx-website</div>

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
          class="flex items-center justify-center border-r-2 border-border-main-light dark:border-border-main-dark relative transition-all duration-300 z-10 shadow-[0_0_8px_2px_24px"
          :class="route.fullPath === link.to ? 'text-white bg-black/[.05]' : ''"
          ref="linkRefs"
          v-slot="{ el }"
      >
        {{ link.name }}
      </router-link>
    </nav>

    <div class="px-4 md:px-1 md:min-w-64 h-full flex items-center justify-center">_contact-me</div>
  </div>
</template>
