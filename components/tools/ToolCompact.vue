<script setup>

const props = defineProps({
  title: String,
  description: String,
  link: String,
})
</script>

<template>
<div class="w-full h-64 bg-bg-second-dark border-neutral-800 border-2 rounded-xl shadow-lg">
  <slot>
    <div class="p-2 h-full flex flex-col">
      <slot name="title">
        <p class="text-xl font-medium text-neutral-200">{{ props.title }}</p>
        <div class="bg-neutral-700 h-px w-full my-2"></div>
      </slot>
      <slot name="main">
        <div class="w-full h-full flex-1 relative">
          <p class="text-neutral-300">{{ props.description }}</p>
          <a :href="props.link" class="bg-bg-third-dark p-2 flex justify-center items-center absolute bottom-0 right-0 rounded-lg text-neutral-200 hover:text-white"><i class="pi pi-external-link "></i></a>
        </div>
      </slot>
    </div>
  </slot>
</div>
</template>

<style scoped>

</style>