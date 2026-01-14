<script setup lang="ts">

import ExperimentsParticleCircleComponent from "~/components/experiments/particleCircle/Component.vue";
import ExperimentCard from "~/components/experiments/ExperimentCard.vue";
</script>

<template>
  <ExperimentCard>
    <div class="relative w-full h-full overflow-hidden flex justify-center items-center text-orange-500 text-xl">
      <div class="square-grid -z-10"></div>
      <ExperimentsParticleCircleComponent color="#FF6900" />
    </div>
  </ExperimentCard>
</template>

<style scoped>

</style>