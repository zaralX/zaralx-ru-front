<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {loginTelegram} from "~/composables/useHttp.js";
import {useUser} from "~/composables/useUser.js";

const auth_title = ref("Ожидание")

const {userLoading, user} = useUser();

const route = useRoute();
onMounted(async () => {
  const hash = route.hash
  const result = hash.match(/tgAuthResult=([^&]+)/);
  const tgAuthResult = result ? result[1] : null;

  console.log(tgAuthResult);
  auth_title.value = "Отправка запроса на авторизацию"

  try {
    const loginData = await loginTelegram(tgAuthResult, user);
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