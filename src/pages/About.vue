<script setup>

import CategoryAbout from "../components/about/CategoryAbout.vue";
import {ref} from "vue";

const code = ref({
  "string": "some string",
  "number": 0,
  "boolean": true,
  "array": [1,2,"hello"],
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
      <CategoryAbout title="someinfo.json">
        <div class="bg-neutral-950/20 rounded-md">
          {{code.value}}
        </div>
      </CategoryAbout>
    </div>
    <div>

    </div>
  </div>
</template>

<style scoped>

</style>