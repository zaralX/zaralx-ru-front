<script setup lang="ts">
import {animate, stagger, utils} from 'animejs';
import ExperimentCard from "~/components/experiments/ExperimentCard.vue";

onMounted(() => {
  const $squares = utils.$('.square');

  function animateGrid() {
    animate($squares, {
      scale: [
        { to: [0, 1.25] },
        { to: 0 }
      ],
      boxShadow: [
        { to: '0 0 1rem 0 currentColor' },
        { to: '0 0 0rem 0 currentColor' }
      ],
      delay: stagger(100, {
        grid: [12, 5],
        from: utils.random(0, 12 * 5)
      }),
      onComplete: animateGrid
    });
  }

  animateGrid();
})
</script>

<template>
  <ExperimentCard>
    <div class="relative w-full h-full overflow-hidden flex justify-center items-center text-orange-500">
      <div class="square-grid -z-10"></div>
      <div class="grid grid-cols-12">
        <div v-for="i in 12 * 5" class="square bg-orange-500 w-8 h-8"></div>
      </div>
    </div>
  </ExperimentCard>
</template>

<style>

</style>
