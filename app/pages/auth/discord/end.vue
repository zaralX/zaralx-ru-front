<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {loginDiscord} from "~/composables/useHttp.js";

const auth_title = ref("Ожидание")
const {userLoading, user} = useUser();

const route = useRoute();
onMounted(async () => {
  console.log(user.value, userLoading.value)
  const code = route.query.code
  auth_title.value = "Отправка запроса на авторизацию"
  try {
    const loginData = await loginDiscord(code, user.value)
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