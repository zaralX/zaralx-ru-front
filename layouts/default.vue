<script setup>

</script>

<template>
  <div class="h-screen flex flex-col">
    <Header />
    <main class="flex-1 flex flex-col w-full max-h-[calc(100vh-108px)] md:max-h-[calc(100vh-128px)] overflow-hidden">
      <slot />
    </main>
    <Footer />
  </div>
</template>
