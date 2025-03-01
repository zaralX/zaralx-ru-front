<script setup>

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow flex flex-col h-full w-full">
      <slot />
    </main>
    <Footer />
  </div>
</template>
