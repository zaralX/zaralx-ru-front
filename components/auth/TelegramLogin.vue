<script setup>
import {config} from "~/src/providers/config/config.js";

const botId = '8031549593';
const redirectUrl = config.api + 'auth/telegram/login';

function openTelegramAuth() {
  const authUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent("https://zaralx.ru")}&request_access=write&return_to=${encodeURIComponent(window.origin)}/auth/telegram/end`;
  window.open(authUrl, '_top', 'width=600,height=700');
}

const props = defineProps({disabled: {type: Boolean, default: false}});
</script>

<template>
  <button :disabled="props.disabled" @click="openTelegramAuth" class="bg-blue-600 disabled:opacity-75 enabled:hover:bg-blue-700 transition-all duration-100 py-2 rounded-lg w-full flex justify-start items-center px-3 cursor-pointer">
    <i class="pi pi-telegram absolute text-lg"></i>
    <span class="text-center w-full"><slot>Войти с помощью Telegram</slot></span>
  </button>
</template>
