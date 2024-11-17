<script setup>

import store from "../../providers/store/index.js";
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
</template>

<style scoped>

</style>