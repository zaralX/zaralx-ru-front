<script setup>
import IndexCodeLine from "~/components/index/IndexCodeLine.vue";
import IndexSnake from "~/components/index/IndexSnake.vue";
import {onMounted, ref} from "vue";
import ContributionGraph from "~/components/charts/ContributionGraph.vue";

const currentSubtitleText = ref("> ");
const endSubtitleTexts = [
  "Создаю всё и везде!",
  "Чуточку инфлюенсер",
  "Пишу под Minecraft",
  "Frontend-мастер",
  "Backend-волшебник",
  "Java разработчик",
  "QA тестировщик",
  "Web-мастер 🕸️",
  "Дизайню по настроению 🎨",
  "Залетай в Telegram! 🔥"
].sort( () => .5 - Math.random() );
const isBlinking = ref(true);

onMounted(() => {
  if (window.innerWidth < 780) {
    currentSubtitleText.value += endSubtitleTexts[0];
    return;
  }
  let textIndex = 0;
  let index = 0;
  let blinker = 0;
  let waitSwitch = 0;
  let clearing = false;

  // Таймер для анимации печати
  const typingInterval = setInterval(() => {
    if (clearing) {
      index--;
      if (index < -2) {
        clearing = false;
        index = 0;
        textIndex++;
        if (endSubtitleTexts.length <= textIndex) {
          textIndex = 0;
        }
      }
    }
    if (index < endSubtitleTexts[textIndex].length) {
      currentSubtitleText.value = "> " + endSubtitleTexts[textIndex].substring(0, index+1);
      if (!clearing) {
        index++;
      }
    } else {
      blinker++;
      if (blinker > 3) {
        blinker = 0;
        isBlinking.value = !isBlinking.value;
      }
      waitSwitch++;
      if (waitSwitch > 20) {
        clearing = true;
        isBlinking.value = true;
        waitSwitch = 0;
      }
    }
  }, 100);
});
</script>

<template>
  <div class="relative">
<!--    <div class="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:32px_32px] -z-10">-->

<!--    </div>-->
    <IndexLive />
    <div class="fixed bottom-16 right-0 z-10">
      <ContributionGraph />
    </div>
    <div class="lg:px-32 xl:px-64 my-8 md:my-16 min-h-full h-full grid lg:grid-cols-2 gap-2">
      <div class="px-4 md:px-0 min-h-96 flex flex-col justify-center lg:justify-start items-center lg:items-end gap-16 lg:gap-0 lg:grid grid-rows-2 py-16">
        <div>
          <p class="text-lg font-[450] text-white/[.9]">Привет, я:</p>
          <i class="absolute pi pi-circle-fill text-white blur-3xl -z-10 text-sm md:text-[3rem] light-line opacity-0 transform"></i>
          <p class="text-5xl md:text-7xl font-[450] mb-4">zaralX</p>
          <p class="text-2xl md:text-4xl font-[450] text-red-500 typewriter text-wrap"><span>{{ currentSubtitleText }}</span>
            <span :class="isBlinking ? '' : 'hidden'">_</span></p>
        </div>
        <div class="text-sm md:text-lg text-border-inside-light dark:text-border-inside-dark flex flex-col justify-end select-none">
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
  </div>
</template>

<style scoped>
.light-line {
  animation: light-line 2s linear;
}

@keyframes light-line {
  0% {
    transform: scale(0.4);
    opacity: 0;
  }
  10% {
    opacity: 0;
    transform: translateX(-100px) translateY(10px) scale(0.25);
  }
  55% {
    opacity: 1;
    transform: translateX(100px) translateY(10px) scale(0.7);
  }
  100% {
    transform: translateX(300px) translateY(10px) scale(0.25);
    opacity: 0;
  }
}
</style>
