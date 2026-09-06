<script setup lang="ts">
import type {ActivityResponse} from "~/types/activity";

const {data} = await useFetch<ActivityResponse>("/api/activity")

const relativeFormatter = new Intl.RelativeTimeFormat('ru-RU', {numeric: 'auto'})

function relative(date: string) {
  const minutes = Math.round((Date.now() - new Date(date).getTime()) / 60000)

  if (minutes < 60) return relativeFormatter.format(-minutes, 'minute')
  if (minutes < 60 * 24) return relativeFormatter.format(-Math.round(minutes / 60), 'hour')
  if (minutes < 60 * 24 * 30) return relativeFormatter.format(-Math.round(minutes / 60 / 24), 'day')

  return relativeFormatter.format(-Math.round(minutes / 60 / 24 / 30), 'month')
}

function shortRepo(repo: string) {
  return repo.startsWith('zaralX/') ? repo.slice('zaralX/'.length) : repo
}

function plural(count: number, forms: [string, string, string]) {
  const tens = count % 100
  const ones = count % 10

  if (tens > 10 && tens < 20) return forms[2]
  if (ones === 1) return forms[0]
  if (ones > 1 && ones < 5) return forms[1]

  return forms[2]
}
</script>

<template>
  <div v-if="data?.focus || data?.events?.length" class="mt-4 grid gap-4 lg:grid-cols-3">
    <a v-if="data.focus" :href="data.focus.url" target="_blank"
       class="group relative flex flex-col overflow-hidden rounded-lg border border-stone-800 bg-stone-900 p-5 transition-colors duration-300 hover:border-stone-700">
      <div class="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-orange-500 opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25"></div>

      <p class="flex items-center gap-2 text-xs text-stone-500">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-orange-400"></span>
        </span>
        Сейчас пилю
      </p>

      <p class="mt-3 font-unbounded text-lg break-all">{{ shortRepo(data.focus.repo) }}</p>

      <p class="mt-2 text-sm text-stone-400">
        {{ data.focus.commits }} {{ plural(data.focus.commits, ['коммит', 'коммита', 'коммитов']) }} за последний месяц
      </p>

      <p class="mt-auto flex items-center gap-1 pt-6 text-xs text-stone-500 group-hover:text-stone-300">
        <Icon :name="data.focus.source === 'github' ? 'lucide:github' : 'lucide:gitlab'" />
        Открыть репозиторий
        <Icon name="lucide:arrow-up-right" />
      </p>
    </a>

    <div v-if="data.events?.length" class="rounded-lg border border-stone-800 bg-stone-900 p-5 lg:col-span-2">
      <p class="text-xs text-stone-500">Последние события</p>

      <ul class="mt-3 divide-y divide-stone-800">
        <li v-for="event in data.events" :key="event.id">
          <a :href="event.url" target="_blank" class="group flex items-start gap-3 py-2.5">
            <Icon :name="event.source === 'github' ? 'lucide:github' : 'lucide:gitlab'"
                  class="mt-0.5 shrink-0 text-stone-600 group-hover:text-stone-400" />

            <div class="min-w-0 flex-1">
              <p class="text-sm text-stone-400">
                {{ event.action }}
                <span class="text-stone-200 group-hover:text-white">{{ shortRepo(event.repo) }}</span>
              </p>
              <p v-if="event.message" class="truncate text-xs text-stone-600">{{ event.message }}</p>
            </div>

            <ClientOnly>
              <span class="shrink-0 text-xs text-stone-600">{{ relative(event.date) }}</span>
            </ClientOnly>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
