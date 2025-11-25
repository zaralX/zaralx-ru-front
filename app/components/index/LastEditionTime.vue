<script setup>
import AnimatedCryptoText from "~/components/common/AnimatedCryptoText.vue";

const { data } = await useFetch("/api/last-commit");
</script>

<template>
  Последнее изменение: <AnimatedCryptoText v-if="data.date" v-model="data.date" />
</template>
