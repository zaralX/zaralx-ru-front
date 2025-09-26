<script setup>
import {useUser} from "~/composables/useUser";

const {RefreshData} = useUser()

onMounted(async () => {
  await RefreshData();
})
</script>

<template>
  <div class="bg-neutral-900">
    <NuxtLoadingIndicator :throttle="10" color="#009DFF" error-color="#ff0000" />
    <ShTooltipProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ShTooltipProvider>
    <ShToaster
        position="bottom-left"
        rich-colors
        close-button
    />
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
