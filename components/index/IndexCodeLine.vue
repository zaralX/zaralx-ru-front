<script setup>

const props = defineProps({
  line: String,
})
</script>

<template>
  <div class="flex group">
    <div class="text-gray-500/[0.25] group-hover:text-green-500/[0.25] duration-100 pr-2 mr-2 border-r-[1px] border-gray-500/[0.25] group-hover:border-green-500/[0.25] flex items-center gap-1">
      <div class="relative flex justify-center items-center">
        <i class="pi pi-circle-fill text-[0.4rem] absolute -left-2 -top-[0.2rem]"></i>
      </div>
      {{props.line}}</div>
    <slot />
  </div>
</template>