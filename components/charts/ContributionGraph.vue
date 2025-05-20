<script setup lang="ts">
import dayjs from "dayjs";
import { http } from "~/composables/useHttp";

const calendar = ref({})

const months = ref<string[]>([])
const contributions = ref({})
const loading = ref(true)

onMounted(() => {
  refresh()
})

async function refresh() {
  loading.value = true
  calendar.value = (await http.get("/git/activity")).data
  months.value = []
  contributions.value = {}
  const firstDay = Object.keys(calendar.value)[0];
  const lastDay = Object.keys(calendar.value)[Object.keys(calendar.value).length - 1];

  for (const [key, value] of Object.entries(calendar.value)) {
    const month = dayjs(key).format("MMM");
    if (months.value.includes(month)) {
      const lastMonth = months.value[months.value.length - 1]
      if (lastMonth === month) {
        continue;
      }
    }
    months.value.push(month);
  }

  for (let i = 0; i < dayjs(lastDay).diff(firstDay) / 1000 / 60 / 60 / 24; i++) {
    const day = dayjs(firstDay).add(i, 'day')
    const formatted: string = dayjs(day).format("YYYY-MM-DD")

    contributions.value[formatted] = calendar.value[formatted] ?? 0
  }

  loading.value = false;
}
</script>

<template>
  <div class="flex overflow-hidden rounded-tl-4xl no-scrollbar bg-neutral-900 font-onest p-4 border-t-2 border-l-2 border-neutral-800 select-none">
    <transition name="fade">
      <div v-if="loading" class="w-[710px] h-26 flex justify-center items-center gap-2">
        <i class="pi pi-spinner animate-spin"></i>
        <p>Загрузка данных</p>
      </div>

      <div v-else class="flex">
        <div class="mt-8 mr-2 text-[0.7rem] flex flex-col gap-2.5">
          <div class="max-h-3">Mon</div>
          <div class="max-h-3">Wed</div>
          <div class="max-h-3">Fri</div>
        </div>

        <div>
          <div class="mb-1 flex justify-between text-xs">
            <div
                v-for="(month, index) in months"
                :key="index"
                class="w-[52px] text-left"
            >
              {{ month }}
            </div>
          </div>

          <div class="grid grid-rows-7 grid-flow-col">
            <div
                v-for="(count, date) in contributions"
                :key="date"
                class="h-3 w-3 rounded border border-neutral-900 group/contribute relative"
                :class="{
              'bg-neutral-950/[.5]': count == 0,
              'bg-green-600/[.5]': count > 0 && count <= 3,
              'bg-green-600/[.75]': count > 3 && count <= 5,
              'bg-green-600/[.9]': count > 5 && count <= 10,
              'bg-green-500/[.9]': count > 10 && count <= 25,
              'bg-green-400': count > 25,
            }"
            >
              <div class="hidden group-hover/contribute:block bg-neutral-900 absolute -translate-x-[50%] -translate-y-7 rounded-lg px-2 py-1 text-xs whitespace-nowrap z-10">
                {{ date }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="mx-2 min-h-full w-px bg-neutral-800"></div>
    <div class="text-center text-xs text-neutral-600 [writing-mode:sideways-rl]">
      <p>CONTRIBUTIONS</p>
      <p>Gitlab + Github</p>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
  transform: scale(0.95);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

</style>