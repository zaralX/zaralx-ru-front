<script setup lang="ts">
import Countdown from "~/components/tfgm/Countdown.vue";

defineProps<{
  target: string
}>()
</script>

<template>
  <div class="mc-panel flex w-full max-w-113 items-center gap-3 p-2.5">
    <img src="https://assets.zaralx.ru/api/v1/minecraft/vanilla/item/bricks/icon" alt=""
         class="pixel size-16 shrink-0 sm:size-[4.5rem]">

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <p class="font-unbounded text-sm leading-tight sm:text-base">FirmaModern</p>
        <div class="flex shrink-0 items-end gap-[2px] pt-1" aria-hidden="true">
          <span class="w-[3px] bg-lime-400" style="height: 4px"></span>
          <span class="w-[3px] bg-lime-400" style="height: 7px"></span>
          <span class="w-[3px] bg-lime-400" style="height: 10px"></span>
          <span class="w-[3px] bg-lime-400" style="height: 13px"></span>
          <span class="w-[3px] bg-lime-400" style="height: 16px"></span>
        </div>
      </div>
      <p class="mt-1 font-montserrat text-base leading-tight text-stone-400">
        tfgm.zaralx.ru
      </p>
      <div class="mt-1">
        <Countdown :target="target" />
      </div>
    </div>
  </div>
</template>
