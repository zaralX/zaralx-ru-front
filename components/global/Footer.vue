<script setup>
const socials = [
  {
    link: "https://t.me/underzaral",
    icon: "pi-telegram",
  },
  {
    link: "https://discord.com/users/459745638507347979",
    icon: "pi-discord",
  },
  {
    link: "https://www.youtube.com/@zaralx",
    icon: "pi-youtube",
  }
]
</script>

<template>
  <div class="min-h-12 md:min-h-16 border-t-2 border-border-main-light dark:border-border-main-dark flex justify-center items-center text-border-inside-light dark:text-border-inside-dark font-[450] text-lg">
    <div class="px-4 h-full hidden md:flex items-center bg-bg-main-dark">find me in:</div>

    <nav class="bg-bg-main-dark relative grow border-x-2 border-border-main-light dark:border-border-main-dark h-full flex">
      <a v-for="social in socials" :href="social.link" class="w-12 md:w-16 h-full flex items-center justify-center text-xl md:text-3xl gap-2 border-r-2 border-border-main-light dark:border-border-main-dark">
        <i class="pi" :class="social.icon"></i>
      </a>
    </nav>

    <a href="https://github.com/zaralx" class="bg-bg-main-dark px-4 h-full flex items-center gap-2 text-sm md:text-base">@zaralx <i class="pi pi-github"></i></a>
  </div>
</template>
