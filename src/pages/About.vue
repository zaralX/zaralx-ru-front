<script setup>

import CategoryAbout from "../components/about/CategoryAbout.vue";
import {onMounted, onUnmounted, ref} from "vue";

const datetime = ref({
  unix: 0
})

const updater = ref(null)

onMounted(() => {
  updater.value = setInterval(() => {
    datetime.value = {
      unix: Date.now(),
      string: new Date(Date.now()).toUTCString(),
    }
  }, 1)
})

onUnmounted(() => {
  clearInterval(updater.value)
})
</script>

<template>
<!--  <div-->
<!--      class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"-->
<!--  ></div>-->
<!--<div class="text-lg md:px-32 xl:px-64 py-8">-->
<!--  <h1>Обо мне</h1>-->
<!--  <p>Я – программист-самоучка с 4-летним опытом разработки. За это время я освоил широкий спектр языков программирования и фреймворков, применяя их на практике в создании различных проектов. Мой опыт включает как работу над коммерческими проектами, так и разработку собственных решений, что позволило мне глубже погрузиться в мир программирования и постоянно совершенствовать свои навыки.</p>-->
<!--  <h1 class="mt-4 text-base opacity-75 text-sky-300">// TODO: Добавить скиллы, и сделать страницу интересней</h1>-->
<!--</div>-->
  <div class="md:px-32 xl:px-64 py-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="flex flex-col gap-4">
      <CategoryAbout icon="pi-clock" title="datetime.json">
        <div class="bg-neutral-950/20 rounded-md p-2">
          <p class="text-neutral-500">{</p>
          <p>    <span class="text-amber-400">"string"</span><span class="text-neutral-400">:</span> <span class="text-amber-400">"{{datetime.string}}"</span><span class="text-neutral-500">,</span></p>
          <p>    <span class="text-amber-400">"millis"</span><span class="text-neutral-400">:</span> <span class="text-orange-400">{{datetime.unix}}</span><span class="text-neutral-500">,</span></p>
          <p>    <span class="text-amber-400">"utc"</span><span class="text-neutral-400">:</span> <span class="text-amber-400">"UTC+8"</span><span class="text-neutral-500">,</span></p>
          <p class="text-neutral-500">}</p>
        </div>
      </CategoryAbout>
    </div>
    <div>

    </div>
  </div>
</template>

<style scoped>

</style>