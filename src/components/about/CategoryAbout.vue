<script setup>

const props = defineProps({
  icon: {type: String, default: 'pi-align-left'},
  title: {type: String, default: 'title.md'},
})

</script>

<template>
  <div class="w-full rounded-lg bg-neutral-900 group shadow-lg hover:scale-[1.02] duration-500">
    <div class="w-full rounded-lg bg-gradient-to-tr from-neutral-700/20 to-neutral-800/40 p-[3px]">
      <div class="bg-neutral-900 rounded-md p-2 md:p-4">
        <div class="flex items-center gap-2 md:gap-4 opacity-50">
          <i class="pi" :class="props.icon"></i>
          <p>{{props.title}}</p>
        </div>
        <div class="mt-2 md:mt-4">
          <slot/>
        </div>
    </div>
    </div>
  </div>
</template>
