<script setup>
import { ref, onMounted } from 'vue';
import Input from "../components/global/Input.vue";
import {config} from "../providers/config/config.js";
import TelegramLogin from "../components/auth/TelegramLogin.vue";

const firstLoadTexts = [
  [
    {
      text: "zaralX Inc. [Version 1.2024.42]",
      time: 500
    },
    {
      text: "Making tea.. /",
      time: 300,
      next: {
        text: "Making tea.. -",
        time: 350,
        next: {
          text: "Making tea.. \\",
          time: 250,
          next: {
            text: "Making tea.. |",
            time: 400,
            next: {
              text: "Making tea.. ✔",
              time: 300
            }
          },
        }
      }
    },
    {
      text: "Making sandwiches.. /",
      time: 300,
      next: {
        text: "Making sandwiches.. -",
        time: 350,
        next: {
          text: "Making sandwiches.. \\",
          time: 250,
          next: {
            text: "Making sandwiches.. |",
            time: 400,
            next: {
              text: "Making sandwiches.. /",
              time: 300,
              next: {
                text: "Making sandwiches.. -",
                time: 300,
                next: {
                  text: "Making sandwiches.. \\",
                  time: 350,
                  next: {
                    text: "Making sandwiches.. ✔",
                    time: 400,
                  },
                }
              }
            }
          },
        }
      }
    },
    {
      text: "Turning on the computer.. /",
      time: 400,
      next: {
        text: "Turning on the computer.. -",
        time: 250,
        next: {
          text: "Turning on the computer.. \\",
          time: 350,
          next: {
            text: "Turning on the computer.. |",
            time: 300,
            next: {
              text: "Turning on the computer.. /",
              time: 200,
              next: {
                text: "Turning on the computer.. -",
                time: 400,
                next: {
                  text: "Turning on the computer.. \\",
                  time: 250,
                  next: {
                    text: "Turning on the computer.. ✔",
                    time: 600,
                  },
                }
              }
            }
          },
        }
      }
    },
    {
      text: "",
      time: 100
    },
    {
      text: "--<[ TASK FINISHED ]>--",
      time: 400
    },
  ]
];

const currentText = ref('');
const currentIndex = ref(0);

function processTexts(textList) {
  let index = 0;

  function showNextText(textItem, beforeText = "") {
    currentText.value = beforeText + textItem.text;

    setTimeout(() => {
      if (textItem.next) {
        showNextText(textItem.next, beforeText);
      } else {
        index++;
        if (index < textList.length) {
          showNextText(textList[index], currentText.value + "<br>");
        } else {
          currentIndex.value++;
          if (currentIndex.value < firstLoadTexts.length) {
            processTexts(firstLoadTexts[currentIndex.value]);
          }
        }
      }
    }, textItem.time);
  }

  if (textList.length > 0) {
    showNextText(textList[0]);
  }
}

onMounted(() => {
  processTexts(firstLoadTexts[currentIndex.value]);
});

const pageType = ref("login")
</script>

