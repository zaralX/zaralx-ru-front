<script setup>
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
<div class="fixed w-screen h-screen flex justify-center items-center">
  <div>
    <h1>404</h1>
    <p>По вашему запросу ничего не найдено.</p>
    <router-link class="mt-4 flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-600 rounded-md px-2 py-1 duration-200 transition-all" to="/"><i class="pi pi-arrow-left"></i> <p class="grow text-center">На главную</p></router-link>
    <a class="mt-4 flex justify-center items-center gap-2 bg-neutral-800 hover:bg-neutral-700 rounded-md px-2 py-1 duration-200 transition-all" :href="'https://old.zaralx.ru' + route.fullPath"><i class="pi pi-search"></i> <p class="grow text-center">Искать на старом сайте</p></a>
  </div>
</div>
</template>

<style scoped>

</style>