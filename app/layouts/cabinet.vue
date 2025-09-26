<script setup>

import Footer from "~/components/global/Footer.vue";
import Header from "~/components/global/Header.vue";
</script>

<template>
  <div class="h-screen flex flex-col">
    <Header />
    <main class="flex-1 flex flex-col w-full max-h-[calc(100vh-108px)] md:max-h-[calc(100vh-128px)] overflow-hidden">
      <div class="flex flex-col lg:flex-row flex-1">
        <div class="bg-bg-main-dark w-full lg:min-w-64 lg:w-64 h-full flex flex-col p-2">
          <NuxtLink
              to="/cabinet"
              class="text-white text-center py-1"
          >
            Настройки
          </NuxtLink>
        </div>
        <div class="bg-bg-main-dark border-l-2 border-border-main-dark w-full">
          <slot />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>