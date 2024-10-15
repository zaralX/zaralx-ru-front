<script setup>

import IndexCodeLine from "../components/index/IndexCodeLine.vue";
</script>

<template>
<!--  <div-->
<!--      class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"-->
<!--  ></div>-->
<!--  <div-->
<!--      class="absolute h-full w-full"-->
<!--  ><img src="/grid.svg" alt="grid"></div>-->
<div class="lg:px-32 xl:px-64 my-16 min-h-full h-full grid grid-cols-2 gap-2">
  <div class="min-h-96 grid grid-rows-2 py-16">
    <div>
      <p class="text-lg font-[450] text-white/[.9]">Привет, я:</p>
      <p class="text-7xl font-[450] mb-4">zaralX</p>
      <p class="text-4xl font-[450] text-red-500">> Разработчик всего! </p>
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
  <div class="bg-red-500 h-96">

  </div>
</div>
</template>

<style scoped>

</style>