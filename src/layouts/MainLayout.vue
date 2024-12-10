<script setup>

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot name="header" />
    <main class="flex-grow flex flex-col h-full w-full">
      <slot />
    </main>
    <slot name="footer" />
    <slot />
  </div>
</template>
