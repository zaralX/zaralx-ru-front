<script setup>
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import {initDark} from "./providers/theme/index.js";
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";
import Header from "./components/global/Header.vue";
import Footer from "./components/global/Footer.vue";
import store from "./providers/store/index.js";
import CabinetLayout from "./layouts/CabinetLayout.vue";

const route = useRoute();
const isEmptyLayout = computed(() => route.meta.layout === "empty" || route.meta.layout === "" || route.meta.layout == null);

onMounted(async () => {
  await store().RefreshData();
})

initDark()
</script>

<template>
  <div class="text-black font-fira dark:text-white w-full min-h-[100vh]">

    <div class="fixed top-0 left-0 w-full h-[100vh] bg-bg-main-light dark:bg-bg-main-dark -z-10 transition-all"/>

    <EmptyLayout v-if="isEmptyLayout" />
    <CabinetLayout v-else-if="route.meta.layout === 'cabinet'">
      <template v-slot:default>
        <router-view />
      </template>
    </CabinetLayout>
    <MainLayout v-else>
      <template v-slot:default>
        <router-view />
      </template>

      <template v-slot:header>
        <Header></Header>
      </template>

      <template v-slot:footer>
        <Footer></Footer>
      </template>
    </MainLayout>
  </div>
</template>