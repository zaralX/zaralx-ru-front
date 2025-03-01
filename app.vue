<script setup>
import {initDark} from "./src/providers/theme/index.js";
import {useUser} from "~/composables/useUser.js";

const {RefreshData} = useUser()

onMounted(async () => {
  await RefreshData();
})

initDark()
</script>

<template>
  <div class="text-black font-fira dark:text-white w-full min-h-[100vh]">

    <div class="fixed top-0 left-0 w-full h-[100vh] bg-bg-main-light dark:bg-bg-main-dark -z-10 transition-all"/>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>