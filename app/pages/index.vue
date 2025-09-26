<script setup lang="ts">
</script>

<template>
<div>
  <div class="bg-[radial-gradient(circle,var(--tw-gradient-from)_1px,transparent_1px)] bg-[length:16px_16px] [background-position:center_center] [background-color:var(--tw-gradient-to)] from-neutral-800 to-transparent absolute top-0 left-0 h-screen w-full z-0 opacity-50"></div>
  <IndexMeteors />
  <div class="absolute z-10 top-16 left-1/2 w-96 h-96 bg-neutral-500 transform -translate-x-1/2 rounded-full blur-[200px] opacity-75"></div>
  <div class="z-20 flex flex-col items-center justify-center text-white relative space-y-8">
    <div class="flex flex-col items-center justify-center space-y-2">
      <div class="w-24 h-24 rounded-full overflow-hidden mt-32">
        <img class="w-full h-full" src="/author.png" alt="">
      </div>
      <div class="font-geist text-3xl text-center font-medium">
        <p class="text-neutral-400">Эффективность одного, талант многих.</p>
        <p class="bg-gradient-to-t from-red-600 to-rose-500 text-transparent bg-clip-text">Зачем искать где-то ещё?</p>
      </div>
      <p class="text-neutral-400 w-96 text-center font-medium bg-black/20 rounded-lg p-4 shadow-md">В моём опыте широкий спектр языков программирования и фреймворков, которые я постоянно применяю. Люблю создавать уникальные и интересные проекты для людей.</p>
      <div class="rounded-3xl p-px bg-gradient-to-r from-neutral-700 to-neutral-800 shadow-md">
        <div class="bg-neutral-900 px-4 py-1 flex items-center gap-2 rounded-[calc(theme(borderRadius.3xl)-1px)]">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <div class="w-2 h-2 bg-green-500 rounded-full absolute animate-ping"></div>
          <p class="text-green-500 font-medium text-sm">Открыт для новых возможностей</p>
        </div>
      </div>

      <div class="flex gap-2">
        <a href="https://github.com/zaralx" target="_blank" class="flex justify-center items-center p-2 text-neutral-400 hover:text-neutral-300 transition">
          <Icon name="mdi:github" size="32"/>
        </a>
        <a href="https://t.me/underzaral" target="_blank" class="flex justify-center items-center p-2 text-neutral-400 hover:text-neutral-300 transition">
          <Icon name="ic:baseline-telegram" size="32"/>
        </a>
        <a href="https://www.youtube.com/@zaralx" target="_blank" class="flex justify-center items-center p-2 text-neutral-400 hover:text-neutral-300 transition">
          <Icon name="mdi:youtube" size="32"/>
        </a>
        <a href="https://discord.com/users/459745638507347979" target="_blank" class="flex justify-center items-center p-2 text-neutral-400 hover:text-neutral-300 transition">
          <Icon name="ic:baseline-discord" size="32"/>
        </a>
      </div>
    </div>

    <div>
      <a href="https://zWork1.t.me/" class="group relative inline-flex items-center overflow-hidden transition rounded-md px-8 py-1 bg-neutral-800" shortcuts="⌘,O" data-state="closed" data-grace-area-trigger="">
        <div class="absolute inset-0 flex items-center [container-type:inline-size]">
          <div class="absolute size-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(230,0,118,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(230,0,118,0.5)_360deg)] opacity-0 transition duration-300 group-hover:opacity-100"></div>
        </div>
        <div class="absolute inset-0.5 bg-neutral-900 sm:bg-neutral-900/80 sm:backdrop-blur-md rounded-md"></div>
        <div class="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100 rounded-md"></div>
        <span class="relative flex items-center justify-center gap-2 bg-gradient-to-b group-hover:from-pink-500 group-hover:to-rose-500 from-white/25 to-white bg-clip-text text-lg font-medium text-transparent duration-200">
          <Icon name="lucide:mail" class="text-white/80 group-hover:text-pink-500 transition-all duration-200" />
          Связаться со мной
        </span>
      </a>
    </div>

    <div class="md:w-[640px] xl:w-[1080px] mt-16">
      <p class="text-2xl font-montserrat font-semibold text-center bg-gradient-to-b from-white/25 to-neutral-400 bg-clip-text text-transparent">Проекты</p>
      <div class="h-px w-11/12 mt-1 bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
      <div class="grid grid-cols-2 gap-4 my-2">
        <div class="bg-neutral-950 opacity-20 w-full h-64 rounded-lg"></div>
        <div class="bg-neutral-950 opacity-20 w-full h-64 rounded-lg"></div>
        <div class="bg-neutral-950 opacity-20 w-full h-64 rounded-lg"></div>
        <div class="bg-neutral-950 opacity-20 w-full h-64 rounded-lg"></div>
      </div>
    </div>
  </div>
</div>
</template>