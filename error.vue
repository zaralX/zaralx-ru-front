<script setup lang="ts">
defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
<div class="fixed bg-bg-main-light dark:bg-bg-main-dark w-screen h-screen flex justify-center items-center text-black font-fira dark:text-white min-h-screen">
  <div>
    <h1>404</h1>
    <p>По вашему запросу ничего не найдено.</p>
    <NuxtLink class="mt-4 flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-600 rounded-md px-2 py-1 duration-200 transition-all" to="/"><i class="pi pi-arrow-left"></i> <p class="grow text-center">На главную</p></NuxtLink>
    <a class="mt-4 flex justify-center items-center gap-2 bg-neutral-800 hover:bg-neutral-700 rounded-md px-2 py-1 duration-200 transition-all" :href="'https://old.zaralx.ru'"><i class="pi pi-search"></i> <p class="grow text-center">Искать на старом сайте</p></a>
  </div>
</div>
</template>

<style scoped>

</style>