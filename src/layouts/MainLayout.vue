<script setup>

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot name="header" />
    <main class="flex-grow w-full">
      <router-view />
    </main>
    <slot name="footer" />
    <slot />
  </div>
</template>
