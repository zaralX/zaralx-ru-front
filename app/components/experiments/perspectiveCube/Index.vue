<script setup lang="ts">
import PerspectiveCube from "~/components/common/PerspectiveCube.vue";
import ExperimentCard from "~/components/experiments/ExperimentCard.vue";
</script>

<template>
  <ExperimentCard>
    <div class="relative w-full h-full overflow-hidden flex justify-center items-center text-orange-500">
      <div class="square-grid -z-10"></div>
      <PerspectiveCube class="size-50" :opacity="0.75" />
    </div>
  </ExperimentCard>
</template>

<style>

</style>
