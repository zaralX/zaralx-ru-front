<script setup>
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
<div class="mt-4 w-screen flex flex-col justify-center items-center px-8">
  <div class="mb-8 bg-bg-second-light dark:bg-bg-second-dark rounded-lg p-8 shadow-lg border-2 border-blue-400/[.75]">
    <h1 class="text-xl text-center md:text-4xl">Розыгрыш <span class="text-blue-400 underline">10.000 АР</span> на сервере СПм</h1>
    <p class="mt-4 mb-2 text-lg">Требования:</p>
    <ul class="list-disc font-medium">
      <li class="hover:underline text-purple-500">
        <a href="https://spworlds.ru/spm/groups/4b01e2ae-a8cd-4fa7-b8f7-ebbc5e9c5a18" target="_blank">555 Подписчиков на сообщество SPm Combat сообщество</a>
      </li>
      <li class="hover:underline text-pink-500">
        <a href="https://spworlds.ru/spm/feed/d9f907a9-0523-43f6-93a5-62ede3aaa05d" target="_blank">Комментарий под этим постом</a>
      </li>
      <li class="hover:underline text-blue-500">
        <a href="https://t.me/underzaral" target="_blank">Подписка на телеграмм канал</a>
      </li>
    </ul>
    <div class="w-full flex justify-center">
      <a class="mt-4 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-500 rounded-md px-2 py-1 duration-200 transition-all min-w-48 max-w-64"
         href="">
        <i class="pi pi-spinner animate-spin"></i>
        <p class="grow text-center">Завершение 1.11.2024</p>
      </a>
    </div>
  </div>
  <div class="mb-32 bg-bg-second-light dark:bg-bg-second-dark rounded-lg p-8 shadow-lg border-2 border-orange-400/[.75]">
    <h1 class="text-xl text-center md:text-4xl">Розыгрыш <span class="text-orange-400 underline">3х подписок Telegram Premium</span></h1>
    <p class="mt-4 mb-2 text-lg">Требования:</p>
    <ul class="list-disc font-medium">
      <li class="hover:underline text-green-500">
        <a href="https://t.me/underzaral" target="_blank">Подписка на телеграмм канал <span class="text-amber-600">Подвал zaralX'a</span></a>
      </li>
      <li class="hover:underline text-green-500">
        <a href="https://t.me/Moksy44" target="_blank">Подписка на телеграмм канал <span class="text-blue-600">Дворец Moksy44</span></a>
      </li>
    </ul>
    <div class="w-full flex justify-center">
<!--      <a class="mt-4 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-500 rounded-md px-2 py-1 duration-200 transition-all min-w-48 max-w-64"-->
<!--         href="">-->
<!--        <i class="pi pi-spinner animate-spin"></i>-->
<!--        <p class="grow text-center">Завершение 7.11.2024</p>-->
<!--      </a>-->
      <a class="mt-4 flex justify-center items-center gap-2 bg-neutral-600 hover:bg-neutral-500 rounded-md px-2 py-1 duration-200 transition-all min-w-48 max-w-64"
         href="">
        <i class="pi pi-spinner animate-spin"></i>
        <p class="grow text-center">Скоро</p>
      </a>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>