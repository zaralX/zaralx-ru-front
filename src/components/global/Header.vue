<script setup>

import {useRoute} from "vue-router";

const route = useRoute()

const links = [
  {
    name: "123",
    to: "/"
  },
  {
    name: "123",
    to: "/"
  },
  {
    name: "123",
    to: "/"
  }
]
</script>

<template>
<div class="h-16 border-b-2 border-border-main-light dark:border-border-main-dark flex justify-center items-center text-border-inside-light dark:text-border-inside-dark font-[450] text-lg">
  <div class="pl-4 pr-[10%] h-full flex items-center">zaralx-website</div>
  <nav class="grow border-x-2 border-border-main-light dark:border-border-main-dark
              h-full lg:grid grid-cols-5 hidden">
    <router-link v-for="link in links" :to="link.to" class="flex items-center justify-center border-r-2 border-border-main-light dark:border-border-main-dark">
      <div class="relative">
        <div class="absolute h-1 w-full bg-orange-500"></div>
      </div>
      <div :class="route.fullPath.startsWith(link.to) ? 'text-white' : ''">
        {{link.name}}
      </div>
    </router-link>
  </nav>
  <div class="px-4 h-full flex items-center">_contact-me</div>
</div>
</template>