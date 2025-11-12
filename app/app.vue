<script setup lang="ts">
import '/assets/css/sonner.css';
</script>

<template>
  <div class="max-w-screen overflow-x-hidden">
    <NuxtLoadingIndicator :throttle="10" color="#009DFF" error-color="#ff0000"/>
    <ShTooltipProvider>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </ShTooltipProvider>
    <ShToaster
        position="bottom-left"
        rich-colors
        close-button
    />
  </div>
</template>
