<script setup lang="ts">
import ExperimentCard from "~/components/experiments/ExperimentCard.vue";
import AnimatedCryptoText from "~/components/common/AnimatedCryptoText.vue";

const texts = ["Hello from crypto text!", "It's a crypto text"]
const text = ref("Hello from crypto text!")

let timer: number | null = null

onMounted(() => {
  setInterval(() => {
    text.value = texts[texts.indexOf(text.value) + 1 == 2 ? 0 : 1]!
  }, 5000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <ExperimentCard>
    <div class="relative w-full h-full overflow-hidden flex justify-center items-center text-orange-500 text-xl">
      <div class="square-grid -z-10"></div>
      <AnimatedCryptoText v-model="text" />
    </div>
  </ExperimentCard>
</template>

<style>

</style>
