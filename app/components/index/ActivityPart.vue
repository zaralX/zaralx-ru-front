<script setup lang="ts">
import type {ContributionDay, ContributionsResponse} from "~/types/contributions";

const {data, status} = await useFetch<ContributionsResponse>("/api/contributions")

const weekdays = ['', 'Пн', '', 'Ср', '', 'Пт', '']

const levels = [
  'bg-stone-800',
  'bg-amber-900',
  'bg-amber-700',
  'bg-amber-500',
  'bg-amber-300'
]

const CELL_STEP = 16
const GRID_OFFSET = 28

const card = useTemplateRef<HTMLElement>('card')
const scroller = useTemplateRef<HTMLElement>('scroller')
const hovered = ref<ContributionDay | null>(null)
const hoveredPosition = ref({left: '0px', top: '0px'})

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'})
const numberFormatter = new Intl.NumberFormat('ru-RU')

function plural(count: number, forms: [string, string, string]) {
  const tens = count % 100
  const ones = count % 10

  if (tens > 10 && tens < 20) return forms[2]
  if (ones === 1) return forms[0]
  if (ones > 1 && ones < 5) return forms[1]

  return forms[2]
}

function contributions(count: number) {
  return `${numberFormatter.format(count)} ${plural(count, ['вклад', 'вклада', 'вкладов'])}`
}

function showTooltip(day: ContributionDay, event: MouseEvent) {
  if (!card.value) return

  const cellBox = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const cardBox = card.value.getBoundingClientRect()
  const left = cellBox.left - cardBox.left + cellBox.width / 2

  hovered.value = day
  hoveredPosition.value = {
    left: `${Math.min(Math.max(left, 80), cardBox.width - 80)}px`,
    top: `${cellBox.top - cardBox.top}px`
  }
}

onMounted(() => {
  if (scroller.value) scroller.value.scrollLeft = scroller.value.scrollWidth
})
</script>

<template>
  <div id="activity" class="scroll-mt-24 px-4 md:px-8 lg:px-32 xl:px-64">
    <h2 class="font-unbounded text-center text-3xl">Чем я занят?</h2>
    <p class="text-stone-400 mt-3 text-center">Активность на GitHub и GitLab за последний год.</p>

    <div ref="card" class="relative mt-8 rounded-lg border border-stone-800 bg-stone-900 p-4 md:p-6">
      <div v-if="status === 'pending'" class="h-52 flex items-center justify-center text-stone-500">
        <Icon name="lucide:loader-circle" class="animate-spin text-xl" />
      </div>

      <div v-else-if="!data || (!data.sources.github && !data.sources.gitlab)"
           class="h-52 flex flex-col items-center justify-center gap-2 text-stone-500">
        <Icon name="lucide:cloud-off" class="text-2xl" />
        <p class="text-sm">Не удалось загрузить активность</p>
      </div>

      <div v-else class="mx-auto w-full max-w-[876px]">
        <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p class="font-medium">{{ contributions(data.total) }} за последний год</p>
          <div class="flex items-center gap-4 text-sm text-stone-400">
            <span class="inline-flex items-center gap-1.5" :class="{ 'opacity-40': !data.sources.github }">
              <Icon name="lucide:github" />
              {{ numberFormatter.format(data.totals.github) }}
            </span>
            <span class="inline-flex items-center gap-1.5" :class="{ 'opacity-40': !data.sources.gitlab }">
              <Icon name="lucide:gitlab" />
              {{ numberFormatter.format(data.totals.gitlab) }}
            </span>
          </div>
        </div>

        <div ref="scroller" class="mt-4 overflow-x-auto pb-2">
          <div class="w-max text-xs text-stone-500">
            <div class="relative h-5">
              <span v-for="month in data.months" :key="`${month.label}-${month.column}`"
                    class="absolute top-0" :style="{ left: `${GRID_OFFSET + month.column * CELL_STEP}px` }">
                {{ month.label }}
              </span>
            </div>

            <div class="flex gap-1">
              <div class="grid w-6 shrink-0 grid-rows-7 gap-1">
                <div v-for="(weekday, row) in weekdays" :key="row" class="h-3 leading-3">{{ weekday }}</div>
              </div>

              <div v-for="(week, column) in data.weeks" :key="column" class="grid grid-rows-7 gap-1">
                <template v-for="(day, row) in week" :key="row">
                  <div v-if="day"
                       class="h-3 w-3 rounded-[2px] hover:ring-1 hover:ring-stone-400"
                       :class="levels[day.level]"
                       @mouseenter="showTooltip(day, $event)"
                       @mouseleave="hovered = null"></div>
                  <div v-else class="h-3 w-3"></div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2 flex items-center justify-end gap-1.5 text-xs text-stone-500">
          <span>Меньше</span>
          <span v-for="(level, index) in levels" :key="index" class="h-3 w-3 rounded-[2px]" :class="level"></span>
          <span>Больше</span>
        </div>
      </div>

      <div v-if="hovered"
           class="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full pb-2"
           :style="hoveredPosition">
        <div class="whitespace-nowrap rounded-md border border-stone-700 bg-stone-950 px-2.5 py-1.5 text-xs text-stone-200 shadow-lg">
          <p>{{ contributions(hovered.count) }} - {{ dateFormatter.format(new Date(hovered.date)) }}</p>
          <p v-if="hovered.count" class="mt-0.5 text-stone-500">
            GitHub: {{ hovered.github }} · GitLab: {{ hovered.gitlab }}
          </p>
        </div>
      </div>
    </div>

    <IndexActivityFeed />
  </div>
</template>