<template>
<!--  <button class="absolute" @click="() => {if (pageType === 'login') {-->
<!--    pageType = 'register';-->
<!--  } else {-->
<!--    pageType = 'login';-->
<!--  }}">toggle</button>-->
  <div class="flex-1 w-full h-full flex justify-center items-center">
    <div class="bg-neutral-950 rounded-lg w-full md:w-96 min-h-96 shadow-lg relative flex flex-col">
      <i class="absolute pi pi-circle-fill text-white blur-[90px] -z-10 text-[6rem] animate-[pulse_10s_ease-in-out_infinite]"></i>
      <i class="absolute pi pi-circle-fill text-white blur-[70px] -z-10 text-[4rem] -bottom-2 -right-2 animate-[pulse_8s_ease-in-out_infinite]"></i>

      <div class="bg-bg-third-dark py-1 px-2 rounded-t-lg flex items-center relative h-8">
        <div class="absolute left-2 text-[0.6rem] flex gap-2 items-center">
          <i class="pi pi-circle-fill text-red-500"></i>
          <i class="pi pi-circle-fill text-yellow-500"></i>
          <i class="pi pi-circle-fill text-green-500"></i>
        </div>
        <div class="relative w-full h-full">
          <transition name="fade">
            <div v-if="pageType === 'login'" class="w-full text-center text-neutral-300">Вход в аккаунт</div>
            <div v-else class="w-full text-center text-neutral-300">Регистрация</div>
          </transition>
        </div>
      </div>

      <div class="flex-1 relative">
        <p class="text-red-500 text-center font-semibold absolute z-10 w-full text-xl mt-6">АВТОРИЗАЦИЯ В РАЗРАБОТКЕ</p>
        <transition name="fade-window">
          <!-- LOGIN -->
          <div v-if="pageType === 'login'" class="absolute px-2 py-8 w-full h-full bg-neutral-950 transition-all transform rounded-b-lg flex flex-col items-center justify-center gap-4">
            <button disabled :href="config.discord_auth" class="bg-violet-700 disabled:cursor-not-allowed disabled:opacity-75 enabled:hover:bg-violet-800 transition-all duration-100 py-2 rounded-lg w-full md:w-5/6 flex justify-start items-center px-3">
              <i class="pi pi-discord absolute text-lg"></i>
              <span class="text-center w-full">Войти с помощью Discord</span>
            </button>
            <TelegramLogin disabled class="md:!w-5/6 disabled:cursor-not-allowed" />
            <button disabled class="bg-neutral-100 text-black disabled:opacity-75 disabled:cursor-not-allowed enabled:hover:bg-neutral-200 transition-all duration-100 py-2 rounded-lg w-full md:w-5/6 flex justify-start items-center px-3">
              <i class="pi pi-google absolute text-lg"></i>
              <span class="text-center w-full">Войти с помощью Google</span>
            </button>
            <button disabled class="bg-neutral-800 disabled:opacity-75 disabled:cursor-not-allowed enabled:hover:bg-neutral-900 transition-all duration-100 py-2 rounded-lg w-full md:w-5/6 flex justify-start items-center px-3">
              <i class="pi pi-github absolute text-lg"></i>
              <span class="text-center w-full">Войти с помощью Github</span>
            </button>
<!--            <div class="flex-1 flex flex-col gap-4">-->
<!--              <Input name="Никнейм или почта" max="255" placeholder="Введите никнейм"/>-->
<!--              <Input name="Пароль" placeholder="Введите никнейм"/>-->
<!--            </div>-->

<!--            <button class="bg-neutral-900 hover:bg-neutral-800 transition-all duration-100 py-2 rounded-lg w-2/3">Войти</button>-->
          </div>

          <!-- REGISTER -->
          <div v-else class="absolute px-2 py-8 w-full h-full bg-neutral-950 transition-all rounded-b-lg transform flex flex-col items-center justify-center">
            <div class="flex-1 flex flex-col gap-4">
              <Input name="Никнейм или почта" max="255" placeholder="Введите никнейм"/>
              <Input name="Почта" placeholder="Введите почту"/>
              <Input name="Пароль" placeholder="Введите никнейм"/>
            </div>

            <button class="bg-neutral-900 hover:bg-neutral-800 transition-all duration-100 py-2 rounded-lg w-2/3">Регистрация</button>
          </div>
        </transition>
      </div>




<!--      <div class="p-2 h-full bg-neutral-950 rounded-b-lg flex justify-center items-center text-center" v-html="currentText">-->

<!--      </div>-->
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-window-enter-active,
.fade-window-leave-active {
  position: absolute;
  transition: all 1s ease;
}

.fade-window-enter-from,
.fade-window-leave-to {
  transform: scaleY(0.01);
  opacity: 0;
}
</style>
