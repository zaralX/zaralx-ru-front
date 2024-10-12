<script setup>

</script>

<template>
  <slot name="header" />
  <main class="w-full min-h-[100vh]">
    <router-view />
  </main>
  <slot name="footer" />
  <slot />
</template>