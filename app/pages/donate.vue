<script setup lang="ts">
import { onMounted, computed } from 'vue'
import {animate, random, stagger} from "animejs";

type Donator = {
  name: string
  value: number
}

const props = withDefaults(defineProps<{
  list: Donator[]
}>(), {
  list: () => [{name: "kirik", value: 100}, {name: "burik", value: 2000}, {name: "pupii", value: 400}]
})


</script>

<template>

</template>

<style scoped>


</style>