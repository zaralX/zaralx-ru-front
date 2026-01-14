<script setup lang="ts">
defineProps<{
  name: string
  amount: number | string
}>()
</script>

<template>
  <div>
    <div class="
    group relative
    bg-stone-900/50 backdrop-blur-sm
    border border-stone-800/60
    rounded-xl p-5
    transition-all duration-300
    hover:border-amber-700/50
    hover:shadow-[0_0_25px_-5px] hover:shadow-amber-900/40
    hover:-translate-y-1 font-unbounded text-left
  ">
      <!-- тонкая светящаяся полоска сверху при ховере -->
      <div class="
      absolute inset-x-0 top-0 h-px
      bg-gradient-to-r from-transparent via-amber-500 to-transparent
      opacity-0 group-hover:opacity-70
      transition-opacity duration-500
    " />

      <div class="">
        <div class="
        text-base font-medium
        text-stone-300/90
        group-hover:text-amber-300/90
        transition-colors duration-300
      ">
          {{ name }}
        </div>
        <div class="text-2xl font-bold text-orange-400/90 tracking-tight">
          {{ amount }} ₽
        </div>

        <div class="flex-1" />
      </div>

      <!-- очень лёгкий градиент снизу для объёма -->
      <div class="
      absolute inset-x-6 bottom-0 h-12
      bg-gradient-to-t from-amber-950/20 to-transparent
      opacity-0 group-hover:opacity-60
      rounded-b-xl
      transition-opacity duration-500
      pointer-events-none
    " />
    </div>
  </div>
</template>