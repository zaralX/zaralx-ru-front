<script setup lang="ts">
import { createTimeline, stagger, splitText } from 'animejs';

onMounted(() => {
  splitText('#header-title', {
  });
})
</script>

<template>
<div class="flex">
  <div id="header-title" class="p-2 rounded-lg font-unbounded">ZARALX.RU</div>
  <div class="flex-1">
  </div>
  <div class="flex items-center text-lg gap-4">
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