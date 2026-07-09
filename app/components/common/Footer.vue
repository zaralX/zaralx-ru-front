<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-16 border-t border-stone-900">
    <div class="px-4 sm:px-8 md:px-32 py-8 flex flex-col md:flex-row items-center gap-6 md:gap-4">
      <div class="flex-1 text-center md:text-left">
        <p class="font-unbounded">ZARALX.RU</p>
        <p class="text-stone-500 text-sm">© {{ year }} zaralX. Разработка интересных решений.</p>
      </div>
      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-400">
        <NuxtLink to="/projects" class="hover:text-stone-200 duration-200">Проекты</NuxtLink>
        <NuxtLink to="/donate" class="hover:text-stone-200 duration-200">Спонсоры</NuxtLink>
        <NuxtLink to="/experiments" class="hover:text-stone-200 duration-200">Эксперименты</NuxtLink>
      </nav>
      <div class="flex-1 flex justify-center md:justify-end items-center gap-4 text-lg">
        <a href="https://github.com/zaralX" target="_blank" aria-label="GitHub" class="text-stone-400 hover:text-stone-200 duration-200">
          <Icon name="lucide:github" />
        </a>
        <a href="https://gitlab.com/zaralXlab" target="_blank" aria-label="GitLab" class="text-stone-400 hover:text-stone-200 duration-200">
          <Icon name="lucide:gitlab" />
        </a>
        <a href="https://t.me/zWork1" target="_blank" aria-label="Telegram" class="text-stone-400 hover:text-stone-200 duration-200">
          <Icon name="iconoir:telegram" />
        </a>
        <a href="mailto:admin@zaralx.ru" aria-label="Почта" class="text-stone-400 hover:text-stone-200 duration-200">
          <Icon name="lucide:mail" />
        </a>
      </div>
    </div>
  </footer>
</template>
