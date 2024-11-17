<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {loginDiscord, loginTelegram} from "../../../providers/api/auth/index.js";

const auth_title = ref("Ожидание")
// useRouter().push({query: {}});

onMounted(async () => {
  const route = useRoute();
  const hash = route.hash
  const result = hash.match(/tgAuthResult=([^&]+)/);
  const tgAuthResult = result ? result[1] : null;

  console.log(tgAuthResult);
  auth_title.value = "Отправка запроса на авторизацию"

  try {
    const loginData = await loginTelegram(tgAuthResult);
    auth_title.value = loginData.message;

    if (loginData.ok) {
      window.location.href = "/";
    }
  } catch (e) {
    console.error(e)
    auth_title.value = e;
  }
});
</script>

<template>
  {{auth_title}}
</template>

<style scoped>

</style>