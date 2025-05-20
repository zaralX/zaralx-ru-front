<script setup lang="ts">
import dayjs from "dayjs";
import { http } from "~/composables/useHttp";

const calendar = ref({})

const months = ref<string[]>([])
const contributions = ref({})

onMounted(() => {
  refresh()
})

async function refresh() {
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

  console.log(firstDay)
  console.log(lastDay)
  console.log(dayjs(lastDay).diff(firstDay) / 1000 / 60 / 60 / 24)

  for (let i = 0; i < dayjs(lastDay).diff(firstDay) / 1000 / 60 / 60 / 24; i++) {
    const day = dayjs(firstDay).add(i, 'day')
    const formatted: string = dayjs(day).format("YYYY-MM-DD")

    contributions.value[formatted] = calendar.value[formatted] ?? 0
  }

  console.log(months.value);
}
</script>

<template>
  <div class="flex overflow-hidden rounded-lg no-scrollbar bg-neutral-800 font-onest p-4 border border-neutral-500 select-none">
    <div
        class="mt-8 mr-2 text-[0.7rem] flex flex-col gap-2.5"
    >
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

      <!-- Contribution Squares -->
      <div class="grid grid-rows-7 grid-flow-col">
        <div v-for="(count, date) in contributions" class="h-3 w-3 rounded border border-neutral-800 group" :class="{
          'bg-neutral-900/[.5]': count == 0,
          'bg-green-600/[.5]': count > 0 && count <= 3,
          'bg-green-600/[.75]': count > 3  && count <= 5,
          'bg-green-600/[.9]': count > 5  && count <= 10,
          'bg-green-500/[.9]': count > 10  && count <= 25,
          'bg-green-400': count > 25,
        }">
          <div class="hidden group-hover:block bg-neutral-900 absolute -translate-x-[50%] -translate-y-7 rounded-lg px-2 py-1 text-xs">
            {{date}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>