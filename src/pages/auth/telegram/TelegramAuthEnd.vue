<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {loginDiscord} from "../../../providers/api/auth/index.js";

const auth_title = ref("Ожидание")
// useRouter().push({query: {}});

onMounted(async () => {
  const route = useRoute();
  const code = route
  console.log(code)
  auth_title.value = "Отправка запроса на авторизацию"

});
</script>

<template>
  {{auth_title}}
</template>

<style scoped>

</style>