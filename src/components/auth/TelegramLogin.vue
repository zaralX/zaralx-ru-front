<script setup>
import {config} from "../../providers/config/config.js";

const botId = '8031549593';
const redirectUrl = config.api + 'auth/telegram/login';

function openTelegramAuth() {
  const authUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent("https://e3c5-176-114-130-38.ngrok-free.app")}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
  window.open(authUrl, '_blank', 'width=600,height=700');
}
</script>

<template>
  <button @click="openTelegramAuth" class="bg-blue-600 hover:bg-blue-700 transition-all duration-100 py-2 rounded-lg w-5/6 flex justify-start items-center px-3">
    <i class="pi pi-telegram absolute text-lg"></i>
    <span class="text-center w-full">Войти с помощью Telegram</span>
  </button>
</template>
