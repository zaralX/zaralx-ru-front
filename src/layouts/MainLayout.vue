<script setup>

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot name="header" />
    <main class="flex-grow h-full w-full">
      <router-view />
    </main>
    <slot name="footer" />
    <slot />
  </div>
</template>
