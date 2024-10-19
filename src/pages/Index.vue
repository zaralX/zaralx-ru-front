<script setup>

import IndexCodeLine from "../components/index/IndexCodeLine.vue";
import IndexSnake from "../components/index/IndexSnake.vue";
</script>

<template>
<!--  <div-->
<!--      class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"-->
<!--  ></div>-->
<!--  <div-->
<!--      class="absolute h-full w-full"-->
<!--  ><img src="/grid.svg" alt="grid"></div>-->
<div class="lg:px-32 xl:px-64 my-8 md:my-16 min-h-full h-full grid lg:grid-cols-2 gap-2">
  <div class="px-4 md:px-0 min-h-96 flex flex-col justify-center lg:justify-start items-center lg:items-end gap-16 lg:gap-0 lg:grid grid-rows-2 py-16">
    <div>
      <p class="text-lg font-[450] text-white/[.9]">Привет, я:</p>
      <p class="text-7xl font-[450] mb-4">zaralX</p>
      <p class="text-4xl font-[450] text-red-500">> Разработчик всего! </p>
      <a class="mt-4 flex justify-center items-center gap-2 bg-neutral-800 hover:bg-neutral-700 rounded-md px-2 py-1 duration-200 transition-all max-w-64" href="https://old.zaralx.ru"><i class="pi pi-arrow-left"></i> <p class="grow text-center">На старый сайт</p></a>
    </div>
    <div class="text-lg text-border-inside-light dark:text-border-inside-dark flex flex-col justify-end select-none">
      <IndexCodeLine line="1">
        <p class="">// приветствую на сайте,</p>
      </IndexCodeLine>
      <IndexCodeLine line="2">
        <p class="">// хотите написать мне?</p>
      </IndexCodeLine>
      <IndexCodeLine line="3">
        <a href="https://t.me/zWork1" class="hover:bg-white/[.05] duration-100">
          <span class="text-red-500">const</span>
          <span class="text-orange-400"> tgLink</span>
          <span class="text-white"> =</span>
          <span class="text-yellow-300"> "https://t.me/zWork1"</span></a>
      </IndexCodeLine>
    </div>
  </div>
  <div class="hidden lg:flex justify-center">
    <div class="bg-bg-second-light dark:bg-bg-second-dark h-[32rem] rounded-lg shadow p-4 flex items-center gap-4">
      <div class="min-w-64 min-h-[30rem] bg-bg-third-light dark:bg-bg-third-dark shadow-[0_0_8px_2px_rgba(15,15,15,0.6)] rounded-lg">
        <IndexSnake />
      </div>
<!--      Ну да, это змейка. А что?-->
<!--      <br>-->
<!--      Сайт в разработке если что.-->
    </div>
  </div>
</div>
</template>

<style scoped>

</style>