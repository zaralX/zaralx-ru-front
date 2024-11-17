<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {loginDiscord} from "../../../providers/api/auth/index.js";
import store from "../../../providers/store/index.js";

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
  const code = route.query.code
  auth_title.value = "Отправка запроса на авторизацию"
  try {
    const loginData = await loginDiscord(code, store().User)
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