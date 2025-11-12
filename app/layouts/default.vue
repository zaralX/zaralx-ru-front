<script setup lang="ts">
import Header from "~/components/common/Header.vue";
</script>

<template>
  <div class="px-4 sm:px-8 md:px-32 py-4 md:py-8">
    <Header />
    <slot/>
  </div>
</template>

<style scoped>

</style>
