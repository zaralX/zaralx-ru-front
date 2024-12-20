<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const chunks = ref([])

onMounted(async () => {
  chunks.value = (await axios.get("http://localhost:3000/v1/chunk/all")).data.chunks;
  console.log(chunks.value)
})

</script>

<template>

</template>

<style scoped>
</style>
