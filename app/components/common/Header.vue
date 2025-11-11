<script setup lang="ts">
import { createTimeline, stagger, splitText } from 'animejs';

onMounted(() => {
  splitText('#header-title', {
  });
})
</script>

<template>
<div class="flex items-center">
  <NuxtLink to="/" id="header-title" class="p-2 rounded-lg font-unbounded group w-32">
    <p class="absolute blur group-hover:opacity-100 opacity-0 select-none duration-1000 group-hover:animate-[light-shake_1s_ease-in-out]">ZARALX.RU</p>
    <p class="group-hover:animate-[light-shake_1s_ease-in-out]">ZARALX.RU</p>
  </NuxtLink>
  <div class="flex-1 flex items-center justify-center gap-4">
    <NuxtLink to="/experiments">
      <ShButton variant="ghost">Проекты</ShButton>
    </NuxtLink>
    <NuxtLink to="/experiments">
      <ShButton variant="ghost">Эксперименты</ShButton>
    </NuxtLink>
  </div>
  <div class="flex items-center text-lg gap-4 w-32">
    <a href="https://github.com/zaralX" target="_blank" class="text-stone-400 hover:text-stone-200 duration-200">
      <Icon name="lucide:github" />
    </a>
    <a href="https://gitlab.com/zaralXlab" target="_blank" class="text-stone-400 hover:text-stone-200 duration-200">
      <Icon name="lucide:gitlab" />
    </a>
    <a href="https://zWork1.t.me" target="_blank" class="text-stone-400 hover:text-stone-200 duration-200">
      <Icon name="iconoir:telegram" />
    </a>
  </div>
</div>
</template>

<style scoped>

</style>