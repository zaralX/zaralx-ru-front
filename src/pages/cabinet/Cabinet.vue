<script setup>

import store from "../../providers/store/index.js";
import {config} from "../../providers/config/config.js";
</script>

<template>
{{store().User}}
  <button @click="store().Logout()" class="bg-red-600 hover:bg-red-700 transition-all duration-100 py-2 rounded-lg max-w-72 flex justify-start items-center px-3">
    <i class="pi pi-sign-out text-lg"></i>
    <span class="text-center w-full">Выйти из аккаунта</span>
  </button>
  <button @click="store().Delete()" class="bg-red-600 hover:bg-red-700 transition-all duration-100 py-2 rounded-lg max-w-72 flex justify-start items-center px-3">
    <i class="pi pi-sign-out text-lg"></i>
    <span class="text-center w-full">Удалить аккаунт</span>
  </button>
  Привязка аккаунтов
  <button :disabled="store()?.User?.discordId" class="bg-violet-700 disabled:opacity-75 enabled:hover:bg-violet-800 transition-all duration-100 py-2 rounded-lg flex max-w-72 justify-start items-center px-3">
    <i class="pi pi-discord text-lg"></i>
    <span class="text-center w-full">Привязать Discord</span>
  </button>
  <button :disabled="store()?.User?.telegramId" class="bg-blue-600 disabled:opacity-75 enabled:hover:bg-blue-700 transition-all duration-100 py-2 rounded-lg max-w-72 flex justify-start items-center px-3">
    <i class="pi pi-telegram text-lg"></i>
    <span class="text-center w-full">Привязать Telegram</span>
  </button>
</template>

<style scoped>

</style>