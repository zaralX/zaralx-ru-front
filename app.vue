<script setup>
import {useUser} from "~/composables/useUser.js";

const {RefreshData} = useUser()

onMounted(async () => {
  await RefreshData();
})
</script>

<template>
  <div class="text-black font-fira dark:text-white w-full min-h-[100vh]">

    <div class="fixed top-0 left-0 w-full h-[100vh] bg-bg-main-light dark:bg-bg-main-dark -z-10 transition-all"/>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}


.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
