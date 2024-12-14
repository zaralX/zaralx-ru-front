<script setup>

import MainLayout from "./MainLayout.vue";
import Footer from "../components/global/Footer.vue";
import Header from "../components/global/Header.vue";
import store from "../providers/store/index.js";
import TelegramLogin from "../components/auth/TelegramLogin.vue";
</script>

<template>
  <MainLayout>
    <template v-slot:default>
      <div class="flex flex-col lg:flex-row flex-1">
        <div class="bg-bg-main-dark w-full lg:min-w-64 lg:w-64 h-full flex flex-col p-2">
          <RouterLink
              to="/cabinet"
              class="text-white text-center py-1"
          >
            Настройки
          </RouterLink>
        </div>
        <div class="bg-bg-main-dark border-l-2 border-border-main-dark w-full">
          <slot />
        </div>
      </div>
    </template>
    <template v-slot:header>
      <Header></Header>
    </template>

    <template v-slot:footer>
      <Footer></Footer>
    </template>
  </MainLayout>
</template>