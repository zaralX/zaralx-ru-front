<script setup lang="ts">

</script>

<template>
<div>
  <div class="py-16 text-center">
    <h1 class="text-3xl font-unbounded">Experiments</h1>
    <p class="text-slate-400 text-lg">Здесь вы можете посмотреть на мои экспериментальные разработки :)</p>
  </div>

  <h2 class="text-2xl font-unbounded py-4 text-slate-200">ANIME.JS</h2>
  <div class="grid grid-cols-4 gap-4">
    <ExperimentsBasicTextAnimation />
    <ExperimentsCubeParticles />
    <ExperimentsCubeParticlesSpawner />
    <Experiments3dSpinningText />
    <ExperimentsPerspectiveCube />
  </div>
</div>
</template>

<style scoped>

</style>