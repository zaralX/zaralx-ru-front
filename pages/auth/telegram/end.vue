<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {loginDiscord, loginTelegram} from "../../../src/providers/api/auth/index.js";
import store from "../../../src/providers/store/index.js";
import {storeToRefs} from "pinia";

const auth_title = ref("Ожидание")
// useRouter().push({query: {}});
const UserLoading = computed(() => store().UserLoading);

function waitForUserLoadingToComplete() {
  return new Promise((resolve) => {
    const stopWatching = watch(UserLoading, (newValue) => {
      if (!newValue) {
        stopWatching(); // Остановить наблюдение, когда условие выполнено
        resolve();
      }
    });
  });
}

const route = useRoute();
onMounted(async () => {
  await waitForUserLoadingToComplete();
  const hash = route.hash
  const result = hash.match(/tgAuthResult=([^&]+)/);
  const tgAuthResult = result ? result[1] : null;

  console.log(tgAuthResult);
  auth_title.value = "Отправка запроса на авторизацию"

  try {
    const loginData = await loginTelegram(tgAuthResult, store().User);
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